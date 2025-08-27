import { NextResponse } from "next/server";

/**
 * Version endpoint for deployment verification
 * Returns commit SHA and build time to verify deployment completion
 */
export async function GET() {
  return NextResponse.json({
    commitSha: process.env.COMMIT_SHA ?? "unknown",
    buildTime: process.env.BUILD_TIME ?? new Date().toISOString(),
    stage: process.env.SST_STAGE ?? "local",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}
