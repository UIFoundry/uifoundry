import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "UIFoundry Component Registry API",
    version: "1.0.0",
    endpoints: {
      index: "/api/registry/index.json",
      component: "/api/registry/[component].json",
      components: "/api/registry/components",
    },
  });
}
