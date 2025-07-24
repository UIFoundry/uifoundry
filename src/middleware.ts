import { NextResponse, type NextRequest } from "next/server";
import { auth } from "~/auth"
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers()
	})

	if (!session) {
		return NextResponse.redirect(new URL("/", request.url))
	}

	return NextResponse.next()
}

export const config = {
	runtime: "nodejs",
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/sign-in|auth/sign-up|$).*)"],
};
