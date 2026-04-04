import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

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
			{/* <TanStackRouterDevtools /> */}
		</>
	);
}
