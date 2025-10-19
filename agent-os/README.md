# Agent OS 2.0 - UIFoundry Development System

This directory contains the Agent OS 2.0 installation for UIFoundry, providing a spec-driven development workflow with intelligent standards injection and modular workflows.

## 🚨 CRITICAL FOR ALL AGENTS

**Every agent working with UIFoundry MUST read and follow Agent OS 2.0 guidelines.**

### ⚠️ READ THIS FIRST: Project Configuration

**MANDATORY READ**: `standards/global/project-config.md`

**Key Configuration**:
- 🔴 **Dev server runs on port 3005** (NOT 3001, NOT 3000)
- ❌ **NEVER start/stop/restart the dev server**
- ✅ **ALWAYS use `localhost:3005` for ALL testing**
- ✅ **If server is down, ASK USER to start it**

**Why This Matters**: Time is wasted constantly when agents use wrong ports or try to manage the dev server. The server is ALWAYS running on 3005 and managed by the user only.

### Quick Start for New Agents

1. **Project Config**: Read `standards/global/project-config.md` FIRST - dev server on port 3005, never touch it
2. **Critical Restrictions**: Read `standards/global/critical-restrictions.md` SECOND - never deploy, push, or install globals without permission
3. **Component Development**: Read `workflows/documentation/maintain-documentation-system.md` for component workflows
4. **Documentation Template**: Use `standards/global/documentation-template.md` for all new docs
5. **Testing Protocols**: Follow `workflows/documentation/registry-testing-protocol.md` for registry components
6. **OpenCode Integration**: Review `standards/global/opencode-agent-workflow.md` for subagent usage

## 📁 Agent OS 2.0 Structure

```
agent-os/
├── config.yml                  # Agent OS configuration (v2.0.0)
├── product/                    # Product knowledge base
│   ├── mission.md              # Product vision and goals
│   ├── roadmap.md              # Development roadmap
│   └── tech-stack.md           # Technical architecture
├── standards/                  # Coding standards & patterns
│   ├── backend/                # Backend-specific standards
│   ├── frontend/               # Frontend code style & standards
│   │   ├── code-style.md
│   │   └── tech-stack.md
│   ├── global/                 # Universal standards (all agents)
│   │   ├── best-practices.md
│   │   ├── conventions.md
│   │   ├── critical-restrictions.md
│   │   ├── documentation-template.md
│   │   ├── error-handling.md
│   │   ├── opencode-agent-workflow.md
│   │   ├── payload-architecture.md
│   │   ├── registry-mapping.md
│   │   └── validation.md
│   └── testing/                # Testing standards
│       ├── coverage.md
│       └── unit-tests.md
├── workflows/                  # Modular workflow instructions
│   ├── documentation/          # Documentation & registry workflows
│   │   ├── add-registry-component.md
│   │   ├── component-documentation-checklist.md
│   │   ├── maintain-documentation-system.md
│   │   ├── registry-testing-protocol.md
│   │   └── update-component-docs.md
│   ├── planning/               # Product planning workflows
│   │   ├── analyze-product.md
│   │   └── plan-product.md
│   ├── specification/          # Feature specification workflows
│   │   ├── create-spec.md
│   │   └── create-tasks.md
│   └── implementation/         # Implementation workflows
│       ├── execute-task.md
│       ├── execute-tasks.md
│       └── post-execution-tasks.md
├── specs/                      # Feature specifications
│   └── [date-feature]/         # Individual feature specs with tasks
├── recaps/                     # Development session summaries
└── README.md                   # This file
```

## 🔄 Agent OS 2.0 Workflow

### Spec-Driven Development Process

Agent OS 2.0 follows a structured workflow for feature development:

#### Phase 0: Plan Product (Run Once)

**Workflow**: `workflows/planning/plan-product.md`

Define product mission, roadmap, and tech stack. Typically run once at project start.

#### Phase 1: New Spec

**Workflow**: `workflows/specification/new-spec.md` (if exists)

Create dated spec folder and gather comprehensive requirements through research.

#### Phase 2: Create Spec

**Workflow**: `workflows/specification/create-spec.md`

Transform requirements into detailed specifications with actionable task breakdowns.

#### Phase 3: Implement Spec

**Workflow**: `workflows/implementation/execute-tasks.md`

Execute tasks using specialized agents with verification at each step.

## 🎯 Standards System

### How Standards Are Organized

Standards in Agent OS 2.0 follow a 4-folder structure:

- **`backend/`** - Database, API, server-side standards
- **`frontend/`** - UI components, React patterns, documentation systems
- **`global/`** - Universal standards applied to all agents
- **`testing/`** - Testing protocols, coverage requirements, validation

### Standards Injection

Agent OS 2.0 intelligently injects relevant standards into workflows and commands:

```
{{standards/global/*}}          # All global standards
{{standards/frontend/components}} # Specific frontend standard
{{standards/testing/*}}         # All testing standards
```

During compilation, these placeholders are replaced with file references that agents can access.

## 🔧 UIFoundry-Specific Workflows

### Component Development Workflow

**Standard Process** (Read `workflows/documentation/maintain-documentation-system.md`):

1. **Build & Test in Source** (`src/`)
2. **Copy to Registry** (`registry/`)
3. **Update Registry Integration** (`registry.json`)
4. **Test Registry Installation** (CLI)
5. **Create/Update Documentation** (MDX)
6. **Validate Complete Integration** (Browser testing)

### OpenCode Agent Integration

UIFoundry uses specialized subagents for automated development:

- **`@spec-planner`** - Feature specifications and task breakdowns
- **`@source-helper`** - Source code development and debugging
- **`@registry-porter`** - Registry migration with CLI/browser testing
- **`@docs-writer`** - Documentation creation and maintenance
- **`@code-reviewer`** - Code quality review

See `standards/global/opencode-agent-workflow.md` for complete usage.

## 📋 Documentation System

### 5-Section Documentation Template

All UIFoundry components follow this structure:

1. **Preview** - Live component render
2. **Props** - Configuration fields table
3. **Installation** - Registry installation command
4. **Registry Dependencies** - Internal `@uifoundry/*` dependencies
5. **NPM Dependencies** - External packages

Template: `standards/global/documentation-template.md`

### Self-Maintaining Protocol

When adding new components, agents MUST:

1. Create documentation following 5-section template
2. Update `standards/global/registry-mapping.md` with dependency mappings
3. Update `workflows/documentation/component-documentation-checklist.md` with new packages
4. Verify all links and references work correctly

## ⚠️ Critical Restrictions

**NEVER run without explicit permission:**

- ❌ Deployment: `sst deploy`, `pnpm deploy:*`
- ❌ Git Push: `git push`, creating PRs, merging branches
- ❌ Git Commit: Unless explicitly requested
- ❌ Global Installs: `npm install -g`, `pnpm add -g`
- ❌ Infrastructure: AWS changes, secret modifications

**Always safe to run:**

- ✅ `pnpm dev` - Local development server
- ✅ `pnpm build` - Local builds
- ✅ `pnpm typecheck` - TypeScript checking
- ✅ `pnpm lint` - Code linting
- ✅ `pnpm vitest` - Unit tests
- ✅ `pnpm test` - E2E tests
- ✅ File operations (read, write, edit)

See `standards/global/critical-restrictions.md` for complete details.

## 🎓 Learning Path for New Agents

### For Component Development:

1. `standards/global/critical-restrictions.md` (REQUIRED)
2. `workflows/documentation/maintain-documentation-system.md`
3. `standards/global/documentation-template.md`
4. `standards/global/registry-mapping.md`
5. `workflows/documentation/registry-testing-protocol.md`

### For Feature Implementation:

1. `standards/global/critical-restrictions.md` (REQUIRED)
2. `workflows/specification/create-spec.md`
3. `workflows/implementation/execute-tasks.md`
4. `standards/global/best-practices.md`
5. `product/roadmap.md`

### For Testing:

1. `workflows/documentation/registry-testing-protocol.md`
2. `standards/testing/unit-tests.md`
3. `standards/testing/coverage.md`

## 🧠 Agent Memory

Agent OS 2.0 serves as the "institutional memory" for UIFoundry:

- **Standards** capture coding patterns and best practices
- **Workflows** ensure consistent development processes
- **Product** documents vision, roadmap, and architecture
- **Specs** provide detailed feature implementation plans

When you learn something valuable, capture it in the appropriate file so future agents don't have to rediscover it.

## 🚀 Version Info

- **Agent OS Version**: 2.0.0
- **Profile**: default
- **Multi-Agent Mode**: Enabled (Claude Code)
- **Single-Agent Mode**: Disabled
- **Last Compiled**: 2025-10-07

---

_Agent OS 2.0: Spec-driven development with intelligent standards injection and modular workflows._
