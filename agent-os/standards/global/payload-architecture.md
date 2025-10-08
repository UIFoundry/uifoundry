# PayloadCMS Architecture & Organization Patterns

## Overview

UIFoundry uses a colocated organization pattern for PayloadCMS structures that keeps code organized, maintainable, and easily portable across projects. This pattern is designed for building custom Shadcn registries that include both UI components and PayloadCMS blocks, fields, collections, and globals.

## Core Principles

1. **Colocation**: Keep related code together - configs, components, and types in same directories
2. **Portability**: Each block/field/global can be copy-pasted across PayloadCMS projects
3. **Consistency**: Uniform `config.ts` + `index.tsx` pattern across all structures
4. **Registry-Ready**: Structured for custom Shadcn registry integration

## Directory Structure

```
src/payload/
├── blocks/          # PayloadCMS blocks with React components
├── fields/          # Reusable field configurations with components
├── collections/     # Collection configurations (flat files)
├── globals/         # Global configurations with components
├── components/      # PayloadCMS-specific admin components
├── constants/       # Slug constants for type safety
├── access.ts        # Access control patterns
├── styles.css       # Admin panel styles
└── utils.ts         # PayloadCMS utilities
```

## Block Architecture Pattern

### Standard Block Structure

```
blocks/
└── BlockGroup/              # e.g., Hero, Features, CTA
    ├── BlockName_1/         # e.g., Hero_1, Features_1
    │   ├── config.ts        # PayloadCMS block configuration
    │   └── index.tsx        # React component + export config
    ├── BlockName_2/         # Variants of the same block type
    │   ├── config.ts
    │   └── index.tsx
    └── index.ts             # Group exports (blocks + components)
```

### Nested Block Components (Complex Blocks)

```
blocks/
└── Teams/
    └── Teams_1/
        ├── Heading/         # Sub-components for complex blocks
        │   ├── config.ts    # Nested block config
        │   └── index.tsx    # React component
        ├── Members/
        │   ├── config.ts
        │   └── index.tsx
        ├── config.ts        # Main block config
        └── index.tsx        # Main React component
```

### Block Configuration Pattern (`config.ts`)

```typescript
import type { Block } from "payload";
import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_1,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField/config";
import headerField from "~/payload/fields/headerField/config";

export const Hero_1_Block: Block = {
  slug: BLOCK_SLUG_HERO_1,
  labels: {
    singular: "Hero 1",
    plural: "Hero 1's",
  },
  admin: {
    group: BLOCK_GROUP_HERO,
  },
  interfaceName: "Hero_1_Block",
  fields: [
    // Use function-based field configs for reusability
    headerField(),
    mediaField(),
    // Inline fields for block-specific content
    {
      name: "primaryCtaLabel",
      type: "text",
      required: true,
      defaultValue: "Start Building",
    },
  ],
};
```

### Block Component Pattern (`index.tsx`)

```typescript
import React from "react";
import type { Hero_1_Block } from "~/payload-types";
import { Button } from "~/ui/button";
import MediaField from "~/payload/fields/mediaField";

// Export the config for easy importing
export * from "./config";

// React component matches the interface name
export default function HeroSection(props: Hero_1_Block) {
  return (
    <section>
      <h1>{props.header}</h1>
      <p>{props.subheader}</p>
      <MediaField media={props.media!} width="2700" height="1440" />
      <Button>{props.primaryCtaLabel}</Button>
    </section>
  );
}
```

### Block Group Export Pattern (`blocks/Hero/index.ts`)

```typescript
import {
  BLOCK_SLUG_HERO_1,
  BLOCK_SLUG_HERO_2,
} from "~/payload/constants/blocks";
import Hero_1, { Hero_1_Block } from "./Hero_1";
import Hero_2, { Hero_2_Block } from "./Hero_2";

// Export for PayloadCMS config
export const blocks = [Hero_1_Block, Hero_2_Block];

// Export for React component mapping
export const blockComponents = {
  [BLOCK_SLUG_HERO_1]: Hero_1,
  [BLOCK_SLUG_HERO_2]: Hero_2,
};
```

## Field Architecture Pattern

### Field Structure

```
fields/
└── fieldName/               # e.g., mediaField, headerField
    ├── config.ts            # Function that returns field config
    └── index.tsx            # React component for rendering
```

### Field Configuration Pattern (`config.ts`)

```typescript
import type { GroupField } from "~/payload/fields";
import uploadField from "../uploadField/config";

// Function-based for maximum reusability
export default function mediaField(props?: Partial<GroupField>): GroupField {
  return {
    name: "media",
    type: "group",
    interfaceName: "MediaField",
    fields: [uploadField({ name: "light" }), uploadField({ name: "dark" })],
    ...props, // Allow overrides
  } as GroupField;
}
```

### Field Component Pattern (`index.tsx`)

```typescript
import type { MediaField as MediaFieldProps } from "~/payload-types";
import Image from "next/image";
import { cn } from "~/styles/utils";

// Component for rendering field data in frontend
export default function MediaField({
  media,
  className,
  ...imageProps
}: { media: MediaFieldProps } & ComponentPropsWithoutRef<"img">) {
  return (
    <div>
      {media.dark && (
        <Image
          className={cn(Boolean(media.light) && "hidden dark:block", className)}
          src={(media.dark as Media).url!}
          alt={(media.dark as Media).alt}
          {...imageProps}
        />
      )}
      {media.light && (
        <Image
          className={cn(Boolean(media.dark) && "dark:hidden", className)}
          src={(media.light as Media).url!}
          alt={(media.light as Media).alt}
          {...imageProps}
        />
      )}
    </div>
  );
}
```

## Global Architecture Pattern

### Global Structure

```
globals/
└── GlobalName/              # e.g., Header, Footer
    ├── config.ts            # PayloadCMS global configuration
    └── index.tsx            # React component for rendering
```

### Global Configuration Pattern (`config.ts`)

```typescript
import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_HEADER } from "~/payload/constants/globals";
import { blocks } from "~/payload/blocks/Header";

export const HeaderGlobal: GlobalConfig = {
  slug: GLOBAL_SLUG_HEADER,
  fields: [
    {
      name: "header",
      type: "blocks",
      required: true,
      maxRows: 1,
      minRows: 1,
      blocks: blocks, // Reference block configs
    },
  ],
};
```

## Collection Architecture Pattern

Collections use flat file structure since they typically don't need React components:

```
collections/
├── Users.ts                 # User collection config
├── Pages.ts                 # Pages collection with blocks
├── Media.ts                 # Media collection config
└── index.ts                 # Export all collections
```

## Constants Management

### Centralized Slug Management

```typescript
// constants/blocks.ts
export const BLOCK_GROUP_HERO = "Hero" as const;
export const BLOCK_SLUG_HERO_1 = "hero_1" as const;
export const BLOCK_SLUG_HERO_2 = "hero_2" as const;

// constants/collections.ts
export const COLLECTION_SLUG_USERS = "users" as const;
export const COLLECTION_SLUG_PAGES = "pages" as const;

// constants/globals.ts
export const GLOBAL_SLUG_HEADER = "header" as const;
export const GLOBAL_SLUG_FOOTER = "footer" as const;
```

## Key Benefits of This Pattern

1. **Modularity**: Each block/field/global is self-contained
2. **Reusability**: Function-based field configs allow customization
3. **Type Safety**: TypeScript interfaces generated from configs
4. **Portability**: Copy-paste entire directories between projects
5. **Registry Ready**: Structure works perfectly with custom Shadcn registries
6. **Maintainability**: Related code stays together, reducing cognitive load
7. **Scalability**: Pattern works from small sites to large applications

## Registry Integration

This structure enables building custom Shadcn registries that include:

- UI components (`~/ui/*`)
- PayloadCMS blocks (`~/payload/blocks/*`)
- PayloadCMS fields (`~/payload/fields/*`)
- PayloadCMS globals (`~/payload/globals/*`)

Each component can be installed independently with its dependencies, making the ecosystem highly composable and reusable across projects.
