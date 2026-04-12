import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { getUserById, updateUser } from "../../services";
import type { Account, UpdateUserBody } from "../../services/types";

interface EditUserControllerChildrenProps
	extends BaseFormProps<UpdateUserBody, Account> {
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

	const updateUserRequest = useMutation({
		mutationFn: updateUser,
		onSuccess: async (updatedUser) => {
			await queryClient.invalidateQueries({ queryKey: ["fetchAccounts"] });
			await queryClient.invalidateQueries({
				queryKey: ["user", updatedUser.id],
			});
			toast.success("Usuário atualizado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao atualizar usuário", {
				description: errorResponse?.message,
			});
		},
	});

	return children({
		initialValues: getUser.data,
		isPending: updateUserRequest.isPending,
		isFetchingUser: getUser.isPending,
		submit: updateUserRequest.mutateAsync,
	});
}
