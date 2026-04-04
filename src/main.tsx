import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@/common/components/theme-provider.tsx";
import { Toaster } from "./common/components/ui/sonner";
import { TooltipProvider } from "./common/components/ui/tooltip";
import { UserProvider, useUser } from "./common/contexts/User";
import { AuthProvider, useAuth } from "./modules/auth/contexts/auth-context";

// Create a new router instance
const router = createRouter({
	routeTree,
	// biome-ignore lint/style/noNonNullAssertion: We will provide the context in the RouterProvider, so it's safe to assert that these are defined here.
	context: { isAuthenticated: undefined! },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const { authorized } = useUser();
	const { isAuthenticated } = useAuth();

	return (
		<ThemeProvider>
			<Toaster />
			<TooltipProvider>
				<RouterProvider
					context={{ isAuthenticated: authorized || isAuthenticated }}
					router={router}
				/>
			</TooltipProvider>
		</ThemeProvider>
	);
}

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<AuthProvider>
					<InnerApp />
				</AuthProvider>
			</UserProvider>
		</QueryClientProvider>
	</StrictMode>
);
