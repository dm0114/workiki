import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
	// beforeLoad: authGuard,
});

// async function authGuard() {
// 	if (authStore.loading) {
// 		await new Promise((resolve) => {
// 			if (!authStore.loading) resolve(null);
// 			const listener = () => {
// 				if (!authStore.loading) {
// 					listeners.delete(listener);
// 					resolve(null);
// 				}
// 			};
// 			listeners.add(listener);
// 		});
// 	}

// 	if (!authStore.user) {
// 		throw redirect({
// 			to: "/login",
// 		});
// 	}

// 	return authStore.user;
// }
