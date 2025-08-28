import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRegistryComponents } from "~/lib/registry-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const tagsParam = searchParams.get("tags");
    const tags = tagsParam ? tagsParam.split(",") : undefined;

    const components = await getRegistryComponents({
      type,
      category,
      tags,
    });

    return NextResponse.json({
      components,
      total: components.length,
      filters: {
        type,
        category,
        tags,
      },
    });
  } catch (error) {
    console.error("Error in components endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
