# Agent Guidelines for UIFoundry

## Build/Lint/Test Commands

- `pnpm build` - Build the app (runs payload generate:types then next build)
- `pnpm run dev` - Start dev server on port 3001 with turbo
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix linting issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run both lint and typecheck
- `pnpm format:check` - Check prettier formatting
- `pnpm format:write` - Fix prettier formatting
- No test framework configured

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
    styles/: global tailwind styles and utils
    trpc/: trpc clients
    ui/: shadcn ui code for custom registry components
    utils/: sst utils

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

### Context7 Documentation

- Always use Context7 to fetch official documentation for core dependencies
- Reference docs before implementing features or debugging issues
- Prioritize official sources over community content for accuracy

### Sequential Thinking

- Use structured thinking for complex, multi-step problems
- Leave thought summaries in PRs for future reference
- Essential for design decisions with trade-offs

### Web Research

- Fetch content from official sources and community discussions
- Follow troubleshooting resource priorities (see below)
- Never paste secrets or tokens in requests

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

Use Context7 to fetch official docs in this priority order:

- **PayloadCMS**: Official docs → GitHub examples → API reference
- **Next.js**: Use sparingly with small token limits (500-2000) and specific topics due to large doc size
- **SST**: Official docs → GitHub discussions → AWS service docs
- **Better Auth**: Official docs → GitHub issues
- **Shadcn**: Official docs → component source
- **TRPC**: Official docs → GitHub examples
- **MongoDB**: Official docs → Atlas documentation

**Context7 Usage Notes**:

- Specify token limits to control response size (default: 10,000)
- Use specific topics to focus searches (e.g., "routing", "authentication")
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

- [ ] Run `pnpm run check` to verify lint and types
- [ ] Test affected routes in browser
- [ ] Verify PayloadCMS admin panel integration
- [ ] Leave thought summary in PR description
- [ ] Confirm no secrets or sensitive data committed

### Deployment Readiness

- [ ] Build passes: `pnpm build`
- [ ] Types generate correctly
- [ ] No console errors in browser
- [ ] Admin panel functionality verified
- [ ] Environment variables documented

## Roadmap Updates Protocol

When completing tasks or implementing features:

1. **Mark Progress in README**: Update the README.md roadmap by changing `[ ]` to `[x]` for completed items
2. **Update Block Counts**: Increment counts in marketing blocks checklist (e.g., "Hero (2/5+)")
3. **Document in Commits**: Reference roadmap progress in commit messages using conventional commits
4. **Sync Agent-OS**: Keep `.agent-os/product/roadmap.md` aligned with README if making structural changes
5. **Verify Alignment**: Always check current phase objectives before starting new work

## LLM Protocol

- To achieve the best context when bug finding, use git to find the latest changed files, then narrow your initial search to those files to see what may be the root cause
- Always use MCP server capabilities to enhance development workflow
- Prioritize official documentation over community sources
- Use structured thinking for complex problems and document reasoning
- **Update README roadmap progress** when completing features or tasks
