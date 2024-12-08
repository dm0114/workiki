import { authService } from "../../service/auth";

export const authController = {
	signIn: authService.signIn,
	signOut: authService.signOut,
	signUp: authService.signUp,
};
