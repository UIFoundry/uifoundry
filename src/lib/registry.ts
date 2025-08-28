export interface RegistryComponentFile {
  name: string;
  content: string;
  target?: string;
}

export interface RegistryTailwindConfig {
  config?: {
    theme?: {
      extend?: Record<string, unknown>;
    };
  };
  plugins?: string[];
}

export interface RegistryComponent {
  name: string;
  type:
    | "registry:block"
    | "registry:component"
    | "registry:example"
    | "registry:ui";
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryComponentFile[];
  tailwind?: RegistryTailwindConfig;
  cssVars?: Record<string, Record<string, string>>;
  docs?: string;
}

export type RegistryIndex = Array<Omit<RegistryComponent, "files" | "docs">>;

export interface RegistryComponentMetadata extends RegistryComponent {
  description?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  preview?: string;
  source?: string;
  version?: string;
  author?: string;
  license?: string;
  created?: string;
  updated?: string;
}

export interface RegistryComponentsResponse {
  components: RegistryComponentMetadata[];
  total: number;
  page?: number;
  limit?: number;
  filters?: {
    type?: string;
    category?: string;
    tags?: string[];
  };
}

export interface RegistryError {
  error: string;
  message?: string;
  code?: number;
}

export interface RegistryApiResponse {
  success: boolean;
  data?: unknown;
  error?: RegistryError;
}
