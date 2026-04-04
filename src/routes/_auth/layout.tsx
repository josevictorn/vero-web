import { ScalesIcon } from "@phosphor-icons/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
	beforeLoad: ({ context }) => {
		const isAuthenticated = context?.isAuthenticated;

		if (isAuthenticated) {
			throw redirect({
				to: "/dashboard",
			});
		}
	},
});

function AuthLayout() {
	return (
		<div className="grid min-h-screen grid-cols-1 antialiased md:grid-cols-2">
			<div className="hidden h-full flex-col justify-between border-foreground/5 border-r bg-muted p-10 text-muted-foreground md:flex">
				<div className="flex items-center gap-3 text-foreground text-lg">
					<ScalesIcon className="size-5" />
					<span className="font-semibold">vero.app</span>
				</div>
				<footer className="text-sm">
					&copy; vero.app - {new Date().getFullYear()}
				</footer>
			</div>

			<div className="relative flex flex-col items-center justify-center">
				<Outlet />
			</div>
		</div>
	);
}
