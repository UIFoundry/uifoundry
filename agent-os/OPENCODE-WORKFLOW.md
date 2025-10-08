# Agent OS 2.0 Workflow for OpenCode

This guide explains how to use Agent OS 2.0's spec-driven development workflow with OpenCode (Claude Code).

## Overview

Agent OS 2.0 provides a structured, repeatable process for building features with AI agents. The workflow ensures quality through specification planning, task breakdown, implementation, and verification.

## The Spec-Driven Development Cycle

### Phase 0: Plan Product (One-Time Setup)

**When to run**: Once at project start or when installing Agent OS 2.0

**Purpose**: Define product mission, roadmap, and tech stack

**Workflow File**: `workflows/planning/plan-product.md`

**What gets created**:

- `product/mission.md` - Product vision and goals
- `product/roadmap.md` - Development roadmap and priorities
- `product/tech-stack.md` - Technical architecture decisions

**Key Outputs**:

- Strategic product mission statement
- Projected feature development roadmap
- Technology stack documentation

This phase ensures all future feature work aligns with high-level product goals.

---

### Phase 1: New Spec (Feature Research)

**When to run**: At the start of each new feature or initiative

**Purpose**: Gather comprehensive requirements through agent-assisted research

**Workflow File**: Would be `workflows/specification/new-spec.md` (create if needed)

**Process**:

1. Create dated spec folder: `specs/YYYY-MM-DD-feature-name/`
2. Interactive research and planning session
3. Gather visual assets (mockups, wireframes, screenshots)
4. Document requirements and constraints
5. Analyze existing code patterns

**Key Activities**:

- Agent-assisted Q&A to understand feature scope
- Visual reference gathering for UI features
- Existing pattern analysis for consistency
- Requirement documentation

**Outputs**:

- Spec folder structure created
- Requirements documented
- Visual assets organized
- Pattern analysis completed

---

### Phase 2: Create Spec (Detailed Planning)

**When to run**: After requirements gathering in Phase 1

**Purpose**: Transform researched requirements into actionable specification

**Workflow File**: `workflows/specification/create-spec.md`

**Process**:

1. Review gathered requirements from Phase 1
2. Create detailed feature specification
3. Break down into specific, actionable tasks
4. Assign tasks to appropriate agent types
5. Define success criteria and verification steps

**Key Sections in Spec**:

- Feature overview and goals
- Technical architecture and approach
- Detailed task breakdown
- Agent assignments for each task
- Success criteria and validation
- Dependencies and constraints

**Outputs**:

- `specs/[date-feature]/spec.md` - Comprehensive specification
- `specs/[date-feature]/tasks.md` - Task breakdown with assignments
- `specs/[date-feature]/spec-lite.md` - Quick reference version (optional)

**Task Assignment Guidelines**:

- **Planning/Architecture**: `@spec-planner`
- **Source Development**: `@source-helper`
- **Registry Migration**: `@registry-porter`
- **Documentation**: `@docs-writer`
- **Code Review**: `@code-reviewer`

---

### Phase 3: Implement Spec (Execution)

**When to run**: After spec creation in Phase 2

**Purpose**: Execute tasks with specialized agents and verify at each step

**Workflow File**: `workflows/implementation/execute-tasks.md`

**Process**:

1. Load specification and task list
2. Execute tasks in dependency order
3. Use assigned specialist agents for each task
4. Verify completion before proceeding
5. Document implementation decisions
6. Create implementation report

**Execution Patterns**:

#### Automated Pipeline (Recommended)

```bash
# Switch to task coordinator
Tab → task-coordinator

# Execute all tasks with automatic agent delegation
/execute-tasks
```

The coordinator will:

- Read the specification
- Execute tasks in proper order
- Delegate to specialist agents
- Verify each phase
- Handle task dependencies

#### Manual Agent Delegation

```bash
# Development phase
@source-helper Implement Hero_4 block following spec

# Registry migration phase
@registry-porter Move Hero_4 to registry with testing

# Documentation phase
@docs-writer Create Hero_4 documentation
```

**Verification at Each Step**:

- **Implementation**: Code works in development (`localhost:3001`)
- **Registry**: CLI installation succeeds
- **Browser**: Component functions correctly
- **Documentation**: Complete and accurate

**Key Files**:

- `workflows/implementation/execute-task.md` - Single task execution
- `workflows/implementation/execute-tasks.md` - Full pipeline
- `workflows/implementation/post-execution-tasks.md` - Cleanup and finalization

**Outputs**:

- Implemented feature
- Tested registry components
- Complete documentation
- Implementation report in spec folder

---

## OpenCode Specialist Agents

### Available Agents

#### @spec-planner

**Purpose**: Feature planning and architecture
**Use for**: Creating specifications, task breakdowns, architectural decisions
**Tools**: File operations, search (no bash for safety)

```bash
@spec-planner Create detailed spec for multi-site architecture feature
```

#### @source-helper

**Purpose**: Source code development and debugging
**Use for**: Implementing features in `src/`, debugging TypeScript issues, testing
**Tools**: Full access including Playwright browser

```bash
@source-helper Implement new Hero block variant in src/payload/blocks/
@source-helper Debug TypeScript error in field configuration
@source-helper Test component at localhost:3001
```

#### @registry-porter

**Purpose**: Registry migration and validation
**Use for**: Moving components to registry, CLI testing, browser validation
**Tools**: Full access including Playwright browser

```bash
@registry-porter Move Hero_4 from src/ to registry/
@registry-porter Test Hero_4 installation via shadcn CLI
@registry-porter Validate component in browser at localhost:3001
```

#### @docs-writer

**Purpose**: Documentation creation and maintenance
**Use for**: Component docs, registry mappings, navigation updates
**Tools**: File operations only (no bash)

```bash
@docs-writer Create documentation for Hero_4 component
@docs-writer Update registry mapping with new dependencies
@docs-writer Fix broken links in component documentation
```

#### @code-reviewer

**Purpose**: Code quality review
**Use for**: Best practice validation, pattern compliance, code review
**Tools**: File operations, analysis tools

```bash
@code-reviewer Review Hero_4 implementation for best practices
@code-reviewer Check if component follows UIFoundry conventions
```

---

## Standards Injection System

### How Standards Work in Agent OS 2.0

Standards are automatically injected into agent instructions based on their role:

- **Global Standards** (`standards/global/*`) → All agents
- **Frontend Standards** (`standards/frontend/*`) → UI/component agents
- **Backend Standards** (`standards/backend/*`) → API/database agents
- **Testing Standards** (`standards/testing/*`) → Testing/verification agents

### Key Standards Files

#### Critical (Always Read First)

- `standards/global/critical-restrictions.md` - Deployment/git restrictions
- `standards/global/opencode-agent-workflow.md` - Agent integration guide

#### Component Development

- `workflows/documentation/maintain-documentation-system.md` - Component workflow
- `standards/global/documentation-template.md` - 5-section template
- `standards/global/registry-mapping.md` - Dependency mappings
- `workflows/documentation/component-documentation-checklist.md` - Quality checklist

#### Testing

- `workflows/documentation/registry-testing-protocol.md` - Registry testing
- `standards/testing/unit-tests.md` - Unit test standards
- `standards/testing/coverage.md` - Coverage requirements

#### Architecture

- `standards/global/payload-architecture.md` - PayloadCMS patterns
- `standards/global/best-practices.md` - General best practices
- `standards/global/conventions.md` - Naming and code style

---

## Practical Usage Examples

### Example 1: Full Feature Development

```bash
# Phase 1: Research (if needed, gather requirements)
# Manual research or interactive session

# Phase 2: Create Specification
@spec-planner Create detailed spec for Stats block component with 3 variants

# Wait for spec creation in specs/YYYY-MM-DD-stats-block/

# Phase 3: Execute Tasks
Tab → task-coordinator
/execute-tasks

# Coordinator automatically:
# 1. @source-helper implements Stats_1, Stats_2, Stats_3 in src/
# 2. @registry-porter migrates to registry/ with testing
# 3. @docs-writer creates documentation
# 4. @code-reviewer validates implementation
```

### Example 2: Component Development (Manual)

```bash
# Step 1: Implement in source
@source-helper Create Hero_5 block in src/payload/blocks/Hero/Hero_5/
# Agent creates config.ts and index.tsx, tests at localhost:3001

# Step 2: Migrate to registry
@registry-porter Copy Hero_5 to registry with proper imports
# Agent updates imports, tests CLI installation, validates in browser

# Step 3: Create documentation
@docs-writer Create Hero_5 documentation following 5-section template
# Agent creates MDX file, updates meta.json, updates mappings
```

### Example 3: Bug Fix Workflow

```bash
# Step 1: Debug issue
@source-helper Debug TypeScript error in Header field config
# Agent analyzes code, fixes issue, tests in development

# Step 2: Update registry if needed
@registry-porter Update Header field in registry to match source fix
# Agent syncs changes, tests installation

# Step 3: Update docs if needed
@docs-writer Update Header field documentation with fix notes
# Agent updates docs, adds troubleshooting section
```

### Example 4: Documentation Update

```bash
# Single-agent documentation update
@docs-writer Update all component docs to include dark mode examples

# Agent reads workflows/documentation/component-documentation-checklist.md
# Updates each component's MDX file
# Verifies all links and examples work
# Updates registry mappings if needed
```

---

## Component Development Workflow (UIFoundry Specific)

### Standard 6-Step Process

**See**: `workflows/documentation/maintain-documentation-system.md`

#### 1. Build & Test in Source (`src/`)

- Develop in `src/payload/blocks/`, `src/payload/fields/`, etc.
- Test thoroughly at `localhost:3001`
- Ensure component works exactly as intended

**Agent**: `@source-helper`

#### 2. Copy to Registry (`registry/`)

- Copy to appropriate registry location
- Update imports to registry-compatible paths
- Replace internal dependencies with registry versions

**Agent**: `@registry-porter` (can also update imports)

#### 3. Update Registry Integration

- Add to `registry.json`
- Update exports and dependencies
- Ensure proper registry structure

**Agent**: `@registry-porter`

#### 4. Test Registry Installation

```bash
npx shadcn@latest add @uifoundry/[component-name]
```

- Verify installation succeeds
- Check dependency resolution
- Ensure no import errors

**Agent**: `@registry-porter` (handles CLI testing)

#### 5. Create/Update Documentation

- Follow 5-section template
- Update `meta.json` navigation
- Include usage examples
- Document all configuration options

**Agent**: `@docs-writer`

#### 6. Validate Complete Integration

- Registry component works independently
- Documentation complete and accurate
- Installation successful
- No broken links

**Agents**: `@registry-porter` + `@docs-writer`

---

## Registry Testing Protocol

**See**: `workflows/documentation/registry-testing-protocol.md`

### Two-Phase Testing

#### Phase 1: CLI Installation Testing

```bash
npx shadcn@latest add @uifoundry/[component-name]
```

**Validation**:

- ✅ Installs without errors
- ✅ Dependencies resolve correctly
- ✅ No import errors
- ✅ Files placed correctly

**Agent**: `@registry-porter`

#### Phase 2: Browser Functional Testing

**Environment**: `localhost:3001` (dev server always running)

**Process**:

1. Navigate to component page
2. Capture visual snapshots
3. Test interactive elements
4. Check console for errors
5. Test responsive design

**Tools**: Playwright browser automation

**Agent**: `@registry-porter` or `@source-helper`

---

## Best Practices

### When to Use Full Pipeline

- ✅ New component development
- ✅ Complex feature implementation
- ✅ First-time component creation
- ✅ Multi-step features requiring coordination

**Use**: `Tab → task-coordinator` + `/execute-tasks`

### When to Use Manual Delegation

- ✅ Bug fixes and minor updates
- ✅ Documentation-only updates
- ✅ Debugging specific issues
- ✅ Single-step tasks

**Use**: Individual `@agent` invocations

### When to Use Individual Agents

- ✅ Quick help with specific problems
- ✅ Testing specific functionality
- ✅ Updating individual components
- ✅ Code review and validation

**Use**: Direct `@agent` questions/tasks

---

## Tips for Success

### 1. Always Read Critical Restrictions First

Every agent session should start by checking `standards/global/critical-restrictions.md` to avoid deployment/git accidents.

### 2. Keep Dev Server Running

`localhost:3001` should always be running in a separate terminal. Agents leverage HMR for immediate feedback.

### 3. Follow the 6-Step Component Workflow

Don't skip steps. Each phase builds on the previous one and ensures quality.

### 4. Update Documentation System

When adding components, MUST update:

- Component documentation (MDX)
- Registry mappings (`standards/global/registry-mapping.md`)
- Component checklist (`workflows/documentation/component-documentation-checklist.md`)

### 5. Verify Before Moving Forward

Each phase should be verified before proceeding:

- Source → Works in development
- Registry → CLI installation succeeds
- Browser → Functionality validated
- Docs → Complete and accurate

### 6. Use Specifications for Complex Work

Don't try to implement complex features ad-hoc. Create a spec first, then execute systematically.

### 7. Leverage Specialist Agents

Each agent has specific expertise. Use the right agent for the job:

- Planning → `@spec-planner`
- Development → `@source-helper`
- Registry → `@registry-porter`
- Documentation → `@docs-writer`
- Review → `@code-reviewer`

---

## Quick Reference Commands

### Create Specification

```bash
@spec-planner Create spec for [feature description]
```

### Execute Full Pipeline

```bash
Tab → task-coordinator
/execute-tasks
```

### Component Development

```bash
# Step-by-step manual approach
@source-helper Implement [component] in src/
@registry-porter Migrate [component] to registry with testing
@docs-writer Create [component] documentation
```

### Testing

```bash
@registry-porter Test [component] installation via CLI
@source-helper Test [component] functionality at localhost:3001
```

### Documentation Updates

```bash
@docs-writer Update [component] documentation
@docs-writer Fix broken links in docs
@docs-writer Add new component to registry mappings
```

### Code Review

```bash
@code-reviewer Review [component/feature] implementation
```

---

## Troubleshooting

### Issue: Agent doesn't follow standards

**Solution**: Ensure relevant standards are in correct folder structure. Check `standards/[category]/` organization.

### Issue: CLI installation fails

**Solution**: Check imports in registry component. Ensure all dependencies listed in `registry.json`. Use `@registry-porter` to debug.

### Issue: Component doesn't render in browser

**Solution**: Check console errors at `localhost:3001`. Use `@source-helper` with Playwright tools to debug.

### Issue: Documentation not rendering

**Solution**: Verify MDX syntax, check `meta.json` entries, ensure component registered in `mdx-components.tsx`. Use `@docs-writer` to fix.

### Issue: Tasks not executing in order

**Solution**: Check task dependencies in spec. Ensure prerequisite tasks are marked complete before dependent tasks start.

---

## Summary

Agent OS 2.0 provides a robust, systematic approach to feature development:

1. **Plan Product** (one-time) → Define vision, roadmap, tech stack
2. **New Spec** (per feature) → Research and gather requirements
3. **Create Spec** (per feature) → Detailed planning and task breakdown
4. **Implement Spec** (per feature) → Execute with specialist agents

This workflow ensures:

- ✅ Consistent code quality through standards injection
- ✅ Complete documentation for all components
- ✅ Thorough testing (CLI + browser validation)
- ✅ Proper task sequencing and dependency management
- ✅ Quality verification at each step

Use specialist agents to leverage their expertise, follow the 6-step component workflow, and always verify before moving forward.

**The dev server at `localhost:3001` should always be running for HMR and browser testing.**
