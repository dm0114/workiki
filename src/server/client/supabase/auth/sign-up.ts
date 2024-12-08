import { supabaseClient } from "..";

export const signUp = async (
	...params: Parameters<typeof supabaseClient.auth.signUp>
) => {
	const res = await supabaseClient.auth.signUp(...params);
	if (res.error) throw res.error;
	return res.data;
};
