#!/usr/bin/env tsx

import { promises as fs } from "fs";
import path from "path";
import { registryFileManager } from "../src/lib/registry-file-manager";
import { getRegistryItemJson } from "../src/lib/registry-utils";

async function build() {
  const outDir = path.join(process.cwd(), "public", "r");
  await fs.mkdir(outDir, { recursive: true });

  const components = await registryFileManager.getAvailableComponents();
  let ok = 0;
  for (const name of components) {
    const item = await getRegistryItemJson(name);
    if (!item) continue;
    const file = path.join(outDir, `${name}.json`);
    await fs.writeFile(file, JSON.stringify(item, null, 2), "utf-8");
    ok++;
  }
  console.log(`Built ${ok} registry items to ${outDir}`);
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  build().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
