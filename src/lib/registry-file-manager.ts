import { readFile, readdir, stat, writeFile, mkdir } from "fs/promises";
import { join, extname, relative, dirname } from "path";
import type { RegistryComponentFile } from "./registry";

export class RegistryFileManager {
  private registryPath: string;

  constructor(registryPath: string = join(process.cwd(), "registry")) {
    this.registryPath = registryPath;
  }

  /**
   * Read a component file and return its content
   */
  async readComponentFile(filePath: string): Promise<string> {
    try {
      const fullPath = join(this.registryPath, filePath);
      const content = await readFile(fullPath, "utf-8");
      return content;
    } catch (error) {
      throw new Error(`Failed to read component file ${filePath}: ${error}`);
    }
  }

  /**
   * Write a component file with the given content
   */
  async writeComponentFile(filePath: string, content: string): Promise<void> {
    try {
      const fullPath = join(this.registryPath, filePath);
      await mkdir(dirname(fullPath), { recursive: true });
      await writeFile(fullPath, content, "utf-8");
    } catch (error) {
      throw new Error(`Failed to write component file ${filePath}: ${error}`);
    }
  }

  /**
   * Get all component files for a specific component
   */
  async getComponentFiles(
    componentName: string,
  ): Promise<RegistryComponentFile[]> {
    try {
      const componentDir = join(this.registryPath, "components", componentName);
      const files: RegistryComponentFile[] = [];

      // Check if component directory exists
      try {
        await stat(componentDir);
      } catch {
        return []; // Component doesn't exist
      }

      const entries = await readdir(componentDir, { recursive: true });

      for (const entry of entries) {
        const entryPath = join(componentDir, entry as string);
        const entryStat = await stat(entryPath);

        if (entryStat.isFile() && this.isValidComponentFile(entry as string)) {
          const content = await readFile(entryPath, "utf-8");
          const relativePath = relative(componentDir, entryPath);

          files.push({
            name: entry as string,
            content,
            target: this.getTargetPath(relativePath),
          });
        }
      }

      return files;
    } catch (error) {
      throw new Error(
        `Failed to get component files for ${componentName}: ${error}`,
      );
    }
  }

  /**
   * Get all available components in the registry
   */
  async getAvailableComponents(): Promise<string[]> {
    try {
      const componentsDir = join(this.registryPath, "components");

      try {
        const entries = await readdir(componentsDir);
        const components: string[] = [];

        for (const entry of entries) {
          const entryPath = join(componentsDir, entry);
          const entryStat = await stat(entryPath);

          if (entryStat.isDirectory()) {
            components.push(entry);
          }
        }

        return components;
      } catch {
        return []; // Components directory doesn't exist
      }
    } catch (error) {
      throw new Error(`Failed to get available components: ${error}`);
    }
  }

  /**
   * Load component configuration file
   */
  async loadComponentConfig(componentName: string): Promise<unknown> {
    try {
      const configPath = join(
        this.registryPath,
        "config",
        `${componentName}.json`,
      );
      const content = await readFile(configPath, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw new Error(
        `Failed to load component config for ${componentName}: ${error}`,
      );
    }
  }

  /**
   * Save component configuration file
   */
  async saveComponentConfig(
    componentName: string,
    config: unknown,
  ): Promise<void> {
    try {
      const configDir = join(this.registryPath, "config");
      const configPath = join(configDir, `${componentName}.json`);

      await mkdir(configDir, { recursive: true });
      await writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      throw new Error(
        `Failed to save component config for ${componentName}: ${error}`,
      );
    }
  }

  /**
   * Check if component exists
   */
  async componentExists(componentName: string): Promise<boolean> {
    try {
      const componentDir = join(this.registryPath, "components", componentName);
      await stat(componentDir);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get registry statistics
   */
  async getRegistryStats(): Promise<{
    totalComponents: number;
    totalFiles: number;
    categories: Record<string, number>;
  }> {
    try {
      const components = await this.getAvailableComponents();
      let totalFiles = 0;
      const categories: Record<string, number> = {};

      for (const component of components) {
        const files = await this.getComponentFiles(component);
        totalFiles += files.length;

        try {
          const config = (await this.loadComponentConfig(component)) as {
            category?: string;
          };
          const category = config.category || "uncategorized";
          categories[category] = (categories[category] || 0) + 1;
        } catch {
          // Config doesn't exist, count as uncategorized
          categories.uncategorized = (categories.uncategorized || 0) + 1;
        }
      }

      return {
        totalComponents: components.length,
        totalFiles,
        categories,
      };
    } catch (error) {
      throw new Error(`Failed to get registry stats: ${error}`);
    }
  }

  /**
   * Check if a file is a valid component file
   */
  private isValidComponentFile(filename: string): boolean {
    const validExtensions = [".tsx", ".ts", ".jsx", ".js", ".css", ".json"];
    return validExtensions.includes(extname(filename));
  }

  /**
   * Get target path for file installation
   */
  private getTargetPath(relativePath: string): string {
    // Map registry file paths to target installation paths
    if (relativePath.endsWith(".tsx") || relativePath.endsWith(".ts")) {
      return `components/${relativePath}`;
    }
    if (relativePath.endsWith(".css")) {
      return `styles/${relativePath}`;
    }
    return relativePath;
  }
}

// Singleton instance
export const registryFileManager = new RegistryFileManager();
