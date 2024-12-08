import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/_page/work-log/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_private/_page/work-log/"!</div>;
}
