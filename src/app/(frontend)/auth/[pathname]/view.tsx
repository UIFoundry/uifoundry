"use client";

import { AuthView } from "@daveyplate/better-auth-ui";

export default function AuthCard({ pathname }: { pathname: string }) {
	return (
		<main className="container flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
			<AuthView path={pathname} />
		</main>
	);
}
