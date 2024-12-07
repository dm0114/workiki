import {
	RouterProvider as TanStackRouterProvider,
	createRouter,
} from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const router = createRouter({ routeTree });

export function RouterProvider() {
	return <TanStackRouterProvider router={router} />;
}
