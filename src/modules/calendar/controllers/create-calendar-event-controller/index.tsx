import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { createCalendarEvent } from "../../services";
import type {
	CreateCalendarEventBody,
	CreateCalendarEventResponse,
} from "../../services/types";

type CreateCalendarEventControllerProps = ChildrenController<
	BaseFormProps<CreateCalendarEventBody, CreateCalendarEventResponse>
>;

export function CreateCalendarEventController({
	children,
}: CreateCalendarEventControllerProps) {
	const queryClient = useQueryClient();

	const createEventRequest = useMutation({
		mutationFn: createCalendarEvent,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
			toast.success("Evento criado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao criar evento", {
				description: errorResponse?.message,
			});
		},
	});

	return children({
		submit: createEventRequest.mutateAsync,
		isPending: createEventRequest.isPending,
	});
}
