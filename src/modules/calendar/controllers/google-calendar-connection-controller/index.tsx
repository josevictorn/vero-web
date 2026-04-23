import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	connectGoogleCalendar,
	disconnectGoogleCalendar,
	fetchCalendarEvents,
	getGoogleConnectUrl,
} from "../../services";

interface GoogleCalendarConnectionControllerChildrenProps {
	isGoogleConnected: boolean;
	isPending: boolean;
	toggleGoogleConnection: () => Promise<void>;
}

interface GoogleCalendarConnectionControllerProps
	extends ChildrenController<GoogleCalendarConnectionControllerChildrenProps> {
	callbackCode?: string;
	callbackState?: string;
	onCallbackHandled?: () => void;
}

export function GoogleCalendarConnectionController({
	children,
	callbackCode,
	callbackState,
	onCallbackHandled,
}: GoogleCalendarConnectionControllerProps) {
	const queryClient = useQueryClient();
	const [isGoogleConnected, setIsGoogleConnected] = useState(false);

	const connectionProbeRequest = useQuery({
		queryKey: ["google-calendar-connection-status"],
		queryFn: async () => {
			const now = new Date();
			const oneMonthLater = new Date(now);
			oneMonthLater.setMonth(now.getMonth() + 1);

			const response = await fetchCalendarEvents({
				maxResults: 1,
				timeMin: now.toISOString(),
				timeMax: oneMonthLater.toISOString(),
			});

			return response;
		},
		retry: false,
	});

	useEffect(() => {
		if (connectionProbeRequest.isSuccess) {
			setIsGoogleConnected(true);
		}

		if (connectionProbeRequest.isError) {
			setIsGoogleConnected(false);
		}
	}, [connectionProbeRequest.isSuccess, connectionProbeRequest.isError]);

	const connectUrlRequest = useMutation({
		mutationFn: getGoogleConnectUrl,
		onSuccess: ({ auth_url }) => {
			window.location.assign(auth_url);
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao conectar Google Calendar", {
				description: errorResponse?.message,
			});
		},
	});

	const connectCallbackRequest = useMutation({
		mutationFn: connectGoogleCalendar,
		onSuccess: async () => {
			setIsGoogleConnected(true);
			await queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
			toast.success("Google Calendar conectado com sucesso");
			onCallbackHandled?.();
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao concluir conexão com Google Calendar", {
				description: errorResponse?.message,
			});
			onCallbackHandled?.();
		},
	});

	const disconnectRequest = useMutation({
		mutationFn: disconnectGoogleCalendar,
		onSuccess: async () => {
			setIsGoogleConnected(false);
			await queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
			toast.success("Google Calendar desconectado");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao desconectar Google Calendar", {
				description: errorResponse?.message,
			});
		},
	});

	useEffect(() => {
		if (connectCallbackRequest.isPending) {
			return;
		}

		if (!callbackCode) {
			return;
		}

		if (!callbackState) {
			return;
		}

		connectCallbackRequest.mutate({
			code: callbackCode,
			state: callbackState,
		});
	}, [callbackCode, callbackState, connectCallbackRequest]);

	const toggleGoogleConnection = async () => {
		if (isGoogleConnected) {
			await disconnectRequest.mutateAsync();
			return;
		}

		await connectUrlRequest.mutateAsync();
	};

	return children({
		isGoogleConnected,
		isPending:
			connectUrlRequest.isPending ||
			disconnectRequest.isPending ||
			connectCallbackRequest.isPending ||
			connectionProbeRequest.isPending,
		toggleGoogleConnection,
	});
}
