import { readFile, readdir } from "fs/promises";
import { join } from "path";

export interface DependencyAnalysis {
  npmDependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  imports: string[];
  exports: string[];
}

export class RegistryDependencyResolver {
  private registryPath: string;
  private knownRegistryComponents: Set<string>;

  constructor(registryPath: string = join(process.cwd(), "registry")) {
    this.registryPath = registryPath;
    this.knownRegistryComponents = new Set();
  }

  /**
   * Analyze a component file for its dependencies
   */
  async analyzeComponentDependencies(
    filePath: string,
  ): Promise<DependencyAnalysis> {
    try {
      const content = await readFile(filePath, "utf-8");
      return this.analyzeDependenciesFromContent(content);
    } catch (error) {
      throw new Error(
        `Failed to analyze dependencies for ${filePath}: ${error}`,
      );
    }
  }

  /**
   * Analyze dependencies from file content
   */
  analyzeDependenciesFromContent(content: string): DependencyAnalysis {
    const analysis: DependencyAnalysis = {
      npmDependencies: [],
      devDependencies: [],
      registryDependencies: [],
      imports: [],
      exports: [],
    };

    // Extract import statements
    const importRegex =
      /import\s+(?:(?:[\w*{}\s,]+)\s+from\s+)?['"`]([^'"`]+)['"`]/g;
    const dynamicImportRegex = /import\(['"`]([^'"`]+)['"`]\)/g;
    const requireRegex = /require\(['"`]([^'"`]+)['"`]\)/g;

    let match;

    // Process import statements
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath) {
        analysis.imports.push(importPath);
        this.categorizeImport(importPath, analysis);
      }
    }

    // Process dynamic imports
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath) {
        analysis.imports.push(importPath);
        this.categorizeImport(importPath, analysis);
      }
    }

    // Process require statements
    while ((match = requireRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath) {
        analysis.imports.push(importPath);
        this.categorizeImport(importPath, analysis);
      }
    }

    // Extract export statements
    const exportRegex =
      /export\s+(?:default\s+|(?:const|let|var|function|class|interface|type)\s+)?(\w+)/g;
    while ((match = exportRegex.exec(content)) !== null) {
      const exportName = match[1];
      if (exportName) {
        analysis.exports.push(exportName);
      }
    }

    // Remove duplicates
    analysis.npmDependencies = Array.from(new Set(analysis.npmDependencies));
    analysis.devDependencies = Array.from(new Set(analysis.devDependencies));
    analysis.registryDependencies = Array.from(
      new Set(analysis.registryDependencies),
    );
    analysis.imports = Array.from(new Set(analysis.imports));
    analysis.exports = Array.from(new Set(analysis.exports));

    return analysis;
  }

  /**
   * Resolve all dependencies for a component
   */
  async resolveComponentDependencies(componentName: string): Promise<{
    dependencies: string[];
    devDependencies: string[];
    registryDependencies: string[];
  }> {
    const allDependencies = new Set<string>();
    const allDevDependencies = new Set<string>();
    const allRegistryDependencies = new Set<string>();

    try {
      // Get component directory
      const componentDir = join(this.registryPath, "components", componentName);

      // Analyze all TypeScript/JavaScript files in the component
      const files = await this.getComponentFiles(componentDir);

      for (const file of files) {
        if (this.isAnalyzableFile(file)) {
          const filePath = join(componentDir, file);
          const analysis = await this.analyzeComponentDependencies(filePath);

          analysis.npmDependencies.forEach((dep) => allDependencies.add(dep));
          analysis.devDependencies.forEach((dep) =>
            allDevDependencies.add(dep),
          );
          analysis.registryDependencies.forEach((dep) =>
            allRegistryDependencies.add(dep),
          );
        }
      }

      return {
        dependencies: Array.from(allDependencies),
        devDependencies: Array.from(allDevDependencies),
        registryDependencies: Array.from(allRegistryDependencies),
      };
    } catch (error) {
      throw new Error(
        `Failed to resolve dependencies for ${componentName}: ${error}`,
      );
    }
  }

  /**
   * Update known registry components
   */
  updateKnownComponents(components: string[]): void {
    this.knownRegistryComponents = new Set(components);
  }

  /**
   * Get predefined dependency mappings for common patterns
   */
  getPredefinedDependencies(): Record<string, string[]> {
    return {
      // React ecosystem
      "@radix-ui": [
        "@radix-ui/react-slot",
        "@radix-ui/react-dialog",
        "@radix-ui/react-popover",
      ],
      "framer-motion": ["framer-motion"],
      motion: ["motion"],

      // UI libraries
      "lucide-react": ["lucide-react"],
      "class-variance-authority": ["class-variance-authority"],
      clsx: ["clsx"],
      "tailwind-merge": ["tailwind-merge"],

      // Utilities
      "date-fns": ["date-fns"],
      "react-hook-form": ["react-hook-form"],
      zod: ["zod"],

      // Next.js specific
      next: ["next"],
      "next/image": ["next"],
      "next/link": ["next"],
      "next/router": ["next"],
    };
  }

  /**
   * Categorize an import path
   */
  private categorizeImport(
    importPath: string,
    analysis: DependencyAnalysis,
  ): void {
    // Skip relative imports
    if (importPath.startsWith(".") || importPath.startsWith("/")) {
      return;
    }

    // Skip built-in Node.js modules
    if (this.isBuiltinModule(importPath)) {
      return;
    }

    // Check if it's a known registry component
    if (this.knownRegistryComponents.has(importPath)) {
      analysis.registryDependencies.push(importPath);
      return;
    }

    // Check if it's a TypeScript type import (dev dependency)
    if (importPath.startsWith("@types/")) {
      analysis.devDependencies.push(importPath);
      return;
    }

    // Extract package name from scoped packages
    const packageName = importPath.startsWith("@")
      ? importPath.split("/").slice(0, 2).join("/")
      : importPath.split("/")[0];

    if (packageName) {
      // Add as npm dependency
      analysis.npmDependencies.push(packageName);
    }
  }

  /**
   * Check if a module is a built-in Node.js module
   */
  private isBuiltinModule(moduleName: string): boolean {
    const builtinModules = [
      "fs",
      "path",
      "os",
      "crypto",
      "util",
      "events",
      "stream",
      "buffer",
      "url",
      "querystring",
      "zlib",
      "http",
      "https",
      "net",
      "dns",
      "cluster",
      "child_process",
      "worker_threads",
    ];
    return builtinModules.includes(moduleName);
  }

  /**
   * Check if a file should be analyzed for dependencies
   */
  private isAnalyzableFile(filename: string): boolean {
    return /\.(tsx?|jsx?)$/.test(filename);
  }

  /**
   * Get all files in a component directory
   */
  private async getComponentFiles(componentDir: string): Promise<string[]> {
    try {
      return await readdir(componentDir);
    } catch {
      return [];
    }
  }
}

// Singleton instance
export const dependencyResolver = new RegistryDependencyResolver();
