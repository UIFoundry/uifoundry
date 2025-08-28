import { NextResponse } from "next/server";
import { registryFileManager } from "~/lib/registry-file-manager";

export async function GET() {
  try {
    const stats = await registryFileManager.getRegistryStats();
    return NextResponse.json({ status: "ok", ...stats });
  } catch (error) {
    return NextResponse.json(
      { status: "error", error: String(error) },
      { status: 500 },
    );
  }
}
