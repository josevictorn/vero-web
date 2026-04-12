import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { createScreeningFlow } from "../../services";
import type {
	CreateScreeningFlowBody,
	CreateScreeningFlowResponse,
} from "../../services/types";

type CreateScreeningFlowControllerProps = ChildrenController<
	BaseFormProps<CreateScreeningFlowBody, CreateScreeningFlowResponse>
>;

export function CreateScreeningFlowController({
	children,
}: CreateScreeningFlowControllerProps) {
	const queryClient = useQueryClient();

	const createScreeningFlowRequest = useMutation({
		mutationFn: createScreeningFlow,
		onSuccess: async () => {
			toast.success("Screening flow criado com sucesso");
			await queryClient.invalidateQueries({
				queryKey: ["fetchScreeningFlows"],
			});
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao criar screening flow", {
				description: errorResponse?.message,
			});
		},
	});

	return children({
		submit: createScreeningFlowRequest.mutateAsync,
		isPending: createScreeningFlowRequest.isPending,
	});
}
