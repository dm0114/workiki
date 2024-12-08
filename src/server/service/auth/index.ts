import { signIn, signOut, signUp } from "../../client/supabase/auth";

export const authService = {
	signIn: (...params: Parameters<typeof signIn>) => signIn(...params),
	signOut: (...params: Parameters<typeof signOut>) => signOut(...params),
	signUp: (...params: Parameters<typeof signUp>) => signUp(...params),
};
