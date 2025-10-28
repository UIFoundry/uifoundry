import { authViewPaths } from "@daveyplate/better-auth-ui/server";

import AuthView from "./view";

export default async function AuthPage({
	params,
}: {
	params: Promise<{ pathname: string }>;
}) {
	const { pathname } = await params;

	return <AuthView pathname={pathname} />;
}

export function generateStaticParams() {
	return Object.values(authViewPaths).map((pathname) => ({ pathname }));
}
