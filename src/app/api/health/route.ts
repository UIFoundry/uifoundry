import { NextResponse } from "next/server";

/**
 * Simple health check endpoint for performance testing
 * Returns minimal JSON without database queries or heavy processing
 */
export async function GET() {
	return NextResponse.json({
		status: "ok",
		timestamp: new Date().toISOString(),
	});
}

export const dynamic = "force-dynamic";
