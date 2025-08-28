import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRegistryComponent } from "~/lib/registry-utils";

interface RouteParams {
  params: Promise<{ component: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { component } = await params;
    const componentData = await getRegistryComponent(component);

    if (!componentData) {
      return NextResponse.json(
        {
          error: "Component not found",
          component,
        },
        { status: 404 },
      );
    }

    // Set proper headers for shadcn CLI compatibility
    const response = NextResponse.json(componentData);
    response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    console.error("Error in component endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
