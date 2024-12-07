import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { View } from "./view";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<View />
	</StrictMode>,
);
