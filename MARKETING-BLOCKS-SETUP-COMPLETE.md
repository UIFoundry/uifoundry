# ✅ Marketing Blocks Workflow Setup Complete

> **Using OpenCode?** See `OPENCODE-QUICKSTART.md` for OpenCode-specific instructions.
>
> **Quick Answer**: Use `Tab → task-coordinator` (your existing agent) instead of creating a new marketing-blocks-coordinator.

## What Was Created

### 1. Core Workflow Documentation

- **`agent-os/workflows/implementation/build-marketing-blocks.md`**
  - Complete 3-phase workflow for building marketing blocks
  - Phase 1: Source & Build (dependency installation + PayloadCMS integration)
  - Phase 2: Registry Migration (import transformation + CLI testing)
  - Phase 3: Documentation (5-section template + registry mappings)

### 2. Quick Start Guide

- **`agent-os/QUICKSTART-MARKETING-BLOCKS.md`**
  - User-friendly guide with 3 usage methods
  - Detailed walkthrough of coordinator workflow
  - Troubleshooting and tips
  - Common workflows and examples

### 3. OpenCode Command

- **`.claude/commands/build-marketing-blocks.md`**
  - Slash command: `/build-marketing-blocks`
  - Quick entry point to the workflow

### 4. Specialized Agents

#### Updated Existing Agent:

- **`.claude/agents/source-helper.md`**
  - Enhanced with dependency installation workflow
  - Marketing blocks Phase 1 implementation
  - Browser testing with Playwright
  - Complete validation checklists

#### Created New Agent:

- **`.claude/agents/marketing-blocks-coordinator.md`**
  - Orchestrates entire 3-phase pipeline
  - Source discovery from Awesome Shadcn UI
  - Agent delegation and progress tracking
  - Quality gates and user review points
  - Roadmap updates

#### Existing Agents (Already in opencode.json):

- **`registry-porter`** - Phase 2 registry migration
- **`docs-writer`** - Phase 3 documentation
- Both already configured in `.claude/agents/agent-os/implementers/`

### 5. Supporting Documentation

- **`agent-os/workflows/implementation/README.md`**
  - Overview of all implementation workflows
  - Guidance on choosing the right workflow

---

## How to Use It: 3 Methods

### ⭐️ Method 1: Fully Automated with Coordinator (RECOMMENDED)

**Best for**: Building multiple components efficiently

```bash
# In Claude Code, switch to coordinator
Tab → marketing-blocks-coordinator

# Tell it what you want
"I want to build 5 Hero blocks"
```

**What happens automatically**:

1. Searches Awesome Shadcn UI for MIT-licensed candidates
2. Presents 10-15 options for you to select from
3. You choose 5 by number (e.g., "1, 3, 5, 7, 9")
4. **Phase 1**: @source-helper builds all 5 with dependencies
5. You approve → **Phase 2**: @registry-porter migrates all 5
6. You approve → **Phase 3**: @docs-writer documents all 5
7. Updates README.md roadmap automatically

**Timeline**: ~30-45 minutes for 5 components (mostly automated)

**Review Points**:

- After source selection (choose components)
- After Phase 1 (optional: test at localhost:3001)
- After Phase 2 (optional: verify registry)
- After Phase 3 (recommended: check docs quality)

---

### Method 2: Command-Based

```bash
# Run the slash command
/build-marketing-blocks

# Then specify what you want
"Build 3 Feature blocks"
```

---

### Method 3: Manual Agent Delegation

**More control, good for learning or debugging**

```bash
# Phase 1
@source-helper Build Hero_3 using https://github.com/example/hero
Follow build-marketing-blocks.md Phase 1

# Phase 2
@registry-porter Migrate Hero_3 to registry
Follow add-registry-component.md

# Phase 3
@docs-writer Document Hero_3
Follow maintain-documentation-system.md
```

---

## Prerequisites Before Starting

✅ **Dev server running**:

```bash
pnpm dev
# Keep this terminal open - agents use HMR for testing
```

✅ **Know what you want to build**: Hero, Features, Pricing, etc.

✅ **Clean git state** (optional but recommended)

---

## Quick Test: Build Your First Component

**Test with a single component first**:

```bash
# Switch to coordinator
Tab → marketing-blocks-coordinator

# Request one component
"Build 1 Hero block as a test"

# Coordinator will:
# 1. Search for candidates
# 2. Present options
# 3. You select one
# 4. Automated 3-phase pipeline runs
# 5. ~7-10 minutes later, complete!
```

**What you'll get**:

- ✅ Working component in `src/payload/blocks/Hero/Hero_3/`
- ✅ Registry version in `registry/payload/blocks/hero/hero-3/`
- ✅ Documentation at `content/docs/blocks/hero/hero-3.mdx`
- ✅ All dependencies installed
- ✅ Tested at localhost:3001
- ✅ TypeScript compiles
- ✅ CLI installation works

---

## Scaling Up: Build All Marketing Blocks

**Goal**: Complete all 15 block types (5 variants each = 75 total)

```bash
Tab → marketing-blocks-coordinator

# Build in batches of 5
"Build 5 Hero blocks"          # Batch 1: ~35 min
"Build 5 Feature blocks"       # Batch 2: ~35 min
"Build 5 Pricing blocks"       # Batch 3: ~35 min
"Build 5 Testimonial blocks"   # Batch 4: ~35 min
"Build 5 FAQ blocks"           # Batch 5: ~35 min
# ... continue for all 15 types

# Or specify remaining count
"Build remaining Hero blocks to reach 5 total"
```

**Timeline**: ~8-10 hours for all 75 components (15 batches)

**Monitoring**: Mostly automated - you just approve at phase gates

---

## What Gets Created Per Batch (5 Components)

### Source Files (10 files)

```
src/payload/blocks/Hero/
├── Hero_3/config.ts + index.tsx
├── Hero_4/config.ts + index.tsx
├── Hero_5/config.ts + index.tsx
├── Hero_6/config.ts + index.tsx
└── Hero_7/config.ts + index.tsx
```

### Registry Files (10 files)

```
registry/payload/blocks/hero/
├── hero-3/config.ts + index.tsx
├── hero-4/config.ts + index.tsx
├── hero-5/config.ts + index.tsx
├── hero-6/config.ts + index.tsx
└── hero-7/config.ts + index.tsx
```

### Documentation (5 files)

```
content/docs/blocks/hero/
├── hero-3.mdx
├── hero-4.mdx
├── hero-5.mdx
├── hero-6.mdx
└── hero-7.mdx
```

### Updated Files

- `package.json` - Dependencies added
- `registry.json` - 5 component entries
- `src/payload/constants/blocks.ts` - 5 slug constants
- `src/payload/blocks/Hero/index.ts` - 5 exports
- `src/components/RenderBlocks/RenderBlocks.tsx` - 5 cases
- `agent-os/standards/global/registry-mapping.md` - Mappings
- `README.md` - Roadmap progress

**Total**: ~25-30 new files + 5-10 updated per batch

---

## Key Features

### ✅ Never Write From Scratch

- Always sources from MIT-licensed shadcn ecosystem
- Primary: [Awesome Shadcn UI](https://github.com/birobirobiro/awesome-shadcn-ui)
- Fallback: [Tailark Free Tier](https://tailark.com/)

### ✅ Automated Dependency Management

- Analyzes source dependencies
- Installs missing packages automatically
- Documents what was installed and why

### ✅ Full PayloadCMS Integration

- Creates admin panel configuration
- Connects fields to React components
- Tests in browser at localhost:3001

### ✅ Registry Distribution

- Transforms imports for registry compatibility
- Tests CLI installation
- Validates browser functionality

### ✅ Complete Documentation

- 5-section template (Preview, Props, Installation, Dependencies)
- Registry mappings maintained
- Navigation updated
- MDX components registered

### ✅ Quality Validation

- TypeScript compilation
- Browser testing (desktop/mobile)
- Console error checking
- CLI installation verification
- Responsive design validation

### ✅ Progress Tracking

- Todo lists for each batch
- README.md roadmap updates
- Clear review checkpoints

---

## Batch Size Strategy

**First Time**: 1 component (test workflow)

**Learning**: 2-3 components (get comfortable)

**Standard**: 3-4 components (good pace)

**Maximum**: 5 components (never exceed)

**Don't**: Try to build all 75 at once - breaks monitoring

---

## Troubleshooting Quick Reference

### Dev server not running

```bash
pnpm dev
```

### TypeScript errors

```bash
pnpm build  # Regenerate Payload types
pnpm typecheck
```

### Dependency installation fails

```bash
pnpm store prune
pnpm add package-name
```

### Component won't render

1. Check block registered in renderer
2. Check PayloadCMS data exists (admin panel)
3. Check browser console for errors
4. Regenerate types: `pnpm build`

---

## Success Metrics

After each batch, you'll have:

✅ **Working Components**: Tested in source and registry
✅ **Admin Integration**: Available in PayloadCMS
✅ **CLI Installation**: Installable via shadcn
✅ **Documentation**: Complete 5-section docs
✅ **Type Safety**: TypeScript compiles clean
✅ **Zero Errors**: Clean browser console
✅ **Responsive**: Works mobile/tablet/desktop
✅ **Tracked Progress**: README roadmap updated

---

## Next Steps

1. **Start dev server** (if not running):

   ```bash
   pnpm dev
   ```

2. **Test with one component**:

   ```bash
   Tab → marketing-blocks-coordinator
   "Build 1 Hero block as a test"
   ```

3. **Scale to full batch**:

   ```bash
   "Build 5 Hero blocks"
   ```

4. **Continue with other block types**:

   ```bash
   "Build 5 Feature blocks"
   "Build 5 Pricing blocks"
   # etc.
   ```

5. **Monitor progress in README.md**:
   - Check roadmap section for completion status
   - Coordinator updates automatically

---

## Documentation Reference

**Primary Guides**:

- 📘 **Quick Start**: `agent-os/QUICKSTART-MARKETING-BLOCKS.md`
- 📗 **Full Workflow**: `agent-os/workflows/implementation/build-marketing-blocks.md`
- 📙 **OpenCode Workflow**: `agent-os/OPENCODE-WORKFLOW.md`

**Agent Instructions**:

- 🤖 **Coordinator**: `.claude/agents/marketing-blocks-coordinator.md`
- 🔧 **Source Helper**: `.claude/agents/source-helper.md`
- 📦 **Registry Porter**: `.claude/agents/agent-os/implementers/registry-porter.md`
- 📝 **Docs Writer**: `.claude/agents/agent-os/implementers/docs-writer.md`

**Supporting Docs**:

- 🎯 **Registry Migration**: `agent-os/workflows/documentation/add-registry-component.md`
- 📚 **Documentation System**: `agent-os/workflows/documentation/maintain-documentation-system.md`
- 🧪 **Testing Protocol**: `agent-os/workflows/documentation/registry-testing-protocol.md`

---

## Ready to Start?

```bash
# Recommended: Use the coordinator
Tab → marketing-blocks-coordinator
"I want to build 5 Hero blocks"

# The coordinator handles everything:
# ✅ Source discovery
# ✅ Agent delegation
# ✅ Quality validation
# ✅ Progress tracking
# ✅ Roadmap updates

# You just review and approve at key checkpoints!
```

**Questions?** Check `agent-os/QUICKSTART-MARKETING-BLOCKS.md` for detailed walkthrough.

---

## System Architecture

```
User Request
    ↓
marketing-blocks-coordinator
    ↓
┌───────────────┬────────────────┬──────────────────┐
│   Phase 1     │    Phase 2     │     Phase 3      │
│ Source & Build│    Registry    │  Documentation   │
│               │   Migration    │                  │
│ @source-helper│ @registry-     │  @docs-writer    │
│               │  porter        │                  │
│               │                │                  │
│ • Install deps│ • Transform    │ • Create MDX     │
│ • Create      │   imports      │ • Update         │
│   config.ts   │ • Copy to      │   mappings       │
│ • Create      │   registry     │ • Update nav     │
│   index.tsx   │ • Test CLI     │ • Build docs     │
│ • Test browser│ • Test browser │                  │
└───────────────┴────────────────┴──────────────────┘
              ↓
         Validation
              ↓
    README.md Updated
              ↓
       Batch Complete ✅
```

---

**Setup Complete!** 🎉

Start building your marketing blocks now. The workflow handles all the complexity - you just guide it and review at key checkpoints.
