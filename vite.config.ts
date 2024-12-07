import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { type Plugin, defineConfig } from "vite";

export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite({
			routesDirectory: "./src/view/routes",
		}) as Plugin,
	],
});
