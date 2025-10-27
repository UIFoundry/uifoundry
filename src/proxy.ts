import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { auth } from "~/auth";

export async function proxy(request: NextRequest) {
	// Skip auth check for docs routes (belt and suspenders approach)
	if (request.nextUrl.pathname.startsWith("/docs")) {
		return NextResponse.next();
	} else if (request.nextUrl.pathname === "/") {
		return NextResponse.next();
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		// Redirect unauthenticated users to sign-in to avoid redirect loops on "/"
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|registry|r|docs|auth/sign-in|auth/sign-up$).*)",
	],
	runtime: "nodejs",
};
