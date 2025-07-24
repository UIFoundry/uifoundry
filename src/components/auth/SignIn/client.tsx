"use client"

import { Button } from '~/ui/button'
import { authClient } from '~/auth/client'
import type { Session } from '~/auth/types'
import { LogIn, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function SignInClient({ session }: { session: Session | null }) {
	const router = useRouter()

	async function handleAuth() {
		if (session?.session && session.session.expiresAt.getTime() >= Date.now()) {
			await authClient.signOut()
			return router.refresh()
		}
		return authClient.signIn.social({ provider: "google" })
	}

	return (
		<Button className="justify-between cursor-pointer gap-2" variant="default" onClick={handleAuth}>
			{!session?.session ? (
				<LogOut size={20} />
			) : (
				<LogIn size={20} />
			)}
			<span>{session?.session ? 'Sign Out' : 'Sign In'}</span>
		</Button>
	)
}


