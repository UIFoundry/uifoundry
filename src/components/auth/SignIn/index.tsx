import { Button } from "~/ui/button";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "~/auth";

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
