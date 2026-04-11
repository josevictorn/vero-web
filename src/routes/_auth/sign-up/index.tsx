import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@/modules/auth/components/sign-up-form";
import { SignUpController } from "@/modules/auth/controllers/sign-up-controller";

export const Route = createFileRoute("/_auth/sign-up/")({
	component: SignUp,
});

function SignUp() {
	return (
		<SignUpController>{(props) => <SignUpForm {...props} />}</SignUpController>
	);
}
