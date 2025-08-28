import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRegistryItemJson } from "~/lib/registry-utils";

interface RouteParams {
  params: Promise<{ name: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { name } = await params;
    const normalized = name.replace(/\.json$/i, "");

    const item = await getRegistryItemJson(normalized);
    if (!item) {
      return NextResponse.json(
        { error: "Registry item not found", name: normalized },
        { status: 404 },
      );
    }

    const response = NextResponse.json(item);
    response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {
    console.error("Error in registry item endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
