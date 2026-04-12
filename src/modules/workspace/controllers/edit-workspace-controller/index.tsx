import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { editWorkspace, fetchWorkspaces } from "../../services";
import type { EditWorkspaceBody, WorkspaceDTO } from "../../services/types";

interface EditWorkspaceControllerChildrenProps
	extends BaseFormProps<EditWorkspaceBody, WorkspaceDTO> {
	isFetchingWorkspace: boolean;
}

interface EditWorkspaceControllerProps
	extends ChildrenController<EditWorkspaceControllerChildrenProps> {
	enabled: boolean;
}

export function EditWorkspaceController({
	children,
	enabled,
}: EditWorkspaceControllerProps) {
	const workspaceSettingsQuery = useQuery({
		queryKey: ["workspace-settings"],
		queryFn: () => fetchWorkspaces({ page: 1 }),
		enabled,
	});

	const workspace = workspaceSettingsQuery.data?.results[0];

	const editWorkspaceRequest = useMutation({
		mutationFn: ({ id, data }: { id: string; data: EditWorkspaceBody }) =>
			editWorkspace(id, data),
		onSuccess: async () => {
			await workspaceSettingsQuery.refetch();
			toast.success("Informações do escritório atualizadas com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao atualizar informações do escritório", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = async (data: EditWorkspaceBody) => {
		if (!workspace) {
			toast.error("Workspace não encontrado.");
			throw new Error("Workspace não encontrado.");
		}

		const response = await editWorkspaceRequest.mutateAsync({
			id: workspace.id,
			data,
		});

		return response.workspace;
	};

	return children({
		submit,
		isPending: editWorkspaceRequest.isPending,
		initialValues: workspace,
		isFetchingWorkspace: workspaceSettingsQuery.isPending,
	});
}
