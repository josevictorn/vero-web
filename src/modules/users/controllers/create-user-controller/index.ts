import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { createAccount } from "../../services";
import type { CreateAccountBody } from "../../services/types";

type CreateUserControllerProps = ChildrenController<
	BaseFormProps<CreateAccountBody>
>;

export function CreateUserController({ children }: CreateUserControllerProps) {
	const queryClient = useQueryClient();

	const createUserRequest = useMutation({
		mutationFn: createAccount,
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["fetchAccounts"] });
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Error creating account", {
				description: errorResponse?.message,
			});
		},
	});

	return children({
		submit: createUserRequest.mutateAsync,
		isLoading: createUserRequest.isPending,
	});
}
