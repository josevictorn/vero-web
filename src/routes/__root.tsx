import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type RouteContext = {
	isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouteContext>()({
	component: RootLayout,
});

function RootLayout() {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
