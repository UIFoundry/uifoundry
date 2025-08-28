import { readFile } from "fs/promises";
import type { RegistryTailwindConfig } from "./registry";

export interface TailwindConfigMerger {
  /**
   * Merge component-specific Tailwind config into existing config
   */
  mergeConfig(
    existingConfig: Record<string, unknown>,
    componentConfig: RegistryTailwindConfig,
  ): Record<string, unknown>;

  /**
   * Extract Tailwind config from component files
   */
  extractConfigFromComponent(
    componentFiles: string[],
  ): Promise<RegistryTailwindConfig | undefined>;

  /**
   * Generate Tailwind config snippet for component
   */
  generateConfigSnippet(componentConfig: RegistryTailwindConfig): string;

  /**
   * Validate Tailwind config structure
   */
  validateConfig(config: RegistryTailwindConfig): boolean;
}

export class RegistryTailwindHandler implements TailwindConfigMerger {
  constructor() {
    // Constructor intentionally empty - no state needed
  }

  /**
   * Merge component-specific Tailwind config into existing config
   */
  mergeConfig(
    existingConfig: Record<string, unknown>,
    componentConfig: RegistryTailwindConfig,
  ): Record<string, unknown> {
    const mergedConfig = { ...existingConfig };

    if (componentConfig.config) {
      // Merge theme extensions
      if (componentConfig.config.theme?.extend) {
        if (!mergedConfig.theme) mergedConfig.theme = {};
        if (!(mergedConfig.theme as any).extend)
          (mergedConfig.theme as any).extend = {};

        // Deep merge theme extensions
        for (const [key, value] of Object.entries(
          componentConfig.config.theme.extend,
        )) {
          if (!(mergedConfig.theme as any).extend[key]) {
            (mergedConfig.theme as any).extend[key] = value;
          } else {
            // Merge objects, overwrite primitives
            if (
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value)
            ) {
              (mergedConfig.theme as any).extend[key] = {
                ...(mergedConfig.theme as any).extend[key],
                ...value,
              };
            } else {
              (mergedConfig.theme as any).extend[key] = value;
            }
          }
        }
      }
    }

    // Merge plugins
    if (componentConfig.plugins && componentConfig.plugins.length > 0) {
      if (!mergedConfig.plugins) mergedConfig.plugins = [];
      const existingPlugins = mergedConfig.plugins as string[];

      for (const plugin of componentConfig.plugins) {
        if (!existingPlugins.includes(plugin)) {
          existingPlugins.push(plugin);
        }
      }
    }

    return mergedConfig;
  }

  /**
   * Extract Tailwind config from component files
   */
  async extractConfigFromComponent(
    componentFiles: string[],
  ): Promise<RegistryTailwindConfig | undefined> {
    const extractedConfig: RegistryTailwindConfig = {
      config: { theme: { extend: {} } },
      plugins: [],
    };

    let hasConfig = false;

    for (const filePath of componentFiles) {
      try {
        const content = await readFile(filePath, "utf-8");

        // Look for Tailwind config comments
        const configCommentRegex = /\/\*\s*tailwind-config\s*([\s\S]*?)\*\//g;
        let match;

        while ((match = configCommentRegex.exec(content)) !== null) {
          try {
            const configJson = match[1]?.trim();
            if (configJson) {
              const parsedConfig = JSON.parse(configJson);
              this.mergeExtractedConfig(extractedConfig, parsedConfig);
              hasConfig = true;
            }
          } catch (error) {
            console.warn(
              `Failed to parse Tailwind config in ${filePath}:`,
              error,
            );
          }
        }

        // Look for custom CSS variables
        const cssVarRegex = /--[\w-]+:\s*[^;]+/g;
        const cssVars = content.match(cssVarRegex);

        if (cssVars) {
          // Convert CSS variables to Tailwind config
          const colorVars = this.extractColorVariables(cssVars);
          if (Object.keys(colorVars).length > 0) {
            if (!extractedConfig.config)
              extractedConfig.config = { theme: { extend: {} } };
            if (!extractedConfig.config.theme)
              extractedConfig.config.theme = { extend: {} };
            if (!extractedConfig.config.theme.extend)
              extractedConfig.config.theme.extend = {};

            extractedConfig.config.theme.extend.colors = {
              ...((extractedConfig.config.theme.extend.colors as Record<
                string,
                unknown
              >) || {}),
              ...colorVars,
            };
            hasConfig = true;
          }
        }

        // Look for required plugins based on class usage
        const requiredPlugins = this.detectRequiredPlugins(content);
        if (requiredPlugins.length > 0) {
          if (!extractedConfig.plugins) extractedConfig.plugins = [];
          extractedConfig.plugins.push(
            ...requiredPlugins.filter(
              (p) => !extractedConfig.plugins?.includes(p),
            ),
          );
          hasConfig = true;
        }
      } catch (error) {
        console.warn(`Failed to extract config from ${filePath}:`, error);
      }
    }

    return hasConfig ? extractedConfig : undefined;
  }

  /**
   * Generate Tailwind config snippet for component
   */
  generateConfigSnippet(componentConfig: RegistryTailwindConfig): string {
    const lines: string[] = [];

    if (componentConfig.config?.theme?.extend) {
      lines.push("// Add to your tailwind.config.js theme.extend:");
      lines.push(JSON.stringify(componentConfig.config.theme.extend, null, 2));
    }

    if (componentConfig.plugins && componentConfig.plugins.length > 0) {
      if (lines.length > 0) lines.push("");
      lines.push("// Add these plugins to your tailwind.config.js:");
      componentConfig.plugins.forEach((plugin) => {
        lines.push(`require("${plugin}")`);
      });
    }

    return lines.join("\n");
  }

  /**
   * Validate Tailwind config structure
   */
  validateConfig(config: RegistryTailwindConfig): boolean {
    try {
      // Basic structure validation
      if (typeof config !== "object" || config === null) return false;

      // Validate config structure if present
      if (config.config) {
        if (typeof config.config !== "object" || config.config === null)
          return false;
        if (config.config.theme && typeof config.config.theme !== "object")
          return false;
      }

      // Validate plugins if present
      if (config.plugins && !Array.isArray(config.plugins)) return false;
      if (config.plugins && !config.plugins.every((p) => typeof p === "string"))
        return false;

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get common Tailwind config presets
   */
  getCommonPresets(): Record<string, RegistryTailwindConfig> {
    return {
      animations: {
        config: {
          theme: {
            extend: {
              animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "fade-out": "fadeOut 0.5s ease-in-out",
                "slide-in": "slideIn 0.3s ease-out",
                "slide-up": "slideUp 0.3s ease-out",
              },
              keyframes: {
                fadeIn: {
                  "0%": { opacity: "0" },
                  "100%": { opacity: "1" },
                },
                fadeOut: {
                  "0%": { opacity: "1" },
                  "100%": { opacity: "0" },
                },
                slideIn: {
                  "0%": { transform: "translateX(-100%)" },
                  "100%": { transform: "translateX(0)" },
                },
                slideUp: {
                  "0%": { transform: "translateY(100%)" },
                  "100%": { transform: "translateY(0)" },
                },
              },
            },
          },
        },
      },
      typography: {
        plugins: ["@tailwindcss/typography"],
      },
      forms: {
        plugins: ["@tailwindcss/forms"],
      },
      aspectRatio: {
        plugins: ["@tailwindcss/aspect-ratio"],
      },
    };
  }

  /**
   * Private helper methods
   */
  private mergeExtractedConfig(
    target: RegistryTailwindConfig,
    source: any,
  ): void {
    if (source.theme?.extend) {
      if (!target.config) target.config = { theme: { extend: {} } };
      if (!target.config.theme) target.config.theme = { extend: {} };
      if (!target.config.theme.extend) target.config.theme.extend = {};

      for (const [key, value] of Object.entries(source.theme.extend)) {
        const existing =
          (target.config.theme.extend[key] as Record<string, unknown>) || {};
        const newValue = (value as Record<string, unknown>) || {};
        target.config.theme.extend[key] = {
          ...existing,
          ...newValue,
        };
      }
    }

    if (source.plugins && Array.isArray(source.plugins)) {
      if (!target.plugins) target.plugins = [];
      target.plugins.push(
        ...source.plugins.filter((p: string) => !target.plugins?.includes(p)),
      );
    }
  }

  private extractColorVariables(cssVars: string[]): Record<string, string> {
    const colors: Record<string, string> = {};

    for (const cssVar of cssVars) {
      const match = cssVar.match(/--([^:]+):\s*(.+)/);
      if (match) {
        const varName = match[1]?.trim();
        const varValue = match[2]?.trim();

        if (varName && varValue && this.isColorValue(varValue)) {
          // Convert CSS var name to color name
          const colorName = varName.replace(/^color-/, "").replace(/-/g, "");
          colors[colorName] = `hsl(var(--${varName}))`;
        }
      }
    }

    return colors;
  }

  private detectRequiredPlugins(content: string): string[] {
    const plugins: string[] = [];

    // Detect typography plugin usage
    if (/prose|prose-/.test(content)) {
      plugins.push("@tailwindcss/typography");
    }

    // Detect forms plugin usage
    if (/form-|input-|select-|textarea-/.test(content)) {
      plugins.push("@tailwindcss/forms");
    }

    // Detect aspect ratio plugin usage
    if (/aspect-/.test(content)) {
      plugins.push("@tailwindcss/aspect-ratio");
    }

    return plugins;
  }

  private isColorValue(value: string): boolean {
    // Simple check for color-like values
    return /^(#|rgb|hsl|var\()/i.test(value.trim());
  }
}

// Singleton instance
export const tailwindHandler = new RegistryTailwindHandler();
