# Spec Requirements Document

> Spec: Custom Shadcn Registry
> Created: 2025-08-28

## Overview

Implement a custom shadcn component registry for UIFoundry that allows users to install UIFoundry's professionally designed components via the shadcn CLI. This registry will serve as the foundation for distributing UIFoundry's premium component library and provide seamless integration with the existing shadcn ecosystem.

## User Stories

### Developer Component Installation

As a developer purchasing UIFoundry, I want to install UIFoundry components using the standard `npx shadcn add` command, so that I can quickly integrate premium components into my projects using familiar tooling.

The developer would run `npx shadcn add --registry https://uifoundry.com/registry hero-1` to install a specific Hero component variant, receiving the TypeScript component file, associated dependencies, and Tailwind configuration updates automatically.

### Component Library Management

As a UIFoundry maintainer, I want to manage and version our component library through a centralized registry, so that I can distribute updates, track usage, and maintain compatibility across different projects.

The maintainer would update component definitions in the registry, version components appropriately, and ensure that developers receive the correct dependencies and configurations for each component.

### Custom Component Discovery

As a developer, I want to browse available UIFoundry components through both the shadcn CLI and a web interface, so that I can discover and evaluate components before installation.

The developer could run `npx shadcn add --registry https://uifoundry.com/registry` to see all available components or visit the registry website to preview components with live examples.

## Spec Scope

1. **Registry API Endpoints** - RESTful API serving component metadata, file contents, and dependency information in shadcn-compatible format
2. **Component Definition System** - Standardized format for defining UIFoundry components with variants, dependencies, and configuration
3. **Web Interface** - Browse components with live previews, installation instructions, and usage examples
4. **CLI Integration** - Full compatibility with shadcn CLI for seamless component installation
5. **Version Management** - Component versioning system with backward compatibility and update notifications

## Out of Scope

- Component analytics and usage tracking
- User authentication for registry access
- Component marketplace or paid component tiers
- Integration with external component libraries
- Custom CLI wrapper beyond standard shadcn compatibility

## Expected Deliverable

1. Functional registry API at `/api/registry` that responds to shadcn CLI requests with proper component definitions and files
2. Web interface at `/registry` displaying all available UIFoundry components with installation instructions and live previews
3. All existing UIFoundry blocks converted to registry-compatible component definitions with proper metadata and dependencies
