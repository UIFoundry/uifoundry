import { LogOut } from "lucide-react";
import Link from "next/link";
import { env } from "~/env.mjs";

export default function VisitSite() {
	return <Link href={env.NEXT_PUBLIC_BETTER_AUTH_URL}>
		<LogOut />
	</Link>
}
