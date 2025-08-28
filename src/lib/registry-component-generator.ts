import { readFile, readdir, stat } from "fs/promises";
import { join, basename } from "path";
import type { RegistryComponent, RegistryComponentFile } from "./registry";
import type { ValidatedComponentConfig } from "./registry-schema";
import {
  validateComponentConfig,
  formatValidationErrors,
} from "./registry-schema";
import { registryFileManager } from "./registry-file-manager";
import { dependencyResolver } from "./registry-dependency-resolver";

export class RegistryComponentGenerator {
  private srcPath: string;

  constructor(srcPath: string = join(process.cwd(), "src")) {
    this.srcPath = srcPath;
  }

  /**
   * Generate a registry component from a payload block
   */
  async generateFromPayloadBlock(
    blockPath: string,
    componentConfig: ValidatedComponentConfig,
  ): Promise<RegistryComponent> {
    try {
      // Validate the config
      const validation = validateComponentConfig(componentConfig);
      if (!validation.success) {
        throw new Error(
          `Invalid component config: ${formatValidationErrors(validation.error)}`,
        );
      }

      const config = validation.data;

      // Read the block files
      const blockFiles = await this.getBlockFiles(blockPath);
      const componentFiles: RegistryComponentFile[] = [];

      // Convert block files to component files
      for (const file of blockFiles) {
        const filePath = join(blockPath, file);
        const content = await readFile(filePath, "utf-8");

        // Process the file content to make it registry-compatible
        const processedContent = await this.processFileContent(
          content,
          file,
          config,
        );

        componentFiles.push({
          name: this.getRegistryFileName(file, config),
          content: processedContent,
          target: this.getTargetPath(file, config),
        });
      }

      // Analyze dependencies
      const dependencies = await this.analyzeDependencies(blockPath);

      // Generate the complete component definition
      const registryComponent: RegistryComponent = {
        name: config.name,
        type: config.type,
        files: componentFiles,
        dependencies: [...config.dependencies, ...dependencies.npmDependencies],
        devDependencies: [
          ...config.devDependencies,
          ...dependencies.devDependencies,
        ],
        registryDependencies: [
          ...config.registryDependencies,
          ...dependencies.registryDependencies,
        ],
        tailwind: config.tailwind,
        cssVars: config.cssVars,
        docs: this.generateDocumentation(config),
      };

      return registryComponent;
    } catch (error) {
      throw new Error(
        `Failed to generate component from ${blockPath}: ${error}`,
      );
    }
  }

  /**
   * Generate all components from payload blocks directory
   */
  async generateAllFromPayloadBlocks(
    blocksPath: string = join(this.srcPath, "payload", "blocks"),
  ): Promise<RegistryComponent[]> {
    try {
      const blockDirs = await this.getBlockDirectories(blocksPath);
      const components: RegistryComponent[] = [];

      for (const blockDir of blockDirs) {
        const blockPath = join(blocksPath, blockDir);
        const variants = await this.getBlockVariants(blockPath);

        for (const variant of variants) {
          const variantPath = join(blockPath, variant);
          const config = await this.createDefaultConfig(blockDir, variant);

          try {
            const component = await this.generateFromPayloadBlock(
              variantPath,
              config,
            );
            components.push(component);
          } catch (error) {
            console.warn(
              `Failed to generate component for ${blockDir}/${variant}: ${error}`,
            );
          }
        }
      }

      return components;
    } catch (error) {
      throw new Error(
        `Failed to generate components from payload blocks: ${error}`,
      );
    }
  }

  /**
   * Save component to registry
   */
  async saveComponentToRegistry(component: RegistryComponent): Promise<void> {
    try {
      // Save component files
      for (const file of component.files) {
        const filePath = join("components", component.name, file.name);
        await registryFileManager.writeComponentFile(filePath, file.content);
      }

      // Save component config
      await registryFileManager.saveComponentConfig(component.name, {
        name: component.name,
        type: component.type,
        dependencies: component.dependencies,
        devDependencies: component.devDependencies,
        registryDependencies: component.registryDependencies,
        tailwind: component.tailwind,
        cssVars: component.cssVars,
        docs: component.docs,
      });
    } catch (error) {
      throw new Error(
        `Failed to save component ${component.name} to registry: ${error}`,
      );
    }
  }

  /**
   * Process file content for registry compatibility
   */
  private async processFileContent(
    content: string,
    filename: string,
    config: ValidatedComponentConfig,
  ): Promise<string> {
    let processedContent = content;

    // If it's a TypeScript/React file
    if (filename.endsWith(".tsx") || filename.endsWith(".ts")) {
      // Remove payload-specific imports
      processedContent = processedContent.replace(
        /import.*from ['"]@payloadcms\/.*['"];?\s*\n/g,
        "",
      );

      // Remove payload-specific imports from internal paths
      processedContent = processedContent.replace(
        /import.*from ['"]~\/payload\/.*['"];?\s*\n/g,
        "",
      );

      // Replace payload block interfaces with registry props
      processedContent = this.replaceBlockInterfaces(processedContent, config);

      // Add registry-specific imports if needed
      processedContent = this.addRegistryImports(processedContent);

      // Update component export
      processedContent = this.updateComponentExport(processedContent, config);
    }

    return processedContent.trim();
  }

  /**
   * Replace block interfaces with registry props
   */
  private replaceBlockInterfaces(
    content: string,
    config: ValidatedComponentConfig,
  ): string {
    // Replace payload block props with generic props interface
    const interfaceRegex = /interface\s+\w+BlockProps\s*{[^}]+}/g;
    const propsInterface = `interface ${this.getPascalCase(config.name)}Props {
  // Component props will be defined here
  className?: string
  children?: React.ReactNode
}`;

    return content.replace(interfaceRegex, propsInterface);
  }

  /**
   * Add registry-specific imports
   */
  private addRegistryImports(content: string): string {
    const imports = ['import React from "react"'];

    // Add common UI imports if needed
    if (content.includes("cn(") && !content.includes('from "~/lib')) {
      imports.push('import { cn } from "~/lib/utils"');
    }

    const importSection = imports.join("\n") + "\n\n";

    // Add imports at the beginning, after existing imports
    const importEndRegex = /^((?:import.*\n)*)\n*/m;
    return content.replace(importEndRegex, `$1${importSection}`);
  }

  /**
   * Update component export
   */
  private updateComponentExport(
    content: string,
    config: ValidatedComponentConfig,
  ): string {
    const componentName = this.getPascalCase(config.name);

    // Ensure the component has a proper default export
    if (!content.includes(`export default ${componentName}`)) {
      content += `\n\nexport default ${componentName}`;
    }

    return content;
  }

  /**
   * Get block files
   */
  private async getBlockFiles(blockPath: string): Promise<string[]> {
    try {
      const entries = await readdir(blockPath);
      const files: string[] = [];

      for (const entry of entries) {
        const entryPath = join(blockPath, entry);
        const entryStat = await stat(entryPath);

        if (entryStat.isFile() && this.isValidBlockFile(entry)) {
          files.push(entry);
        }
      }

      return files;
    } catch (error) {
      throw new Error(`Failed to read block files from ${blockPath}: ${error}`);
    }
  }

  /**
   * Get block directories
   */
  private async getBlockDirectories(blocksPath: string): Promise<string[]> {
    try {
      const entries = await readdir(blocksPath);
      const directories: string[] = [];

      for (const entry of entries) {
        const entryPath = join(blocksPath, entry);
        const entryStat = await stat(entryPath);

        if (entryStat.isDirectory()) {
          directories.push(entry);
        }
      }

      return directories;
    } catch {
      return [];
    }
  }

  /**
   * Get block variants
   */
  private async getBlockVariants(blockPath: string): Promise<string[]> {
    try {
      const entries = await readdir(blockPath);
      const variants: string[] = [];

      for (const entry of entries) {
        const entryPath = join(blockPath, entry);
        const entryStat = await stat(entryPath);

        if (entryStat.isDirectory()) {
          variants.push(entry);
        }
      }

      return variants.length > 0 ? variants : ["."]; // Use current directory if no variants
    } catch {
      return ["."];
    }
  }

  /**
   * Create default config for a block
   */
  private async createDefaultConfig(
    blockName: string,
    variant: string,
  ): Promise<ValidatedComponentConfig> {
    const componentName =
      variant === "."
        ? blockName.toLowerCase().replace(/[^a-z0-9]/g, "-")
        : `${blockName}-${variant}`.toLowerCase().replace(/[^a-z0-9]/g, "-");

    return {
      name: componentName,
      type: "components:block",
      description: `${blockName} component${variant !== "." ? ` - ${variant} variant` : ""}`,
      category: this.getBlockCategory(blockName),
      tags: [blockName.toLowerCase()],
      version: "1.0.0",
      author: "UIFoundry",
      license: "MIT",
      dependencies: [],
      devDependencies: [],
      registryDependencies: [],
      files: [{ name: "index.tsx" }],
    };
  }

  /**
   * Analyze dependencies for a block
   */
  private async analyzeDependencies(blockPath: string): Promise<{
    npmDependencies: string[];
    devDependencies: string[];
    registryDependencies: string[];
  }> {
    try {
      const result = await dependencyResolver.resolveComponentDependencies(
        basename(blockPath),
      );
      return {
        npmDependencies: result.dependencies,
        devDependencies: result.devDependencies,
        registryDependencies: result.registryDependencies,
      };
    } catch {
      return {
        npmDependencies: [],
        devDependencies: [],
        registryDependencies: [],
      };
    }
  }

  /**
   * Generate documentation
   */
  private generateDocumentation(config: ValidatedComponentConfig): string {
    return `# ${this.getPascalCase(config.name)}

${config.description || `${config.name} component`}

## Usage

\`\`\`tsx
import ${this.getPascalCase(config.name)} from "./${config.name}"

export default function Example() {
  return <${this.getPascalCase(config.name)} />
}
\`\`\`
`;
  }

  /**
   * Utility functions
   */
  private isValidBlockFile(filename: string): boolean {
    return /\.(tsx?|jsx?|css|json)$/.test(filename);
  }

  private getRegistryFileName(
    filename: string,
    config: ValidatedComponentConfig,
  ): string {
    if (filename === "index.tsx") {
      return `${config.name}.tsx`;
    }
    return filename;
  }

  private getTargetPath(
    filename: string,
    config: ValidatedComponentConfig,
  ): string {
    if (filename.endsWith(".tsx") || filename.endsWith(".ts")) {
      return `components/${this.getRegistryFileName(filename, config)}`;
    }
    return filename;
  }

  private getBlockCategory(
    blockName: string,
  ): ValidatedComponentConfig["category"] {
    const categoryMap: Record<string, ValidatedComponentConfig["category"]> = {
      hero: "hero",
      features: "features",
      cta: "cta",
      faq: "faq",
      pricing: "pricing",
      testimonials: "testimonials",
      team: "team",
      stats: "stats",
      gallery: "gallery",
      contact: "contact",
      about: "about",
      newsletter: "newsletter",
      header: "header",
      footer: "footer",
    };

    return categoryMap[blockName.toLowerCase()] || "ui";
  }

  private getPascalCase(str: string): string {
    return str
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
  }
}

// Singleton instance
export const componentGenerator = new RegistryComponentGenerator();
