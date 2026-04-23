import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { editCalendarEvent, getCalendarEventById } from "../../services";
import type {
	CalendarEventDTO,
	CreateCalendarEventBody,
} from "../../services/types";

interface EditCalendarEventControllerChildrenProps
	extends BaseFormProps<CreateCalendarEventBody, CalendarEventDTO> {
	isFetchingEvent: boolean;
}

interface EditCalendarEventControllerProps
	extends ChildrenController<EditCalendarEventControllerChildrenProps> {
	eventId: string | null;
}

export function EditCalendarEventController({
	children,
	eventId,
}: EditCalendarEventControllerProps) {
	const queryClient = useQueryClient();

	const getEvent = useQuery({
		queryKey: ["calendar-event", eventId],
		queryFn: async () => {
			const response = await getCalendarEventById({ id: eventId ?? "" });

			return response.event;
		},
		enabled: eventId !== null,
	});

	const editEventRequest = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			data: CreateCalendarEventBody;
			id: string;
		}) => {
			const response = await editCalendarEvent(id, data);

			return response.event;
		},
		onSuccess: async (event) => {
			await queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
			await queryClient.invalidateQueries({
				queryKey: ["calendar-event", event.id],
			});
			toast.success("Evento atualizado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao atualizar evento", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = (data: CreateCalendarEventBody) => {
		if (!eventId) {
			throw new Error("Evento não encontrado");
		}

		return editEventRequest.mutateAsync({
			id: eventId,
			data,
		});
	};

	return children({
		initialValues: getEvent.data,
		submit,
		isPending: editEventRequest.isPending,
		isFetchingEvent: getEvent.isPending,
	});
}
