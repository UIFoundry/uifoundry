# Marketing Blocks Workflow - OpenCode Quick Start

## How OpenCode Works

In OpenCode, you interact with agents through:

1. **Tab key** → Switch between primary agents (`build`, `plan`, `task-coordinator`)
2. **@mentions** → Call subagents (`@source-helper`, `@registry-porter`, `@docs-writer`)
3. **Slash commands** → Run workflows (`/build-marketing-blocks`)

---

## ✅ Recommended Approach for OpenCode: Use task-coordinator

Your `opencode.json` already has `task-coordinator` configured as a primary agent that can delegate to subagents.

### How to Use It

**Step 1: Switch to task-coordinator**

```bash
# Press Tab key and select
Tab → task-coordinator
```

**Step 2: Request what you want**

```
I want to build 5 Hero blocks using the marketing blocks workflow.

Follow @agent-os/workflows/implementation/build-marketing-blocks.md
```

**Step 3: Let it orchestrate**

The task-coordinator will:

1. Read the workflow documentation
2. Search for component sources (or ask you for URLs)
3. Delegate to `@source-helper` for Phase 1
4. Delegate to `@registry-porter` for Phase 2
5. Delegate to `@docs-writer` for Phase 3
6. Update README.md roadmap

---

## Alternative: Use Slash Command

**Step 1: Run the command**

```bash
/build-marketing-blocks
```

**Step 2: Specify what you want**

```
Build 5 Hero blocks
```

The current agent (usually `build`) will load the workflow and guide you through it.

---

## Alternative: Manual Delegation (Most Control)

**Best for**: Learning the workflow or handling one component at a time

### Phase 1: Source & Build

```bash
@source-helper Build Hero_3 component

Source: https://github.com/magicui/hero-section

Requirements:
- Install all dependencies
- Create PayloadCMS config in src/payload/blocks/Hero/Hero_3/
- Test at localhost:3001

Follow @agent-os/workflows/implementation/build-marketing-blocks.md Phase 1
```

### Phase 2: Registry Migration

```bash
@registry-porter Migrate Hero_3 to registry

Source: src/payload/blocks/Hero/Hero_3/
Target: registry/payload/blocks/hero/hero-3/

Follow @agent-os/workflows/documentation/add-registry-component.md
```

### Phase 3: Documentation

```bash
@docs-writer Create documentation for Hero_3

Registry location: registry/payload/blocks/hero/hero-3/

Follow @agent-os/workflows/documentation/maintain-documentation-system.md
```

---

## 🧪 Quick Test: Build Your First Component

**Recommended test workflow**:

```bash
# 1. Make sure dev server is running (separate terminal)
pnpm dev

# 2. Switch to task-coordinator
Tab → task-coordinator

# 3. Request one component
"Build 1 Hero block as a test using the marketing blocks workflow.

Search Awesome Shadcn UI for a good MIT-licensed hero component.

Follow @agent-os/workflows/implementation/build-marketing-blocks.md"
```

**Expected flow**:

1. task-coordinator searches for candidates or asks you for a URL
2. You select one
3. Calls `@source-helper` → builds in src/ (~5-7 min)
4. Calls `@registry-porter` → migrates to registry/ (~3-5 min)
5. Calls `@docs-writer` → creates documentation (~2-3 min)
6. Updates README.md
7. **Total: ~10-15 minutes for complete component**

---

## OpenCode Agent Configuration

Your `opencode.json` is already configured with the agents you need:

### Primary Agents (Switch with Tab)

- **`build`** - General development (default)
- **`plan`** - Planning and read-only analysis
- **`task-coordinator`** - Orchestrates workflows (USE THIS)

### Subagents (Call with @mention)

- **`@source-helper`** - Phase 1: Source & Build
- **`@registry-porter`** - Phase 2: Registry Migration
- **`@docs-writer`** - Phase 3: Documentation
- **`@spec-planner`** - Create specifications
- **`@code-reviewer`** - Review code quality

---

## Batch Processing: Build 5 Components

**Once comfortable with the workflow**:

```bash
Tab → task-coordinator

"Build 5 Hero blocks using the marketing blocks workflow.

Search Awesome Shadcn UI for 10-15 MIT-licensed hero components and present them to me for selection.

Process all 5 through the 3-phase pipeline:
1. Phase 1: @source-helper builds all 5
2. Phase 2: @registry-porter migrates all 5
3. Phase 3: @docs-writer documents all 5

Follow @agent-os/workflows/implementation/build-marketing-blocks.md

Update README.md when complete."
```

**Timeline**: ~30-45 minutes for 5 components (mostly automated)

---

## Key Differences from Claude Code Instructions

The main docs reference "Tab → marketing-blocks-coordinator" which was for Claude Code's agent system.

**For OpenCode, use**:

```bash
Tab → task-coordinator  # Your existing orchestrator agent
```

The `task-coordinator` agent in your `opencode.json` is already configured to:

- Read workflow documentation
- Delegate to subagents using the `task` tool
- Orchestrate the 3-phase pipeline

---

## File Structure Reference

**Workflow Documentation**:

- `agent-os/workflows/implementation/build-marketing-blocks.md` (complete workflow)
- `agent-os/QUICKSTART-MARKETING-BLOCKS.md` (general quick start)
- `OPENCODE-QUICKSTART.md` (this file - OpenCode specific)

**Agent Instructions**:

- `.claude/agents/source-helper.md` (Phase 1 instructions)
- `.claude/agents/agent-os/implementers/registry-porter.md` (Phase 2)
- `.claude/agents/agent-os/implementers/docs-writer.md` (Phase 3)

**Command**:

- `.claude/commands/build-marketing-blocks.md` (slash command)

---

## What You'll Get Per Component

After running the full pipeline for one component:

✅ **Source files**: `src/payload/blocks/Hero/Hero_3/{config.ts, index.tsx}`
✅ **Registry files**: `registry/payload/blocks/hero/hero-3/{config.ts, index.tsx}`
✅ **Documentation**: `content/docs/blocks/hero/hero-3.mdx`
✅ **Dependencies installed**: All npm packages needed
✅ **Registry entry**: Added to `registry.json`
✅ **Constants updated**: Block slug in `src/payload/constants/blocks.ts`
✅ **Exports updated**: Block exported and registered
✅ **Validated**: TypeScript compiles, browser tested, CLI tested
✅ **Documented**: 5-section MDX with all links and mappings

---

## Troubleshooting

### "How do I know which agent I'm talking to?"

OpenCode shows the current agent in your terminal prompt or chat interface. Use `Tab` to switch.

### "Can I use the slash command with any agent?"

Yes! Slash commands work regardless of which primary agent is active. The command will use the current agent's capabilities.

### "What if task-coordinator doesn't delegate properly?"

Be explicit in your request:

```
Use @source-helper to build the component
Then use @registry-porter to migrate it
Then use @docs-writer to document it
```

### "Do I need to create a marketing-blocks-coordinator agent?"

No! Your existing `task-coordinator` agent can handle this workflow. I've updated it in `opencode.json` to include the tools needed (webfetch, todowrite, todoread).

---

## Recommended Workflow for OpenCode

### Option 1: Full Automation via task-coordinator (BEST)

```bash
Tab → task-coordinator

"Build 5 Hero blocks using @agent-os/workflows/implementation/build-marketing-blocks.md

Search Awesome Shadcn UI, present candidates, delegate to subagents for all 3 phases."
```

### Option 2: Semi-Manual (More Control)

```bash
Tab → task-coordinator

"Search Awesome Shadcn UI for 10 Hero block candidates"

# [Review candidates, select 5]

"Use @source-helper to build these 5: [URLs]"

# [After Phase 1 complete]

"Use @registry-porter to migrate all 5"

# [After Phase 2 complete]

"Use @docs-writer to document all 5"
```

### Option 3: Fully Manual (Maximum Control)

```bash
# Phase 1
@source-helper Build Hero_3 using https://example.com/hero

# Phase 2
@registry-porter Migrate Hero_3

# Phase 3
@docs-writer Document Hero_3
```

---

## Next Steps

1. **Test with one component**:

   ```bash
   Tab → task-coordinator
   "Build 1 Hero block as a test following build-marketing-blocks.md"
   ```

2. **Scale to batch of 5**:

   ```bash
   Tab → task-coordinator
   "Build 5 Hero blocks following build-marketing-blocks.md"
   ```

3. **Continue with other types**:
   ```bash
   "Build 5 Feature blocks following build-marketing-blocks.md"
   "Build 5 Pricing blocks following build-marketing-blocks.md"
   ```

---

## Summary

**For OpenCode, use**:

- ✅ `Tab → task-coordinator` (not marketing-blocks-coordinator)
- ✅ Your existing `opencode.json` configuration
- ✅ Reference the workflow: `@agent-os/workflows/implementation/build-marketing-blocks.md`
- ✅ Subagents will be called automatically: `@source-helper`, `@registry-porter`, `@docs-writer`

**No need to**:

- ❌ Add a new marketing-blocks-coordinator to opencode.json
- ❌ Modify your existing agent structure
- ❌ Learn new commands beyond Tab and @mentions

The workflow is ready to use with your existing OpenCode setup!
