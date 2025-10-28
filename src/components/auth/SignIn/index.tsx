import { LogIn, LogOut } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "~/auth";
import { Button } from "~/ui/button";

export default async function SignInButton() {
	const session = await auth.api.getSession({ headers: await headers() });
	return (
		<Link href={session?.session ? "/auth/sign-out" : "/auth/sign-in"}>
			<Button
				className="cursor-pointer justify-between gap-2"
				variant="default"
			>
				{!session?.session ? <LogOut size={20} /> : <LogIn size={20} />}
				<span>{session?.session ? "Sign Out" : "Sign In"}</span>
			</Button>
		</Link>
	);
}
