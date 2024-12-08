import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authController } from "../../../../server/controller/auth";

export const Route = createFileRoute("/_public/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const signIn = async (
		...params: Parameters<typeof authController.signIn>
	) => {
		await authController.signIn(...params);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await signIn({ email, password })
			.then(() => {
				navigate({ to: "/" });
			})
			.catch((err) => {
				setError(err instanceof Error ? err.message : "로그인 실패");
			});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && <div className="text-red-500">{error}</div>}
			<div>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="이메일"
					className="w-full p-2 border rounded"
				/>
			</div>
			<div>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="비밀번호"
					className="w-full p-2 border rounded"
				/>
			</div>
			<button
				type="submit"
				className="w-full p-2 bg-blue-500 text-white rounded"
			>
				로그인
			</button>
		</form>
	);
}
