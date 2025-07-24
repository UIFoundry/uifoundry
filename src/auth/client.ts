import { createAuthClient } from 'better-auth/react'
import { env } from '~/env.mjs';
import {
	adminClient,
	apiKeyClient,
	customSessionClient
} from "better-auth/client/plugins";
import type { auth } from "~/auth"

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	basePath: "/api/auth",
	plugins: [
		adminClient(),
		apiKeyClient(),
		customSessionClient<typeof auth>(),
	]
})

export const { signIn, signOut, useSession } = authClient

// copied from code example, unsure if this is actually useful or not
// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-empty-function
authClient.$store.listen('$sessionSignal', async () => { })
