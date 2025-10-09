# Implementation Workflows

This directory contains workflows for implementing features in UIFoundry.

## Available Workflows

### Marketing Blocks Development

**File**: `build-marketing-blocks.md`

**Purpose**: Build marketing blocks at scale (1-5 at a time) using MIT-licensed shadcn sources through an automated 3-phase pipeline.

**Quick Start**: See `agent-os/QUICKSTART-MARKETING-BLOCKS.md`

**Command**: `/build-marketing-blocks`

**Coordinator Agent**: `marketing-blocks-coordinator`

**Phases**:

1. **Source & Build**: Install dependencies, create PayloadCMS blocks in `src/`
2. **Registry Migration**: Copy to `registry/` with import transformation
3. **Documentation**: Create 5-section MDX docs with registry mappings

**Specialist Agents Used**:

- `@source-helper` - Phase 1: Source code development
- `@registry-porter` - Phase 2: Registry migration
- `@docs-writer` - Phase 3: Documentation creation

### Execute Tasks (Spec-Driven)

**File**: `execute-tasks.md`

**Purpose**: Execute tasks from a feature specification using the Agent OS 2.0 workflow.

**Command**: `/execute-tasks`

**Used for**: General feature implementation following spec-driven development

### Execute Single Task

**File**: `execute-task.md`

**Purpose**: Execute a single task from a specification.

**Used for**: Focused implementation of specific tasks

### Post-Execution Tasks

**File**: `post-execution-tasks.md`

**Purpose**: Cleanup, verification, and finalization after implementation.

**Used for**: Ensuring quality after feature completion

## Choosing the Right Workflow

### Use Marketing Blocks Workflow When:

- Building PayloadCMS block components
- Adding marketing page sections (Hero, Features, Pricing, etc.)
- Need to build multiple similar components efficiently
- Want automated dependency management
- Need registry distribution + documentation

### Use Spec-Driven Workflow When:

- Implementing complex features with multiple components
- Need detailed planning before execution
- Coordinating work across multiple specialists
- Building features that span backend + frontend
- Need comprehensive specification documentation

### Use Single Task Workflow When:

- Bug fixes
- Small enhancements
- Focused updates to specific components
- Quick iterations

## Workflow Integration

These workflows integrate with:

- **Agent OS 2.0**: Standards, specifications, task management
- **OpenCode Agents**: Specialized subagents for delegation
- **Documentation System**: Self-maintaining docs with registry mappings
- **Roadmap Tracking**: Automatic README.md updates

## Getting Started

1. **For Marketing Blocks**: Read `agent-os/QUICKSTART-MARKETING-BLOCKS.md`
2. **For Spec-Driven Development**: Read `agent-os/OPENCODE-WORKFLOW.md`
3. **For General Workflows**: Read `agent-os/README.md`

## File Structure

```
agent-os/workflows/implementation/
├── README.md (this file)
├── build-marketing-blocks.md
├── execute-tasks.md
├── execute-task.md
└── post-execution-tasks.md
```

## Related Documentation

- **Quick Start**: `agent-os/QUICKSTART-MARKETING-BLOCKS.md`
- **Workflow System**: `agent-os/OPENCODE-WORKFLOW.md`
- **Documentation System**: `agent-os/workflows/documentation/maintain-documentation-system.md`
- **Registry Testing**: `agent-os/workflows/documentation/registry-testing-protocol.md`
- **Standards**: `agent-os/standards/`
