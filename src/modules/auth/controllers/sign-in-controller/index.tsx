import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../contexts/auth-context";
import type { AuthenticateBody } from "../../services/types";

export interface SignInControllerChildrenProps {
	login: (data: AuthenticateBody) => void;
}

type SignInControllerProps = ChildrenController<SignInControllerChildrenProps>;

export function SignInController({ children }: SignInControllerProps) {
	const { login } = useAuth();

	const navigate = useNavigate();

	async function handleLogin(data: AuthenticateBody) {
		await login.mutateAsync(data);

		navigate({ to: "/dashboard" });
	}

	return children({
		login: handleLogin,
	});
}
