#!/usr/bin/env tsx

/**
 * Convert UIFoundry Payload Blocks to Shadcn Registry Format (Fixed Version)
 * This script analyzes existing payload blocks and converts them to
 * the shadcn registry format for distribution.
 */

import { promises as fs } from "fs";
import path from "path";
import { type ValidatedComponentMetadata } from "../src/lib/registry-schema";

interface BlockInfo {
  blockType: string;
  variant: string;
  configPath: string;
  componentPath: string;
  dependencies: Set<string>;
  imports: string[];
}

interface ConversionResult {
  success: boolean;
  component?: ValidatedComponentMetadata;
  error?: string;
}

class BlockToRegistryConverter {
  private blocksDir = path.join(process.cwd(), "src/payload/blocks");
  private registryDir = path.join(process.cwd(), "registry");
  private componentsDir = path.join(this.registryDir, "components");

  async convertSpecificBlocks(
    blockTypes: string[],
  ): Promise<ConversionResult[]> {
    console.log(`🔍 Scanning for specific blocks: ${blockTypes.join(", ")}...`);
    const allBlocks = await this.scanBlocks();
    const filteredBlocks = allBlocks.filter((block) =>
      blockTypes.includes(block.blockType),
    );

    console.log(`📦 Found ${filteredBlocks.length} matching blocks to convert`);

    await this.ensureDirectoryStructure();

    const results: ConversionResult[] = [];
    for (const block of filteredBlocks) {
      const result = await this.convertBlock(block);
      results.push(result);
    }

    return results;
  }

  private async ensureDirectoryStructure() {
    await fs.mkdir(this.registryDir, { recursive: true });
    await fs.mkdir(this.componentsDir, { recursive: true });
  }

  private async scanBlocks(): Promise<BlockInfo[]> {
    const blocks: BlockInfo[] = [];
    const blockTypes = await fs.readdir(this.blocksDir, {
      withFileTypes: true,
    });

    for (const blockType of blockTypes) {
      if (!blockType.isDirectory()) continue;

      const blockTypePath = path.join(this.blocksDir, blockType.name);
      const variants = await fs.readdir(blockTypePath, { withFileTypes: true });

      for (const variant of variants) {
        if (!variant.isDirectory()) continue;

        const variantPath = path.join(blockTypePath, variant.name);
        const configPath = path.join(variantPath, "config.ts");
        const componentPath = path.join(variantPath, "index.tsx");

        try {
          await fs.access(configPath);
          await fs.access(componentPath);

          const dependencies = await this.analyzeDependencies(componentPath);
          const imports = await this.extractImports(componentPath);

          blocks.push({
            blockType: blockType.name,
            variant: variant.name,
            configPath,
            componentPath,
            dependencies,
            imports,
          });
        } catch (error) {
          console.warn(
            `⚠️  Skipping ${blockType.name}/${variant.name} - missing files`,
          );
        }
      }
    }

    return blocks;
  }

  private async analyzeDependencies(
    componentPath: string,
  ): Promise<Set<string>> {
    const content = await fs.readFile(componentPath, "utf-8");
    const dependencies = new Set<string>();

    const importRegex = /import\s+.*?\s+from\s+["']([^"']+)["']/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];

      if (importPath && importPath.startsWith("~/ui/")) {
        const component = importPath.replace("~/ui/", "");
        dependencies.add(component);
      } else if (importPath && importPath.startsWith("~/styles/utils")) {
        dependencies.add("utils");
      } else if (importPath === "next/link") {
        dependencies.add("next/link");
      } else if (importPath === "next/image") {
        dependencies.add("next/image");
      } else if (importPath && importPath.startsWith("lucide-react")) {
        dependencies.add("lucide-react");
      } else if (importPath === "react") {
        dependencies.add("react");
      }
    }

    return dependencies;
  }

  private async extractImports(componentPath: string): Promise<string[]> {
    const content = await fs.readFile(componentPath, "utf-8");
    const imports: string[] = [];

    const lines = content.split("\n");
    for (const line of lines) {
      if (line.trim().startsWith("import")) {
        imports.push(line.trim());
      } else if (line.trim() && !line.trim().startsWith("//")) {
        break;
      }
    }

    return imports;
  }

  private async convertBlock(block: BlockInfo): Promise<ConversionResult> {
    try {
      console.log(`🔄 Converting ${block.blockType}_${block.variant}...`);

      const componentContent = await fs.readFile(block.componentPath, "utf-8");
      const registryName = this.createRegistryName(
        block.blockType,
        block.variant,
      );
      const convertedComponent = await this.convertImports(componentContent);
      const cleanedComponent = this.removePayloadSpecifics(convertedComponent);

      const registryComponent: ValidatedComponentMetadata = {
        name: registryName,
        type: "registry:component",
        description: `${block.blockType} block variant ${block.variant.split("_")[1]} from UIFoundry`,
        files: [
          {
            name: `${registryName}.tsx`,
            content: cleanedComponent,
          },
        ],
        dependencies: this.getExternalDependencies(block.dependencies),
        registryDependencies: this.getRegistryDependencies(block.dependencies),
        category: this.getCategoryFromBlockType(block.blockType),
        tags: [block.blockType.toLowerCase(), "uifoundry", "block"],
      };

      const componentDir = path.join(this.componentsDir, registryName);
      await fs.mkdir(componentDir, { recursive: true });
      await fs.writeFile(
        path.join(componentDir, `${registryName}.tsx`),
        cleanedComponent,
      );

      await fs.writeFile(
        path.join(componentDir, "meta.json"),
        JSON.stringify(registryComponent, null, 2),
      );

      console.log(`✅ Successfully converted ${registryName}`);
      return { success: true, component: registryComponent };
    } catch (error) {
      console.error(
        `❌ Error converting ${block.blockType}_${block.variant}:`,
        error,
      );
      return {
        success: false,
        error: `${block.blockType}_${block.variant}: ${(error as Error).message}`,
      };
    }
  }

  private createRegistryName(blockType: string, variant: string): string {
    const variantNumber = variant.split("_")[1] || "1";
    return `${blockType.toLowerCase()}-${variantNumber}`;
  }

  private async convertImports(content: string): Promise<string> {
    return content
      .replace(
        /import.*?from\s+["']~\/ui\/([^"']+)["']/g,
        (match, component) => {
          return `import { ${this.extractImportedNames(match)} } from "~/ui/${component}"`;
        },
      )
      .replace(
        /import.*?from\s+["']~\/styles\/utils["']/g,
        'import { cn } from "~/styles/utils"',
      )
      .replace(
        /import.*?from\s+["']~\/payload-types["']/g,
        "// Payload types removed for registry",
      )
      .replace(
        /import.*?from\s+["']~\/payload\/fields\/[^"']+["']/g,
        "// Payload fields removed for registry",
      )
      .replace(
        /import.*?from\s+["']~\/components\/[^"']+["']/g,
        "// Internal components removed for registry",
      )
      .replace(
        /import.*?from\s+["']\.\/[^"']+["']/g,
        "// Local imports removed for registry",
      );
  }

  private extractImportedNames(importStatement: string): string {
    const match = importStatement.match(/import\s+\{([^}]+)\}/);
    return match?.[1]?.trim() || "";
  }

  private removePayloadSpecifics(content: string): string {
    const componentPropsInterface = `

interface ComponentProps {
  header?: string;
  subheader?: string;
  alertLabel?: string;
  alertLink?: string;
  media?: {
    light?: { url: string; alt: string };
    dark?: { url: string; alt: string };
  };
  actions?: Array<{ label?: string; href?: string }>;
  features?: Array<{ title?: string; description?: string; icon?: string }>;
  faqs?: Array<{ question?: string; answer?: string }>;
  members?: Array<{ name?: string; role?: string; bio?: string }>;
  stats?: Array<{ label?: string; value?: string }>;
  testimonials?: Array<{ content?: string; author?: string; role?: string }>;
  [key: string]: any;
}`;

    let cleaned = content
      .replace(/export \* from ["']\.\/config["'];?\n?/g, "")
      .replace(/type\s+\w+_\d+_Block/g, "ComponentProps")
      .replace(/: NonNullable<\w+_\d+_Block>/g, ": ComponentProps")
      .replace(/: \w+_\d+_Block/g, ": ComponentProps")
      .replace(/\/\/ Payload.*$/gm, "")
      .replace(/\/\/ Internal components removed.*$/gm, "")
      .replace(/\/\/ Local imports removed.*$/gm, "")
      .replace(/\/\*.*?\*\//gs, "")
      .replace(
        /import.*?from\s+["']~\/payload\/fields\/mediaField["'];?\n?/g,
        "",
      )
      .replace(
        /<MediaField[^>]*\/>/g,
        '<div className="aspect-15/8 bg-gray-200 rounded-lg" />',
      )
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .trim();

    if (!cleaned.includes('import React from "react"')) {
      cleaned = `import React from "react";${componentPropsInterface}\n\n${cleaned}`;
    } else {
      cleaned = cleaned.replace(
        /import React from "react";/,
        `import React from "react";${componentPropsInterface}`,
      );
    }

    if (!cleaned || cleaned.length < 100) {
      cleaned = `import React from "react";${componentPropsInterface}

export default function PlaceholderComponent(props: ComponentProps) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold">Component Placeholder</h2>
      <p className="mt-2 text-gray-600">This component needs manual conversion</p>
    </div>
  );
}`;
    }

    return cleaned;
  }

  private getExternalDependencies(dependencies: Set<string>): string[] {
    const external = [];
    for (const dep of dependencies) {
      if (
        dep === "lucide-react" ||
        dep === "react" ||
        dep === "next/link" ||
        dep === "next/image"
      ) {
        external.push(dep);
      }
    }
    return external;
  }

  private getRegistryDependencies(dependencies: Set<string>): string[] {
    const registry = [];
    for (const dep of dependencies) {
      if (
        dep.startsWith("button") ||
        dep.startsWith("card") ||
        dep.startsWith("icon")
      ) {
        registry.push(dep);
      }
    }
    return registry;
  }

  private getCategoryFromBlockType(
    blockType: string,
  ):
    | "hero"
    | "features"
    | "cta"
    | "faq"
    | "pricing"
    | "testimonials"
    | "team"
    | "stats"
    | "gallery"
    | "contact"
    | "about"
    | "newsletter"
    | "header"
    | "footer"
    | "ui"
    | "layout"
    | "form"
    | undefined {
    const categoryMap: Record<
      string,
      | "hero"
      | "features"
      | "cta"
      | "faq"
      | "pricing"
      | "testimonials"
      | "team"
      | "stats"
      | "gallery"
      | "contact"
      | "about"
      | "newsletter"
      | "header"
      | "footer"
      | "ui"
      | "layout"
      | "form"
    > = {
      Hero: "hero",
      CTA: "cta",
      Features: "features",
      About: "about",
      Contact: "contact",
      FAQ: "faq",
      Pricing: "pricing",
      Stats: "stats",
      Teams: "team",
      Testimonials: "testimonials",
      Gallery: "gallery",
      Header: "header",
      Footer: "footer",
      Newsletter: "newsletter",
    };
    return categoryMap[blockType];
  }
}

// CLI interface
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  const converter = new BlockToRegistryConverter();
  const blockTypes = process.argv.slice(2);

  if (blockTypes.length > 0) {
    converter.convertSpecificBlocks(blockTypes).catch(console.error);
  } else {
    console.log(
      "Usage: npx tsx convert-blocks-to-registry.ts [BlockType1] [BlockType2] ...",
    );
  }
}

export { BlockToRegistryConverter };
