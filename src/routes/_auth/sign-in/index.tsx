import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "@/modules/auth/components/sign-in-form";
import { SignInController } from "@/modules/auth/controllers/sign-in-controller";

export const Route = createFileRoute("/_auth/sign-in/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SignInController>{(props) => <SignInForm {...props} />}</SignInController>
	);
}
