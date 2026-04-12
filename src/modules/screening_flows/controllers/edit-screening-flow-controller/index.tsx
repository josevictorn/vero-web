import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { editScreeningFlow, getScreeningFlowById } from "../../services";
import type {
	EditScreeningFlowBody,
	ScreeningFlowDTO,
} from "../../services/types";

interface EditScreeningFlowControllerChildrenProps
	extends BaseFormProps<EditScreeningFlowBody, ScreeningFlowDTO> {
	isFetchingScreeningFlow: boolean;
}

interface EditScreeningFlowControllerProps
	extends ChildrenController<EditScreeningFlowControllerChildrenProps> {
	screeningFlowId: string | null;
}

export function EditScreeningFlowController({
	children,
	screeningFlowId,
}: EditScreeningFlowControllerProps) {
	const queryClient = useQueryClient();

	const getScreeningFlow = useQuery({
		queryKey: ["screening-flow", screeningFlowId],
		queryFn: () => getScreeningFlowById({ id: screeningFlowId ?? "" }),
		enabled: screeningFlowId !== null,
	});

	const editScreeningFlowRequest = useMutation({
		mutationFn: ({ id, data }: { id: string; data: EditScreeningFlowBody }) =>
			editScreeningFlow(id, data),
		onSuccess: async (updatedScreeningFlow) => {
			await queryClient.invalidateQueries({
				queryKey: ["fetchScreeningFlows"],
			});
			await queryClient.invalidateQueries({
				queryKey: ["screening-flow", updatedScreeningFlow.screeningFlow.id],
			});
			toast.success("Screening flow atualizado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao atualizar screening flow", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = (data: EditScreeningFlowBody) => {
		if (!screeningFlowId) {
			throw new Error("Screening flow não encontrado");
		}

		return editScreeningFlowRequest
			.mutateAsync({ id: screeningFlowId, data })
			.then((response) => response.screeningFlow);
	};

	return children({
		initialValues: getScreeningFlow.data,
		isPending: editScreeningFlowRequest.isPending,
		isFetchingScreeningFlow: getScreeningFlow.isPending,
		submit,
	});
}
