"use client"

import { authClient } from "~/auth/client";
import { Button } from "~/ui/button";

export default function SignOut() {
	return (
		<Button onClick={async () => await authClient.signOut()}>Sign Out</Button>
	)
}
