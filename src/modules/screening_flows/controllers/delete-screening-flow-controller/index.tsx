import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteScreeningFlow } from "../../services";

interface DeleteScreeningFlowControllerChildrenProps {
	isPending: boolean;
	submit: () => Promise<void>;
}

interface DeleteScreeningFlowControllerProps
	extends ChildrenController<DeleteScreeningFlowControllerChildrenProps> {
	screeningFlowId: string | null;
}

export function DeleteScreeningFlowController({
	children,
	screeningFlowId,
}: DeleteScreeningFlowControllerProps) {
	const queryClient = useQueryClient();

	const deleteScreeningFlowRequest = useMutation({
		mutationFn: deleteScreeningFlow,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["fetchScreeningFlows"],
			});
			toast.success("Screening flow removido com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao remover screening flow", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = async () => {
		if (!screeningFlowId) {
			throw new Error("Screening flow não encontrado");
		}

		await deleteScreeningFlowRequest.mutateAsync({ id: screeningFlowId });
	};

	return children({
		submit,
		isPending: deleteScreeningFlowRequest.isPending,
	});
}
