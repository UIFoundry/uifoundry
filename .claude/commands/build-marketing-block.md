# Build Marketing Block

Build a single marketing block component through the 3-phase pipeline: Source & Build, Registry Migration, and Documentation.

**CRITICAL**: This command follows a STRICT workflow. Do NOT deviate from the process outlined below.

**Usage Examples**:

```bash
/build-marketing-block
/build-marketing-block Hero 3
/build-marketing-block Feature block number 5 using https://github.com/example/feature
/build-marketing-block Pricing, search for sources
```

---

## Phase 0: User Input & Source Selection

### Step 1: Parse Initial Context (if provided)

**Check if user provided context with the command:**

- **Block type**: Hero, Features, Pricing, CTA, etc.
- **Block number**: 3, 4, 5, etc.
- **Source URL**: Direct link to component
- **Source preference**: "search" or specific URL

**Examples of user input**:

- `/build-marketing-block Hero 3` → Type: Hero, Number: 3, ask for source
- `/build-marketing-block Feature block using https://...` → Type: Feature, URL provided, ask for number
- `/build-marketing-block Pricing, search sources` → Type: Pricing, will search, ask for number
- `/build-marketing-block` → Ask for everything

### Step 2: Get Missing Information

Only ask for information NOT provided in initial context:

**If block type missing**:

```
What type of block are you building? (Hero, Features, Pricing, etc.)
```

**If number missing**:

```
What number variant is this? (e.g., 3 for Hero_3)
```

**If source not provided**:

```
Please provide the source component URL, or would you like me to search Awesome Shadcn UI?
```

### Step 2: Source Discovery (REQUIRED - DO NOT SKIP)

**NEVER write code from scratch. ALWAYS source from existing components.**

**SEARCH ORDER (MANDATORY)**:

1. **Primary**: Search Tailark free tier first (always)
2. **Fallback**: If nothing suitable found, check Awesome Shadcn UI
3. **Last Resort**: Accept user-provided URL

#### Step 2a: Search Tailark Free Tier (ALWAYS START HERE)

**REQUIRED**: Use WebFetch to browse https://tailark.com/

**Step 1: Check what's already built**

```bash
# Check README for current progress
grep "[BlockType]" README.md
# Example output: - [ ] Hero (2/5)

# Check source directory
ls src/payload/blocks/[BlockType]/
# Example: Hero_1/, Hero_2/
```

**Step 2: Navigate to Tailark category**:

- Hero: https://tailark.com/hero-sections
- Features: https://tailark.com/features
- Pricing: https://tailark.com/pricing
- etc.

**Step 3: Filter for FREE tier AND exclude already-built**

**CRITICAL**: Tailark components are numbered (Hero 1, Hero 2, etc.)

- If Hero_1 exists → DON'T show "Tailark Hero 1"
- If Hero_2 exists → DON'T show "Tailark Hero 2"
- Only show Hero 3, 4, 5, etc. (not yet built)

**Why**: Assumes you used Tailark's numbered components for the existing blocks. Don't duplicate.

**Present filtered findings**:

```markdown
Found [N] candidates on Tailark FREE tier:

**Current progress**: Hero (2/5) - Hero_1 and Hero_2 already exist

**Available (excluding already built)**: 3. Tailark Hero 3 - [description]

- Preview: [tailark.com/preview/hero-3]
- License: Free ✅
- Tech: Tailwind CSS

4. Tailark Hero 4 - [description]
   - Preview: [tailark.com/preview/hero-4]
   - License: Free ✅
   - Tech: Tailwind CSS

...

⚠️ Not showing Hero 1 and Hero 2 (already built as Hero_1 and Hero_2)

Select a component (3-N), or type 'shadcn' to check Awesome Shadcn UI.
```

#### Step 2b: Fallback to Awesome Shadcn UI (if needed)

**Only if**:

- Tailark has <5 suitable components
- User types 'shadcn'
- User explicitly requests Awesome Shadcn UI

**Process**:

1. Use WebFetch to browse https://github.com/birobirobiro/awesome-shadcn-ui
2. Look for repositories matching block type
3. Filter for MIT license (REQUIRED)
4. Present options:

```markdown
Tailark search found limited options.

Checking Awesome Shadcn UI for more [BlockType] components:

1. [component-name] - [description]
   - Preview: [url]
   - License: Free tier ✅
   - Tech: [tech stack]

2. [component-name] - [description]
   ...

Select a component (1-N), or provide your own URL.
```

#### Step 2c: User-Provided URL (last resort)

**Only accept if**:

- User explicitly provides a URL
- Previous searches failed
- User wants a specific component

**Verify**:

1. Check URL is accessible
2. Confirm MIT license or free tier usage
3. Verify it's a React/TypeScript component
4. Check it uses Tailwind CSS

```markdown
You provided: [URL]

Verification:

- Accessible: [✅/❌]
- License: [MIT/Free/Unknown]
- Tech: [React/TypeScript/Tailwind]

Proceed with this source? (yes/no)
```

---

## Phase 1: Source & Build

Delegate to `@source-helper`:

```
@source-helper Build [BlockType]_[N] component

**Source URL**: [URL from Phase 0]

**CRITICAL ORDER - MUST FOLLOW EXACTLY**:

Read @agent-os/workflows/implementation/CRITICAL-BLOCK-BUILD-ORDER.md for full details.

1. **Fetch source code** from the provided URL
2. **Analyze dependencies** - identify npm packages AND shadcn components
3. **Install npm dependencies** - `pnpm add [packages]`
4. **Install shadcn components** - `npx shadcn@latest add [components]`
4. **Create config.ts FIRST** - Map source props to PayloadCMS fields
5. **Update constants** - Add BLOCK_SLUG_[TYPE]_N to src/payload/constants/blocks.ts
6. **Register in exports** - Add to src/payload/blocks/[BlockType]/index.ts
7. **Generate types** - Run `pnpm payload:types` (CRITICAL - DO NOT SKIP)
8. **Verify types** - Check types exist: `grep "[BlockType]_N_Block" src/payload-types.ts`
9. **Create index.tsx using REFACTOR approach**:
   - Copy source component code into index.tsx
   - Update imports following @agent-os/workflows/implementation/IMPORT-PATH-RULES.md:
     - Change `@/lib/utils` to `~/styles/utils` (for cn function)
     - Change `@/components/ui/[name]` to `~/ui/[name]`
   - DELETE custom prop interfaces from source
   - Add: `import type { [BlockType]_N_Block } from "~/payload-types"`
   - Change function props to use PayloadCMS type
   - Update JSX to use PayloadCMS field names (from config.ts)
   - Keep all styling, animations, and structure
10. **Register renderer** - Add to RenderBlocks.tsx or block renderer
11. **Test at localhost:3001** - Verify in admin panel and frontend

**CRITICAL RULES**:
- Config.ts MUST be created BEFORE index.tsx
- MUST run `pnpm payload:types` after config.ts and before index.tsx
- DO NOT create custom TypeScript interfaces for component props
- DO NOT define prop types manually
- MUST use generated type: import type { [BlockType]_N_Block } from "~/payload-types"
- The types will NOT exist until you run `pnpm payload:types`

Follow @agent-os/workflows/implementation/build-marketing-blocks.md Phase 1.

Report completion status with validation checklist.
```

**Wait for @source-helper to complete and report.**

**User Review Point**: Ask user to verify the component at localhost:3001/admin before proceeding.

---

## Phase 2: Registry Migration

Delegate to `@registry-porter`:

```
@registry-porter Migrate [BlockType]_[N] to registry

**Source Location**: src/payload/blocks/[BlockType]/[BlockType]_[N]/

**Requirements**:
1. Transform imports (src/ → registry/ patterns)
2. Copy to registry/payload/blocks/[block-type]/[block-type]-[n]/
3. Update registry.json
4. Test CLI installation: npx shadcn add @uifoundry/[block-type]-[n]
5. Test in browser at localhost:3001

Follow @agent-os/workflows/documentation/add-registry-component.md.

Report completion status with validation checklist.
```

**Wait for @registry-porter to complete and report.**

**User Review Point**: Ask if user wants to verify CLI installation before proceeding.

---

## Phase 3: Documentation

Delegate to `@docs-writer`:

```
@docs-writer Create documentation for [BlockType]_[N]

**Registry Location**: registry/payload/blocks/[block-type]/[block-type]-[n]/

**Requirements**:
1. Create content/docs/blocks/[block-type]/[block-type]-[n].mdx
2. Follow 5-section template (Preview, Props, Installation, Registry Dependencies, NPM Dependencies)
3. Update agent-os/standards/global/registry-mapping.md
4. Update component checklist
5. Update content/docs/blocks/[block-type]/meta.json
6. Register in mdx-components.tsx
7. Verify documentation builds

Follow @agent-os/workflows/documentation/maintain-documentation-system.md.

Report completion status with validation checklist.
```

**Wait for @docs-writer to complete and report.**

---

## Phase 4: README Update

After all phases complete:

1. Read README.md
2. Find the marketing blocks checklist
3. Update the count for the block type
4. Example: `- [ ] Hero (2/5)` becomes `- [ ] Hero (3/5)`

Report final summary:

```markdown
✅ [BlockType]\_[N] COMPLETE

**Source**: [URL]

**Files Created**:

- src/payload/blocks/[BlockType]/[BlockType]\_[N]/{config.ts, index.tsx}
- registry/payload/blocks/[block-type]/[block-type]-[n]/{config.ts, index.tsx}
- content/docs/blocks/[block-type]/[block-type]-[n].mdx

**Dependencies Installed**: [list packages]

**README Updated**: [BlockType] (X/5)

**Next Steps**:

- Test the component at localhost:3001
- Build more [BlockType] variants (currently X/5)
- Or build a different block type
```

---

## Critical Rules to Follow

1. **NEVER skip source selection** - Always get a source URL or search
2. **NEVER write code from scratch** - Always base on existing MIT component
3. **NEVER create prop interfaces** - PayloadCMS generates types automatically
4. **ALWAYS delegate to specialist agents** - Don't implement yourself
5. **ALWAYS wait for completion** before moving to next phase
6. **ALWAYS ask for user review** at phase boundaries
7. **ALWAYS update README** at the end

---

## Example Usage

**User runs**: `/build-marketing-block`

**Agent asks**: "What type of block? What number?"

**User**: "Hero block, number 3"

**Agent asks**: "Provide URL or search Awesome Shadcn UI?"

**User**: "Search"

**Agent**: [Searches, presents 10 options]

**User**: "Option 5"

**Agent**: [Delegates to @source-helper, waits for completion, then @registry-porter, then @docs-writer, updates README]

**Result**: Complete Hero_3 component in ~10-15 minutes
