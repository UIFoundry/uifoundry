# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-08-28-custom-shadcn-registry/spec.md

## Technical Requirements

- **Registry API Structure**: Implement REST endpoints that mirror the shadcn registry format including `/api/registry/index.json` for component listing and `/api/registry/[component].json` for individual component metadata
- **Component Definition Format**: Create JSON schema for component definitions including name, type, dependencies, files array with content and target paths, and tailwind config requirements
- **File Content Management**: Store component TypeScript files in a structured directory under `/registry/` with proper imports, exports, and type definitions
- **Dependency Resolution**: Automatically include required npm packages, internal component dependencies, and Tailwind CSS configurations in component definitions
- **Web Interface Development**: Build Next.js pages under `/app/registry/` route with component previews using React Server Components and proper SEO optimization
- **CLI Compatibility**: Ensure full compatibility with shadcn CLI by implementing the exact API contract expected by `npx shadcn add` command
- **Component Conversion**: Convert existing UIFoundry payload blocks to standalone React components with proper props interfaces and documentation
- **Version Management**: Implement semantic versioning for components with backward compatibility checks and update notifications
- **Performance Optimization**: Use Next.js static generation for component listings and implement proper caching headers for API responses
- **Type Safety**: Generate TypeScript definitions for all registry components and ensure type safety across the entire registry system

## External Dependencies

- **@shadcn/ui**: Required for understanding the registry format and ensuring compatibility with the official shadcn CLI tooling
- **Justification**: Essential for implementing the exact API contract that the shadcn CLI expects, ensuring seamless integration with the existing ecosystem

- **gray-matter**: Required for parsing frontmatter in component files and managing metadata
- **Justification**: Needed to extract component metadata, descriptions, and configuration from component files in a standardized format

- **react-syntax-highlighter**: Required for displaying component source code in the web interface
- **Justification**: Provides syntax highlighting for TypeScript/React code examples in the component browser interface
