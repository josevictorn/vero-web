import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { createAccount } from "@/modules/users/services";
import type {
	Account,
	CreateAccountBody,
} from "@/modules/users/services/types";

export type SignUpControllerChildrenProps = BaseFormProps<
	CreateAccountBody,
	Account
>;

type SignUpControllerProps = ChildrenController<SignUpControllerChildrenProps>;

export function SignUpController({ children }: SignUpControllerProps) {
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const createUserRequest = useMutation({
		mutationFn: createAccount,
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["fetchAccounts"] });
			navigate({ to: "/dashboard" });
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
		isPending: createUserRequest.isPending,
	});
}
