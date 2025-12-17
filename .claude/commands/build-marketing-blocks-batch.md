# Build Marketing Blocks Batch (IntentUI)

Build 2-5 marketing block components from IntentUI through the complete 3-phase pipeline.

**CRITICAL**: This command follows a STRICT workflow. Do NOT deviate from the process outlined below.

**IMPORTANT**:
- All components are sourced from IntentUI Pro subscription
- Components.json must be configured with IntentUI registry token
- All components must include source attribution comments and be tracked in `agent-os/standards/component-sources.md`
- **Dev server runs on port 3005** - See `@agent-os/standards/global/project-config.md`
  - ❌ NEVER start/stop/restart the dev server
  - ✅ ALWAYS use `localhost:3005` for all URLs
  - ✅ If server is down, ASK USER to start it

## Usage

### Single Block Type

```bash
# Build N consecutive blocks starting from specified component
/build-marketing-blocks-batch @irsyad/testimonials-01 5
# Builds: testimonials-01, testimonials-02, testimonials-03, testimonials-04, testimonials-05

/build-marketing-blocks-batch @irsyad/faq-01 3
# Builds: faq-01, faq-02, faq-03

/build-marketing-blocks-batch @irsyad/contact-06 2
# Builds: contact-06, contact-07 (continues from existing blocks)
```

### Multiple Block Types (Single Command)

```bash
# Build multiple block types in one batch
/build-marketing-blocks-batch @irsyad/faq-01 3 @irsyad/contact-01 2
# Builds: faq-01, faq-02, faq-03, contact-01, contact-02

/build-marketing-blocks-batch @irsyad/testimonials-06 2 @irsyad/team-01 3
# Builds: testimonials-06, testimonials-07, team-01, team-02, team-03
```

### Command Format

```
/build-marketing-blocks-batch <component-id> <count> [<component-id> <count>] ...
```

**Parameters**:
- `<component-id>`: IntentUI component ID (e.g., `@irsyad/testimonials-01`)
- `<count>`: Number of consecutive blocks to build (2-5 per type, max 5 total)

**Block Type Detection**:
- Extracted from component ID: `@irsyad/testimonials-01` → Block type: `Testimonials`
- Block numbers increment automatically: `01` → `02` → `03`
- PayloadCMS naming: `Testimonials_1`, `Testimonials_2`, etc.

---

## Phase 0: Parse Command & Plan Batch

### Step 1: Parse IntentUI Component IDs

**Extract information from command**:

```typescript
// Example: @irsyad/testimonials-01 5 @irsyad/faq-01 3
// Parse into:
[
  {
    componentId: "@irsyad/testimonials-01",
    blockType: "Testimonials",
    startNumber: 1,
    count: 5,
    installCommands: [
      "pnpm dlx shadcn@latest add @irsyad/testimonials-01",
      "pnpm dlx shadcn@latest add @irsyad/testimonials-02",
      "pnpm dlx shadcn@latest add @irsyad/testimonials-03",
      "pnpm dlx shadcn@latest add @irsyad/testimonials-04",
      "pnpm dlx shadcn@latest add @irsyad/testimonials-05"
    ]
  },
  {
    componentId: "@irsyad/faq-01",
    blockType: "FAQ",
    startNumber: 1,
    count: 3,
    installCommands: [
      "pnpm dlx shadcn@latest add @irsyad/faq-01",
      "pnpm dlx shadcn@latest add @irsyad/faq-02",
      "pnpm dlx shadcn@latest add @irsyad/faq-03"
    ]
  }
]
```

**Parsing Logic**:

1. **Extract block type from component ID**:
   - Pattern: `@irsyad/<block-type>-<number>`
   - Example: `@irsyad/testimonials-01` → `testimonials`
   - Convert to PascalCase: `testimonials` → `Testimonials`

2. **Extract starting number**:
   - Parse number from ID: `testimonials-01` → `1`
   - Remove leading zeros: `01` → `1`

3. **Generate install commands**:
   - Start from provided ID
   - Increment number for each count
   - Maintain zero-padding format: `01`, `02`, `03`, etc.

### Step 2: Validate Batch

**Check constraints**:
- ✅ Max 5 components total across all block types
- ✅ Max 5 components per block type
- ✅ Components.json has IntentUI registry configured
- ✅ Each block type exists in project structure

**Error if**:
- Total count > 5: "Maximum 5 components per batch. Please reduce count."
- Per-type count > 5: "Maximum 5 components per type. Please reduce count for [BlockType]."
- Missing registry config: "IntentUI registry not configured. Please update components.json."

### Step 3: Check Existing Blocks

For each block type, check what already exists:

```bash
# Check README progress
grep "Testimonials" README.md
# Example output: - [x] Testimonials (5/3) ✅

# Check filesystem
ls src/payload/blocks/Testimonials/
# Example output: Testimonials_1  Testimonials_2  Testimonials_3  Testimonials_4  Testimonials_5
```

**Report existing blocks**:

```markdown
📊 Batch Plan: [Total] Components

**Testimonials** (5 components):
- Existing: Testimonials_1 through Testimonials_5 (5/5 complete)
- Will build: Testimonials_6, Testimonials_7, Testimonials_8 (3 new)

**FAQ** (3 components):
- Existing: None (0/3)
- Will build: FAQ_1, FAQ_2, FAQ_3 (3 new, starting fresh)

**Total**: 6 new components
```

### Step 4: Confirm with User

```markdown
Ready to build:
- 3 Testimonials blocks (6-8)
- 3 FAQ blocks (1-3)

Total: 6 components

Proceed with all 3 phases? (yes/no)
```

---

## Phase 1: Source & Build (Batch)

For EACH component in the batch, spawn `@source-helper` agent in parallel:

```
@source-helper Build [BlockType]_[N] from IntentUI

**Install Command**: pnpm dlx shadcn@latest add @irsyad/[block-type]-[number]

**Example**: pnpm dlx shadcn@latest add @irsyad/testimonials-01

**Requirements**:
1. Install component using provided shadcn CLI command
2. Analyze installed source code location and structure
3. Install ALL dependencies with pnpm
4. Create config.ts at src/payload/blocks/[BlockType]/[BlockType]_[N]/config.ts
5. Create index.tsx at src/payload/blocks/[BlockType]/[BlockType]_[N]/index.tsx
6. Add source attribution comment:
   /**
    * [BlockType] [N] Component
    *
    * Source: @irsyad/[block-type]-[number] (IntentUI)
    * License: Pro Subscription
    *
    * Modifications:
    * - Integrated with PayloadCMS block system
    * - Replaced hardcoded content with dynamic props
    */
7. Update block constants in src/payload/constants/blocks.ts
8. Register exports in src/payload/blocks/[BlockType]/index.ts
9. Update sources tracking: agent-os/standards/component-sources.md
10. Generate types: pnpm payload:types
11. Run typecheck: pnpm typecheck
12. CLEANUP: Remove original IntentUI installation (src/app/[block-type]-[number]/)

**CRITICAL RULES**:
- DO NOT create TypeScript prop interfaces manually
- Use generated types from ~/payload-types
- PayloadCMS config generates all types automatically
- Add minRows: 0 and maxRows to all array fields in config
- Use server component pattern (no "use client" unless absolutely necessary)
- Extract ALL hardcoded values to config defaultValue properties
- Use empty strings ("") for href/link fields in defaults

Follow @agent-os/workflows/implementation/build-marketing-blocks.md Phase 1.
```

**Parallel Execution**:
- Spawn ALL source-helper agents in single message (parallel execution)
- Each agent handles one component independently
- All agents work simultaneously for maximum speed

**Report Phase 1 summary**:

```markdown
📊 PHASE 1 COMPLETE: Batch

**Components Built**: [N]/[N]
✅ Testimonials_6 - @irsyad/testimonials-06
✅ Testimonials_7 - @irsyad/testimonials-07
✅ FAQ_1 - @irsyad/faq-01
✅ FAQ_2 - @irsyad/faq-02

**Dependencies Installed**:
- [package-name] (used by X components)
- [package-name] (used by Y components)

**Cleanup**:
✅ All original IntentUI installations removed

All validation checks passed.

Ready for Phase 2: Registry Migration
```

---

## Phase 2: Registry Migration (Batch)

For EACH component, spawn `@registry-porter` agent in parallel:

```
@registry-porter Migrate [BlockType]_[N] to registry

**Source**: src/payload/blocks/[BlockType]/[BlockType]_[N]/
**Target**: registry/payload/blocks/[block-type]/[block-type]-[n]/

**Requirements**:
1. Copy config.ts to registry with import transformations
2. Copy index.tsx to registry with import transformations
3. Update registry.json with component entry
4. Build registry: pnpm registry:build
5. Test CLI: npx shadcn add http://localhost:3005/r/[block-type]-[n]
6. Verify HTTP endpoint accessible

**Import Transformations**:
- ~/payload/constants/blocks → @/registry/default/lib/constants/blocks
- ~/payload/fields/[field]/config → @/registry/default/lib/fields/[field]/config
- ~/payload/fields/[field] → @/registry/default/lib/fields/[field]
- ~/ui/[component] → @/registry/ui/[component]
- ~/styles/utils → @/registry/default/utils
- ~/payload-types → ~/payload-types (NO CHANGE)

**CRITICAL**: Use @/registry/default/lib/fields/ path for field imports

Follow @agent-os/workflows/documentation/add-registry-component.md
```

**Parallel Execution**:
- Spawn ALL registry-porter agents in single message
- Each agent handles one component independently

**Report Phase 2 summary**:

```markdown
📊 PHASE 2 COMPLETE: Batch

**Components Migrated**: [N]/[N]
✅ testimonials-6 - CLI ✅ HTTP ✅
✅ testimonials-7 - CLI ✅ HTTP ✅
✅ faq-1 - CLI ✅ HTTP ✅
✅ faq-2 - CLI ✅ HTTP ✅

Ready for Phase 3: Documentation
```

---

## Phase 3: Documentation (Batch)

**Step 1: Check for New Registry Components**

```bash
git status --porcelain | grep "^A" | grep registry/
```

If Phase 2 added NEW fields or UI components, document those FIRST.

**Step 2: Document All Blocks**

For EACH block, spawn `@docs-writer` agent in parallel:

```
@docs-writer Create documentation for [BlockType]_[N]

**Registry**: registry/payload/blocks/[block-type]/[block-type]-[n]/
**Source**: @irsyad/[block-type]-[number] (IntentUI)

**Requirements**:
1. Create MDX file: content/docs/blocks/[block-type]/[block-type]-[n].mdx
2. Follow 5-section template:
   - Preview (with working defaults)
   - Props (from config.ts)
   - Installation command
   - Registry Dependencies
   - NPM Dependencies
3. Update meta.json navigation
4. Update registry mappings
5. Register MDX component in mdx-components.tsx

**CRITICAL**: Ensure Preview uses default values from config.ts

Follow @agent-os/workflows/documentation/maintain-documentation-system.md
```

**Parallel Execution**:
- Spawn ALL docs-writer agents in single message
- Each agent handles one component independently

**Report Phase 3 summary**:

```markdown
📊 PHASE 3 COMPLETE: Batch

**Components Documented**: [N]/[N]
✅ testimonials-6
✅ testimonials-7
✅ faq-1
✅ faq-2

All documentation builds successfully.
```

---

## Phase 4: README Update & Batch Summary

### Step 1: Update README

For each block type in the batch:

```bash
# Read current progress
grep "Testimonials" README.md

# Update count
# Before: - [x] Testimonials (5/3) ✅ *exceeds target*
# After:  - [x] Testimonials (8/3) ✅ *exceeds target*
```

### Step 2: Final Summary

```markdown
✅ BATCH COMPLETE: [Total] Components

**Block Types Built**:
- Testimonials: 3 components (6-8) - Total now: 8/3 ✅
- FAQ: 2 components (1-2) - Total now: 2/3

**Total Time**: ~[X] minutes

**Source**: IntentUI (@irsyad registry)

**Dependencies Status**:
- Total new packages: [count]
- Most common: [package names]

**Files Created**: ~[N*5] per component
- [N] PayloadCMS configs
- [N] PayloadCMS components
- [N] Registry configs
- [N] Registry components
- [N] Documentation MDX files
- [N] Auto-generated JSONs

**README Updated**:
- Testimonials: 8/3 (exceeds target)
- FAQ: 2/3 (in progress)

**Installation Commands**:
```bash
# Testimonials
npx shadcn add @uifoundry/testimonials-6
npx shadcn add @uifoundry/testimonials-7
npx shadcn add @uifoundry/testimonials-8

# FAQ
npx shadcn add @uifoundry/faq-1
npx shadcn add @uifoundry/faq-2
```

**Next Steps**:
- Complete remaining FAQ blocks? (2/3 done, need 1 more)
- Start Contact blocks? (0/3)
- Test all new blocks in admin panel
```

---

## Command Parsing Examples

### Example 1: Single Block Type

**Input**: `/build-marketing-blocks-batch @irsyad/testimonials-06 3`

**Parsed**:
```json
{
  "batches": [
    {
      "blockType": "Testimonials",
      "startNumber": 6,
      "count": 3,
      "components": [
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/testimonials-06",
          "blockName": "Testimonials_6",
          "registryName": "testimonials-6"
        },
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/testimonials-07",
          "blockName": "Testimonials_7",
          "registryName": "testimonials-7"
        },
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/testimonials-08",
          "blockName": "Testimonials_8",
          "registryName": "testimonials-8"
        }
      ]
    }
  ],
  "totalComponents": 3
}
```

### Example 2: Multiple Block Types

**Input**: `/build-marketing-blocks-batch @irsyad/faq-01 3 @irsyad/contact-01 2`

**Parsed**:
```json
{
  "batches": [
    {
      "blockType": "FAQ",
      "startNumber": 1,
      "count": 3,
      "components": [
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/faq-01",
          "blockName": "FAQ_1",
          "registryName": "faq-1"
        },
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/faq-02",
          "blockName": "FAQ_2",
          "registryName": "faq-2"
        },
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/faq-03",
          "blockName": "FAQ_3",
          "registryName": "faq-3"
        }
      ]
    },
    {
      "blockType": "Contact",
      "startNumber": 1,
      "count": 2,
      "components": [
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/contact-01",
          "blockName": "Contact_1",
          "registryName": "contact-1"
        },
        {
          "installCmd": "pnpm dlx shadcn@latest add @irsyad/contact-02",
          "blockName": "Contact_2",
          "registryName": "contact-2"
        }
      ]
    }
  ],
  "totalComponents": 5
}
```

---

## Critical Rules

1. **ALWAYS source from IntentUI** - No other sources accepted
2. **NEVER exceed 5 total components** - Hard limit per batch
3. **ALWAYS use provided install commands** - No manual downloads
4. **ALWAYS cleanup IntentUI installations** - Remove src/app/[component] after copying
5. **ALWAYS delegate to specialists** - Use @source-helper, @registry-porter, @docs-writer
6. **ALWAYS run phases in parallel** - All agents for a phase in single message
7. **ALWAYS complete Phase 1 for ALL** before Phase 2
8. **ALWAYS complete Phase 2 for ALL** before Phase 3
9. **ALWAYS update README** when complete
10. **ALWAYS verify components.json** has IntentUI registry configured

---

## Error Handling

### Invalid Command Format

```
❌ Invalid format. Use: /build-marketing-blocks-batch <component-id> <count>

Example: /build-marketing-blocks-batch @irsyad/testimonials-01 5
```

### Component Count Too High

```
❌ Total component count (8) exceeds maximum (5).

Please reduce counts or split into multiple batches.
```

### Missing IntentUI Registry

```
❌ IntentUI registry not configured in components.json

Please ensure REGISTRY_TOKEN is set and registry is configured.
```

### Block Type Already Complete

```
⚠️ Warning: Testimonials already has 5/3 components (exceeds target)

Continue building more? (yes/no)
```

---

## Advantages of This Workflow

1. **Simple Command**: One line to build multiple block types
2. **Automatic Numbering**: No manual number tracking
3. **Parallel Execution**: Maximum speed (3-5x faster)
4. **Consistent Quality**: IntentUI ensures production-ready components
5. **Clean Codebase**: Automatic cleanup of temporary installations
6. **Batch Progress**: Clear tracking across multiple types
7. **Flexible**: Can build 1-5 components of any mix of types
