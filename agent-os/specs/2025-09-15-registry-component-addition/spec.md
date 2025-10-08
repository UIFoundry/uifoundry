# Spec Requirements Document

> Spec: Registry Component Addition Process
> Created: 2025-09-15

## Relevant Agent Documentation

For implementing this spec, refer to these agent docs:

- **Best Practices**: @.agent-os/standards/best-practices.md
- **Code Style Standards**: @.agent-os/standards/code-style.md
- **Documentation System**: @.agent-os/instructions/core/maintain-documentation-system.md
- **Component Documentation Checklist**: @.agent-os/instructions/core/component-documentation-checklist.md
- **Documentation Template**: @.agent-os/standards/documentation-template.md
- **Registry Mapping Guidelines**: @.agent-os/standards/registry-mapping.md

## Overview

Create a comprehensive, repeatable process for adding new components to the UIFoundry custom shadcn registry. This process will enable agents to systematically analyze the current registry structure, understand import patterns and dependencies, document the procedure for copying components from src/ to registry/ with proper import modifications, configure registry metadata, test component installation via shadcn CLI, and create standardized agent documentation for future use.

## User Stories

### Agent Automation Story

As an agent working on UIFoundry, I want a standardized process for adding components to the registry, so that I can consistently distribute new PayloadCMS blocks, fields, globals, and UI components without errors or missing steps.

The agent needs a step-by-step workflow that covers analyzing existing patterns in the registry/, understanding how imports are transformed from source to registry format, properly configuring metadata and dependencies, and validating that components install correctly via the shadcn CLI.

### Developer Distribution Story

As a developer creating new UIFoundry components, I want those components automatically available through the custom registry, so that other developers can install them using familiar shadcn CLI commands.

The developer needs assurance that when they create new blocks, fields, or UI components following UIFoundry patterns, the registry distribution process will handle all the necessary transformations, dependency mappings, and metadata generation to make components installable.

### Registry Maintenance Story

As a maintainer of the UIFoundry registry system, I want clear documentation of the registry architecture and component addition process, so that I can troubleshoot issues, onboard new contributors, and evolve the registry system over time.

The maintainer needs comprehensive documentation covering the registry structure, import transformation patterns, build process, JSON metadata format, dependency resolution, and testing procedures.

## Spec Scope

1. **Registry Structure Analysis** - Document the current registry/ directory organization, file naming conventions, and how it mirrors the src/ structure
2. **Import Pattern Documentation** - Map all import transformations from source (`~/`) to registry (`@/registry/`) patterns with specific examples
3. **Component Migration Process** - Create step-by-step procedure for copying components from src/ to registry/ with proper modifications
4. **Registry Configuration System** - Document how to configure component metadata, dependencies, and build settings in registry.json
5. **Testing and Validation Process** - Establish procedures for testing component installation via shadcn CLI and validating functionality
6. **Agent Documentation Creation** - Create comprehensive agent documentation that can be referenced for future component additions

## Expected Deliverable

1. Complete analysis of existing registry structure with documented patterns and conventions
2. Step-by-step agent documentation for adding new components to the registry
3. Validation that the documented process works by testing with an existing component
