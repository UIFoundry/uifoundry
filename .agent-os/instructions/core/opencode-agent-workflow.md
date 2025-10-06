# OpenCode Agent Workflow Integration

## Overview

UIFoundry integrates specialized OpenCode agents into the .agent-os workflow system for automated component development. This creates a complete pipeline from specification to documentation with quality validation at each step.

**⚠️ CRITICAL:** All agents MUST read and follow `.agent-os/instructions/meta/critical-restrictions.md` before performing any operations. Never deploy, push to git, or install global packages without explicit user permission.

## Available Agents

### Primary Agents

- **`build`** - Default agent with all tools (existing)
- **`plan`** - Read-only analysis agent (existing)
- **`task-coordinator`** - Orchestrates the complete development pipeline (NEW)

### Specialist Agents (Subagents)

- **`@spec-planner`** - Creates detailed feature specifications and task breakdowns
- **`@source-helper`** - Source code development and debugging in `src/`
- **`@registry-porter`** - Moves components to registry with CLI/browser testing
- **`@docs-writer`** - Creates documentation following UIFoundry standards
- **`@code-reviewer`** - Reviews code for best practices (existing)

## Agent Capabilities

### `@spec-planner`

- **Purpose**: Feature planning and architecture
- **Tools**: File operations, search tools (no bash)
- **Responsibilities**:
  - Analyze similar existing implementations
  - Create comprehensive specifications in `.agent-os/specs/`
  - Break down work into tasks with agent assignments
  - Document architecture decisions and dependencies

### `@source-helper`

- **Purpose**: Source code development and debugging
- **Tools**: Full access including Playwright browser testing
- **Responsibilities**:
  - Implement components in `src/payload/blocks/`, `src/payload/fields/`, etc.
  - Debug integration issues and TypeScript problems
  - Test functionality at localhost:3001 during development
  - Ensure code follows project standards

### `@registry-porter`

- **Purpose**: Registry migration and validation
- **Tools**: Full access including Playwright browser testing
- **Responsibilities**:
  - Copy components from `src/` to `registry/` with proper import transformations
  - Test CLI installation: `npx shadcn@latest add @uifoundry/[component]`
  - Validate functionality via browser testing at localhost:3001
  - Update registry.json and configuration files

### `@docs-writer`

- **Purpose**: Documentation creation and maintenance
- **Tools**: File operations only (no bash for safety)
- **Responsibilities**:
  - Create component documentation following 5-section template
  - Update registry mapping and navigation files
  - Maintain documentation system integrity
  - Verify all links and examples work

### `@task-coordinator`

- **Purpose**: Workflow orchestration
- **Tools**: File operations, task delegation, no bash
- **Responsibilities**:
  - Delegate tasks to appropriate specialist agents
  - Monitor progress and quality at each phase
  - Ensure proper dependency sequencing
  - Coordinate handoffs between agents

## Usage Patterns

### Pattern 1: Full Automated Pipeline

**Switch to task-coordinator as primary agent:**

```bash
Tab → task-coordinator
```

**Create specification:**

```bash
/create-spec [your feature idea]
```

- `@spec-planner` creates detailed specifications
- Comprehensive planning with task breakdown
- Agent assignments for each phase

**Execute the pipeline:**

```bash
/execute-tasks
```

- `@task-coordinator` orchestrates execution
- Delegates to specialist agents in sequence
- Validates completion at each phase

### Pattern 2: Manual Agent Delegation

**Create specification first:**

```bash
@spec-planner Create detailed spec for Hero_4 block component
```

**Execute in sequence:**

```bash
# 1. Source development
@source-helper Implement Hero_4 block following the specification

# 2. Registry migration
@registry-porter Move Hero_4 to registry with proper testing

# 3. Documentation
@docs-writer Create comprehensive Hero_4 documentation
```

### Pattern 3: Individual Agent Assistance

**Development help:**

```bash
@source-helper Help debug this TypeScript error in my field config
@source-helper Test this component functionality at localhost:3001
```

**Registry operations:**

```bash
@registry-porter Test my latest component installation
@registry-porter Update registry imports for this component
```

**Documentation updates:**

```bash
@docs-writer Update this component's documentation
@docs-writer Fix broken links in the docs navigation
```

### Pattern 4: Quality Assurance

**Code review:**

```bash
@code-reviewer Review this component implementation for best practices
```

**Testing validation:**

```bash
@registry-porter Validate this component works correctly via browser testing
@source-helper Test component integration in development environment
```

## Workflow Phases

### Phase 1: Planning & Specification

- **Agent**: `@spec-planner`
- **Output**: Detailed specifications in `.agent-os/specs/[date-feature]/`
- **Validation**: Comprehensive, actionable specifications created

### Phase 2: Source Development

- **Agent**: `@source-helper`
- **Output**: Working components in `src/`
- **Validation**: Components function correctly in development environment

### Phase 3: Registry Migration

- **Agent**: `@registry-porter`
- **Output**: Registry components with proper imports
- **Validation**: CLI installation and browser functionality testing

### Phase 4: Documentation

- **Agent**: `@docs-writer`
- **Output**: Complete component documentation
- **Validation**: Documentation follows standards and all links work

## Testing Integration

### Development Testing (`@source-helper`)

- **Environment**: localhost:3001 (always running)
- **Scope**: Component functionality during development
- **Tools**: Playwright browser automation
- **Focus**: Visual rendering, interactions, console errors

### Registry Testing (`@registry-porter`)

- **CLI Testing**: `npx shadcn@latest add @uifoundry/[component]`
- **Browser Testing**: Functionality validation at localhost:3001
- **Scope**: Complete installation → functionality pipeline
- **Validation**: Component works identically to source version

## Agent Communication

### Task Handoffs

When delegating tasks, always reference:

- **Specification**: Point to `.agent-os/specs/[date-feature]/`
- **Success Criteria**: Clear validation requirements
- **Context**: Relevant files and components to focus on
- **Testing Requirements**: Specific testing scenarios needed

### Progress Tracking

- **Specifications**: Mark completed tasks in `tasks.md` files
- **Roadmap**: Update progress in both `.agent-os/product/roadmap.md` and `README.md`
- **Quality**: Ensure each phase passes validation before proceeding

## Integration with .agent-os Commands

### Slash Commands

- **`/create-spec`** → Uses `@spec-planner` for comprehensive planning
- **`/execute-tasks`** → Uses `@task-coordinator` for orchestrated execution
- **Manual `@agent`** → Direct agent invocation for specific tasks

### Documentation System

All agents maintain the .agent-os documentation system:

- **Read**: Reference relevant .agent-os files before starting work
- **Update**: Add discoveries to appropriate .agent-os files
- **Cross-reference**: Keep documentation interconnected and current

## Benefits

### Automation

- **Complete Pipeline**: Specification → Development → Registry → Documentation
- **Quality Validation**: Testing at each phase ensures reliability
- **Consistent Standards**: All agents follow UIFoundry conventions

### Flexibility

- **Full Orchestration**: Let `@task-coordinator` manage everything
- **Manual Control**: Direct agent invocation for specific needs
- **Hybrid Approach**: Combine automated and manual workflows

### Quality Assurance

- **Browser Testing**: Real functionality validation at localhost:3001
- **CLI Testing**: Registry installation verification
- **Documentation Standards**: Consistent, comprehensive documentation
- **Code Standards**: TypeScript, linting, and project conventions

## Best Practices

### When to Use Full Pipeline

- New component development
- Complex feature implementation
- First-time component creation

### When to Use Manual Delegation

- Bug fixes and minor updates
- Documentation-only updates
- Debugging specific issues

### When to Use Individual Agents

- Quick help with specific problems
- Testing specific functionality
- Updating individual components

**Remember**: The dev server at localhost:3001 should always be running in a separate window. All agents leverage HMR for immediate feedback without needing to manage the server.
