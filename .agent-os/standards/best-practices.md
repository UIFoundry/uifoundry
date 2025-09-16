# Development Best Practices

## Context

Global development guidelines for Agent OS projects.

<conditional-block context-check="core-principles">
IF this Core Principles section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using Core Principles already in context"
ELSE:
  READ: The following principles

## Core Principles

### Keep It Simple

- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones

### Optimize for Readability

- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what"

### DRY (Don't Repeat Yourself)

- Extract repeated payload configuration definitions into reusable fields, blocks, or collections as necessary
- Create utility functions for common operations across multiple components

### File Structure

- Keep files focused on a single responsibility
- Group related functionality together
- Use consistent naming conventions

### PayloadCMS Architecture

For PayloadCMS-specific projects, follow the colocated organization patterns documented in [payload-architecture.md](./payload-architecture.md). This architecture provides:

- **Modularity**: Self-contained blocks, fields, and globals with `config.ts` + `index.tsx` pattern
- **Portability**: Copy-paste entire directories between projects
- **Registry Integration**: Structure designed for custom Shadcn registries
- **Type Safety**: Automated TypeScript interface generation from PayloadCMS configs
- **Reusability**: Function-based field configurations that accept customization props

This pattern ensures consistency across PayloadCMS structures while maintaining the core principles of simplicity and readability outlined above.
</conditional-block>

<conditional-block context-check="dependencies" task-condition="choosing-external-library">
IF current task involves choosing an external library:
  IF Dependencies section already read in current context:
    SKIP: Re-reading this section
    NOTE: "Using Dependencies guidelines already in context"
  ELSE:
    READ: The following guidelines
ELSE:
  SKIP: Dependencies section not relevant to current task

## Dependencies

### Choose Libraries Wisely

When adding third-party dependencies:

- Select the most popular and actively maintained option
- Check the library's GitHub repository for:
  - Recent commits (within last 6 months)
  - Active issue resolution
  - Number of stars/downloads
  - Clear documentation
- Get User permission before installing any third party dependencies
  </conditional-block>

## Specification Creation

### Agent Documentation Links

All specifications must include relevant agent documentation links to ensure implementation consistency:

- **Main Spec**: Include "Relevant Agent Documentation" section with context-appropriate links
- **Technical Spec**: Include "Implementation Guidelines" section with standards and architecture docs
- **Context-Based Linking**: Dynamically include relevant docs based on spec type:
  - Component specs: documentation-template.md, registry-mapping.md
  - PayloadCMS specs: payload-architecture.md, component-documentation-checklist.md
  - Frontend specs: code-style guides, best-practices.md

This ensures agents have immediate access to established patterns and standards when implementing specifications.
