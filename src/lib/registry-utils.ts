import { stat } from "fs/promises";
import { join } from "path";
import type {
  RegistryComponent,
  RegistryIndex,
  RegistryComponentMetadata,
} from "./registry";

const REGISTRY_DIR = join(process.cwd(), "registry");

export async function getRegistryIndex(): Promise<RegistryIndex> {
  try {
    // TODO: Implement actual component loading in Task 3
    // For now, return empty array
    return [];
  } catch (error) {
    console.error("Error loading registry index:", error);
    return [];
  }
}

export async function getRegistryComponent(
  name: string,
): Promise<RegistryComponent | null> {
  try {
    // TODO: Implement actual component loading in Task 3
    // For now, return null
    return null;
  } catch (error) {
    console.error(`Error loading component ${name}:`, error);
    return null;
  }
}

export async function getRegistryComponents(_filters?: {
  type?: string;
  category?: string;
  tags?: string[];
}): Promise<RegistryComponentMetadata[]> {
  try {
    // TODO: Implement actual component loading with filtering in Task 3
    // For now, return empty array
    return [];
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
