# Component Documentation Checklist

⚠️ **MANDATORY FOR AGENTS**: When you add new components to the registry, you MUST:

1. Follow this checklist for the new component documentation
2. Update the "Common Dependencies Quick Reference" section below with any new packages
3. Update `.agent-os/standards/registry-mapping.md` with new dependency mappings
4. This prevents documentation drift and ensures consistency across all components

## Required Sections for All Components

### ✅ 1. Preview

- [ ] Live component render with `<ComponentName />`
- [ ] Shows default values/behavior
- [ ] Loads without props

### ✅ 2. Props

- [ ] TypeTable with all PayloadCMS configuration fields
- [ ] Includes description, type, default value, required status
- [ ] Matches actual component interface

### ✅ 3. Installation

- [ ] Registry command: `npx shadcn add --registry https://uifoundry.com/r component-name`
- [ ] Link to registry setup guide for troubleshooting
- [ ] Component name matches registry.json exactly

### ✅ 4. Registry Dependencies

- [ ] Lists all `registryDependencies` from registry.json
- [ ] Each dependency links to its documentation page
- [ ] Includes brief description of each dependency
- [ ] Links follow pattern: `/docs/[category]/[component-name]`

### ✅ 5. Dependencies

- [ ] Lists all `dependencies` from registry.json
- [ ] Each dependency links to official GitHub repository
- [ ] Includes brief description of each package
- [ ] Uses consistent descriptions for common packages

## Component Categories and Paths

### Blocks (`registry:block`)

- Path: `/docs/blocks/[component-name].mdx`
- Examples: hero-1, header-1, stats-1

### Fields (`registry:field`)

- Path: `/docs/fields/[component-name].mdx`
- Examples: header-field, media-field, color-field

### UI Components (`registry:ui`)

- Path: `/docs/ui/[component-name].mdx`
- Examples: button, animated-group, text-effect

### Library (`registry:lib`)

- Path: `/docs/lib/[component-name].mdx`
- Examples: style-utils, field-types

### Globals (`registry:global`)

- Path: `/docs/globals/[component-name].mdx`
- Examples: header-global, footer-global

## Quality Checklist

### Content Quality

- [ ] All links work and point to correct pages
- [ ] Descriptions are clear and helpful
- [ ] Examples show realistic usage
- [ ] Default values match component configuration

### Technical Accuracy

- [ ] Registry dependencies match registry.json exactly
- [ ] NPM dependencies match registry.json exactly
- [ ] Component props match PayloadCMS configuration
- [ ] Installation command uses correct component name

### Consistency

- [ ] Follows standard section order
- [ ] Uses consistent language and tone
- [ ] Links use consistent format
- [ ] Descriptions match established patterns

## Common Dependencies Quick Reference

**⚠️ AGENTS: UPDATE THIS SECTION when adding new components with new dependencies**

### Registry Dependencies

- `button` → "Customizable button component with variants"
- `@uifoundry/animated-group` → "Motion primitive for animating groups of elements"
- `@uifoundry/text-effect` → "Text animation effects with staggered reveals"
- `@uifoundry/style-utils` → "Tailwind utility functions including cn() class merger"
- `@uifoundry/media-field` → "PayloadCMS dual upload field (light/dark variants)"

### NPM Dependencies

- `react` → "JavaScript library for building user interfaces"
- `next` → "React framework for production"
- `lucide-react` → "Beautiful & consistent icon toolkit"
- `payload@^3.49.1` → "Headless CMS and application framework"
- `motion` → "Production-ready motion library for React"
