# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-09-11-component-documentation-system/spec.md

## Technical Requirements

### Documentation Structure

- Create organized /content/docs directory structure matching Fumadocs conventions
- Use MDX format for all documentation files with proper frontmatter
- Implement categorized navigation structure (blocks, fields, globals, ui-components)
- Follow consistent naming conventions: kebab-case for files, PascalCase for component names

### Content Requirements

- Document all 16 block variants with props, usage examples, and PayloadCMS configuration
- Document all 17 field types including custom admin UI components and configuration functions
- Document motion primitives with animation presets and implementation examples
- Document 3 global configurations with theme management and admin UI details
- Include registry installation commands for each distributed component

### Integration Specifications

- Integrate with existing Fumadocs setup at /docs endpoint
- Use proper MDX frontmatter for titles, descriptions, and navigation ordering
- Include code blocks with syntax highlighting for TypeScript/React examples
- Implement consistent cross-referencing between related components

### Documentation Categories

- **Blocks**: Hero, Features, CTA, Testimonials, FAQ, Pricing, About, Stats, Newsletter, Header, Footer, Contact, Gallery, Teams
- **Fields**: Header, Subheader, Description, Title, Media, Upload, Color, ColorPalette, Icon, SocialLinks, CallToActionPair, SelectEnum
- **Globals**: SiteConfig, Header, Footer with theme management documentation
- **UI Components**: Motion primitives (animated-group, text-effect) and utilities
- **Core Systems**: RenderBlocks component and form rendering utilities

### Code Example Standards

- Use Fumadocs TypeTable component for displaying TypeScript interfaces and component props
- Define TypeScript interfaces for all block/field component props (Hero_1_Props, etc.)
- Provide PayloadCMS configuration examples for blocks/fields/globals
- Show registry installation commands using npx shadcn add --registry format
- Include common usage patterns and customization examples with prop overrides

### Live Component Previews

- Import actual block components directly in MDX files via Fumadocs mdx-components.ts registration
- Extract default values from PayloadCMS block configurations using utility function
- Pass extracted default values as props to registered MDX components for realistic previews
- Create utility function to extract block defaults from config files at build time for performance
- Register components in Fumadocs MDX component system with pre-computed default props
- Support prop overrides in MDX for demonstrating customization options

### Type Documentation Integration

- Use Fumadocs TypeTable component for displaying component prop interfaces
- Define TypeScript interfaces for all block components (Hero_1_Props, Features_1_Props, etc.)
- Register TypeTable in mdx-components.ts for consistent type documentation
- Generate type definitions that match PayloadCMS block field configurations
- Link TypeTable displays to actual component prop types for accuracy

### Documentation Format Standards

- Live component rendering alongside code examples showing PayloadCMS configuration
- Admin panel links for hands-on customization (complementing read-only live previews)
- Step-by-step configuration guides with TypeScript interface definitions
