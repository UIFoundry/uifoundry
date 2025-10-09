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

- Dev server running at `localhost:3001`
- User has specified target block type(s)
- Batch size determined (1-5 components)

### Step 1: Source Discovery

**Purpose**: Find MIT-licensed component examples from shadcn ecosystem

**Process**:

1. **Search Awesome Shadcn UI**:
   - Use WebFetch to browse https://github.com/birobirobiro/awesome-shadcn-ui
   - Look for MIT-licensed repositories with target block type
   - Filter by quality indicators (stars, recent updates, TypeScript)
2. **Evaluate Candidates**:
   - Check license compatibility (must be MIT)
   - Verify code quality and completeness
   - Assess design quality and modern aesthetics
   - Ensure shadcn/ui or Tailwind CSS foundation

3. **Present Options to User**:

   ```
   Found 10 Hero block candidates:

   1. [Repo Name] - Modern hero with animations (⭐️ 2.5k)
      Preview: [URL]
      License: MIT ✅

   2. [Repo Name] - Minimal hero with CTA (⭐️ 1.2k)
      Preview: [URL]
      License: MIT ✅

   ... (continue for 8-10 options)

   Please select 1-5 components to build (by number).
   ```

4. **Fallback to Tailark**:
   - If insufficient options, check https://tailark.com/ free tier
   - Browse relevant category sections
   - Present additional candidates

**User Selects**: e.g., "Build #1, #3, #5, #7, #9"

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
   ```

#### 2B: Install Missing Dependencies

**IMPORTANT**: Always install dependencies BEFORE building the component.

```bash
# Install missing dependencies
pnpm add [dependency-name] [dependency-name] ...

# Example for a hero with framer-motion and heroicons:
pnpm add framer-motion @heroicons/react
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

**Goal**: Create `config.ts` that defines the block structure for PayloadCMS admin.

**Reference Pattern**: `src/payload/blocks/Hero/Hero_1/config.ts`

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

#### 3C: Update Block Constants

**Add to**: `src/payload/constants/blocks.ts`

```typescript
// Add block slug constant
export const BLOCK_SLUG_[TYPE]_N = "[block-type]-n";

// Add to BLOCK_SLUGS_ARRAY if needed
export const BLOCK_SLUGS_ARRAY = [
  // ... existing
  BLOCK_SLUG_[TYPE]_N,
];
```

### Step 4: React Component Integration

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
   - Go to `localhost:3001/admin`
   - Create a new page or edit existing
   - Add the new block
   - Fill in all fields with test data
   - Save and preview

2. **Frontend Test**:
   - Navigate to the page with the block
   - Verify all content renders correctly
   - Check animations and interactions
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
