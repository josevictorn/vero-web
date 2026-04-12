import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { fetchWorkspaces } from "@/modules/workspace/services";
import { createLead } from "../../services";
import type { CreateLeadBody, CreateLeadResponse } from "../../services/types";

type CreateLeadFormBody = Omit<CreateLeadBody, "workspaceId">;

type CreateLeadControllerProps = ChildrenController<
	BaseFormProps<CreateLeadFormBody, CreateLeadResponse>
>;

export function CreateLeadController({ children }: CreateLeadControllerProps) {
	const queryClient = useQueryClient();

	const workspaceSettingsQuery = useQuery({
		queryKey: ["workspace-settings"],
		queryFn: () => fetchWorkspaces({ page: 1 }),
	});

	const createLeadRequest = useMutation({
		mutationFn: (data: CreateLeadFormBody) => {
			const workspaceId = workspaceSettingsQuery.data?.results[0]?.id;

			if (!workspaceId) {
				toast.error("Erro ao criar lead", {
					description: "Workspace não encontrado",
				});
				throw new Error("Workspace não encontrado");
			}

			return createLead({
				...data,
				workspaceId,
			});
		},
		onSuccess: async () => {
			toast.success("Lead criado com sucesso");
			await queryClient.invalidateQueries({ queryKey: ["fetchLeads"] });
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao criar lead", {
				description: errorResponse?.message,
			});
		},
	});

	return children({
		submit: createLeadRequest.mutateAsync,
		isPending: createLeadRequest.isPending || workspaceSettingsQuery.isPending,
	});
}
