import { QueryProvider } from "./query-provider";
import { RouterProvider } from "./router-provider";

export const View = () => {
	return (
		<>
			<QueryProvider>
				<RouterProvider />
			</QueryProvider>
		</>
	);
};
