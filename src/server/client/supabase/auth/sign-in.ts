import { supabaseClient } from "..";

export const signIn = async (
	...params: Parameters<typeof supabaseClient.auth.signInWithPassword>
) => {
	const res = await supabaseClient.auth.signInWithPassword(...params);
	if (res.error) throw res.error;
	return res.data;
};
