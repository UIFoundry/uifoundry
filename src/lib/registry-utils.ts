import { stat } from "fs/promises";
import { join } from "path";
import type {
  RegistryComponent,
  RegistryIndex,
  RegistryComponentMetadata,
} from "./registry";
import { registryFileManager } from "./registry-file-manager";
import { validateRegistryComponent } from "./registry-schema";

const REGISTRY_DIR = join(process.cwd(), "registry");

export async function getRegistryIndex(): Promise<RegistryIndex> {
  try {
    const components = await registryFileManager.getAvailableComponents();
    const index: RegistryIndex = [];

    for (const componentName of components) {
      try {
        const config =
          await registryFileManager.loadComponentConfig(componentName);

        // Create index entry (without files and docs)
        index.push({
          name: componentName,
          type: (config as any).type || "components:block",
          dependencies: (config as any).dependencies || [],
          devDependencies: (config as any).devDependencies || [],
          registryDependencies: (config as any).registryDependencies || [],
          tailwind: (config as any).tailwind,
          cssVars: (config as any).cssVars,
        });
      } catch (error) {
        console.warn(
          `Failed to load config for component ${componentName}:`,
          error,
        );
      }
    }

    return index;
  } catch (error) {
    console.error("Error loading registry index:", error);
    return [];
  }
}

export async function getRegistryComponent(
  name: string,
): Promise<RegistryComponent | null> {
  try {
    // Check if component exists
    const exists = await registryFileManager.componentExists(name);
    if (!exists) {
      return null;
    }

    // Load component config
    const config = await registryFileManager.loadComponentConfig(name);

    // Load component files
    const files = await registryFileManager.getComponentFiles(name);

    // Build component object
    const component: RegistryComponent = {
      name,
      type: (config as any).type || "components:block",
      files,
      dependencies: (config as any).dependencies || [],
      devDependencies: (config as any).devDependencies || [],
      registryDependencies: (config as any).registryDependencies || [],
      tailwind: (config as any).tailwind,
      cssVars: (config as any).cssVars,
      docs: (config as any).docs,
    };

    // Validate component before returning
    const validation = validateRegistryComponent(component);
    if (!validation.success) {
      console.error(`Invalid component ${name}:`, validation.error);
      return null;
    }

    return component;
  } catch (error) {
    console.error(`Error loading component ${name}:`, error);
    return null;
  }
}

export async function getRegistryComponents(filters?: {
  type?: string;
  category?: string;
  tags?: string[];
}): Promise<RegistryComponentMetadata[]> {
  try {
    const components = await registryFileManager.getAvailableComponents();
    const metadata: RegistryComponentMetadata[] = [];

    for (const componentName of components) {
      try {
        const config =
          await registryFileManager.loadComponentConfig(componentName);
        const files =
          await registryFileManager.getComponentFiles(componentName);

        // Create metadata entry
        const component: RegistryComponentMetadata = {
          name: componentName,
          type: (config as any).type || "components:block",
          files,
          dependencies: (config as any).dependencies || [],
          devDependencies: (config as any).devDependencies || [],
          registryDependencies: (config as any).registryDependencies || [],
          tailwind: (config as any).tailwind,
          cssVars: (config as any).cssVars,
          docs: (config as any).docs,
          description: (config as any).description,
          category: (config as any).category,
          subcategory: (config as any).subcategory,
          tags: (config as any).tags || [],
          version: (config as any).version,
          author: (config as any).author,
          license: (config as any).license,
          created: (config as any).created,
          updated: (config as any).updated,
        };

        // Apply filters
        if (filters) {
          if (filters.type && component.type !== filters.type) continue;
          if (filters.category && component.category !== filters.category)
            continue;
          if (filters.tags && filters.tags.length > 0) {
            const hasMatchingTag = filters.tags.some((tag) =>
              component.tags?.includes(tag),
            );
            if (!hasMatchingTag) continue;
          }
        }

        metadata.push(component);
      } catch (error) {
        console.warn(
          `Failed to load metadata for component ${componentName}:`,
          error,
        );
      }
    }

    return metadata;
  } catch (error) {
    console.error("Error loading registry components:", error);
    return [];
  }
}

export async function registryExists(): Promise<boolean> {
  try {
    const stats = await stat(REGISTRY_DIR);
    return stats.isDirectory();
  } catch {
    return false;
  }
}
