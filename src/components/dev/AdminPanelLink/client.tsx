import Link from "next/link";

import type { Session } from "~/auth/types";

import { USER_ROLES } from "~/auth/permissions";
import { Button } from "~/ui/button";

export default function AdminPanelLinkClient({
	session,
}: {
	session: Session;
}) {
	if (session.user.role === USER_ROLES.admin) {
		return (
			<Link href="/admin">
				<Button>Admin Panel</Button>
			</Link>
		);
	}
	return null;
}
