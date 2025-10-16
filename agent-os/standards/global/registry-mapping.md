# Registry Component Documentation Mapping

⚠️ **CRITICAL FOR AGENTS**: This file MUST be updated whenever you add new components to the registry.

## Auto-Update Protocol for New Components

When adding new registry components, you MUST update this file with:

1. **Registry Dependencies**: Add new `@uifoundry/*` components to the mapping below
2. **NPM Dependencies**: Add new packages to the GitHub link mapping
3. **Component Descriptions**: Add standardized descriptions for consistency
4. **Path Patterns**: Follow `/docs/[category]/[component-name]` convention

**Failure to update this file will break auto-generated documentation for future components.**

---

## Registry Dependency to Documentation Path Mapping

### UIFoundry Custom Components (@uifoundry/\*)

- `@uifoundry/style-utils` → `/docs/lib/style-utils`
- `@uifoundry/animated-group` → `/docs/ui/animated-group`
- `@uifoundry/text-effect` → `/docs/ui/text-effect`
- `@uifoundry/field-types` → `/docs/lib/field-types`
- `@uifoundry/upload-field` → `/docs/fields/upload-field`
- `@uifoundry/header-field` → `/docs/fields/header-field`
- `@uifoundry/subheader-field` → `/docs/fields/subheader-field`
- `@uifoundry/media-field` → `/docs/fields/media-field`
- `@uifoundry/color-field` → `/docs/fields/color-field`
- `@uifoundry/hero-1` → `/docs/blocks/hero/hero-1`
- `@uifoundry/hero-2` → `/docs/blocks/hero/hero-2`
- `@uifoundry/hero-3` → `/docs/blocks/hero/hero-3`
- `@uifoundry/hero-4` → `/docs/blocks/hero/hero-4`
- `@uifoundry/hero-5` → `/docs/blocks/hero/hero-5`
- `@uifoundry/flickering-grid` → `/docs/ui/flickering-grid`
- `@uifoundry/block-constants` → `/docs/lib/block-constants`
- `@uifoundry/header-1` → `/docs/blocks/header/header-1`
- `@uifoundry/header-2` → `/docs/blocks/header/header-2`
- `@uifoundry/header-3` → `/docs/blocks/header/header-3`
- `@uifoundry/header-4` → `/docs/blocks/header/header-4`
- `@uifoundry/header-5` → `/docs/blocks/header/header-5`
- `@uifoundry/header-blocks` → `/docs/blocks/header-blocks`
- `@uifoundry/renderblocks` → `/docs/ui/renderblocks`
- `@uifoundry/header-global` → `/docs/globals/header-global`
- `@uifoundry/footer-1` → `/docs/blocks/footer/footer-1`
- `@uifoundry/footer-2` → `/docs/blocks/footer/footer-2`
- `@uifoundry/footer-3` → `/docs/blocks/footer/footer-3`
- `@uifoundry/footer-4` → `/docs/blocks/footer/footer-4`
- `@uifoundry/footer-5` → `/docs/blocks/footer/footer-5`
- `@uifoundry/footer-blocks` → `/docs/blocks/footer-blocks`
- `@uifoundry/social-links-field` → `/docs/fields/social-links-field`
- `@uifoundry/social-icons` → `/docs/ui/social-icons`

### ShadCN Components (no @uifoundry prefix)

- `button` → `/docs/ui/button`
- `popover` → `/docs/ui/popover`
- `input` → `/docs/ui/input`
- `label` → `/docs/ui/label`
- `select` → `/docs/ui/select`
- `textarea` → `/docs/ui/textarea`

## NPM Dependency to GitHub Link Mapping

**⚠️ AGENTS: Add new NPM packages here when they appear in registry.json dependencies**

### Common Dependencies

- `react` → `https://github.com/facebook/react`
- `next` → `https://github.com/vercel/next.js`
- `lucide-react` → `https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react`
- `payload` → `https://github.com/payloadcms/payload`
- `motion` → `https://github.com/framer/motion`
- `clsx` → `https://github.com/lukeed/clsx`
- `tailwind-merge` → `https://github.com/dcastil/tailwind-merge`
- `@payloadcms/ui` → `https://github.com/payloadcms/payload/tree/main/packages/ui`
- `@uiw/react-color-sketch` → `https://github.com/uiwjs/react-color`

## Component Descriptions

**⚠️ AGENTS: Add descriptions for new components to maintain consistency**

### UIFoundry Components

- `@uifoundry/style-utils`: Tailwind utility functions including `cn()` class merger
- `@uifoundry/animated-group`: Motion primitive for animating groups of elements
- `@uifoundry/text-effect`: Text animation effects with staggered reveals
- `@uifoundry/field-types`: TypeScript definitions for PayloadCMS fields
- `@uifoundry/upload-field`: PayloadCMS media upload field configuration
- `@uifoundry/header-field`: PayloadCMS text field for headers
- `@uifoundry/subheader-field`: PayloadCMS text field for subheaders
- `@uifoundry/media-field`: PayloadCMS dual upload field (light/dark variants)
- `@uifoundry/color-field`: PayloadCMS color picker field with custom admin UI
- `@uifoundry/hero-1`: Hero section block with animated text effects and CTAs
- `@uifoundry/hero-2`: Alternative hero section layout with split design
- `@uifoundry/hero-3`: Hero section with video background, centered layout, and two CTAs
- `@uifoundry/hero-4`: Hero section with badge, email signup form, feature list, and background image
- `@uifoundry/hero-5`: Hero section with animated FlickeringGrid background, alert banner, and dual CTAs
- `@uifoundry/flickering-grid`: Animated flickering grid background component with canvas rendering
- `@uifoundry/block-constants`: Block slug and group constants for PayloadCMS blocks
- `@uifoundry/header-1`: Header block with adaptive scroll-based styling and rounded border
- `@uifoundry/header-2`: Header block with full-width border bottom and backdrop blur
- `@uifoundry/header-3`: Header block with scroll-based backdrop blur animation using Framer Motion
- `@uifoundry/header-4`: Header block with dashed border and light background styling
- `@uifoundry/header-5`: Header block with fixed backdrop blur and border bottom
- `@uifoundry/renderblocks`: Component for rendering PayloadCMS blocks
- `@uifoundry/footer-1`: Footer block with centered layout, brand logo, navigation links, social icons, and copyright
- `@uifoundry/footer-2`: Footer block with grid layout, brand logo, grouped navigation links, social icons, and copyright
- `@uifoundry/footer-3`: Footer block with horizontal layout, brand logo at top with social icons, grouped navigation links below, and copyright
- `@uifoundry/footer-4`: Footer block with minimal layout, copyright text, and inline navigation links
- `@uifoundry/footer-5`: Footer block with flexible grid layout, brand logo with social icons header, grouped navigation links, and rounded copyright section with action links
- `@uifoundry/social-links-field`: PayloadCMS field for managing social media links with icon selection
- `@uifoundry/social-icons`: Social media icon components and types

### ShadCN Components

- `button`: Customizable button component with variants
- `popover`: Floating UI popover component
- `input`: Styled input field component
- `label`: Form label component
- `select`: Dropdown selection component
- `textarea`: Multi-line text input component
