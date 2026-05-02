import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { createLawyer } from "@/modules/lawyers/services";
import { fetchWorkspaces } from "@/modules/workspace/services";
import type { UserCreateFormData } from "../../components/user-create-form";
import { createAccount } from "../../services";

type CreateUserControllerProps = ChildrenController<
	BaseFormProps<UserCreateFormData, { userId: string }>
>;

export function CreateUserController({ children }: CreateUserControllerProps) {
	const queryClient = useQueryClient();

	const workspaceSettingsQuery = useQuery({
		queryKey: ["workspace-settings"],
		queryFn: () => fetchWorkspaces({ page: 1 }),
	});

	const createUserRequest = useMutation({
		mutationFn: async (data: UserCreateFormData) => {
			const account = await createAccount({
				name: data.name,
				email: data.email,
				password: data.password,
				role: data.role,
			});

			if (data.role === "LAWYER" && data.lawyerFields) {
				const workspaceId = workspaceSettingsQuery.data?.results[0]?.id;

				if (!workspaceId) {
					throw new Error("Workspace não encontrado");
				}

				await createLawyer({
					userId: String(account.userId),
					workspaceId,
					cellphone: data.lawyerFields.cellphone,
					oab: data.lawyerFields.oab,
					oabState: data.lawyerFields.oabState,
					pix: data.lawyerFields.pix,
				});
			}

			return account;
		},
		onSuccess: () => {
			toast.success("Usuário criado com sucesso");
			queryClient.invalidateQueries({ queryKey: ["fetchAccounts"] });
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao criar usuário", {
				description: errorResponse?.message,
			});
		},
	});

	return children({
		submit: createUserRequest.mutateAsync,
		isPending: createUserRequest.isPending || workspaceSettingsQuery.isPending,
	});
}
