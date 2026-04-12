import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteLead } from "../../services";

interface DeleteLeadControllerChildrenProps {
	isPending: boolean;
	submit: () => Promise<void>;
}

interface DeleteLeadControllerProps
	extends ChildrenController<DeleteLeadControllerChildrenProps> {
	leadId: string | null;
}

export function DeleteLeadController({
	children,
	leadId,
}: DeleteLeadControllerProps) {
	const queryClient = useQueryClient();

	const deleteLeadRequest = useMutation({
		mutationFn: deleteLead,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["fetchLeads"] });
			toast.success("Lead removido com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao remover lead", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = async () => {
		if (!leadId) {
			throw new Error("Lead não encontrado");
		}

		await deleteLeadRequest.mutateAsync({ id: leadId });
	};

	return children({
		submit,
		isPending: deleteLeadRequest.isPending,
	});
}
