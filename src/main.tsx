import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";

import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@/common/components/theme-provider.tsx";

// Create a new router instance
const router = createRouter({
	routeTree,
	// biome-ignore lint/style/noNonNullAssertion: We will provide the context in the RouterProvider, so it's safe to assert that these are defined here.
	context: { authentication: undefined!, user: undefined! },
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
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<InnerApp />
	</StrictMode>
);
