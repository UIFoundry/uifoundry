# Documentation Template for Registry Components

⚠️ **IMPORTANT FOR AGENTS**: When adding new components to the registry, you MUST:

1. Create documentation following this template
2. Update `.agent-os/standards/registry-mapping.md` with new dependency mappings
3. Update `.agent-os/instructions/core/component-documentation-checklist.md` with new common dependencies
4. This ensures future agents can auto-generate accurate documentation without manual intervention

## Standard Structure for Component Documentation

All UIFoundry registry components should follow this standardized documentation structure:

### 1. Preview

- Live render of the component with default props
- Uses the actual component with no props to show defaults
- Format: `<ComponentName />`

### 2. Props

- TypeTable showing all available props from PayloadCMS config
- Include description, type, default values, and required status
- Auto-generated from the component's payload configuration

### 3. Installation

- Registry command to install the component
- Format: `npx shadcn add --registry https://uifoundry.com/r [component-name]`
- Include troubleshooting link to registry setup guide

### 4. Registry Dependencies

- Links to documentation for all `registryDependencies` from registry.json
- Each dependency should link to its respective documentation page
- Format: `[Component Name](/docs/category/component-name) - Brief description`

### 5. Dependencies

- NPM packages required for the component to function
- Links to official GitHub repositories
- Format: `[Package Name](github-link) - Brief description`

## Automation Rules

### Registry Dependencies Section

- Auto-generate from `registryDependencies` array in registry.json
- Map registry dependency names to documentation paths:
  - `button` → `/docs/ui/button`
  - `@uifoundry/component-name` → `/docs/[category]/component-name`
  - Categories: blocks, fields, globals, ui, lib

### Dependencies Section

- Auto-generate from `dependencies` array in registry.json
- Map common packages to GitHub links:
  - `react` → `https://github.com/facebook/react`
  - `next` → `https://github.com/vercel/next.js`
  - `lucide-react` → `https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react`
  - `payload` → `https://github.com/payloadcms/payload`
  - Add other common packages as needed

## File Naming Convention

- Components: `/docs/[category]/[component-name].mdx`
- Categories: blocks, fields, globals, ui, lib
- Use kebab-case for file names
- Match registry item names exactly

## MDX Component Registration

**CRITICAL**: For components to render in documentation previews, they must be registered in `src/app/(fumadocs)/mdx-components.tsx`:

### Registration Steps

1. **Import component and config**:

   ```tsx
   import ComponentName from "~/payload/blocks/Category/ComponentName";
   import { ComponentName_Block } from "~/payload/blocks/Category/ComponentName/config";
   ```

2. **Import TypeScript type**:

   ```tsx
   import type { ComponentName_Block as ComponentNameBlockType } from "~/payload-types";
   ```

3. **Extract default values**:

   ```tsx
   const componentNameDefaults = extractBlockDefaults(ComponentName_Block);
   ```

4. **Register in getMDXComponents**:
   ```tsx
   ComponentName: (props: Partial<ComponentNameBlockType> = {}) => {
     const combinedProps = {
       ...componentNameDefaults,
       ...props,
     } as ComponentNameBlockType;
     const { id, ...otherProps } = combinedProps;
     return <ComponentName {...otherProps} id={id ?? undefined} preview />;
   },
   ```

### UI Component Registration

For UI components (non-PayloadCMS), simpler registration:

```tsx
import { ComponentName } from "~/components/ComponentName";

// In getMDXComponents:
ComponentName: (props) => <ComponentName {...props} />,
```

## Frontmatter Template

```yaml
---
title: "[Component Title]"
description: "[Brief description of component functionality]"
category: "[blocks|fields|globals|ui|lib]"
---
```
