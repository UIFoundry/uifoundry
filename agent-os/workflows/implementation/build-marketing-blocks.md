# Build Marketing Blocks Workflow

## Overview

This workflow enables building marketing blocks at scale (1-5 at a time) using source material from MIT-licensed shadcn resources. The workflow follows a strict 3-phase pipeline to ensure quality and consistency.

**CRITICAL RULE**: NEVER write blocks from scratch. Always source from:

1. [Awesome Shadcn UI](https://github.com/birobirobiro/awesome-shadcn-ui) (primary)
2. [Tailark Free Tier](https://tailark.com/) (fallback)

## Workflow Structure

### Phase 1: SOURCE & BUILD (in src/)

- **Agent**: `@source-helper`
- **Location**: `src/payload/blocks/[BlockType]/[BlockType]_N/`
- **Batch Size**: 1-5 components

### Phase 2: REGISTRY MIGRATION

- **Agent**: `@registry-porter`
- **Location**: `registry/payload/blocks/[block-type]/[block-type]-N/`
- **Batch Size**: Same 1-5 from Phase 1

### Phase 3: DOCUMENTATION

- **Agent**: `@docs-writer`
- **Location**: `content/docs/blocks/[block-type]/[block-type]-N.mdx`
- **Batch Size**: Same 1-5 from Phases 1-2

---

## Phase 1: SOURCE & BUILD

### Prerequisites

- Dev server running (check with user for port - typically `localhost:3005` for this project)
- User has specified target block type(s)
- Batch size determined (1-5 components)

### Step 1: Source Discovery

**Purpose**: Find MIT-licensed component examples from shadcn ecosystem

**MANDATORY SEARCH ORDER**:

1. **Primary**: Tailark free tier (ALWAYS search here first)
2. **Fallback**: Awesome Shadcn UI (if Tailark insufficient)
3. **Last Resort**: User-provided URLs (if both searches fail)

#### 1A: Search Tailark Free Tier (REQUIRED FIRST STEP)

**Always start here**:

**Step 1: Check existing blocks**

```bash
# Read README.md for current progress
grep "[BlockType]" README.md
# Example: - [ ] Hero (2/5)

# Check source directory
ls src/payload/blocks/[BlockType]/
# Example: Hero_1/, Hero_2/
```

**Step 2: Search Tailark**

1. Use WebFetch to browse https://tailark.com/
2. Navigate to relevant category (hero-sections, features, pricing, etc.)
3. Look for FREE tier components only

**Step 3: Filter OUT already-built numbers**

**CRITICAL ASSUMPTION**: Tailark components are numbered sequentially (Hero 1, Hero 2, Hero 3, etc.). If you already have Hero_1 and Hero_2, you used Tailark's first two hero designs.

**Filtering logic**:

- If Hero_1 exists → Skip "Tailark Hero 1"
- If Hero_2 exists → Skip "Tailark Hero 2"
- Only show Hero 3, 4, 5, etc. (not yet built)

**Why**: Prevents duplicating already-built components. Assumes numbered Tailark components were used for existing blocks.

**Step 4: Evaluate remaining candidates**

- **Clean design**: Modern, professional aesthetics
- **Responsive**: Mobile-first approach
- **Simple**: Easy to copy-paste and adapt

**Evaluate Candidates**:

- ✅ Free tier (REQUIRED)
- ✅ Tailwind CSS based
- ✅ Clean, modern design
- ✅ Responsive layout
- ✅ Copy-paste ready
- ✅ Live preview available

**Present Filtered Options to User**:

```markdown
🔍 Searched Tailark FREE tier for Hero blocks:

**Current progress**: Hero (2/5) - Hero_1 and Hero_2 already exist

**Available components (excluding already built)**: 3. Tailark Hero 3 - Animated with subtle fade-in

- Preview: https://tailark.com/preview/hero-3
- License: Free ✅
- Tech: Tailwind CSS

4. Tailark Hero 4 - Split screen with image
   - Preview: https://tailark.com/preview/hero-4
   - License: Free ✅
   - Tech: Tailwind CSS

5. Tailark Hero 5 - Video background hero
   - Preview: https://tailark.com/preview/hero-5
   - License: Free ✅
   - Tech: Tailwind CSS

... (show up to Hero 10-12)

⚠️ **Note**: Not showing Hero 1 and Hero 2 (already built as Hero_1 and Hero_2)

Select components by number (e.g., "3, 5, 7") or type 'shadcn' to check Awesome Shadcn UI.
```

#### 1B: Fallback to Awesome Shadcn UI (If Needed)

**Only proceed here if**:

- Tailark has <5 suitable options
- User types 'shadcn'
- User explicitly requests Awesome Shadcn UI

**Process**:

1. Use WebFetch to browse https://github.com/birobirobiro/awesome-shadcn-ui
2. Look for MIT-licensed repositories with target block type
3. Filter by quality indicators:
   - Stars, recent updates, TypeScript
4. Verify license allows usage

**Present Awesome Shadcn UI Options**:

```markdown
⚠️ Tailark search returned limited results.

Checking Awesome Shadcn UI for additional [BlockType] options:

**High Quality** (⭐️ 2k+):

1. magicui/hero-section - Animated hero with spotlight (⭐️ 2.5k)
   - Preview: https://magicui.design/docs/components/hero
   - License: MIT ✅
   - Tech: Framer Motion, Tailwind, shadcn/ui
2. origin-ui/hero - Modern hero components (⭐️ 2.1k)
   - Preview: https://originui.com/hero
   - License: MIT ✅
   - Tech: Tailwind, shadcn/ui

Combined options available:

- Tailark free: [X] components
- Awesome Shadcn UI: [Y] components

Select from both lists by number.
```

#### 1C: User-Provided URLs (Last Resort)

**Only accept if**:

- Both Awesome Shadcn UI and Tailark searches failed
- User explicitly provides URLs
- User has a specific component in mind

**Verification Required**:

```markdown
Please provide component URL(s):

For each URL, I will verify:

- ✅ Accessible and downloadable
- ✅ MIT license or free tier usage
- ✅ React/TypeScript component
- ✅ Tailwind CSS based
```

**User Provides URL** → Verify → Proceed

**Priority Order Summary**:

```
1. Tailark Free Tier (ALWAYS CHECK FIRST)
   ↓ (if insufficient)
2. Awesome Shadcn UI (FALLBACK)
   ↓ (if both fail)
3. User URLs (LAST RESORT)
```

1. Awesome Shadcn UI (ALWAYS CHECK FIRST)
   ↓ (if insufficient)
2. Tailark Free Tier (FALLBACK)
   ↓ (if both fail)
3. User URLs (LAST RESORT)

````

### Step 2: Dependency Installation & Source Integration

**For EACH selected component**:

#### 2A: Analyze Source Dependencies

1. **Fetch component source code**:
   - Clone or download the source repository
   - Identify the specific component files
   - Read package.json for dependencies

2. **Identify Required Dependencies**:

   **Common Categories**:
   - **Animation libraries**: framer-motion, @motionone/react, etc.
   - **Icons**: lucide-react, @radix-ui/react-icons, heroicons
   - **UI primitives**: @radix-ui/react-\*, vaul, cmdk
   - **Utilities**: clsx, tailwind-merge, class-variance-authority
   - **Form libraries**: react-hook-form, zod (if forms present)

3. **Check Existing Dependencies**:
   ```bash
   # Read package.json to see what's already installed
   cat package.json | grep "dependency-name"
````

#### 2B: Install Missing Dependencies

**IMPORTANT**: Always install ALL dependencies BEFORE building the component.

**Dependency Categories**:

1. **NPM Packages** (animations, icons, utilities)
2. **Shadcn UI Components** (if source uses shadcn components)

**NPM Dependencies**:

```bash
# Install missing npm packages
pnpm add [dependency-name] [dependency-name] ...

# Example for a hero with framer-motion and heroicons:
pnpm add framer-motion @heroicons/react
```

**Shadcn UI Components** (CRITICAL - Don't forget these):

If the source component uses shadcn UI components like Button, Card, Dialog, etc., you MUST install them:

```bash
# Check what shadcn components are used in the source
# Common ones: button, card, dialog, dropdown-menu, input, label, etc.

# Install each required shadcn component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# etc.

# Or install multiple at once
npx shadcn@latest add button card dialog
```

**How to identify shadcn components in source**:

```typescript
// Source code imports like these indicate shadcn components:
import { Button } from "@/components/ui/button"; // ← needs: npx shadcn add button
import { Card } from "@/components/ui/card"; // ← needs: npx shadcn add card
import { Dialog } from "@/components/ui/dialog"; // ← needs: npx shadcn add dialog
import { Input } from "@/components/ui/input"; // ← needs: npx shadcn add input
```

**Document ALL installations**:

```
Installing dependencies for Hero_3:

NPM Packages:
✅ framer-motion@^11.0.0 (animations)
✅ @heroicons/react@^2.1.0 (icons)
⏭️  lucide-react (already installed)

Shadcn Components:
✅ button (npx shadcn add button)
✅ card (npx shadcn add card)
⏭️  dialog (already installed)
```

**Document installations**:

```
Installing dependencies for Hero_3:
✅ framer-motion@^11.0.0 (animations)
✅ @heroicons/react@^2.1.0 (icons)
⏭️  lucide-react (already installed)
```

#### 2C: Copy Source Code

1. **Copy component files** into temporary workspace
2. **Analyze component structure**:
   - Main component file
   - Sub-components or utilities
   - Type definitions
   - Style dependencies

### Step 3: PayloadCMS Block Configuration

**CRITICAL**: This step MUST happen BEFORE creating the React component. The config.ts generates the TypeScript types that the component will use.

**Goal**: Create `config.ts` that defines the block structure for PayloadCMS admin.

**Reference Pattern**: `src/payload/blocks/Hero/Hero_1/config.ts`

**WHY CONFIG FIRST**:

1. PayloadCMS reads config.ts to understand block structure
2. Running `pnpm payload:types` generates TypeScript types from config
3. The React component imports these generated types
4. You CANNOT import `[BlockType]_N_Block` type until config exists and types are generated

#### 3A: Determine Configuration Fields

Analyze the source component props/configuration to map to PayloadCMS fields:

**Example Mapping**:

```typescript
// Source component props:
{ title, subtitle, buttonText, buttonUrl, image }

// Maps to PayloadCMS fields:
- headerField() → title
- subHeaderField() → subtitle
- text field → buttonText
- text field → buttonUrl
- mediaField() → image
```

#### 3B: Create config.ts

```typescript
import {
  BLOCK_GROUP_[TYPE],
  BLOCK_SLUG_[TYPE]_N,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField/config";
import headerField from "~/payload/fields/header/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const [BlockType]_N_Block: Block = {
  slug: BLOCK_SLUG_[TYPE]_N,
  labels: {
    singular: "[Block Type] N",
    plural: "[Block Type] N's",
  },
  admin: {
    group: BLOCK_GROUP_[TYPE],
  },
  interfaceName: "[BlockType]_N_Block",
  fields: [
    // Use collapsible sections for organization
    {
      type: "collapsible",
      label: "Content",
      fields: [
        headerField(),
        subHeaderField(),
        // ... other fields
      ],
    },
    {
      type: "collapsible",
      label: "Actions",
      fields: [
        {
          name: "ctaLabel",
          label: "CTA Button Label",
          type: "text",
          required: true,
          defaultValue: "Get Started",
        },
        {
          name: "ctaHref",
          label: "CTA Button Link",
          type: "text",
          required: true,
          defaultValue: "/signup",
        },
      ],
    },
    mediaField(),
  ],
};
```

**Best Practices**:

- Use existing field helpers when possible (`headerField()`, `mediaField()`)
- Group related fields in collapsible sections
- Provide sensible default values
- Use clear, descriptive field labels
- Add validation where appropriate (required fields)
- **CRITICAL**: Always add `minRows` and `maxRows` to array fields:
  ```typescript
  {
    name: "items",
    type: "array",
    minRows: 0,    // Allows deletion of all rows
    maxRows: 10,   // Prevents infinite growth
    defaultValue: [...],
    fields: [...]
  }
  ```
  Without `minRows: 0`, PayloadCMS may create un-deletable empty rows in the admin panel.

#### 3C: Update Block Constants

**Add to**: `src/payload/constants/blocks.ts`

```typescript
// Add new block slug
export const BLOCK_SLUG_HERO_3 = "hero-3";

// Add to array (if exists)
export const BLOCK_SLUGS_ARRAY = [
  // ... existing slugs
  BLOCK_SLUG_HERO_3,
];
```

**Naming Convention**:

- Use kebab-case for slugs
- Use SCREAMING_SNAKE_CASE for constants
- Format: `BLOCK_SLUG_[TYPE]_[NUMBER]`

#### 3D: Register Block Export

**Add to**: `src/payload/blocks/[BlockType]/index.ts`

```typescript
export { [BlockType]_N_Block } from "./[BlockType]_N/config";
```

**Example**:

```typescript
// src/payload/blocks/Hero/index.ts
export { Hero_1_Block } from "./Hero_1/config";
export { Hero_2_Block } from "./Hero_2/config";
export { Hero_3_Block } from "./Hero_3/config"; // Add this
```

This makes the block config available to PayloadCMS.

#### 3E: Generate TypeScript Types (CRITICAL STEP)

**BEFORE creating the React component, you MUST generate types**:

```bash
pnpm payload:types
```

**What this does**:

1. Reads all PayloadCMS configs (including your new block config)
2. Generates TypeScript types in `src/payload-types.ts`
3. Creates the `[BlockType]_N_Block` interface you'll use in index.tsx

**Verification**:

```bash
# Check that your new block type was generated
grep "[BlockType]_N_Block" src/payload-types.ts
```

You should see an interface definition for your block.

**IMPORTANT**: If you don't run this, the component import will fail:

```typescript
// This will error if types weren't generated
import type { Hero_3_Block } from "~/payload-types"; // ❌ Cannot find name 'Hero_3_Block'
```

### Step 4: React Component Integration

**NOW you can create the component** - the types from config.ts are available.

**Goal**: Create `index.tsx` that renders the block using data from PayloadCMS.

**Reference Pattern**: `src/payload/blocks/Hero/Hero_1/index.tsx`

#### 4A: Create Component File

```typescript
"use client";

import Link from "next/link";
import { Button } from "~/ui/button";
// ... other imports based on source component
import type { [BlockType]_N_Block } from "~/payload-types";
import { cn } from "~/styles/utils";
import MediaField from "~/payload/fields/mediaField";

export default function [BlockType]NSection(props: [BlockType]_N_Block) {
  return (
    <section>
      {/* Integrate source component design */}
      {/* Map props to config fields */}
      <div className="container mx-auto px-6">
        <h1>{props.header}</h1>
        <p>{props.subheader}</p>

        <Button asChild>
          <Link href={props.ctaHref}>
            {props.ctaLabel}
          </Link>
        </Button>

        {props.media && (
          <MediaField
            media={props.media}
            width="1200"
            height="800"
          />
        )}
      </div>
    </section>
  );
}
```

#### 4B: Adapt Source Component

**Integration Strategy**:

1. **Preserve Original Design**:
   - Keep Tailwind classes and styling
   - Maintain animations and interactions
   - Preserve layout structure

2. **Connect to PayloadCMS**:
   - Replace hardcoded text with `props.[fieldName]`
   - Replace static images with `MediaField` component
   - Replace hardcoded links with `props.[field]Href`

3. **Handle Conditional Content**:

   ```typescript
   {props.alertLabel && props.alertLink && (
     <div className="alert">
       <Link href={props.alertLink}>
         {props.alertLabel}
       </Link>
     </div>
   )}
   ```

4. **Use Project Components**:
   - Replace generic buttons with `~/ui/button`
   - Use project icons from `~/ui/icons/`
   - Integrate motion primitives from `~/ui/motion-primitives/`

5. **Animation Performance** (for canvas/custom animations):
   - Run canvas animations at 20-30fps, NOT 60fps (use frame throttling)
   - Use `requestAnimationFrame` with delta time calculation
   - Apply slower fade rates (0.97 vs 0.95) for subtler effects
   - Example frame throttling:
   ```typescript
   let lastFrameTime = 0;
   const frameDelay = 1000 / 20; // 20fps

   const animate = (currentTime: number) => {
     requestAnimationFrame(animate);
     const deltaTime = currentTime - lastFrameTime;
     if (deltaTime < frameDelay) return;
     lastFrameTime = currentTime;
     // ... animation logic
   };
   ```
   - Test animation speeds with user before finalizing

#### 4C: Register Block

**Add to**: `src/payload/blocks/[BlockType]/index.ts`

```typescript
export { [BlockType]_N_Block } from "./[BlockType]_N/config";
```

**Add to**: `src/app/(frontend)/(pages)/[...slug]/page.tsx` (or relevant block renderer)

```typescript
import [BlockType]N from "~/payload/blocks/[BlockType]/[BlockType]_N";
import { BLOCK_SLUG_[TYPE]_N } from "~/payload/constants/blocks";

// In block renderer switch:
case BLOCK_SLUG_[TYPE]_N:
  return <[BlockType]N key={block.id} {...block} />;
```

### Step 5: Testing & Validation

#### 5A: TypeScript Validation

```bash
# Generate Payload types
pnpm build

# Check types
pnpm typecheck
```

**Fix any type errors** before proceeding.

#### 5B: Browser Testing

**Use Playwright browser automation**:

```typescript
// Navigate to page with the block
await playwright_browser_navigate("http://localhost:3001");

// Wait for content to load
await playwright_browser_wait_for({ time: 2 });

// Capture snapshot
await playwright_browser_snapshot();

// Check for console errors
const messages = await playwright_browser_console_messages({
  onlyErrors: true,
});
```

**Manual Testing**:

1. **Admin Panel Test**:
   - Go to admin panel (check dev server port with user, typically `localhost:3005/admin`)
   - Create a new page or edit existing
   - Add the new block
   - Fill in all fields with test data
   - **IMPORTANT**: Check array fields - ensure you can add/delete rows without issues
   - Save and preview

2. **Frontend Test**:
   - Navigate to the page with the block
   - Verify all content renders correctly
   - Check animations and interactions
   - **Performance Check**: If component has canvas animations, verify speed feels natural (not too fast)
   - Test responsive design (mobile/tablet/desktop)
   - Verify links work correctly

#### 5C: Validation Checklist

**Before marking Phase 1 complete**:

- [ ] All dependencies installed successfully
- [ ] TypeScript compiles without errors
- [ ] Block appears in PayloadCMS admin panel
- [ ] All config fields render in admin
- [ ] Component renders correctly on frontend
- [ ] All props from config populate the component
- [ ] Styling matches source material
- [ ] Animations/interactions work
- [ ] No console errors
- [ ] Responsive design works (mobile/desktop)
- [ ] Images load correctly (if using MediaField)
- [ ] Links navigate correctly

### Step 6: Report Phase 1 Status

**For EACH component**, report:

```
✅ Hero_3 - SOURCE & BUILD COMPLETE

**Dependencies Installed**:
- framer-motion@^11.0.0
- @heroicons/react@^2.1.0

**Files Created**:
- src/payload/blocks/Hero/Hero_3/config.ts
- src/payload/blocks/Hero/Hero_3/index.tsx
- Updated: src/payload/constants/blocks.ts
- Updated: src/payload/blocks/Hero/index.ts

**Validation**:
✅ TypeScript compiles
✅ Admin panel renders block
✅ Frontend displays correctly
✅ No console errors
✅ Responsive design verified

**Source**: [Original repo/component URL]
```

**After ALL components in batch**:

```
📊 PHASE 1 COMPLETE: [Block Type] Batch

Components Built: 5/5
✅ Hero_3
✅ Hero_4
✅ Hero_5
✅ Hero_6
✅ Hero_7

Dependencies Installed:
- framer-motion (used by 3 components)
- @heroicons/react (used by 2 components)
- react-wrap-balancer (used by 1 component)

Ready for Phase 2: Registry Migration
Proceed? (yes/no)
```

---

## Phase 2: REGISTRY MIGRATION

**Agent**: `@registry-porter`

**Goal**: Copy components from `src/` to `registry/` with proper import transformations and validate through CLI + browser testing.

**See detailed instructions**: `@agent-os/workflows/documentation/add-registry-component.md`

### Quick Process Overview

**For EACH component from Phase 1**:

1. **Transform imports** (src/ → registry/ patterns)
2. **Copy to registry** structure
3. **Update registry.json** with component entry
4. **Test CLI installation** (`npx shadcn add @uifoundry/component-name`)
5. **Test in browser** at `localhost:3001`
6. **Report results**

**Validation Checklist**:

- [ ] CLI installation succeeds
- [ ] All dependencies resolved
- [ ] Component renders in browser
- [ ] No import errors
- [ ] Matches source version functionality

**Phase 2 Complete When**: All 5 components successfully migrated and validated.

---

## Phase 3: DOCUMENTATION

**Agent**: `@docs-writer`

**Goal**: Create comprehensive documentation following the 5-section template and update the self-maintaining documentation system.

**See detailed instructions**: `@agent-os/workflows/documentation/maintain-documentation-system.md`

### Quick Process Overview

**For EACH component from Phases 1-2**:

1. **Create MDX file** with 5 sections:
   - Preview
   - Props (from config.ts)
   - Installation (CLI command)
   - Registry Dependencies
   - NPM Dependencies

2. **Update documentation system**:
   - Registry mappings
   - Component checklist
   - Navigation (meta.json)
   - MDX component registration

3. **Validate** documentation builds correctly

**Validation Checklist**:

- [ ] All 5 sections complete
- [ ] Props table matches config
- [ ] Installation command correct
- [ ] All links work
- [ ] Documentation builds successfully
- [ ] Preview renders in docs

**Phase 3 Complete When**: All 5 components fully documented and validated.

---

## Phase 4: CLEANUP & LEARNING

**Agent**: Self or dedicated cleanup agent
**Goal**: Analyze user corrections, identify improvement patterns, and update workflow documentation so future agents produce better code with less manual correction needed.

**When to Run**: After user has completed all manual corrections from Phase 3 and committed/pushed changes.

### Step 1: Analyze User Corrections

Compare the final committed code with the agent-generated code to identify what the user changed:

```bash
# Check recent commits since agent work
git log --oneline -10

# Compare changes since agent completion
git diff <agent-completion-commit> HEAD --stat

# Examine specific file changes
git diff <agent-completion-commit> HEAD -- <file-path>
```

### Step 2: Categorize Corrections

Group user corrections into categories:

**Code Quality**:
- Tailwind class ordering (Prettier/linter preferences)
- Code formatting (blank lines, multi-line strings)
- Import organization

**Functional Fixes**:
- Array field configuration (minRows, maxRows)
- Import path corrections
- Missing validations or constraints

**Performance**:
- Animation speed adjustments
- Rendering optimizations

**UX/Design**:
- Layout tweaks
- Spacing adjustments
- Visual refinements

### Step 3: Identify Learnable Patterns

For each correction, ask:

1. **Was this predictable?** - Could an agent have known to do this?
2. **Is this project-specific?** - Or a general best practice?
3. **Can it be automated?** - Should it be a linter rule or workflow step?
4. **Should it be documented?** - Add to agent instructions?

### Step 4: Update Workflow Documentation

Add learnings to appropriate sections:

**Create/Update Learning Documents**:

1. **Code Quality Standards** (`agent-os/standards/code-quality.md`):
   - Tailwind class ordering preferences
   - Formatting conventions
   - Import path patterns

2. **Component Best Practices** (`agent-os/standards/component-best-practices.md`):
   - Array field configuration rules
   - Animation performance guidelines
   - Common pitfalls to avoid

3. **Workflow Improvements** (this document):
   - Add automated checks
   - Update agent prompts
   - Add validation steps

### Step 5: Create Improvement Rules

**Example Improvements Based on This Batch**:

#### Rule 1: Array Field Configuration
**Location**: Phase 1, Step 3B (Create config.ts)

Add to "Best Practices":
```typescript
// ALWAYS add minRows and maxRows to array fields
{
  name: "features",
  type: "array",
  minRows: 0,        // ← REQUIRED: Allows deletion of all rows
  maxRows: 10,       // ← REQUIRED: Prevents infinite growth
  defaultValue: [...],
  fields: [...]
}
```

**Why**: Without `minRows: 0`, PayloadCMS may enforce a minimum row count causing un-deletable empty rows in the admin panel.

#### Rule 2: Registry Import Paths
**Location**: Phase 2, Import Transformation Patterns

Update MediaField import pattern:
```typescript
// ❌ INCORRECT (was causing issues)
import MediaField from "@/registry/payload/fields/media/index";

// ✅ CORRECT
import MediaField from "@/registry/default/lib/fields/media";
or
import MediaField from "@/registry/default/lib/fields/media/index";
```

#### Rule 3: Animation Performance
**Location**: Phase 1, Step 4B (Adapt Source Component)

Add new subsection "Animation Performance":
- Canvas-based animations should run at 20-30fps, not 60fps
- Add frame throttling with `requestAnimationFrame` + delta time
- Use slower fade rates (0.97 vs 0.95) for subtler effects
- Test animations with user before finalizing speeds

#### Rule 4: Tailwind Class Order
**Location**: Code Quality Standards

Note: Prettier with tailwind plugin handles this automatically. If agents notice unordered classes, mention that linter will fix them. Don't spend time manually ordering.

### Step 6: Update Agent Prompts

Modify agent task prompts to include new rules:

**@source-helper** updates:
- Check array fields always have `minRows` and `maxRows`
- Test animations at multiple frame rates before committing
- Note that code formatters will reorder Tailwind classes

**@registry-porter** updates:
- Use consistent MediaField import path pattern
- Verify all registry imports use `@/registry/default/lib/` for fields

**@docs-writer** updates:
- Document any performance configurations (animation speeds, etc.)
- Include notes about customization parameters

### Step 7: Run Automated Checks (Future)

Create validation scripts to catch common issues:

```bash
# Future validation script
./scripts/validate-block-config.sh Hero_4

# Checks:
# - Array fields have minRows/maxRows
# - All imports use correct patterns
# - No hardcoded values in component
# - TypeScript types generated
```

### Step 8: Report Learning Summary

Create a summary report:

```markdown
## Phase 4 Learning Report - Hero Batch

### User Corrections Analyzed
- 10 files changed
- 3 functional fixes
- 7 code quality improvements

### Key Learnings
1. **Array Field Configuration**: Add minRows: 0, maxRows: 10 to all array fields
2. **MediaField Import Path**: Use @/registry/default/lib/fields/media
3. **Animation Speed**: Canvas animations at 20fps, fade rate 0.97
4. **Tailwind Classes**: Prettier handles ordering automatically

### Documentation Updated
- ✅ Added array field rules to Phase 1 Step 3B
- ✅ Updated registry import patterns in Phase 2
- ✅ Added animation performance subsection to Phase 1 Step 4B
- ✅ Created code-quality.md standards document

### Future Prevention
- [ ] Create block config validation script
- [ ] Add pre-commit hook for import path checking
- [ ] Document animation testing checklist

### Estimated Impact
- **Time Saved**: 15-20 minutes per batch (fewer manual corrections)
- **Quality Improvement**: More consistent code patterns
- **Knowledge Transfer**: Future agents learn from past corrections
```

### When to Skip Phase 4

Skip this phase if:
- No user corrections were made (perfect agent output)
- Changes are trivial (typos, cosmetic only)
- User explicitly wants to move to next batch immediately

### Phase 4 Benefits

1. **Continuous Improvement**: Workflow gets better over time
2. **Reduced Manual Work**: Fewer corrections needed in future batches
3. **Knowledge Capture**: Learnings are preserved for all agents
4. **Standardization**: Consistent patterns across all components
5. **Faster Iterations**: Less back-and-forth between agent and user

---

## Workflow Coordination

### Batch Processing Rules

**Batch Size**: 1-5 components maximum per workflow run

**Rationale**:

- Easier to monitor progress
- Manageable review points
- Reduces context switching
- Clear stopping points

### User Review Points

**After Source Selection**:

- Review component candidates
- Approve selections before building

**After Phase 1**:

- Quick visual check at localhost:3001
- Approve before registry migration

**After Phase 2**:

- Spot-check registry installations
- Approve before documentation

**After Phase 3**:

- Review documentation quality
- Approve batch completion

### Progress Tracking

**Update README.md** after each completed batch:

```markdown
### Marketing blocks checklist (MVP - target 5 of each)

- [x] Hero (5/5) ✅
- [ ] Header (2/5)
- [ ] Footer (0/5)
```

**Update agent-os roadmap** if major milestones reached.

---

## Troubleshooting

### Common Issues

#### Dependency Conflicts

**Issue**: New dependency conflicts with existing version

**Fix**:

```bash
# Check current version
pnpm list [package-name]

# Install compatible version
pnpm add [package-name]@^X.Y.Z

# Or update to latest
pnpm update [package-name]
```

#### Import Errors

**Issue**: Component can't find imported modules

**Fix**:

- Verify dependency installed in package.json
- Check import path syntax
- Ensure TypeScript paths configured correctly

#### Styling Issues

**Issue**: Component styling doesn't match source

**Fix**:

- Verify Tailwind classes are correct
- Check if source uses custom CSS
- Ensure all utility functions imported (cn(), etc.)
- Verify dark mode classes if applicable

#### Type Errors

**Issue**: TypeScript compilation fails

**Fix**:

```bash
# Regenerate Payload types
pnpm build

# Check specific error
pnpm typecheck
```

---

## Success Criteria

**Phase 1 Success**:

- Components render correctly in browser
- All PayloadCMS fields functional
- No console errors
- TypeScript compiles

**Phase 2 Success**:

- CLI installation works
- Components function independently
- Browser testing passes

**Phase 3 Success**:

- Documentation complete and accurate
- All links work
- Documentation site builds

**Batch Success**:

- All phases complete for all components
- README updated with progress
- No blocking issues

---

## Next Steps After Workflow Completion

1. **Update Roadmap**: Mark completed blocks in README.md
2. **Plan Next Batch**: Choose next 1-5 components
3. **Continue Pipeline**: Repeat workflow for remaining blocks
4. **Scale to Other Types**: Apply same workflow to Features, Pricing, etc.

---

## Reference Files

**Existing Examples**:

- Source Block: `src/payload/blocks/Hero/Hero_1/`
- Registry Block: `registry/payload/blocks/hero/hero-1/`
- Documentation: `content/docs/blocks/hero/hero-1.mdx`

**Key Agent Docs**:

- `@agent-os/workflows/documentation/add-registry-component.md`
- `@agent-os/workflows/documentation/maintain-documentation-system.md`
- `@agent-os/standards/global/documentation-template.md`
- `@agent-os/standards/global/registry-mapping.md`
