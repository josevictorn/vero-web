import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteClient } from "../../services";

interface DeleteClientControllerChildrenProps {
	isPending: boolean;
	submit: () => Promise<void>;
}

interface DeleteClientControllerProps
	extends ChildrenController<DeleteClientControllerChildrenProps> {
	clientId: string | null;
}

export function DeleteClientController({
	children,
	clientId,
}: DeleteClientControllerProps) {
	const queryClient = useQueryClient();

	const deleteClientRequest = useMutation({
		mutationFn: deleteClient,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["fetchClients"] });
			toast.success("Cliente removido com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao remover cliente", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = async () => {
		if (!clientId) {
			throw new Error("Cliente não encontrado");
		}

		await deleteClientRequest.mutateAsync({ id: clientId });
	};

	return children({
		submit,
		isPending: deleteClientRequest.isPending,
	});
}
