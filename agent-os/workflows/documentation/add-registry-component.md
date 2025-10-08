# Add Registry Component

> Core process for adding PayloadCMS blocks, fields, globals, and UI components to the UIFoundry custom shadcn registry

## Overview

This document provides a step-by-step process for adding new components to the UIFoundry registry, enabling distribution via shadcn CLI commands. The process covers analyzing existing components, understanding import patterns, copying files with proper transformations, configuring registry metadata, and validating installation.

## Prerequisites

Before adding a component to the registry:

1. **Component must exist in src/**: The component should be implemented and tested in the main codebase
2. **Follow UIFoundry patterns**: Component should follow established conventions (see @.agent-os/standards/best-practices.md)
3. **Dependencies identified**: All external dependencies should be documented
4. **Component tested**: Ensure the component works correctly in the main application

## Registry Structure Analysis

### Directory Mapping Patterns

The registry mirrors the `src/` structure with specific naming conventions:

| Source Path                       | Registry Path                          | Pattern                                      |
| --------------------------------- | -------------------------------------- | -------------------------------------------- |
| `src/payload/blocks/Hero/Hero_1/` | `registry/payload/blocks/hero/hero-1/` | PascalCase → kebab-case, underscore → hyphen |
| `src/payload/fields/mediaField/`  | `registry/payload/fields/media/`       | camelCase → kebab-case                       |
| `src/payload/globals/Header/`     | `registry/payload/globals/header/`     | PascalCase → kebab-case                      |
| `src/ui/motion-primitives/`       | `registry/ui/motion-primitives/`       | Direct mapping                               |

### File Structure Requirements

Each registry component requires:

- **config.ts**: PayloadCMS configuration with transformed imports
- **index.tsx**: React component with transformed imports (if applicable)
- **Registry entry**: JSON configuration in main registry.json

## Import Transformation Patterns

### Source to Registry Import Mapping

| Source Import                       | Registry Import                                   | Usage                               |
| ----------------------------------- | ------------------------------------------------- | ----------------------------------- |
| `~/payload/constants/blocks`        | `@/registry/default/lib/constants/blocks`         | Block constants                     |
| `~/payload/fields/fieldName/config` | `@/registry/default/lib/fields/field-name/config` | Field configs                       |
| `~/payload/fields/fieldName`        | `@/registry/payload/fields/field-name/index`      | Field components                    |
| `~/ui/button`                       | `@/registry/ui/button`                            | UI components                       |
| `~/ui/motion-primitives/component`  | `@/registry/ui/motion-primitives/component`       | Motion components                   |
| `~/styles/utils`                    | `@/registry/default/utils`                        | Utility functions                   |
| `~/payload-types`                   | `~/payload-types`                                 | **No change** (external dependency) |

### Import Transformation Rules

1. **Alias substitution**: Replace `~/` with `@/registry/`
2. **Path normalization**: Convert camelCase/PascalCase to kebab-case in paths
3. **Extension handling**: Add explicit file extensions where needed
4. **External dependencies**: Leave external imports unchanged (payload-types, next/link, etc.)

## Step-by-Step Process

### Step 1: Analyze Source Component

```bash
# Find the component to be added
find src/payload -name "*ComponentName*" -o -name "*component-name*"

# Examine the component structure
ls -la src/payload/blocks/ComponentName/Variant_1/

# Check imports and dependencies
grep -r "import.*from" src/payload/blocks/ComponentName/Variant_1/
```

**Checklist:**

- [ ] Identify all files (config.ts, index.tsx, etc.)
- [ ] List all import statements
- [ ] Note external dependencies (npm packages)
- [ ] Check for registry dependencies (other UIFoundry components)

### Step 2: Create Registry Directory Structure

```bash
# Create registry directory (convert naming)
mkdir -p registry/payload/blocks/component-name/variant-1/
```

**Naming conversion rules:**

- PascalCase → kebab-case: `Hero_1` → `hero-1`
- camelCase → kebab-case: `mediaField` → `media`
- Underscores → hyphens: `Hero_1` → `hero-1`

### Step 3: Copy and Transform Files

#### Copy config.ts with import transformations:

```bash
# Copy the config file
cp src/payload/blocks/ComponentName/Variant_1/config.ts registry/payload/blocks/component-name/variant-1/config.ts
```

**Transform imports in config.ts:**

```typescript
// BEFORE (source)
import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_1,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField/config";
import headerField from "~/payload/fields/headerField/config";

// AFTER (registry)
import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_1,
} from "@/registry/default/lib/constants/blocks";
import mediaField from "@/registry/default/lib/fields/media/config";
import headerField from "@/registry/default/lib/fields/header/config";
```

#### Copy index.tsx with import transformations:

```bash
# Copy the component file
cp src/payload/blocks/ComponentName/Variant_1/index.tsx registry/payload/blocks/component-name/variant-1/index.tsx
```

**Transform imports in index.tsx:**

```typescript
// BEFORE (source)
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { cn } from "~/styles/utils";
import MediaField from "~/payload/fields/mediaField";
import type { Component_Block } from "~/payload-types";

// AFTER (registry)
import { Button } from "@/registry/ui/button";
import { TextEffect } from "@/registry/ui/motion-primitives/text-effect";
import { cn } from "@/registry/default/utils";
import MediaField from "@/registry/payload/fields/media/index";
import type { Component_Block } from "~/payload-types"; // No change
```

### Step 4: Update Registry Configuration

Add the component entry to `registry.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "title": "Component Display Name",
  "name": "component-name",
  "type": "registry:block",
  "description": "Brief description of the component",
  "dependencies": ["react", "next", "external-package"],
  "registryDependencies": [
    "@uifoundry/dependency-component",
    "shadcn-component"
  ],
  "files": [
    {
      "path": "registry/payload/blocks/component-name/variant-1/config.ts",
      "type": "registry:component",
      "target": "src/payload/blocks/ComponentName/Variant_1/config.ts"
    },
    {
      "path": "registry/payload/blocks/component-name/variant-1/index.tsx",
      "type": "registry:component",
      "target": "src/payload/blocks/ComponentName/Variant_1/index.tsx"
    }
  ]
}
```

**Registry entry configuration:**

- **name**: kebab-case component name
- **type**: Choose from `registry:block`, `registry:component`, `registry:ui`, `registry:lib`
- **dependencies**: NPM packages required
- **registryDependencies**: Other registry components (prefix with @uifoundry/)
- **target**: Original source path for installation

### Step 5: Build and Validate

```bash
# Build the registry to generate individual JSON files
pnpm registry:build

# Verify the build succeeded
ls -la public/r/component-name.json

# Check the generated JSON structure
cat public/r/component-name.json | jq '.files[0].content' | head -20
```

**Validation checklist:**

- [ ] Individual JSON file created in `public/r/`
- [ ] File content properly embedded
- [ ] Import paths correctly transformed
- [ ] Dependencies properly listed

### Step 6: Test Component Installation

Test the component installation via shadcn CLI:

```bash
# Test installation (you may need to set up a test project)
npx shadcn add localhost:3001/r/component-name

# Verify files are installed correctly
ls -la src/payload/blocks/ComponentName/Variant_1/

# Check that imports resolve correctly
npm run typecheck
```

## Registry Component Types

### registry:block

Complete PayloadCMS blocks with both config and React component:

```json
{
  "type": "registry:block",
  "files": [
    {
      "path": "registry/payload/blocks/hero/hero-1/config.ts",
      "type": "registry:component"
    },
    {
      "path": "registry/payload/blocks/hero/hero-1/index.tsx",
      "type": "registry:component"
    }
  ]
}
```

### registry:component

Individual component files (configs or React components):

```json
{
  "type": "registry:component",
  "files": [
    {
      "path": "registry/payload/fields/header/config.ts",
      "type": "registry:component"
    }
  ]
}
```

### registry:ui

UI components for the shadcn component system:

```json
{
  "type": "registry:ui",
  "files": [
    {
      "path": "registry/ui/motion-primitives/text-effect.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### registry:lib

Utility libraries and type definitions:

```json
{
  "type": "registry:lib",
  "files": [{ "path": "registry/ui/utils.ts", "type": "registry:lib" }]
}
```

## Dependency Management

### NPM Dependencies

List all external packages in `dependencies`:

```json
{
  "dependencies": [
    "react",
    "next",
    "payload@^3.49.1",
    "lucide-react",
    "@uiw/react-color-sketch"
  ]
}
```

### Registry Dependencies

Reference other registry components in `registryDependencies`:

```json
{
  "registryDependencies": [
    "@uifoundry/media-field",
    "@uifoundry/header-field",
    "@uifoundry/style-utils",
    "button",
    "popover"
  ]
}
```

**Registry dependency naming:**

- UIFoundry components: `@uifoundry/component-name`
- Shadcn components: `component-name`

## Troubleshooting

### Common Issues

**Build fails with import errors:**

- Check that all import paths use @/registry/ prefix
- Verify that referenced registry components exist
- Ensure external dependencies are in package.json

**Component doesn't install correctly:**

- Verify target paths match original source structure
- Check that file types are correct (registry:component vs registry:ui)
- Ensure registry dependencies are properly listed

**Import resolution fails after installation:**

- Check that @/registry/ imports are correctly transformed
- Verify that all dependencies are installed
- Ensure tsconfig.json has proper path mappings

### Validation Commands

```bash
# Check registry build
pnpm registry:build

# Validate JSON structure
cat registry.json | jq '.items[-1]'

# Test import resolution
pnpm typecheck

# Verify component compiles
pnpm build
```

## Component Addition Checklist

- [ ] **Analysis Complete**: Source component structure and dependencies identified
- [ ] **Directory Created**: Registry directory structure created with proper naming
- [ ] **Files Copied**: config.ts and index.tsx copied to registry
- [ ] **Imports Transformed**: All ~/ imports changed to @/registry/
- [ ] **Registry Updated**: Component entry added to registry.json
- [ ] **Dependencies Listed**: All npm and registry dependencies specified
- [ ] **Build Successful**: pnpm registry:build completes without errors
- [ ] **JSON Generated**: Individual component JSON created in public/r/
- [ ] **Installation Tested**: Component installs via shadcn CLI
- [ ] **Types Valid**: Component compiles and type-checks correctly
- [ ] **Documentation Updated**: Component documented if needed

## Integration with Existing Workflows

This process integrates with:

- **@.agent-os/standards/registry-mapping.md**: Registry naming and structure guidelines
- **@.agent-os/instructions/core/maintain-documentation-system.md**: Component documentation requirements
- **@.agent-os/standards/best-practices.md**: General development standards

When adding components, also consider:

- Creating component documentation in `content/docs/`
- Updating navigation in `meta.json` files
- Adding to roadmap progress tracking
