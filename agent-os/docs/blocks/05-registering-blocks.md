# Registering Blocks in the System

## Overview

This guide covers how to register your newly created block in the UIFoundry system so it appears in the PayloadCMS admin panel and can be rendered on the frontend.

## Prerequisites

Before registering:

- [ ] Block config created in `src/payload/blocks/[Type]/[Type]_N/config.ts`
- [ ] Block component created in `src/payload/blocks/[Type]/[Type]_N/index.tsx`
- [ ] Constants added to `src/payload/constants/blocks.ts`
- [ ] Types generated with `pnpm payload:types`

## Registration Levels

Block registration happens at two levels:

1. **Block Type Level**: Register within the block type (e.g., Hero, Features)
2. **Main Index Level**: Register in the main blocks index

## Level 1: Block Type Registration

### Step 1: Check If Block Type Exists

First, determine if your block type already exists:

**Existing Block Types**:
- Hero
- Header
- Footer
- Features
- CTA (Call to Action)
- Pricing
- Testimonials
- FAQ
- Contact
- Newsletter
- Stats
- Gallery
- About
- Teams
- ComingSoon

**Check Directory**:
```bash
ls src/payload/blocks/
```

### Step 2A: Register in Existing Block Type

If the block type already exists (e.g., adding Hero_6 to existing Hero):

**File**: `src/payload/blocks/Hero/index.ts`

**Current structure**:
```typescript
import { BLOCK_SLUG_HERO_1, BLOCK_SLUG_HERO_2, BLOCK_SLUG_HERO_3, BLOCK_SLUG_HERO_4, BLOCK_SLUG_HERO_5 } from "~/payload/constants/blocks";

import Hero_1, { Hero_1_Block } from "./Hero_1";
import Hero_2, { Hero_2_Block } from "./Hero_2";
import Hero_3, { Hero_3_Block } from "./Hero_3";
import Hero_4, { Hero_4_Block } from "./Hero_4";
import Hero_5, { Hero_5_Block } from "./Hero_5";

export const blocks = [Hero_1_Block, Hero_2_Block, Hero_3_Block, Hero_4_Block, Hero_5_Block];

export const blockComponents = {
  [BLOCK_SLUG_HERO_1]: Hero_1,
  [BLOCK_SLUG_HERO_2]: Hero_2,
  [BLOCK_SLUG_HERO_3]: Hero_3,
  [BLOCK_SLUG_HERO_4]: Hero_4,
  [BLOCK_SLUG_HERO_5]: Hero_5,
};
```

**Add your block**:

1. Import the constant:
```typescript
import {
  BLOCK_SLUG_HERO_1,
  BLOCK_SLUG_HERO_2,
  BLOCK_SLUG_HERO_3,
  BLOCK_SLUG_HERO_4,
  BLOCK_SLUG_HERO_5,
  BLOCK_SLUG_HERO_6,  // Add this
} from "~/payload/constants/blocks";
```

2. Import the block and component:
```typescript
import Hero_1, { Hero_1_Block } from "./Hero_1";
import Hero_2, { Hero_2_Block } from "./Hero_2";
import Hero_3, { Hero_3_Block } from "./Hero_3";
import Hero_4, { Hero_4_Block } from "./Hero_4";
import Hero_5, { Hero_5_Block } from "./Hero_5";
import Hero_6, { Hero_6_Block } from "./Hero_6";  // Add this
```

3. Add to blocks array:
```typescript
export const blocks = [
  Hero_1_Block,
  Hero_2_Block,
  Hero_3_Block,
  Hero_4_Block,
  Hero_5_Block,
  Hero_6_Block,  // Add this
];
```

4. Add to blockComponents map:
```typescript
export const blockComponents = {
  [BLOCK_SLUG_HERO_1]: Hero_1,
  [BLOCK_SLUG_HERO_2]: Hero_2,
  [BLOCK_SLUG_HERO_3]: Hero_3,
  [BLOCK_SLUG_HERO_4]: Hero_4,
  [BLOCK_SLUG_HERO_5]: Hero_5,
  [BLOCK_SLUG_HERO_6]: Hero_6,  // Add this
};
```

**Complete Example**:
```typescript
import {
  BLOCK_SLUG_HERO_1,
  BLOCK_SLUG_HERO_2,
  BLOCK_SLUG_HERO_3,
  BLOCK_SLUG_HERO_4,
  BLOCK_SLUG_HERO_5,
  BLOCK_SLUG_HERO_6,
} from "~/payload/constants/blocks";

import Hero_1, { Hero_1_Block } from "./Hero_1";
import Hero_2, { Hero_2_Block } from "./Hero_2";
import Hero_3, { Hero_3_Block } from "./Hero_3";
import Hero_4, { Hero_4_Block } from "./Hero_4";
import Hero_5, { Hero_5_Block } from "./Hero_5";
import Hero_6, { Hero_6_Block } from "./Hero_6";

export const blocks = [
  Hero_1_Block,
  Hero_2_Block,
  Hero_3_Block,
  Hero_4_Block,
  Hero_5_Block,
  Hero_6_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_HERO_1]: Hero_1,
  [BLOCK_SLUG_HERO_2]: Hero_2,
  [BLOCK_SLUG_HERO_3]: Hero_3,
  [BLOCK_SLUG_HERO_4]: Hero_4,
  [BLOCK_SLUG_HERO_5]: Hero_5,
  [BLOCK_SLUG_HERO_6]: Hero_6,
};
```

### Step 2B: Create New Block Type

If you're creating a brand new block type (e.g., "Logos"):

**Create Directory**:
```bash
mkdir -p src/payload/blocks/Logos/Logos_1
```

**Create Type Index**: `src/payload/blocks/Logos/index.ts`

```typescript
import { BLOCK_SLUG_LOGOS_1 } from "~/payload/constants/blocks";

import Logos_1, { Logos_1_Block } from "./Logos_1";

export const blocks = [Logos_1_Block];

export const blockComponents = {
  [BLOCK_SLUG_LOGOS_1]: Logos_1,
};
```

**Pattern for New Types**:
```typescript
import { BLOCK_SLUG_[TYPE]_1 } from "~/payload/constants/blocks";

import [Type]_1, { [Type]_1_Block } from "./[Type]_1";

export const blocks = [[Type]_1_Block];

export const blockComponents = {
  [BLOCK_SLUG_[TYPE]_1]: [Type]_1,
};
```

### Special Case: Client Component Registration

If your component is a client component ("use client"), it cannot export the config directly.

**Block Component** (`src/payload/blocks/Hero/Hero_6/index.tsx`):
```typescript
"use client";

import type { Hero_6_Block } from "~/payload-types";

// NO: export * from "./config";  ← Cannot export server code

export default function HeroSection(props: Hero_6_Block) {
  // Component code...
}
```

**Block Config** (`src/payload/blocks/Hero/Hero_6/config.ts`):
```typescript
import type { Block } from "payload";
// ... config definition
export const Hero_6_Block: Block = { ... };
```

**Type Index** (`src/payload/blocks/Hero/index.ts`):
```typescript
// Import component and config separately
import Hero_6 from "./Hero_6";
import { Hero_6_Block } from "./Hero_6/config";  // Import from config directly

export const blocks = [
  // ... other blocks
  Hero_6_Block,  // Config
];

export const blockComponents = {
  // ... other components
  [BLOCK_SLUG_HERO_6]: Hero_6,  // Component
};
```

**Key Difference**: Import component and config separately for client components.

## Level 2: Main Index Registration

After registering at the block type level, register in the main blocks index.

**File**: `src/payload/blocks/index.tsx`

### Step 1: Import from Block Type

Add import at the top with other block type imports:

```typescript
import type { Block } from "payload";

// ... other imports

import {
  blockComponents as heroBlockComponents,
  blocks as heroBlocks,
} from "./Hero";

// If new block type, add:
import {
  blockComponents as logosBlockComponents,
  blocks as logosBlocks,
} from "./Logos";
```

### Step 2: Add to blocks Array

Find the blocks array and add your block type:

**Current structure**:
```typescript
export const blocks: Block[] = teamsBlocks
  .concat(featuresBlocks)
  .concat(heroBlocks)
  .concat(headerBlocks)
  .concat(footerBlocks)
  .concat(ctaBlocks)
  .concat(pricingBlocks)
  .concat(testimonialsBlocks)
  .concat(faqBlocks)
  .concat(contactBlocks)
  .concat(newsletterBlocks)
  .concat(statsBlocks)
  .concat(galleryBlocks)
  .concat(aboutBlocks)
  .concat(comingSoonBlocks);
```

**If adding new block type**:
```typescript
export const blocks: Block[] = teamsBlocks
  .concat(featuresBlocks)
  .concat(heroBlocks)
  .concat(headerBlocks)
  .concat(footerBlocks)
  .concat(ctaBlocks)
  .concat(pricingBlocks)
  .concat(testimonialsBlocks)
  .concat(faqBlocks)
  .concat(contactBlocks)
  .concat(newsletterBlocks)
  .concat(statsBlocks)
  .concat(galleryBlocks)
  .concat(aboutBlocks)
  .concat(logosBlocks)        // Add new type
  .concat(comingSoonBlocks);
```

**Note**: Order doesn't affect functionality, but keep it organized.

### Step 3: Add to blockComponents Object

Find the blockComponents object and add your block type:

**Current structure**:
```typescript
export const blockComponents = {
  ...teamsBlockComponents,
  ...featuresBlockComponents,
  ...heroBlockComponents,
  ...headerBlockComponents,
  ...footerBlockComponents,
  ...ctaBlockComponents,
  ...pricingBlockComponents,
  ...testimonialsBlockComponents,
  ...faqBlockComponents,
  ...contactBlockComponents,
  ...newsletterBlockComponents,
  ...statsBlockComponents,
  ...galleryBlockComponents,
  ...aboutBlockComponents,
  ...comingSoonBlockComponents,
};
```

**If adding new block type**:
```typescript
export const blockComponents = {
  ...teamsBlockComponents,
  ...featuresBlockComponents,
  ...heroBlockComponents,
  ...headerBlockComponents,
  ...footerBlockComponents,
  ...ctaBlockComponents,
  ...pricingBlockComponents,
  ...testimonialsBlockComponents,
  ...faqBlockComponents,
  ...contactBlockComponents,
  ...newsletterBlockComponents,
  ...statsBlockComponents,
  ...galleryBlockComponents,
  ...aboutBlockComponents,
  ...logosBlockComponents,     // Add new type
  ...comingSoonBlockComponents,
};
```

## Verification Steps

After registration, verify everything works:

### Step 1: Type Check

Run type checking to ensure no errors:

```bash
pnpm typecheck
```

**Expected**: No TypeScript errors

**Common Errors**:
- Missing imports
- Incorrect type names
- Config not exported correctly

### Step 2: Restart Development Server

Stop and restart the server to reload PayloadCMS:

```bash
# Stop server (Ctrl+C)
# Then restart:
pnpm dev
```

**Why**: PayloadCMS caches block configurations

### Step 3: Check Admin Panel

1. Open PayloadCMS admin: `http://localhost:3005`
2. Navigate to a page or create new page
3. Click "Add Block"
4. Verify your block appears in the list
5. Verify it's in the correct group (e.g., "Hero")

**What to Check**:
- [ ] Block appears in block selector
- [ ] Block is in correct group/category
- [ ] Block label is correct (e.g., "Hero 6")

### Step 4: Create Test Block

1. Click your block to add it
2. Verify all fields appear correctly
3. Fill in some test content
4. Save the page

**What to Check**:
- [ ] All fields are visible
- [ ] Field labels are correct
- [ ] Default values appear
- [ ] Array fields can add/remove items
- [ ] Upload fields work
- [ ] Icon fields show icon picker (if applicable)

### Step 5: Check Frontend

1. View the page on frontend
2. Verify block renders correctly
3. Verify content from admin appears
4. Check responsive design
5. Test all interactive features

**What to Check**:
- [ ] Block renders without errors
- [ ] Content from admin appears correctly
- [ ] Images load correctly
- [ ] Links work correctly
- [ ] Styling looks correct
- [ ] No console errors
- [ ] Responsive on mobile/tablet

## Complete Registration Checklist

Use this checklist for each new block:

### Pre-Registration
- [ ] Config file created: `src/payload/blocks/[Type]/[Type]_N/config.ts`
- [ ] Component file created: `src/payload/blocks/[Type]/[Type]_N/index.tsx`
- [ ] Constants added to `src/payload/constants/blocks.ts`
- [ ] Types generated: `pnpm payload:types`

### Block Type Level
- [ ] Constants imported in type index
- [ ] Block and component imported in type index
- [ ] Block added to `blocks` array
- [ ] Component added to `blockComponents` map
- [ ] Client components: config imported separately

### Main Index Level
- [ ] Block type imported in main index
- [ ] Block type concatenated to `blocks` array
- [ ] Block type spread into `blockComponents` object

### Verification
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] Development server restarted
- [ ] Block appears in admin panel
- [ ] Block can be added to page
- [ ] All fields work in admin
- [ ] Block renders correctly on frontend
- [ ] No console errors or warnings

## Troubleshooting

### Issue: Block Doesn't Appear in Admin

**Possible Causes**:
1. Not registered in main index
2. Server not restarted
3. TypeScript errors preventing build

**Solutions**:
1. Check `src/payload/blocks/index.tsx` includes your block type
2. Stop and restart dev server
3. Run `pnpm typecheck` to find errors

### Issue: Type Errors in Component

**Error**: `Property 'header' does not exist on type 'Hero_6_Block'`

**Solutions**:
1. Run `pnpm payload:types` to regenerate types
2. Check field name in config matches prop access
3. Restart TypeScript server in editor

### Issue: Block Renders Empty

**Possible Causes**:
1. Component not accessing props correctly
2. Props are undefined/null
3. Component not registered in blockComponents

**Solutions**:
1. Check component uses props parameter
2. Add fallback values: `props.header ?? ""`
3. Verify slug in blockComponents matches config slug

### Issue: Can't Delete Array Items

**Error**: Last item in array can't be deleted

**Solution**: Add `minRows: 0` to array field in config:
```typescript
{
  name: "items",
  type: "array",
  minRows: 0,  // Add this!
  maxRows: 10,
  fields: [...]
}
```

### Issue: Import Errors

**Error**: `Cannot find module '~/payload/blocks/Hero/Hero_6'`

**Solutions**:
1. Check file exists at correct path
2. Check file has default export
3. Check `tsconfig.json` paths are configured
4. Restart TypeScript server

### Issue: Constants Not Found

**Error**: `Cannot find name 'BLOCK_SLUG_HERO_6'`

**Solutions**:
1. Add constant to `src/payload/constants/blocks.ts`
2. Export constant: `export const BLOCK_SLUG_HERO_6 = "hero_6" as const`
3. Import in block type index

## Registration Patterns by Scenario

### Scenario 1: Adding Block to Existing Type

**Example**: Adding Hero_6 to existing Hero blocks

```typescript
// 1. Add constant (src/payload/constants/blocks.ts)
export const BLOCK_SLUG_HERO_6 = "hero_6" as const;

// 2. Update type index (src/payload/blocks/Hero/index.ts)
import { BLOCK_SLUG_HERO_6 } from "~/payload/constants/blocks";
import Hero_6, { Hero_6_Block } from "./Hero_6";

export const blocks = [
  // ... existing blocks
  Hero_6_Block,
];

export const blockComponents = {
  // ... existing components
  [BLOCK_SLUG_HERO_6]: Hero_6,
};

// 3. Main index already includes heroBlocks and heroBlockComponents
// No changes needed!
```

### Scenario 2: Creating New Block Type

**Example**: Creating new "Logos" block type

```typescript
// 1. Add constants (src/payload/constants/blocks.ts)
export const BLOCK_GROUP_LOGOS = "Logos" as const;
export const BLOCK_SLUG_LOGOS_1 = "logos_1" as const;

// 2. Create type index (src/payload/blocks/Logos/index.ts)
import { BLOCK_SLUG_LOGOS_1 } from "~/payload/constants/blocks";
import Logos_1, { Logos_1_Block } from "./Logos_1";

export const blocks = [Logos_1_Block];
export const blockComponents = {
  [BLOCK_SLUG_LOGOS_1]: Logos_1,
};

// 3. Update main index (src/payload/blocks/index.tsx)
import {
  blockComponents as logosBlockComponents,
  blocks as logosBlocks,
} from "./Logos";

export const blocks: Block[] = teamsBlocks
  // ... other blocks
  .concat(logosBlocks);

export const blockComponents = {
  // ... other components
  ...logosBlockComponents,
};
```

### Scenario 3: Client Component Block

**Example**: Hero_6 with "use client"

```typescript
// Component (src/payload/blocks/Hero/Hero_6/index.tsx)
"use client";
export default function Hero_6(props: Hero_6_Block) { ... }

// Config (src/payload/blocks/Hero/Hero_6/config.ts)
export const Hero_6_Block: Block = { ... };

// Type index (src/payload/blocks/Hero/index.ts)
import Hero_6 from "./Hero_6";              // Component
import { Hero_6_Block } from "./Hero_6/config";  // Config separately

export const blocks = [Hero_6_Block];
export const blockComponents = {
  [BLOCK_SLUG_HERO_6]: Hero_6,
};
```

## Final Validation

Before considering registration complete:

1. **Run Tests**: `pnpm typecheck` passes
2. **Visual Test**: Block appears and renders correctly
3. **Admin Test**: All fields work in admin panel
4. **Frontend Test**: Block displays correctly on frontend
5. **Responsive Test**: Works on mobile/tablet/desktop
6. **No Errors**: No console errors or warnings

## Next Steps

After successful registration:

1. **Test Thoroughly**: Create multiple instances, test edge cases
2. **Document Block**: If needed, create documentation
3. **Share with Team**: Notify team of new block availability
4. **Consider Registry**: Plan to add to registry for CLI installation (Phase 2)

---

**Congratulations!** Your block is now fully integrated into UIFoundry and ready for use in the PayloadCMS admin panel.

For registry migration (making block installable via CLI), see the build-marketing-blocks workflow documentation.
