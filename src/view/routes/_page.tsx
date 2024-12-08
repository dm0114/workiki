import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_page")({
	component: () => <Outlet />,
});
