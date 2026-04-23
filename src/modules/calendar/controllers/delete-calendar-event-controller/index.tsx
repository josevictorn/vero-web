import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteCalendarEvent } from "../../services";

interface DeleteCalendarEventControllerChildrenProps {
	isPending: boolean;
	submit: () => Promise<void>;
}

interface DeleteCalendarEventControllerProps
	extends ChildrenController<DeleteCalendarEventControllerChildrenProps> {
	eventId: string | null;
}

export function DeleteCalendarEventController({
	children,
	eventId,
}: DeleteCalendarEventControllerProps) {
	const queryClient = useQueryClient();

	const deleteEventRequest = useMutation({
		mutationFn: deleteCalendarEvent,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
			toast.success("Evento removido com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao remover evento", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = async () => {
		if (!eventId) {
			throw new Error("Evento não encontrado");
		}

		await deleteEventRequest.mutateAsync({ id: eventId });
	};

	return children({
		submit,
		isPending: deleteEventRequest.isPending,
	});
}
