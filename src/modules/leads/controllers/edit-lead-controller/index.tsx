import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { fetchWorkspaces } from "@/modules/workspace/services";
import { editLead, getLeadById } from "../../services";
import type { EditLeadBody, LeadDTO } from "../../services/types";

interface EditLeadControllerChildrenProps
	extends BaseFormProps<Omit<EditLeadBody, "workspaceId">, LeadDTO> {
	isFetchingLead: boolean;
}

interface EditLeadControllerProps
	extends ChildrenController<EditLeadControllerChildrenProps> {
	leadId: string | null;
}

export function EditLeadController({
	children,
	leadId,
}: EditLeadControllerProps) {
	const queryClient = useQueryClient();

	const workspaceSettingsQuery = useQuery({
		queryKey: ["workspace-settings"],
		queryFn: () => fetchWorkspaces({ page: 1 }),
		enabled: leadId !== null,
	});

	const getLead = useQuery({
		queryKey: ["lead", leadId],
		queryFn: () => getLeadById({ id: leadId ?? "" }),
		enabled: leadId !== null,
	});

	const editLeadRequest = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: Omit<EditLeadBody, "workspaceId">;
		}) => {
			const workspaceId = workspaceSettingsQuery.data?.results[0]?.id;

			if (!workspaceId) {
				throw new Error("Workspace não encontrado");
			}

			const response = await editLead(id, {
				...data,
				workspaceId,
			});

			return response.lead;
		},
		onSuccess: async (updatedLead) => {
			await queryClient.invalidateQueries({ queryKey: ["fetchLeads"] });
			await queryClient.invalidateQueries({
				queryKey: ["lead", updatedLead.id],
			});
			toast.success("Lead atualizado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao atualizar lead", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = (data: Omit<EditLeadBody, "workspaceId">) => {
		if (!leadId) {
			throw new Error("Lead não encontrado");
		}

		return editLeadRequest.mutateAsync({
			id: leadId,
			data,
		});
	};

	return children({
		initialValues: getLead.data,
		isPending: editLeadRequest.isPending || workspaceSettingsQuery.isPending,
		isFetchingLead: getLead.isPending,
		submit,
	});
}
