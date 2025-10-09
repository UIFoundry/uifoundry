# Marketing Blocks Workflow - Quick Start Guide

> **Using OpenCode?** See `OPENCODE-QUICKSTART.md` for OpenCode-specific instructions using `task-coordinator` and `@subagents`.

## Overview

This guide shows you how to quickly build marketing blocks (1-5 at a time) using the automated 3-phase pipeline.

**What You Get**:

- ✅ Source components from MIT-licensed shadcn ecosystem (never written from scratch)
- ✅ Fully integrated with PayloadCMS (admin panel + frontend)
- ✅ Registry-ready components (installable via shadcn CLI)
- ✅ Complete documentation (5-section template with all links)
- ✅ Automated dependency management
- ✅ Browser-tested and validated

**3-Phase Pipeline**:

1. **Phase 1**: Source & Build in `src/` with dependency installation
2. **Phase 2**: Migrate to `registry/` with CLI testing
3. **Phase 3**: Create documentation with 5-section template

---

## Prerequisites

**Before starting**:

1. ✅ Dev server running at `localhost:3001` (in a separate terminal)
2. ✅ Git repository clean or ready to commit changes
3. ✅ Know which block type you want to build (Hero, Features, Pricing, etc.)

**Start dev server if not running**:

```bash
pnpm dev
```

Keep this terminal open - agents will use HMR for instant feedback.

---

## Quick Start: 3 Ways to Use the Workflow

### Method 1: Fully Automated with Coordinator (Recommended)

**Best for**: Building multiple components with minimal monitoring

```bash
# In Claude Code, switch to the marketing blocks coordinator
Tab → marketing-blocks-coordinator

# Then tell it what you want
"I want to build 5 Hero blocks"
```

**What happens**:

1. Coordinator searches Awesome Shadcn UI for candidates
2. Presents 10-15 options for you to review
3. You select 5 by number (e.g., "1, 3, 5, 7, 9")
4. Coordinator delegates to @source-helper for Phase 1
5. After your approval, delegates to @registry-porter for Phase 2
6. After your approval, delegates to @docs-writer for Phase 3
7. Updates README roadmap automatically

**Timeline**: ~30-45 minutes for 5 components (mostly automated)

### Method 2: Command-Based

**Best for**: Starting quickly with a command

```bash
# Run the slash command
/build-marketing-blocks
```

This loads the workflow instructions and you can then specify what you want to build.

### Method 3: Manual Agent Delegation

**Best for**: More control, debugging, or learning the workflow

**Phase 1 - Source & Build**:

```bash
@source-helper Build Hero_3 using this source: https://github.com/example/hero-component

Install all dependencies, create PayloadCMS config, and test at localhost:3001.
Follow @agent-os/workflows/implementation/build-marketing-blocks.md Phase 1.
```

**Phase 2 - Registry Migration**:

```bash
@registry-porter Migrate Hero_3 from src/ to registry/

Test CLI installation and browser functionality.
Follow @agent-os/workflows/documentation/add-registry-component.md.
```

**Phase 3 - Documentation**:

```bash
@docs-writer Create documentation for Hero_3

Follow 5-section template and update all registry mappings.
Follow @agent-os/workflows/documentation/maintain-documentation-system.md.
```

---

## Detailed Walkthrough: Method 1 (Coordinator)

### Step 1: Start the Coordinator

```bash
# In Claude Code
Tab → marketing-blocks-coordinator
```

You'll see the coordinator agent activate with its specialized tools.

### Step 2: Specify What You Want

Tell the coordinator what you want to build:

**Examples**:

```
"I want to build 5 Hero blocks"
"Build 3 Pricing blocks"
"Let's create some Feature blocks"
```

**Coordinator responds**:

```markdown
I'll help you build Hero blocks using the 3-phase pipeline.

**Current Status** (from README.md):

- Hero (0/5) - 5 needed for MVP

**Batch Size**: Building 5 components (recommended)

**Source Strategy**:

- Awesome Shadcn UI (primary)
- Tailark Free Tier (fallback)

Searching for Hero block candidates...
```

### Step 3: Review Source Candidates

**Coordinator presents options**:

```markdown
📦 Found 12 candidates for Hero blocks:

**High Quality** (⭐️ 2k+):

1. magicui/hero-section - Animated hero with spotlight effect
   - Preview: https://magicui.design/docs/components/hero-section
   - License: MIT ✅
   - Tech: Framer Motion, Tailwind

2. aceternity-ui/hero - 3D card hero with parallax
   - Preview: https://ui.aceternity.com/components/3d-card
   - License: MIT ✅
   - Tech: Three.js, Tailwind

3. shadcn-landing-page/hero - Clean minimal hero
   - Preview: https://shadcn-landing-page.vercel.app
   - License: MIT ✅
   - Tech: Tailwind, Lucide Icons

**Good Quality** (⭐️ 500-2k): 4. [More options...] 5. [More options...]
...

Please select 5 components by number (e.g., "1, 3, 5, 7, 9").
```

### Step 4: Select Components

**You respond**:

```
1, 3, 5, 7, 9
```

**Coordinator confirms**:

```markdown
✅ Selected 5 components:

1. magicui/hero-section
2. shadcn-landing-page/hero
3. [Component 5]
4. [Component 7]
5. [Component 9]

Creating implementation plan...

📋 TODO LIST CREATED:
☐ Phase 1: Source & Build (5 components)
☐ Phase 2: Registry Migration (5 components)
☐ Phase 3: Documentation (5 components)
☐ Update README roadmap

Starting Phase 1...
```

### Step 5: Phase 1 - Source & Build (Automated)

**Coordinator delegates to @source-helper**:

For each component, @source-helper will:

1. ✅ Fetch the source code
2. ✅ Analyze dependencies (framer-motion, icons, etc.)
3. ✅ Install missing dependencies via `pnpm add`
4. ✅ Create `src/payload/blocks/Hero/Hero_3/config.ts`
5. ✅ Create `src/payload/blocks/Hero/Hero_3/index.tsx`
6. ✅ Register block in constants and exports
7. ✅ Test at `localhost:3001` using Playwright
8. ✅ Verify validation checklist

**You'll see progress updates**:

```markdown
⏳ Building Hero_3...
Installing dependencies: framer-motion, @heroicons/react
✅ Hero_3 complete - All validations passed

⏳ Building Hero_4...
Installing dependencies: react-wrap-balancer
✅ Hero_4 complete - All validations passed

[... continues for all 5 components]
```

**Phase 1 Complete Summary**:

```markdown
📊 PHASE 1 COMPLETE: Hero Batch

**Components Built**: 5/5
✅ Hero_3 - Source & Build Complete
✅ Hero_4 - Source & Build Complete
✅ Hero_5 - Source & Build Complete
✅ Hero_6 - Source & Build Complete
✅ Hero_7 - Source & Build Complete

**Dependencies Installed**:

- framer-motion (3 components)
- @heroicons/react (2 components)
- react-wrap-balancer (1 component)

**Validation**: All checks passed ✅

Ready for Phase 2: Registry Migration
```

**Coordinator asks**:

```
Proceed to Phase 2? (yes/no)
```

**Optional**: You can test at `localhost:3001` before proceeding.

### Step 6: Phase 2 - Registry Migration (Automated)

**You respond**: `yes`

**Coordinator delegates to @registry-porter**:

For each component, @registry-porter will:

1. ✅ Transform imports (`~/` → `@/registry/`)
2. ✅ Copy to `registry/payload/blocks/hero/hero-3/`
3. ✅ Update `registry.json` with component entry
4. ✅ Test CLI installation: `npx shadcn add @uifoundry/hero-3`
5. ✅ Test in browser at `localhost:3001`
6. ✅ Verify validation checklist

**Phase 2 Complete Summary**:

```markdown
📊 PHASE 2 COMPLETE: Hero Batch

**Components Migrated**: 5/5
✅ Hero_3 - Registry Migration Complete
✅ Hero_4 - Registry Migration Complete
✅ Hero_5 - Registry Migration Complete
✅ Hero_6 - Registry Migration Complete
✅ Hero_7 - Registry Migration Complete

**Registry Updates**:

- 5 new entries in registry.json
- All CLI installations tested ✅
- Browser validation passed ✅

Ready for Phase 3: Documentation
```

**Coordinator asks**:

```
Proceed to Phase 3? (yes/no)
```

### Step 7: Phase 3 - Documentation (Automated)

**You respond**: `yes`

**Coordinator delegates to @docs-writer**:

For each component, @docs-writer will:

1. ✅ Create `content/docs/blocks/hero/hero-3.mdx`
2. ✅ Write 5-section documentation:
   - Preview (live component render)
   - Props (PayloadCMS config fields)
   - Installation (CLI command)
   - Registry Dependencies (internal components)
   - NPM Dependencies (external packages)
3. ✅ Update `agent-os/standards/global/registry-mapping.md`
4. ✅ Update component checklist
5. ✅ Update `content/docs/blocks/hero/meta.json`
6. ✅ Register in `mdx-components.tsx`
7. ✅ Verify docs build: `pnpm build`

**Phase 3 Complete Summary**:

```markdown
📊 PHASE 3 COMPLETE: Hero Batch

**Components Documented**: 5/5
✅ Hero_3 - Documentation Complete
✅ Hero_4 - Documentation Complete
✅ Hero_5 - Documentation Complete
✅ Hero_6 - Documentation Complete
✅ Hero_7 - Documentation Complete

**Documentation Updates**:

- 5 new MDX files
- Registry mappings updated
- Navigation updated
- Build successful ✅

**Batch Complete!** 🎉
```

### Step 8: Roadmap Update (Automatic)

**Coordinator updates README.md**:

```diff
- [ ] Hero (0/5)
+ [x] Hero (5/5) ✅
```

**Final Summary**:

```markdown
✅ BATCH COMPLETE: Hero Blocks

**Total Components**: 5
**Total Time**: ~35 minutes
**Success Rate**: 100%

**Files Created**:

- 10 source files (config + component)
- 10 registry files (config + component)
- 5 documentation files
- Updated: registry.json, meta.json, constants, exports

**README Updated**: Hero (5/5) ✅

**Next Steps**:

1. Test full site with all 5 new Hero blocks
2. Start next block type (Features, Pricing, etc.)
3. Build additional Hero variants (7/5+ for premium)

What would you like to build next?
```

---

## Review Points (When to Check Manually)

### After Phase 1 (Optional but Recommended)

Visit `localhost:3001/admin`:

1. Login to admin panel
2. Create a test page
3. Add one of the new blocks
4. Fill in fields
5. Preview page to verify rendering

**If issues found**: Tell coordinator to fix before Phase 2

### After Phase 2 (Optional)

Test CLI installation:

```bash
npx shadcn@latest add @uifoundry/hero-3
```

Check component appears in your components directory.

### After Phase 3 (Recommended)

Visit `localhost:3001/docs`:

1. Navigate to new component docs
2. Check all 5 sections present
3. Verify preview renders
4. Test installation command links

---

## Common Workflows

### Build Remaining Blocks for MVP

**Goal**: Complete all 15 block types (5 variants each)

```bash
Tab → marketing-blocks-coordinator

# Batch 1: Hero blocks
"Build 5 Hero blocks"
[select sources → automated pipeline → complete]

# Batch 2: Feature blocks
"Build 5 Feature blocks"
[select sources → automated pipeline → complete]

# Batch 3: Pricing blocks
"Build 5 Pricing blocks"
[select sources → automated pipeline → complete]

# Continue for all 15 types...
```

**Timeline**: ~8-10 hours for 75 components (15 types × 5 variants)

### Build Additional Variants

**Goal**: Go beyond MVP (7+ variants per type)

```bash
"Build 3 more Hero blocks to reach 8 total"
```

Coordinator checks current count and builds the difference.

### Build Specific Component

**Goal**: You found a specific component you want to add

```bash
@source-helper Build Hero_8 using https://github.com/example/amazing-hero

Install dependencies and follow Phase 1 workflow.
```

Then proceed manually through Phase 2 and 3, or let coordinator take over.

---

## Troubleshooting

### Dev Server Not Running

**Error**: Agents can't test at `localhost:3001`

**Fix**:

```bash
# In separate terminal
pnpm dev

# Wait for "Ready on http://localhost:3001"
```

Then restart the coordinator.

### Dependency Installation Fails

**Error**: `pnpm add` fails for a package

**Fix**: Coordinator/agent will report the error. Common solutions:

```bash
# Clear cache
pnpm store prune

# Retry installation
pnpm add package-name
```

### TypeScript Errors

**Error**: Types don't compile after building component

**Fix**:

```bash
# Regenerate Payload types
pnpm build

# Check types
pnpm typecheck
```

Agent should handle this automatically, but you can run manually if needed.

### Component Won't Render

**Error**: Component doesn't show at `localhost:3001`

**Fix**: Check these in order:

1. Is block registered in renderer? (agent should do this)
2. Does PayloadCMS data exist? (create test page in admin)
3. Are there console errors? (check browser dev tools)
4. Did types regenerate? (run `pnpm build`)

### CLI Installation Fails

**Error**: `npx shadcn add @uifoundry/component` fails

**Fix**: Check `registry.json`:

- Component entry exists
- Import paths correct
- Dependencies listed

Agent should validate this, but you can check manually.

---

## Tips for Success

### Batch Size Strategy

**First time**: Start with 1-2 components to learn the workflow

**Standard**: 3-4 components is a good pace with easy monitoring

**Maximum**: 5 components per batch (never exceed this)

**Don't**: Try to build all 75 components at once - breaks monitoring

### Source Selection Tips

**Look for**:

- ⭐️ High star count (quality indicator)
- ✅ MIT license (must have)
- 🔄 Recent updates (maintained)
- 📝 TypeScript (easier integration)
- 🎨 Modern design (matches project aesthetic)

**Avoid**:

- ❌ No license or non-MIT
- ❌ Outdated dependencies
- ❌ Pure CSS/jQuery (not React)
- ❌ Overly complex (too many dependencies)

### Review Timing

**Quick check**: After each phase completion (~5 min)

**Thorough review**: After full batch complete (~15 min)

**Skip reviews**: Once workflow is proven reliable (at your discretion)

### Incremental vs Batch Mode

**Batch Mode** (default): Complete Phase 1 for all → Phase 2 for all → Phase 3 for all

- Faster overall
- Better context for agents
- Recommended once familiar

**Incremental Mode**: Complete all 3 phases for one component before next

- Easier to review
- Clear stopping points
- Good for first time or complex components

Tell coordinator which mode you prefer.

---

## What Gets Created

### After Complete Batch (5 components)

**Source Files** (`src/`):

```
src/payload/blocks/Hero/
├── Hero_3/
│   ├── config.ts (PayloadCMS configuration)
│   └── index.tsx (React component)
├── Hero_4/
│   ├── config.ts
│   └── index.tsx
... (3 more)
```

**Registry Files** (`registry/`):

```
registry/payload/blocks/hero/
├── hero-3/
│   ├── config.ts (registry version)
│   └── index.tsx (registry version)
├── hero-4/
│   ├── config.ts
│   └── index.tsx
... (3 more)
```

**Documentation Files** (`content/docs/`):

```
content/docs/blocks/hero/
├── hero-3.mdx (5-section documentation)
├── hero-4.mdx
├── hero-5.mdx
├── hero-6.mdx
├── hero-7.mdx
└── meta.json (navigation updated)
```

**Updated Files**:

- `package.json` - New dependencies
- `registry.json` - 5 new component entries
- `src/payload/constants/blocks.ts` - 5 new slug constants
- `src/payload/blocks/Hero/index.ts` - 5 new exports
- `src/components/RenderBlocks/RenderBlocks.tsx` - 5 new cases
- `agent-os/standards/global/registry-mapping.md` - Dependency mappings
- `README.md` - Roadmap progress updated

**Total Files**: ~25-30 new files + 5-10 updated files per batch

---

## Next Steps After Setup

1. **Test the workflow**:

   ```bash
   Tab → marketing-blocks-coordinator
   "Build 1 Hero block as a test"
   ```

2. **Build your first batch**:

   ```bash
   "Build 5 Hero blocks"
   ```

3. **Scale up**: Continue with Features, Pricing, etc.

4. **Monitor progress**: Check README.md for roadmap updates

5. **Review quality**: Spot-check components periodically

---

## Advanced Usage

### Custom Source URLs

If you already have specific components in mind:

```bash
@source-helper Build Hero_3 using https://github.com/magicui/hero-section

Build Hero_4 using https://github.com/aceternity-ui/3d-card-hero

Build Hero_5 using https://github.com/shadcn-landing-page/hero
```

Provide URLs directly instead of searching.

### Parallel Processing

For faster completion (advanced users):

```bash
Tab → marketing-blocks-coordinator
"Build 5 Hero blocks in parallel mode"
```

All components processed simultaneously - faster but less monitoring.

### Resume After Interruption

If workflow interrupted:

```bash
Tab → marketing-blocks-coordinator
"Resume Hero blocks batch - completed Phase 1, need Phase 2 and 3"
```

Coordinator will pick up where you left off.

---

## Success Metrics

After completing a batch, you'll have:

✅ **5 Working Components**: Tested in source and registry
✅ **Admin Integration**: All blocks available in PayloadCMS
✅ **CLI Installation**: Components installable via shadcn CLI
✅ **Complete Documentation**: 5-section docs with all links
✅ **Type Safety**: All TypeScript compiles without errors
✅ **Zero Console Errors**: Clean browser console
✅ **Responsive Design**: Works on mobile, tablet, desktop
✅ **Updated Roadmap**: Progress tracked in README.md

**Quality bar**: Every component should pass all validation checklists in all 3 phases.

---

## Ready to Start?

```bash
# Method 1: Coordinator (Recommended)
Tab → marketing-blocks-coordinator
"I want to build 5 Hero blocks"

# Method 2: Command
/build-marketing-blocks

# Method 3: Manual
@source-helper Build [component]...
```

Choose your method and start building! The workflow handles all the complexity - you just review and approve at key checkpoints.
