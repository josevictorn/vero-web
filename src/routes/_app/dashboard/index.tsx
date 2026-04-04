import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/common/components/ui/button";
import { useAuth } from "@/modules/auth/contexts/auth-context";

export const Route = createFileRoute("/_app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { logout } = useAuth();
	const navigate = Route.useNavigate();

	return (
		<div>
			<Button
				onClick={async () => {
					await logout();
					navigate({ to: "/sign-in" });
				}}
			>
				Sair
			</Button>
		</div>
	);
}
