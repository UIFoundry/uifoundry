"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { type PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "~/auth/client";
import Link from "next/link"

export default function ClientProviders({ children }: PropsWithChildren) {
	const router = useRouter();

	return (
		<AuthUIProvider
			authClient={authClient}
			navigate={router.push}
			replace={router.replace}
			onSessionChange={() => {
				router.refresh()
			}}
			Link={Link}
		>
			{children}
		</AuthUIProvider>
	)
}
