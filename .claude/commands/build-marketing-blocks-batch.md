# Build Marketing Blocks Batch

Build 2-5 marketing block components through the complete 3-phase pipeline.

**CRITICAL**: This command follows a STRICT workflow. Do NOT deviate from the process outlined below.

**Usage Examples**:

```bash
/build-marketing-blocks-batch
/build-marketing-blocks-batch 5 Hero blocks
/build-marketing-blocks-batch 3 Feature blocks starting at number 4
/build-marketing-blocks-batch Build 5 Pricing blocks, search for sources
/build-marketing-blocks-batch 2 CTA blocks using these URLs: [url1], [url2]
```

---

## Phase 0: User Input & Source Selection

### Step 1: Parse Initial Context (if provided)

**Check if user provided context with the command:**

- **Count**: How many blocks (2-5)
- **Block type**: Hero, Features, Pricing, etc.
- **Starting number**: Which number to start at (default: next available)
- **Source URLs**: Direct links if provided
- **Source preference**: "search" or specific URLs

**Examples of user input**:

- `/build-marketing-blocks-batch 5 Hero blocks` → Count: 5, Type: Hero, ask for numbers and source
- `/build-marketing-blocks-batch 3 Features starting at 4` → Count: 3, Type: Features, Numbers: 4,5,6, ask for source
- `/build-marketing-blocks-batch Build 2 Pricing, search` → Count: 2, Type: Pricing, will search, ask for numbers
- `/build-marketing-blocks-batch` → Ask for everything

### Step 2: Get Missing Information

Only ask for information NOT provided in initial context:

**If count missing**:

```
How many components? (2-5 recommended, max 5)
```

**If block type missing**:

```
What type of blocks are you building? (Hero, Features, Pricing, etc.)
```

**If numbers not specified**:

```
What are the starting numbers? (e.g., 3, 4, 5, 6, 7 for Hero_3 through Hero_7)

Or should I check README.md and use the next available numbers?
```

**If source not provided**:

```
Please provide source component URLs, or would you like me to search Awesome Shadcn UI?
```

What type of blocks are you building? (Hero, Features, Pricing, etc.)
How many components? (2-5 recommended, max 5)
What are the starting numbers? (e.g., Hero_3, Hero_4, Hero_5, Hero_6, Hero_7)

````

### Step 2: Source Discovery (REQUIRED - DO NOT SKIP)

**NEVER write code from scratch. ALWAYS source from MIT-licensed components.**

Present options:

```markdown
Please choose how to provide sources:

**Option 1**: Provide specific component URLs (one per component)
**Option 2**: Let me search Awesome Shadcn UI for MIT-licensed [BlockType] components

Which option?
````

**SEARCH ORDER (MANDATORY)**:

1. **Primary**: Search Tailark free tier first (always)
2. **Fallback**: If insufficient options, check Awesome Shadcn UI
3. **Last Resort**: Accept user-provided URLs

#### Search Tailark Free Tier (ALWAYS START HERE)

**Step 1: Check what's already built**

```bash
# Read README for progress
grep "[BlockType]" README.md

# List existing blocks
ls src/payload/blocks/[BlockType]/
```

**Step 2: Search Tailark**

1. Use WebFetch to browse https://tailark.com/
2. Navigate to category (hero-sections, features, pricing, etc.)
3. Find 10-15 FREE tier components

**Step 3: Filter out already-built numbers**

**CRITICAL**: Tailark uses numbered components (Hero 1, 2, 3, etc.)

- Check which numbers exist (e.g., Hero_1, Hero_2)
- Only show Tailark components with higher numbers
- Example: If Hero_1 and Hero_2 exist, show Hero 3, 4, 5... only

**Step 4: Present filtered candidates**:

```markdown
Found candidates on Tailark FREE tier:

**Current progress**: Hero (2/5) - Hero_1 and Hero_2 already exist

**Available (excluding already built)**: 3. Tailark Hero 3 - [description] (Free ✅) 4. Tailark Hero 4 - [description] (Free ✅) 5. Tailark Hero 5 - [description] (Free ✅) 6. Tailark Hero 6 - [description] (Free ✅) 7. Tailark Hero 7 - [description] (Free ✅) 8. Tailark Hero 8 - [description] (Free ✅)
...

⚠️ Not showing Hero 1 and Hero 2 (already built)

Select [N] components by number (e.g., "3, 4, 5, 6, 7")
Or type 'shadcn' to check Awesome Shadcn UI
Or provide your own URLs
```

#### Fallback to Awesome Shadcn UI (if needed)

**Only if**:

- Not enough suitable options on Tailark
- User types 'shadcn'
- User explicitly requests it

1. Browse https://github.com/birobirobiro/awesome-shadcn-ui
2. Look for MIT licensed repositories
3. Present additional options

```markdown
Checking Awesome Shadcn UI for more options:

**High Quality** (⭐️ 2k+):
[List components...]

Combined selections available:

- Tailark free: [count] components
- Awesome Shadcn UI: [count] components

Select [N] total by number or mix sources.
```

#### Fallback to Tailark (if needed)

**Only if**:

- Not enough suitable options on Awesome Shadcn UI
- User types 'tailark'
- User explicitly requests it

1. Browse https://tailark.com/ category
2. Look for FREE tier only
3. Present additional options

```markdown
Checking Tailark free tier for more options:

[List Tailark components...]

Combined selections available:

- Awesome Shadcn: [count] components
- Tailark free: [count] components

Select [N] total by number or mix sources.
```

#### User URLs (last resort)

Only accept if explicitly provided:

```markdown
Provide [N] component URLs (MIT licensed or free tier):

1. [URL]
2. [URL]
   ...
```

---

## Phase 1: Source & Build (Batch)

For EACH component in the batch, delegate to `@source-helper`:

```
@source-helper Build [BlockType]_[N] component

**Source URL**: [URL]

**Requirements**:
1. Fetch source code
2. Install ALL dependencies with pnpm
3. Create config.ts (PayloadCMS block configuration)
4. Create index.tsx (React component)
5. Update block constants
6. Register exports
7. Test at localhost:3001

**CRITICAL RULES**:
- DO NOT create TypeScript prop interfaces
- Use generated types from ~/payload-types
- DO NOT manually define component props
- PayloadCMS config generates all types automatically

Follow @agent-os/workflows/implementation/build-marketing-blocks.md Phase 1.
```

**Process all components in Phase 1 before moving to Phase 2.**

**Report Phase 1 summary**:

```markdown
📊 PHASE 1 COMPLETE: [BlockType] Batch

**Components Built**: [N]/[N]
✅ [BlockType]\_X
✅ [BlockType]\_Y
✅ [BlockType]\_Z

**Dependencies Installed**:

- [package-name] (used by X components)
- [package-name] (used by Y components)

All validation checks passed.

Ready for Phase 2: Registry Migration
```

**User Review Point**: Offer to let user test components before proceeding.

---

## Phase 2: Registry Migration (Batch)

For EACH component, delegate to `@registry-porter`:

```
@registry-porter Migrate [BlockType]_[N] to registry

**Source**: src/payload/blocks/[BlockType]/[BlockType]_[N]/
**Target**: registry/payload/blocks/[block-type]/[block-type]-[n]/

Follow @agent-os/workflows/documentation/add-registry-component.md.
```

**Report Phase 2 summary**:

```markdown
📊 PHASE 2 COMPLETE: [BlockType] Batch

**Components Migrated**: [N]/[N]
✅ [BlockType]\_X - CLI ✅ Browser ✅
✅ [BlockType]\_Y - CLI ✅ Browser ✅
✅ [BlockType]\_Z - CLI ✅ Browser ✅

Ready for Phase 3: Documentation
```

**User Review Point**: Offer to verify registry installations.

---

## Phase 3: Documentation (Batch)

For EACH component, delegate to `@docs-writer`:

```
@docs-writer Create documentation for [BlockType]_[N]

**Registry**: registry/payload/blocks/[block-type]/[block-type]-[n]/

Follow @agent-os/workflows/documentation/maintain-documentation-system.md.
```

**Report Phase 3 summary**:

```markdown
📊 PHASE 3 COMPLETE: [BlockType] Batch

**Components Documented**: [N]/[N]
✅ [BlockType]\_X
✅ [BlockType]\_Y
✅ [BlockType]\_Z

All documentation builds successfully.

Batch Complete! 🎉
```

---

## Phase 4: README Update & Batch Summary

1. Read README.md marketing blocks checklist
2. Update the count: `- [ ] [BlockType] (X/5)` → `- [ ] [BlockType] (X+N/5)`
3. Mark complete if 5/5: `- [x] [BlockType] (5/5) ✅`

**Final Summary**:

```markdown
✅ BATCH COMPLETE: [N] [BlockType] Blocks

**Total Time**: ~[X] minutes
**Components**: [List all with sources]
**Dependencies Added**: [Total count]
**Files Created**: ~[N*5] files

**README Updated**: [BlockType] (X/5)

**Next Steps**:

- Build more [BlockType] variants? (current: X/5)
- Start new block type? (Features, Pricing, etc.)
- Test all components together
```

---

## Critical Rules

1. **NEVER skip source selection** - Always get URLs or search
2. **NEVER write from scratch** - Always use MIT sources
3. **NEVER create prop interfaces** - Types auto-generated
4. **ALWAYS delegate to specialists** - Use @source-helper, @registry-porter, @docs-writer
5. **ALWAYS complete Phase 1 for ALL** before Phase 2
6. **ALWAYS complete Phase 2 for ALL** before Phase 3
7. **ALWAYS update README** when complete
8. **MAX 5 components per batch** - Never exceed this

---

## Example Usage

**User runs**: `/build-marketing-blocks-batch`

**Agent**: "What type? How many? Starting numbers?"

**User**: "Hero blocks, 5 components, numbers 3-7"

**Agent**: "Provide URLs or search?"

**User**: "Search"

**Agent**: [Searches Awesome Shadcn, presents 15 candidates]

**User**: "1, 3, 5, 9, 12"

**Agent**:

- Calls @source-helper 5 times (Phase 1)
- Reports Phase 1 summary
- Calls @registry-porter 5 times (Phase 2)
- Reports Phase 2 summary
- Calls @docs-writer 5 times (Phase 3)
- Reports Phase 3 summary
- Updates README

**Result**: 5 complete components in ~30-45 minutes

---

## Phase 5: Cleanup & Learning (Optional - Run After User Corrections)

**When to Run**: After user has made manual corrections and pushed commits.

**To trigger this phase**: User runs `/cleanup-learning` or explicitly requests analysis.

**Purpose**: Analyze user corrections to improve future agent performance.

### Process:

1. **Compare git commits** - Find changes since agent completed work
2. **Categorize corrections** - Code quality, functional fixes, performance, UX
3. **Identify learnable patterns** - What could agents have predicted?
4. **Update documentation** - Add learnings to workflow docs
5. **Create improvement rules** - Specific guidance for future batches

**Example learnings from this batch**:
- Array fields need `minRows: 0` and `maxRows: 10`
- Registry MediaField imports use `@/registry/default/lib/fields/media`
- Canvas animations run at 20-30fps, not 60fps
- Tailwind class ordering handled by Prettier (agents don't need to order)

**Estimated Impact**: 15-20 minutes saved per future batch through fewer manual corrections.

**See full Phase 4 documentation**: `@agent-os/workflows/implementation/build-marketing-blocks.md` Phase 4
