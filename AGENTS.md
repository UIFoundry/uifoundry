# Agent Guidelines for UIFoundry

## Agent Documentation System

When you hear "agent docs" or "agents docs", this refers to **both** this AGENTS.md file AND the entire `.agent-os/` directory structure. The `.agent-os/` directory contains task-specific documentation that agents should reference and update based on their current work.

### .agent-os Directory Structure

```
.agent-os/
├── instructions/           # Task-specific procedures
│   ├── core/              # Core workflow instructions
│   │   ├── analyze-product.md        # Product analysis procedures
│   │   ├── component-documentation-checklist.md
│   │   ├── create-spec.md            # Feature specification creation
│   │   ├── execute-tasks.md          # Task execution protocols
│   │   ├── maintain-documentation-system.md
│   │   └── update-component-docs.md
│   └── meta/              # Meta-procedures (pre/post flight)
│       ├── pre-flight.md
│       └── post-flight.md
├── product/               # Product knowledge base
│   ├── mission.md         # Product vision and goals
│   ├── roadmap.md         # Development roadmap
│   └── tech-stack.md      # Technical architecture
├── specs/                 # Feature specifications
│   └── [date-feature]/    # Individual feature specs with tasks
├── standards/             # Code and documentation standards
│   ├── code-style/        # Language-specific style guides
│   ├── best-practices.md  # Development best practices
│   ├── documentation-template.md
│   └── registry-mapping.md
├── recaps/               # Development session summaries
└── README.md            # .agent-os system overview
```

### Agent Documentation Protocols

#### When Starting a Task

1. **Check Relevant .agent-os Sections**: Based on your task type, reference the appropriate documentation:
   - **Product Analysis**: Read `.agent-os/product/` and `.agent-os/instructions/core/analyze-product.md`
   - **Component Development**: Read `.agent-os/standards/documentation-template.md` and `.agent-os/instructions/core/maintain-documentation-system.md`
   - **Feature Specifications**: Read `.agent-os/instructions/core/create-spec.md`
   - **Code Style Questions**: Read `.agent-os/standards/code-style/` and `.agent-os/standards/best-practices.md`

2. **Follow Established Patterns**: Use existing specs in `.agent-os/specs/` as templates for similar work

3. **Check Current Roadmap**: Always verify alignment with `.agent-os/product/roadmap.md` before starting new features

#### When Learning Something New

**Agents MUST update the relevant .agent-os documentation when they discover:**

- **New project patterns or conventions** → Update `.agent-os/standards/best-practices.md`
- **Component documentation insights** → Update `.agent-os/standards/documentation-template.md` or `.agent-os/standards/registry-mapping.md`
- **Technical architecture details** → Update `.agent-os/product/tech-stack.md`
- **Development workflow improvements** → Update relevant files in `.agent-os/instructions/core/`
- **Roadmap progress or changes** → Update `.agent-os/product/roadmap.md`

#### Documentation Update Protocol

When updating .agent-os documentation:

1. **Read First**: Always read the existing file before making changes
2. **Follow Format**: Maintain the existing structure and format patterns
3. **Be Specific**: Add concrete examples and specific guidance
4. **Reference Context**: Include relevant file paths, command examples, or code snippets
5. **Update Cross-References**: If you change one file, check for references in other files

#### Task-Specific Documentation Guide

| Task Type                   | Primary .agent-os References                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Component Creation**      | `instructions/core/maintain-documentation-system.md`, `standards/documentation-template.md`, `standards/registry-mapping.md` |
| **Feature Development**     | `instructions/core/create-spec.md`, `product/roadmap.md`, `standards/best-practices.md`                                      |
| **Code Review/Refactoring** | `standards/code-style/`, `standards/best-practices.md`, `standards/payload-architecture.md`                                  |
| **Documentation Updates**   | `instructions/core/component-documentation-checklist.md`, `standards/documentation-template.md`                              |
| **Product Planning**        | `instructions/core/analyze-product.md`, `product/mission.md`, `product/roadmap.md`                                           |
| **Registry Work**           | `standards/registry-mapping.md`, `instructions/core/maintain-documentation-system.md`                                        |

### Self-Maintaining Documentation System

The .agent-os directory is designed to be **self-maintaining**. Each agent contributes to the collective knowledge base by:

- **Following established patterns** documented in the system
- **Updating documentation** when discovering new information
- **Creating specs** for new features that future agents can reference
- **Maintaining consistency** across all documentation

**Remember**: This documentation system serves as the "institutional memory" for UIFoundry. When you learn something valuable about the project, capture it in the appropriate .agent-os file so future agents don't have to rediscover it.

---

## Build/Lint/Test Commands

- `pnpm build` - Build the app (runs payload generate:types then next build)
- `pnpm run dev` - Start dev server on port 3001 with turbo
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix linting issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run both lint and typecheck
- `pnpm format:check` - Check prettier formatting
- `pnpm format:write` - Fix prettier formatting
- `pnpm vitest` - Run Vitest unit tests
- `pnpm test` - Run Playwright e2e tests
- `pnpm test:report` - Show Playwright test report
- `pnpm registry:build` - Build custom shadcn registry components

## Project & Purpose

UIFoundry is a custom, opionated and professionally put together payload cms template that features everything needed to build a fullstack marketing application with no code. The goal is to first offer a premium PayloadCMS kit developers can purchase and self host, but also turn this into a Web hosting SaaS similar to Wordpress that allows users to login and build sites, that are then hosted on aws via sst, users will be able to control everything about their sites through the payload cms admin panel. This project is starting out as a clone of the [shadcn payload blocks](https://www.shadcnblocks.com/payload-cms) setup but with bigger expansion plans for non tech users as well

## Core Project Dependencies

- [PayloadCMS](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
- [sst](https://sst.dev/docs/)
- [React](https://react.dev/learn)
- [TRPC](https://trpc.io/docs/quickstart)
- [Better Auth](https://www.better-auth.com/docs/introduction)
- [Shadcn](https://ui.shadcn.com/docs)
- [mongodb](https://www.mongodb.com/products/platform/atlas-database)

## Code Style & Conventions

- Use TypeScript with strict mode enabled
- Import paths: Use `~/` alias for src/ directory, `@payload-config` for payload config
- Prefer type imports with inline syntax: `import { type AuthStrategyResult } from "payload"`
- Use double quotes for strings, tabs for indentation
- Function components: Use default exports with function declarations
- Interface naming: Use PascalCase (e.g., `interface Post`)
- Constants: Use SCREAMING_SNAKE_CASE for collection slugs and enums
- Error handling: Use try/catch with payload.logger.error() for Payload contexts
- File naming: Use kebab-case for directories, PascalCase for React components
- Always run `pnpm run check` before committing changes

## Project Structure

- src: frontend source code
  - app: next.js routes (app router)
  - auth: better-auth user auth functionality
  - components: all react components that are not payload components in any way.
  - payload: PayloadCMS related code & react components
    - blocks: all payload cms blocks & blockComponents. Each Block has its own folder with its block config and react component. eg: ~/payload/blocks/Hero/Hero_1/config.ts & ~/payload/blocks/Hero/Hero_1/index.tsx
    - collections/: all payload collection config files
    - components/: payload specific react components.
    - constants/: contains all slugs as text constants for all payload data types (collections, globals, blocks, etc)
    - fields/: payload field configs that are used enough across various blocks to be abstracted to their own functions
    - globals/: all payload global configs. works in a similar way to the blocks folder
    - styles.css: all payload cms admin panel global tailwind styles
    - utils.ts: payload cms getPayload function
  - server/: TRPC api routes
  - styles/: global tailwind styles and utils
  - trpc/: trpc clients
  - ui/: shadcn ui code for custom registry components
  - utils/: sst utils
- content: documentation content (Fumadocs)
  - docs/: all component documentation in MDX format
    - blocks/: block component documentation
    - fields/: field component documentation
    - globals/: global component documentation
    - lib/: utility library documentation
    - ui/: ui component documentation
    - guides/: developer guides and tutorials
    - meta.json: navigation structure for docs sidebar
- registry: custom shadcn registry for UIFoundry components
  - components/: reusable React components for registry
  - payload/: PayloadCMS specific registry components
    - blocks/: block configs and components for distribution
    - fields/: field configs and components for distribution
    - globals/: global configs and components for distribution
  - ui/: UI components with motion primitives
  - config/: registry configuration files
- tests: test files and setup
  - unit tests: Vitest configuration and test files
  - e2e tests: Playwright configuration and test files

## Project Roadmap

**The authoritative project roadmap is maintained in the [README.md](./README.md#roadmap) file** and serves as the public showcase of development progress.

### Roadmap Management for Agents:

**ALWAYS use README.md as your primary roadmap reference:**

- Check current phase objectives and priorities in [README.md#roadmap](./README.md#roadmap)
- Update progress by marking completed items `[x]` in the README roadmap
- Update block counts in marketing blocks checklist (e.g., "Hero (2/5+)" when adding variants)
- Keep `.agent-os/product/roadmap.md` in sync if making structural changes

### Current Focus Areas:

- **Phase 0**: Completing marketing blocks (5+ variants each) with registry distribution and documentation
- **Phase 1**: Multi-site architecture and role-based access control
- **Phase 2**: Custom domains, LLM site builders, and subscription management
- **Phase 3**: Advanced form builder with dynamic creation capabilities

### Why README Roadmap is Primary:

- Public showcase for potential customers and contributors
- Single source of truth that prevents documentation drift
- Professional presentation of project status and progress
- Immediate visibility of what's being built and completed

**When implementing features, always verify alignment with current README roadmap phase objectives.**

## MCP Server Capabilities

### Browser Automation

- Use browser MCP server to test code changes via HMR at `localhost:3001`
- Verify frontend changes by navigating to affected routes
- Capture screenshots for visual verification when needed
- Test user flows (auth, form submissions, block interactions)
- Test documentation site functionality at `localhost:3001/docs`

### Context7 Documentation

- Always use Context7 to fetch official documentation for core dependencies
- Reference docs before implementing features or debugging issues
- Prioritize official sources over community content for accuracy
- Use for researching Fumadocs configuration and MDX best practices

### Sequential Thinking

- Use structured thinking for complex, multi-step problems
- Leave thought summaries in PRs for future reference
- Essential for design decisions with trade-offs
- Critical for registry component architecture decisions

### Web Research

- Fetch content from official sources and community discussions
- Follow troubleshooting resource priorities (see below)
- Never paste secrets or tokens in requests
- Research component documentation standards and best practices

## Development Environment

### Server Management

- **Dev Server**: Always runs on `localhost:3001`
- **API Endpoints**: Available at `localhost:3001/api`
- **Auto-start Protocol**: If `localhost:3001` is down, offer to run `pnpm dev` with confirmation
- **Readiness Check**: Poll server until responsive before proceeding

### Environment Setup

- Load `.env.local` before coding
- Confirm all required ports are available
- Check for running services that might conflict

## Documentation Strategy

### Official Documentation Priority

Use Context7 to fetch official docs in this priority order:

- **PayloadCMS**: Official docs → GitHub examples → API reference
- **Next.js**: Use sparingly with small token limits (500-2000) and specific topics due to large doc size
- **SST**: Official docs → GitHub discussions → AWS service docs
- **Better Auth**: Official docs → GitHub issues
- **Shadcn**: Official docs → component source
- **TRPC**: Official docs → GitHub examples
- **MongoDB**: Official docs → Atlas documentation
- **Fumadocs**: Official docs → GitHub examples → configuration guides
- **Vitest**: Official docs → testing guides → configuration examples
- **Playwright**: Official docs → testing examples → browser automation guides

### Component Documentation Standards

When creating or updating component documentation:

- Use MDX format with proper frontmatter
- Include live examples with code snippets
- Document all props and configuration options
- Provide usage examples and best practices
- Update corresponding meta.json files for navigation
- Follow existing documentation structure and style

**Context7 Usage Notes**:

- Specify token limits to control response size (default: 10,000)
- Use specific topics to focus searches (e.g., "routing", "authentication", "MDX")
- For Next.js queries, use 500-2000 tokens with targeted topics to avoid overwhelming responses
- Always reference current docs before implementation or troubleshooting

## Sequential Thinking Guidelines

Use the sequential thinking tool for:

### Design Work with Trade-offs

- Data model changes affecting multiple collections
- Multi-environment configuration decisions
- Auth/ACL rule architecture
- Block vs collection architecture decisions

### Multi-step Bug Resolution

1. **Reproduce** → gather symptoms & steps
2. **Hypothesize** → generate potential causes
3. **Experiment** → create targeted test plan
4. **Results** → analyze findings
5. **Fix** → implement solution
6. **Verify** → test fix comprehensively

### Block Architecture Decisions

- Recursive blocks vs collections trade-offs
- SSR/ISR performance implications
- CMS-to-site data propagation patterns
- Component reusability considerations
- Registry component distribution strategies
- Documentation structure and organization

### Registry Component Decisions

- Component abstraction levels and reusability
- Distribution packaging and dependency management
- Version compatibility across Payload/Next.js versions
- Documentation generation and maintenance strategies

### Performance Investigations

- **Measure** → establish baseline metrics
- **Attribute** → identify bottleneck sources
- **Optimize** → implement targeted improvements
- **Re-measure** → validate performance gains

## Troubleshooting Resources

### Primary Sources (Check First)

**Payload CMS**:

- GitHub Issues & Discussions
- Payload Discord community snippets
- Official examples repository
- PayloadCMS docs troubleshooting section

**Next.js**:

- GitHub Issues & Discussions
- vercel/next.js RFC documents
- Next.js release notes & migration guides
- Vercel deployment docs

**SST/AWS**:

- SST GitHub Issues & Discussions
- AWS documentation & re:Post
- Service-specific limits (CloudFront, ALB, KVStore)
- SST Discord community

**Other Dependencies**:

- Tailwind: Official docs → GitHub issues
- Better Auth: Official docs → GitHub discussions
- TRPC: Official docs → GitHub examples
- MongoDB: Atlas docs → community forums

### Community Sources (Secondary)

- Stack Overflow (verified answers)
- Framework Discord servers (paste final solutions with links)
- Reddit communities (r/nextjs, r/webdev)

### Restrictions

- ❌ Avoid low-credibility blogs without verification
- ❌ Never use code from unknown gists without thorough review
- ❌ Never paste secrets, tokens, or sensitive data in requests
- ❌ Avoid outdated tutorials (check publication dates)

## Agent Workflow Checklists

### Before Coding

- [ ] **Check .agent-os Documentation**: Read relevant sections based on task type
- [ ] **Verify Roadmap Alignment**: Check `.agent-os/product/roadmap.md` for current priorities
- [ ] **Reference Existing Patterns**: Check `.agent-os/specs/` for similar work templates
- [ ] Confirm environment ports and services
- [ ] Load `.env.local` and verify environment variables
- [ ] Use Context7 to open relevant documentation
- [ ] Check if dev server is running on port 3001
- [ ] Review recent git changes for context

### While Coding

- [ ] Use sequential thinking for non-trivial tasks
- [ ] Test changes via browser automation at localhost:3001
- [ ] Verify HMR updates are working correctly
- [ ] Follow code style conventions (run `pnpm run check`)
- [ ] Document complex decisions in code comments

### After Implementation

- [ ] **Update .agent-os Documentation**: Add any new discoveries to relevant .agent-os files
- [ ] **Update Roadmap Progress**: Mark completed items in both `.agent-os/product/roadmap.md` and `README.md`
- [ ] **Create Specification**: Document new features in `.agent-os/specs/` if applicable
- [ ] Run `pnpm run check` to verify lint and types
- [ ] Run tests: `pnpm vitest` for unit tests, `pnpm test` for e2e
- [ ] Test affected routes in browser
- [ ] Verify PayloadCMS admin panel integration
- [ ] Update component documentation if applicable
- [ ] Build registry components: `pnpm registry:build`
- [ ] Leave thought summary in PR description
- [ ] Confirm no secrets or sensitive data committed

### Deployment Readiness

- [ ] Build passes: `pnpm build`
- [ ] Registry build passes: `pnpm registry:build`
- [ ] All tests pass: `pnpm vitest && pnpm test`
- [ ] Types generate correctly
- [ ] No console errors in browser
- [ ] Admin panel functionality verified
- [ ] Documentation site renders correctly
- [ ] Environment variables documented

### Documentation Updates

- [ ] Component documentation created/updated in `content/docs/`
- [ ] Meta.json files updated for navigation
- [ ] Code examples tested and validated
- [ ] Registry components documented with usage examples
- [ ] Documentation builds successfully

## Roadmap Updates Protocol

When completing tasks or implementing features:

1. **Mark Progress in README**: Update the README.md roadmap by changing `[ ]` to `[x]` for completed items
2. **Update Block Counts**: Increment counts in marketing blocks checklist (e.g., "Hero (2/5+)")
3. **Document in Commits**: Reference roadmap progress in commit messages using conventional commits
4. **Sync Agent-OS**: Keep `.agent-os/product/roadmap.md` aligned with README if making structural changes
5. **Verify Alignment**: Always check current phase objectives before starting new work

## Component Development Workflow

### Creating New Components

1. **Implement Component**: Create component in `src/payload/blocks/`, `src/payload/fields/`, or `src/payload/globals/`
2. **Add to Registry**: Create registry version in `registry/payload/[type]/[component]/`
3. **Create Documentation**: Add MDX file to `content/docs/[type]/[component].mdx`
4. **Update Navigation**: Add component to appropriate `meta.json` file
5. **Test Installation**: Verify component installs via `shadcn add [registry-url]/[component]`
6. **Update Roadmap**: Mark progress in README.md roadmap

### Registry Component Standards

- Each component must have both `config.ts` (PayloadCMS config) and `index.tsx` (React component)
- Follow existing naming conventions and file structure
- Include proper TypeScript types and exports
- Document all configuration options and usage patterns
- Test component isolation and reusability

### Documentation Standards

- Use clear, descriptive titles and descriptions
- Include code examples with syntax highlighting
- Document all configuration options and props
- Provide usage examples and best practices
- Include screenshots or visual examples when helpful
- Keep MDX files organized and properly formatted

## LLM Protocol

### Core Development Workflow

- To achieve the best context when bug finding, use git to find the latest changed files, then narrow your initial search to those files to see what may be the root cause
- Always use MCP server capabilities to enhance development workflow
- Prioritize official documentation over community sources
- Use structured thinking for complex problems and document reasoning
- **Update README roadmap progress** when completing features or tasks
- **Maintain documentation quality** by updating component docs alongside code changes
- **Test registry components** before distribution using `pnpm registry:build`
- **Verify documentation builds** when updating MDX files or meta.json navigation

### .agent-os Integration Workflow

#### Before Starting Any Task

1. **Read Relevant .agent-os Documentation**: Check task-specific sections based on your work type
2. **Verify Current Context**: Always check `.agent-os/product/roadmap.md` for current priorities
3. **Follow Established Patterns**: Use existing `.agent-os/specs/` as templates for similar work
4. **Reference Standards**: Check `.agent-os/standards/` for code style and architecture guidance

#### During Task Execution

1. **Document Discoveries**: When you learn something new about the project, immediately update the relevant `.agent-os/` file
2. **Create Specifications**: For new features, create proper specs in `.agent-os/specs/[date-feature]/`
3. **Follow Checklists**: Use `.agent-os/instructions/core/` checklists to ensure completeness
4. **Maintain Cross-References**: Keep documentation interconnected and up-to-date

#### After Task Completion

1. **Update Progress**: Mark completed items in `.agent-os/product/roadmap.md` AND `README.md`
2. **Create Recaps**: Document lessons learned in `.agent-os/recaps/` for future agents
3. **Update Standards**: If you discovered better practices, update `.agent-os/standards/`
4. **Verify Documentation**: Ensure all changes are reflected across both code and .agent-os docs

### Knowledge Management Protocol

**The .agent-os directory is the project's institutional memory.** Treat it as seriously as you would the source code:

- **Read before writing** - always check existing documentation first
- **Update immediately** - don't let knowledge gaps persist for future agents
- **Cross-reference consistently** - link related concepts across different files
- **Maintain quality** - follow the same standards for .agent-os docs as for component documentation

**Remember**: Every piece of information you discover about UIFoundry should be captured in the appropriate .agent-os file. Future agents depend on this knowledge base to work effectively.

## Task-Specific .agent-os Usage Guide

### When Creating New Components

**Required Reading**:

- `.agent-os/instructions/core/maintain-documentation-system.md` (CRITICAL - read first)
- `.agent-os/standards/documentation-template.md`
- `.agent-os/standards/registry-mapping.md`

**Required Updates**:

- Add component to registry mappings
- Create component documentation following 5-section template
- Update navigation files (meta.json)

### When Implementing New Features

**Required Reading**:

- `.agent-os/instructions/core/create-spec.md`
- `.agent-os/product/roadmap.md`
- `.agent-os/standards/best-practices.md`

**Required Updates**:

- Create feature specification in `.agent-os/specs/[date-feature]/`
- Update roadmap progress in both `.agent-os/product/roadmap.md` and `README.md`
- Document any new patterns in `.agent-os/standards/`

### When Debugging or Refactoring

**Required Reading**:

- `.agent-os/standards/code-style/`
- `.agent-os/standards/payload-architecture.md`
- Recent `.agent-os/recaps/` for context

**Required Updates**:

- Document discovered patterns or anti-patterns in `.agent-os/standards/best-practices.md`
- Create recap in `.agent-os/recaps/` if significant insights were gained

### When Working on Documentation

**Required Reading**:

- `.agent-os/instructions/core/component-documentation-checklist.md`
- `.agent-os/standards/documentation-template.md`

**Required Updates**:

- Update `.agent-os/standards/registry-mapping.md` with new components
- Update meta.json navigation files
- Ensure cross-references between related documentation

### When Planning or Analyzing

**Required Reading**:

- `.agent-os/instructions/core/analyze-product.md`
- `.agent-os/product/mission.md`
- `.agent-os/product/roadmap.md`

**Required Updates**:

- Update `.agent-os/product/tech-stack.md` with new technical insights
- Update `.agent-os/product/roadmap.md` with progress or plan changes
- Create new specs in `.agent-os/specs/` for planned features

### Agent Knowledge Sharing Protocol

When you learn something valuable:

1. **Identify the Category**: Is this a code pattern, architectural insight, process improvement, or project knowledge?
2. **Find the Right File**: Use the task-specific guide above to identify which .agent-os file should be updated
3. **Read Before Writing**: Always read the existing content to understand the format and avoid duplication
4. **Add Specific Details**: Include file paths, command examples, code snippets, and concrete examples
5. **Cross-Reference**: Link to related concepts in other .agent-os files when relevant
6. **Verify Accuracy**: Ensure your additions are factual and tested

This creates a continuous learning loop where each agent contributes to the collective intelligence of the system.

## Testing Strategy

### Unit Testing (Vitest)

- Test utility functions and business logic
- Test PayloadCMS field configurations and validations
- Test component props and state management
- Run tests with `pnpm vitest` before commits

### End-to-End Testing (Playwright)

- Test complete user flows through the application
- Test PayloadCMS admin panel interactions
- Test frontend component interactions and navigation
- Test documentation site functionality
- Run tests with `pnpm test` before deployments

### Manual Testing Checklist

- [ ] PayloadCMS admin panel loads and functions correctly
- [ ] Frontend components render and interact properly
- [ ] Documentation site navigation works
- [ ] Registry components install via shadcn CLI
- [ ] No console errors in browser dev tools
- [ ] Mobile responsiveness verified
