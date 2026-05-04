import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { fetchWorkspaces } from "@/modules/workspace/services";
import { createClient } from "../../services";
import type {
	CreateClientBody,
	CreateClientResponse,
} from "../../services/types";

type CreateClientFormBody = Omit<CreateClientBody, "workspaceId">;

type CreateClientControllerProps = ChildrenController<
	BaseFormProps<CreateClientFormBody, CreateClientResponse>
>;

export function CreateClientController({
	children,
}: CreateClientControllerProps) {
	const queryClient = useQueryClient();

	const workspaceSettingsQuery = useQuery({
		queryKey: ["workspace-settings"],
		queryFn: () => fetchWorkspaces({ page: 1 }),
	});

	const createClientRequest = useMutation({
		mutationFn: (data: CreateClientFormBody) => {
			const workspaceId = workspaceSettingsQuery.data?.results[0]?.id;

			if (!workspaceId) {
				toast.error("Erro ao criar cliente", {
					description: "Workspace não encontrado",
				});
				throw new Error("Workspace não encontrado");
			}

			return createClient({
				...data,
				workspaceId,
			});
		},
		onSuccess: async () => {
			toast.success("Cliente criado com sucesso");
			await queryClient.invalidateQueries({ queryKey: ["fetchClients"] });
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao criar cliente", {
				description: errorResponse?.message,
			});
		},
	});

	return children({
		submit: createClientRequest.mutateAsync,
		isPending:
			createClientRequest.isPending || workspaceSettingsQuery.isPending,
	});
}
