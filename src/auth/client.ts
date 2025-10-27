import { stripeClient } from "@better-auth/stripe/client";
import {
	adminClient,
	apiKeyClient,
	customSessionClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "~/auth";

import { env } from "~/env.mjs";

export const authClient = createAuthClient({
	basePath: "/api/auth",
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [
		adminClient(),
		stripeClient({
			subscription: true,
		}),
		apiKeyClient(),
		customSessionClient<typeof auth>(),
	],
});

export const { signIn, signOut, useSession } = authClient;

// copied from code example, unsure if this is actually useful or not
// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-empty-function
authClient.$store.listen("$sessionSignal", async () => { });
