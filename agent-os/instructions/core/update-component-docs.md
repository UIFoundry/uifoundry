# Component Documentation Update Instructions

⚠️ **CRITICAL AGENT WORKFLOW**: Every time you add new components to the registry, you MUST:

## MANDATORY STEPS FOR NEW COMPONENTS:

1. **Create documentation** following the 5-section template
2. **Update `.agent-os/standards/registry-mapping.md`** with new dependency mappings
3. **Update `.agent-os/instructions/core/component-documentation-checklist.md`** with new common dependencies
4. **Update this file** if new dependency patterns emerge

**Skipping these steps will break the auto-generation system for future agents.**

---

## Overview

When updating component documentation, follow the standardized structure and automatically generate dependency sections from the registry.json file.

## Standard Documentation Structure

### 1. Preview Section

```markdown
## Preview

<ComponentName />
```

### 2. Props Section

```markdown
## Props

The ComponentName accepts the following props from PayloadCMS:

<TypeTable
type={{
    // Auto-generated from PayloadCMS config
  }}
/>
```

### 3. Installation Section

````markdown
## Installation

```bash
npx shadcn add --registry https://uifoundry.com/r component-name
```
````

If you encounter issues, check the [registry setup guide](/docs/guides/registry-setup) for configuration help.

````

### 4. Registry Dependencies Section
```markdown
## Registry Dependencies

This component uses the following registry components:

- [Component Name](/docs/category/component-name) - Description
````

### 5. Dependencies Section

```markdown
## Dependencies

This component requires the following NPM packages:

- [Package Name](github-link) - Description
```

## Auto-Generation Rules

### Registry Dependencies

Map from `registryDependencies` array in registry.json:

- `button` → `/docs/ui/button` - "Customizable button component with variants"
- `@uifoundry/animated-group` → `/docs/ui/animated-group` - "Motion primitive for animating groups of elements"
- `@uifoundry/text-effect` → `/docs/ui/text-effect` - "Text animation effects with staggered reveals"
- `@uifoundry/style-utils` → `/docs/lib/style-utils` - "Tailwind utility functions including cn() class merger"
- `@uifoundry/media-field` → `/docs/fields/media-field` - "PayloadCMS dual upload field (light/dark variants)"
- `@uifoundry/header-field` → `/docs/fields/header-field` - "PayloadCMS text field for headers"
- `@uifoundry/subheader-field` → `/docs/fields/subheader-field` - "PayloadCMS text field for subheaders"
- `@uifoundry/field-types` → `/docs/lib/field-types` - "TypeScript definitions for PayloadCMS fields"

### NPM Dependencies

Map from `dependencies` array in registry.json:

- `react` → `https://github.com/facebook/react` - "JavaScript library for building user interfaces"
- `next` → `https://github.com/vercel/next.js` - "React framework for production"
- `lucide-react` → `https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react` - "Beautiful & consistent icon toolkit"
- `payload@^3.49.1` → `https://github.com/payloadcms/payload` - "Headless CMS and application framework"
- `motion` → `https://github.com/framer/motion` - "Production-ready motion library for React"

## Implementation Steps

1. Read the component's registry.json entry (e.g., `/public/r/hero-1.json`)
2. Extract `registryDependencies` and `dependencies` arrays
3. Map each dependency to its documentation path and description
4. Generate the appropriate sections with links and descriptions
5. Maintain consistent formatting and descriptions

## File Locations

- Registry files: `/public/r/[component-name].json`
- Documentation: `/content/docs/[category]/[component-name].mdx`
- Mapping reference: `/.agent-os/standards/registry-mapping.md`
