import { NextResponse } from "next/server";
import { getRegistryIndex } from "~/lib/registry-utils";

export async function GET() {
  try {
    const registryIndex = await getRegistryIndex();

    // Set proper headers for shadcn CLI compatibility
    const response = NextResponse.json(registryIndex);
    response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    console.error("Error in registry index endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
