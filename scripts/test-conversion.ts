#!/usr/bin/env tsx

import { BlockToRegistryConverter } from "./convert-blocks-to-registry";

async function testConversion() {
  console.log("🧪 Testing block to registry conversion...");

  const converter = new BlockToRegistryConverter();

  // Test conversion of just Hero blocks first
  const results = await converter.convertSpecificBlocks(["Hero"]);

  console.log(`\n📊 Test Results:`);
  console.log(`✅ Successful: ${results.filter((r) => r.success).length}`);
  console.log(`❌ Failed: ${results.filter((r) => !r.success).length}`);

  const failed = results.filter((r) => !r.success);
  if (failed.length > 0) {
    console.log("\n❌ Failures:");
    failed.forEach((f) => console.log(`   ${f.error}`));
  }

  return results;
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  testConversion().catch(console.error);
}
