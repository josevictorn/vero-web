import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { editLawyer, fetchLawyers } from "@/modules/lawyers/services";
import { fetchWorkspaces } from "@/modules/workspace/services";
import type { UserCreateFormData } from "../../components/user-create-form";
import { getUserById, updateUser } from "../../services";
import type { Account } from "../../services/types";

interface EditUserControllerChildrenProps
	extends BaseFormProps<UserCreateFormData, Account> {
	isFetchingUser: boolean;
}

interface EditUserControllerProps
	extends ChildrenController<EditUserControllerChildrenProps> {
	userId: number | null;
}

export function EditUserController({
	children,
	userId,
}: EditUserControllerProps) {
	const queryClient = useQueryClient();

	const getUser = useQuery({
		queryKey: ["user", userId],
		// biome-ignore lint/style/noNonNullAssertion: userId is checked in the enabled field, so it's safe to assert that it's defined here.
		queryFn: () => getUserById(userId!),
		enabled: userId !== null,
	});

	const lawyersQuery = useQuery({
		queryKey: ["lawyers"],
		queryFn: () => fetchLawyers({ page: 1 }),
		enabled: getUser.data?.role === "LAWYER",
	});

	const workspaceSettingsQuery = useQuery({
		queryKey: ["workspace-settings"],
		queryFn: () => fetchWorkspaces({ page: 1 }),
		enabled: getUser.data?.role === "LAWYER",
	});

	const userLawyer = lawyersQuery.data?.results.find(
		(lawyer) => lawyer.user_id === String(getUser.data?.id)
	);

	const updateUserRequest = useMutation({
		mutationFn: async (data: UserCreateFormData) => {
			const account = await updateUser({
				id: getUser.data?.id ?? 0,
				email: data.email,
				name: data.name,
				password: data.password || undefined,
				role: data.role,
			});

			if (data.role === "LAWYER" && data.lawyerFields && userLawyer) {
				await editLawyer(userLawyer.id, {
					cellphone: data.lawyerFields.cellphone,
					oab: data.lawyerFields.oab,
					oabState: data.lawyerFields.oabState,
					pix: data.lawyerFields.pix,
				});
			}

			return account;
		},
		onSuccess: async (updatedUser) => {
			await queryClient.invalidateQueries({ queryKey: ["fetchAccounts"] });
			await queryClient.invalidateQueries({
				queryKey: ["user", updatedUser.id],
			});
			await queryClient.invalidateQueries({ queryKey: ["lawyers"] });
			toast.success("Usuário atualizado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao atualizar usuário", {
				description: errorResponse?.message,
			});
		},
	});

	const isLawyer = getUser.data?.role === "LAWYER";
	const isFetchingLawyerData = isLawyer
		? lawyersQuery.isPending || workspaceSettingsQuery.isPending
		: false;

	const initialValues = getUser.data
		? {
				...getUser.data,
				lawyerFields: userLawyer
					? {
							cellphone: userLawyer.cellphone,
							oab: userLawyer.oab,
							oabState: userLawyer.oab_state,
							pix: userLawyer.pix,
						}
					: undefined,
			}
		: undefined;

	return children({
		initialValues,
		isPending: updateUserRequest.isPending,
		isFetchingUser: getUser.isPending || isFetchingLawyerData,
		submit: updateUserRequest.mutateAsync,
	});
}
