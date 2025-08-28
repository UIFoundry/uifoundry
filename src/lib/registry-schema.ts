import { z } from "zod";

// Base schemas
export const RegistryComponentFileSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  target: z.string().optional(),
});

export const RegistryTailwindConfigSchema = z.object({
  config: z
    .object({
      theme: z
        .object({
          extend: z.record(z.string(), z.unknown()).optional(),
        })
        .optional(),
    })
    .optional(),
  plugins: z.array(z.string()).optional(),
});

export const RegistryComponentSchema = z.object({
  name: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  type: z.enum([
    "registry:block",
    "registry:component",
    "registry:example",
    "registry:ui",
  ]),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(RegistryComponentFileSchema).min(1),
  tailwind: RegistryTailwindConfigSchema.optional(),
  cssVars: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  docs: z.string().optional(),
});

export const RegistryComponentMetadataSchema = RegistryComponentSchema.extend({
  description: z.string().optional(),
  category: z
    .enum([
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
    ])
    .optional(),
  subcategory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  preview: z.string().optional(),
  source: z.string().optional(),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/)
    .optional(),
  author: z.string().optional(),
  license: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
});

export const ComponentConfigSchema = z.object({
  name: z.string().min(1),
  type: z.enum([
    "registry:block",
    "registry:component",
    "registry:example",
    "registry:ui",
  ]),
  description: z.string().optional(),
  category: z
    .enum([
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
    ])
    .optional(),
  subcategory: z.string().optional(),
  tags: z.array(z.string()).default([]),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/)
    .default("1.0.0"),
  author: z.string().optional(),
  license: z.string().default("MIT"),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  tailwind: RegistryTailwindConfigSchema.optional(),
  cssVars: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  files: z
    .array(
      z.object({
        name: z.string(),
        target: z.string().optional(),
      }),
    )
    .min(1),
});

// Validation functions
export function validateRegistryComponent(data: unknown) {
  return RegistryComponentSchema.safeParse(data);
}

export function validateComponentMetadata(data: unknown) {
  return RegistryComponentMetadataSchema.safeParse(data);
}

export function validateComponentConfig(data: unknown) {
  return ComponentConfigSchema.safeParse(data);
}

// Error formatting helper
export function formatValidationErrors(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
}

// Type exports
export type ValidatedRegistryComponent = z.infer<
  typeof RegistryComponentSchema
>;
export type ValidatedComponentMetadata = z.infer<
  typeof RegistryComponentMetadataSchema
>;
export type ValidatedComponentConfig = z.infer<typeof ComponentConfigSchema>;
