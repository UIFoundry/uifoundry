# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-09-11-component-documentation-system/spec.md

## Documentation Structure API

### Navigation Configuration

**Purpose:** Define Fumadocs sidebar navigation structure
**Format:** Source configuration with nested categories
**Implementation:** Update source.config.ts with documentation hierarchy

```typescript
// Navigation structure for docs
{
  "Getting Started": [...],
  "Blocks": {
    "Hero": ["hero-1", "hero-2", ...],
    "Header": ["header-1", "header-2"],
    "Features": ["features-1", "features-2"],
    // ... all block categories
  },
  "Fields": [...],
  "Globals": [...],
  "Developer Guides": [...],
  "Registry Setup": [...]
}
```

### MDX Frontmatter API

**Purpose:** Standardize metadata for all documentation files
**Format:** YAML frontmatter with required fields
**Usage:** Every .mdx file in /content/docs

```yaml
---
title: "Component Name"
description: "Brief description of component functionality"
category: "blocks" | "fields" | "globals" | "guides"
component: "ComponentName"
variants: ["variant-1", "variant-2"] # for blocks with multiple variants
registry: true | false # whether available in registry
admin: "/admin/route" # optional admin panel route
---
```

## Component Documentation API

### Block Documentation Format

**Purpose:** Standardize block documentation structure
**Template:** Consistent sections for all block variants
**Required Sections:** Description, Props, Registry Installation, Admin Configuration

````mdx
# Block Name

Brief description of block functionality and use cases.

## Props Interface

<AutoTypeTable path="./hero-1.tsx" name="Hero_1_Props" />

<!-- Use AutoTypeTable for automatic type extraction from component files -->

## Registry Installation

```bash
npx shadcn add --registry [registry-url] [component-name]
```
````

## PayloadCMS Configuration

[Configuration example and field explanations]

## Live Example

<Hero_1 /> <!-- Renders with extracted default values passed as props -->

````

### Field Documentation Format

**Purpose:** Document PayloadCMS field configurations
**Template:** Field-specific structure with admin UI focus
**Sections:** Configuration, Admin Interface, Usage Examples

### Live Component Integration API

**Purpose:** Register PayloadCMS block components for direct MDX usage
**Implementation:** Via Fumadocs mdx-components.ts registration system
**Default Values:** Extract from PayloadCMS block configurations automatically

```tsx
// MDX components registration in app/(fumadocs)/mdx-components.ts
import { Hero_1, Hero_2 } from '~/payload/blocks/Hero'
import { Hero_1_Block, Hero_2_Block } from '~/payload/blocks/Hero/Hero_1/config'
import { extractBlockDefaults } from '~/utils/block-defaults'

// Extract default values once at module level for performance
const hero1Defaults = extractBlockDefaults(Hero_1_Block);
const hero2Defaults = extractBlockDefaults(Hero_2_Block);

export function useMDXComponents() {
  return {
    Hero_1: (props) => <Hero_1 {...hero1Defaults} {...props} />,
    Hero_2: (props) => <Hero_2 {...hero2Defaults} {...props} />,
    // TypeTable for component documentation
    TypeTable: ({ type }: { type: string }) => <TypeTable type={type} />,
    // ... register other block components
  }
}

// Usage in MDX files
<Hero_1 />  // Renders with extracted PayloadCMS default values
<Hero_2 header="Custom heading" />  // Default values + prop overrides
<TypeTable type="Hero_1_Props" />  // Fumadocs type documentation
```

### Block Defaults Extraction API

**Purpose:** Extract default values from PayloadCMS block configurations
**Function:** Utility to parse block config and return default field values
**Usage:** Powers live component previews without mock data

```tsx
// Utility function to implement
function extractBlockDefaults(blockConfig: Block): Record<string, any> {
  // Parse block fields and extract defaultValue properties
  // Return object with default props for component rendering
}
````

## Content Organization API

### File Naming Convention

**Pattern:** `/content/docs/[category]/[component-name].mdx`
**Examples:**

- `/content/docs/blocks/hero-1.mdx`
- `/content/docs/fields/media-field.mdx`
- `/content/docs/guides/creating-custom-blocks.mdx`

### Default Values Extraction

**Purpose:** Use PayloadCMS block default values instead of mock data
**Location:** Utility function to parse block configurations
**Implementation:** Extract defaultValue properties from field definitions

```typescript
// Default values extraction from PayloadCMS configs
function extractBlockDefaults(blockConfig: Block): Record<string, any> {
  const defaults = {};

  blockConfig.fields?.forEach(field => {
    if ('defaultValue' in field && field.name) {
      defaults[field.name] = field.defaultValue;
    }
  });

  return defaults;
}

// Example extracted defaults for Hero_1:
{
  alertLabel: "Introducing Support for AI Models",
  primaryCtaLabel: "Start Building",
  secondaryCtaLabel: "Request a demo",
  header: "Modern Solutions for Customer Engagement"
}
```
