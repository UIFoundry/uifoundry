#!/usr/bin/env tsx

/**
 * Validate UIFoundry Registry Components
 * This script validates that all converted components have correct:
 * - Import paths
 * - Dependencies listed
 * - File structure
 * - Metadata integrity
 */

import { promises as fs } from "fs";
import path from "path";
import { validateComponentMetadata } from "../src/lib/registry-schema";

interface ValidationResult {
  component: string;
  success: boolean;
  errors: string[];
  warnings: string[];
}

class RegistryValidator {
  private registryDir = path.join(process.cwd(), "registry");
  private componentsDir = path.join(this.registryDir, "components");

  async validateAllComponents(): Promise<ValidationResult[]> {
    console.log("🔍 Starting registry components validation...");

    const componentDirs = await fs.readdir(this.componentsDir, {
      withFileTypes: true,
    });

    const results: ValidationResult[] = [];

    for (const dir of componentDirs) {
      if (!dir.isDirectory() || dir.name === ".gitkeep") continue;

      const result = await this.validateComponent(dir.name);
      results.push(result);
    }

    this.printValidationSummary(results);
    return results;
  }

  private async validateComponent(
    componentName: string,
  ): Promise<ValidationResult> {
    const result: ValidationResult = {
      component: componentName,
      success: true,
      errors: [],
      warnings: [],
    };

    try {
      console.log(`📋 Validating ${componentName}...`);

      const componentDir = path.join(this.componentsDir, componentName);

      // Check required files exist
      await this.checkRequiredFiles(componentDir, result);

      // Validate metadata
      await this.validateMetadata(componentDir, result);

      // Validate component file
      await this.validateComponentFile(componentDir, result);

      // Check import paths
      await this.checkImportPaths(componentDir, result);

      result.success = result.errors.length === 0;

      if (result.success) {
        console.log(`✅ ${componentName} validation passed`);
      } else {
        console.log(`❌ ${componentName} validation failed`);
      }
    } catch (error) {
      result.errors.push(`Validation error: ${(error as Error).message}`);
      result.success = false;
    }

    return result;
  }

  private async checkRequiredFiles(
    componentDir: string,
    result: ValidationResult,
  ) {
    const requiredFiles = [`${result.component}.tsx`, "meta.json"];

    for (const file of requiredFiles) {
      const filePath = path.join(componentDir, file);
      try {
        await fs.access(filePath);
      } catch (error) {
        result.errors.push(`Missing required file: ${file}`);
      }
    }
  }

  private async validateMetadata(
    componentDir: string,
    result: ValidationResult,
  ) {
    const metaPath = path.join(componentDir, "meta.json");

    try {
      const metaContent = await fs.readFile(metaPath, "utf-8");
      const metadata = JSON.parse(metaContent);

      const validation = validateComponentMetadata(metadata);
      if (!validation.success) {
        result.errors.push(
          `Invalid metadata: ${validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`,
        );
      }

      // Check if name matches directory
      if (metadata.name !== result.component) {
        result.errors.push(
          `Component name mismatch: directory is '${result.component}', metadata name is '${metadata.name}'`,
        );
      }
    } catch (error) {
      result.errors.push(
        `Failed to validate metadata: ${(error as Error).message}`,
      );
    }
  }

  private async validateComponentFile(
    componentDir: string,
    result: ValidationResult,
  ) {
    const componentPath = path.join(componentDir, `${result.component}.tsx`);

    try {
      const content = await fs.readFile(componentPath, "utf-8");

      // Check for required patterns
      const requiredPatterns = [
        {
          pattern: /^import React from "react";/m,
          description: "React import",
        },
        {
          pattern: /export default function/m,
          description: "Default export function",
        },
        {
          pattern: /interface ComponentProps/m,
          description: "ComponentProps interface",
        },
      ];

      for (const { pattern, description } of requiredPatterns) {
        if (!pattern.test(content)) {
          result.warnings.push(`Missing expected pattern: ${description}`);
        }
      }

      // Check for problematic patterns
      const problematicPatterns = [
        {
          pattern: /from\s+["']~\//,
          description: "UIFoundry internal imports (should use @/ paths)",
        },
        {
          pattern: /export \* from ["']\.\/config["']/,
          description: "Config export (should be removed)",
        },
      ];

      for (const { pattern, description } of problematicPatterns) {
        if (pattern.test(content)) {
          result.errors.push(`Problematic pattern found: ${description}`);
        }
      }
    } catch (error) {
      result.errors.push(
        `Failed to validate component file: ${(error as Error).message}`,
      );
    }
  }

  private async checkImportPaths(
    componentDir: string,
    result: ValidationResult,
  ) {
    const componentPath = path.join(componentDir, `${result.component}.tsx`);

    try {
      const content = await fs.readFile(componentPath, "utf-8");
      const importRegex = /import\s+.*?\s+from\s+["']([^"']+)["']/g;
      let match;

      const imports = [];
      while ((match = importRegex.exec(content)) !== null) {
        if (match[1]) {
          imports.push(match[1]);
        }
      }

      // Check for correct import patterns
      for (const importPath of imports) {
        if (
          importPath.startsWith("@/components/ui/") ||
          importPath.startsWith("~/ui/")
        ) {
          // Good - UI component import (registry or local preview)
        } else if (
          importPath.startsWith("@/lib/") ||
          importPath.startsWith("~/styles/") ||
          importPath.startsWith("~/lib/")
        ) {
          // Good - utils import (registry or local preview)
        } else if (
          importPath === "react" ||
          importPath === "next/link" ||
          importPath === "next/image" ||
          importPath.startsWith("lucide-react")
        ) {
          // Good - external dependencies
        } else if (importPath.startsWith("~/")) {
          // Local project import that's not UI/styles - warn only
          result.warnings.push(`Local import path: ${importPath}`);
        } else {
          // Might be OK, but warn
          result.warnings.push(`Unusual import path: ${importPath}`);
        }
      }
    } catch (error) {
      result.errors.push(
        `Failed to check import paths: ${(error as Error).message}`,
      );
    }
  }

  private printValidationSummary(results: ValidationResult[]) {
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;
    const totalWarnings = results.reduce(
      (sum, r) => sum + r.warnings.length,
      0,
    );

    console.log("\n" + "=".repeat(50));
    console.log("📊 VALIDATION SUMMARY");
    console.log("=".repeat(50));
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Total warnings: ${totalWarnings}`);

    if (failed > 0) {
      console.log("\n❌ FAILED COMPONENTS:");
      results
        .filter((r) => !r.success)
        .forEach((r) => {
          console.log(`\n  ${r.component}:`);
          r.errors.forEach((error) => console.log(`    ❌ ${error}`));
        });
    }

    if (totalWarnings > 0) {
      console.log("\n⚠️  WARNINGS:");
      results
        .filter((r) => r.warnings.length > 0)
        .forEach((r) => {
          console.log(`\n  ${r.component}:`);
          r.warnings.forEach((warning) => console.log(`    ⚠️  ${warning}`));
        });
    }

    console.log("\n" + "=".repeat(50));
  }
}

// CLI interface
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  const validator = new RegistryValidator();
  validator.validateAllComponents().catch(console.error);
}

export { RegistryValidator };
