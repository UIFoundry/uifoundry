# UIFoundry Multi-Agent System Instructions

You are working in the UIFoundry project, which has a sophisticated multi-agent system for automated component development.

## Core Principle: Proactive Agent Delegation

**IMPORTANT**: You should PROACTIVELY use specialist agents for tasks that match their expertise. Do NOT wait for the user to explicitly request agent usage.

### When to Use Specialist Agents

Use the Task tool to delegate to specialist agents when:

1. **Registry Migration Tasks** → Use `registry-porter` agent
   - Porting components from src/ to registry/
   - Updating import paths and transformations
   - Testing CLI installation
   - Any registry-related work

2. **Documentation Tasks** → Use `docs-writer` agent
   - Creating component documentation
   - Updating documentation navigation
   - Writing MDX files
   - Registry mapping updates

3. **Source Development Tasks** → Use `source-helper` agent (when available)
   - Implementing new components in src/
   - Debugging integration issues
   - Browser testing during development

4. **Complex Multi-Step Tasks** → Use appropriate specialist agents in parallel
   - Break down the work and delegate to multiple agents simultaneously
   - Example: "Port Footer blocks to registry and write docs" → Use both `registry-porter` and `docs-writer`

### How to Delegate

When you recognize a task matches a specialist agent's domain:

1. **Identify the specialist** from available agents
2. **Use the Task tool** with the appropriate subagent_type
3. **Provide clear context** including:
   - What needs to be done
   - Relevant file paths
   - Expected outcomes
   - Any patterns to follow

### Example Recognition Patterns

**User says**: "Port the footer blocks to the registry"
**You think**: This is registry migration work
**You do**: Delegate to `registry-porter` agent immediately

**User says**: "Write documentation for these components"
**You think**: This is documentation work
**You do**: Delegate to `docs-writer` agent immediately

**User says**: "Port footer blocks and write docs"
**You think**: This involves both registry AND docs
**You do**: Delegate to BOTH agents in parallel using a single message with multiple Task tool calls

## Available Specialist Agents

- `registry-porter` - Registry migration with CLI and browser testing
- `docs-writer` - Documentation creation and maintenance
- `source-helper` - Source code development and debugging
- `ui-designer` - UI component implementation
- `api-engineer` - API/backend implementation
- `database-engineer` - Database migrations and schemas
- `testing-engineer` - Test implementation
- `frontend-verifier` - Frontend verification
- `backend-verifier` - Backend verification
- `implementation-verifier` - Overall quality verification

## Agent Coordination Standards

1. **Read before delegating**: Check `agent-os/standards/` and `agent-os/workflows/` for relevant context
2. **Provide complete context**: Give agents all the information they need to work autonomously
3. **Delegate in parallel**: When tasks are independent, use multiple Task calls in a single message
4. **Trust agent output**: Agents are specialists - trust their results unless there's clear evidence of issues

## Project Structure Awareness

- **Source**: `src/payload/blocks/`, `src/payload/fields/`, etc.
- **Registry**: `registry/payload/blocks/`, `registry/payload/fields/`, etc.
- **Documentation**: `content/docs/`
- **Agent OS**: `agent-os/` - Contains workflows and standards
- **Registry Config**: `registry.json` (root) - The source of truth
- **Public Registry**: `public/r/registry.json` - Auto-generated, do NOT edit

## Key Project Patterns

### Registry Migration Pattern
1. Transform imports from `~/` to `@/registry/default/lib/`
2. Copy to registry/ with kebab-case naming
3. Update registry.json (root file only)
4. Test CLI installation
5. Browser validation

### Documentation Pattern
1. Create MDX file in `content/docs/[category]/`
2. Follow 5-section template (Preview, Props, Installation, Registry Deps, NPM Deps)
3. Update navigation meta.json files
4. Register components in mdx-components.tsx for previews

### Component Development Pattern
1. Implement in src/ first
2. Test functionality in development
3. Migrate to registry/
4. Create documentation
5. Verify end-to-end

## Remember

- **Be proactive**: Use agents without being asked when the task matches their expertise
- **Think in parallel**: Multiple agents can work simultaneously on independent tasks
- **Provide context**: Agents need clear instructions and relevant file paths
- **Trust specialists**: Agents are experts in their domains
- **Report results**: Always summarize what the agents accomplished

This system is designed to make you more efficient by leveraging specialist agents. Use them liberally!
