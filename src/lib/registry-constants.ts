export const REGISTRY_COMPONENT_TYPES = [
  "components:block",
  "components:component",
  "components:example",
  "components:ui",
] as const;

export const REGISTRY_CATEGORIES = [
  "hero",
  "features",
  "cta",
  "faq",
  "pricing",
  "testimonials",
  "team",
  "stats",
  "gallery",
  "contact",
  "about",
  "newsletter",
  "header",
  "footer",
  "ui",
  "layout",
  "form",
] as const;

export const REGISTRY_BASE_PATH = "/registry";
export const REGISTRY_API_BASE = "/api/registry";

export const REGISTRY_ENDPOINTS = {
  index: `${REGISTRY_API_BASE}/index.json`,
  component: (name: string) => `${REGISTRY_API_BASE}/${name}.json`,
  components: `${REGISTRY_API_BASE}/components`,
  componentDetail: (name: string) => `${REGISTRY_API_BASE}/components/${name}`,
} as const;

export type RegistryComponentType = (typeof REGISTRY_COMPONENT_TYPES)[number];
export type RegistryCategory = (typeof REGISTRY_CATEGORIES)[number];
