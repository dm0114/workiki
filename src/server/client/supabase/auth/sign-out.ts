import { supabaseClient } from "..";

export const signOut = async (
	...params: Parameters<typeof supabaseClient.auth.signOut>
) => {
	const res = await supabaseClient.auth.signOut(...params);
	if (res.error) throw res.error;
	return null;
};
