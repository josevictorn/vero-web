import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { fetchWorkspaces } from "@/modules/workspace/services";
import { editClient, getClientById } from "../../services";
import type { ClientDTO, EditClientBody } from "../../services/types";

interface EditClientControllerChildrenProps
	extends BaseFormProps<Omit<EditClientBody, "workspaceId">, ClientDTO> {
	isFetchingClient: boolean;
}

interface EditClientControllerProps
	extends ChildrenController<EditClientControllerChildrenProps> {
	clientId: string | null;
}

export function EditClientController({
	children,
	clientId,
}: EditClientControllerProps) {
	const queryClient = useQueryClient();

	const workspaceSettingsQuery = useQuery({
		queryKey: ["workspace-settings"],
		queryFn: () => fetchWorkspaces({ page: 1 }),
		enabled: clientId !== null,
	});

	const getClient = useQuery({
		queryKey: ["client", clientId],
		queryFn: () => getClientById({ id: clientId ?? "" }),
		enabled: clientId !== null,
	});

	const editClientRequest = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: Omit<EditClientBody, "workspaceId">;
		}) => {
			const workspaceId = workspaceSettingsQuery.data?.results[0]?.id;

			if (!workspaceId) {
				throw new Error("Workspace não encontrado");
			}

			await editClient(id, {
				...data,
				workspaceId,
			});

			return getClientById({ id });
		},
		onSuccess: async (updatedClient) => {
			await queryClient.invalidateQueries({ queryKey: ["fetchClients"] });
			await queryClient.invalidateQueries({
				queryKey: ["client", updatedClient.id],
			});
			toast.success("Cliente atualizado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao atualizar cliente", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = (data: Omit<EditClientBody, "workspaceId">) => {
		if (!clientId) {
			throw new Error("Cliente não encontrado");
		}

		return editClientRequest.mutateAsync({
			id: clientId,
			data,
		});
	};

	return children({
		initialValues: getClient.data,
		isPending: editClientRequest.isPending || workspaceSettingsQuery.isPending,
		isFetchingClient: getClient.isPending,
		submit,
	});
}
