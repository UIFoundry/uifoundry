# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-09-15-registry-component-addition/spec.md

## Implementation Guidelines

Follow these agent documentation standards:

- **Code Style**: @.agent-os/standards/code-style.md
- **Best Practices**: @.agent-os/standards/best-practices.md
- **Documentation Template**: @.agent-os/standards/documentation-template.md
- **Registry Mapping**: @.agent-os/standards/registry-mapping.md

## Technical Requirements

### Registry Structure Analysis

- **Directory Mapping**: Document how `src/payload/blocks/Hero/Hero_1/` maps to `registry/payload/blocks/hero/hero-1/`
- **Naming Conventions**: Analyze PascalCase to kebab-case transformations and underscore handling
- **File Organization**: Document the relationship between config.ts and index.tsx files in both source and registry
- **Constants Mapping**: Document how constants are duplicated between `src/payload/constants/` and `registry/payload/constants/`

### Import Pattern Transformations

- **Source Import Analysis**: Document all `~/` alias patterns used in source components
- **Registry Import Mapping**: Map source imports to their registry equivalents (`@/registry/default/lib/`)
- **Dependency Resolution**: Analyze how registry dependencies reference other registry components
- **Type Import Handling**: Document how PayloadCMS type imports are handled in registry context

### Component Migration Process

- **File Copying Procedure**: Step-by-step process for copying files from src/ to registry/ with proper renaming
- **Import Transformation Rules**: Automated or manual process for converting import paths
- **Content Modification**: Document any other changes needed beyond import paths
- **Validation Steps**: Ensure copied components compile and function correctly

### Registry Configuration System

- **registry.json Structure**: Document the schema and required fields for registry items
- **Dependency Management**: How to specify npm dependencies vs registry dependencies
- **File Path Mapping**: How to configure source paths and target installation paths
- **Component Types**: Different registry types (registry:block, registry:component, registry:lib, etc.)

### Build and Distribution Process

- **Build Command**: How `pnpm registry:build` processes components via `shadcn build`
- **JSON Generation**: How individual component JSON files are created in `public/r/`
- **Content Embedding**: How component source code is embedded in JSON metadata
- **Registry Endpoint**: How the local registry endpoint serves component definitions

### Testing and Validation

- **CLI Installation Testing**: Process for testing `npx shadcn add @uifoundry/component-name`
- **Component Functionality**: Validating that installed components work correctly
- **Dependency Resolution**: Ensuring all dependencies install properly
- **Integration Testing**: Testing components within a real project context

### Agent Documentation Requirements

- **Process Documentation**: Step-by-step instructions for agents to follow
- **Pattern Recognition**: How to identify components suitable for registry distribution
- **Troubleshooting Guide**: Common issues and their solutions
- **Validation Checklist**: Comprehensive checklist for ensuring successful component addition

## Implementation Phases

### Phase 1: Analysis and Documentation

1. Analyze existing registry structure and patterns
2. Document import transformation rules
3. Create comprehensive process documentation
4. Validate documentation with existing components

### Phase 2: Process Validation

1. Test the documented process by adding a new component
2. Identify any gaps or issues in the process
3. Refine documentation based on testing results
4. Create agent documentation templates

### Phase 3: Agent Documentation Creation

1. Create agent-focused documentation in @.agent-os/instructions/core/
2. Update registry mapping guidelines
3. Create troubleshooting and validation resources
4. Document integration with existing documentation workflows

## Success Criteria

- Agents can successfully add new components to the registry following documented process
- Registry components install correctly via shadcn CLI
- Component functionality is preserved in registry distribution
- Documentation is comprehensive enough for troubleshooting and maintenance
