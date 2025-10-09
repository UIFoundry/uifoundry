# CRITICAL: Block Build Order

## The Correct Order (MUST FOLLOW)

When building any new PayloadCMS block, this order is **mandatory**:

```
1. Source Code
   ↓
2. Dependencies
   ↓
3. config.ts
   ↓
4. Constants
   ↓
5. Exports
   ↓
6. pnpm payload:types ← CRITICAL
   ↓
7. index.tsx (component)
   ↓
8. Renderer Registration
   ↓
9. Testing
```

---

## Step-by-Step Breakdown

### Step 1: Get Source Code

Fetch the MIT-licensed component source from:

- Awesome Shadcn UI
- Tailark free tier
- User-provided URL

**DO NOT write from scratch.**

### Step 2: Install Dependencies

Analyze source and install ALL required npm packages:

```bash
pnpm add framer-motion lucide-react @radix-ui/react-dialog
```

### Step 3: Create config.ts

**Location**: `src/payload/blocks/[BlockType]/[BlockType]_N/config.ts`

**Purpose**: Define PayloadCMS block structure and fields

**Example**:

```typescript
import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_3,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import headerField from "~/payload/fields/header/config";

export const Hero_3_Block: Block = {
  slug: BLOCK_SLUG_HERO_3,
  labels: { singular: "Hero 3", plural: "Hero 3's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_3_Block",
  fields: [
    headerField(),
    // ... other fields
  ],
};
```

### Step 4: Update Constants

**File**: `src/payload/constants/blocks.ts`

```typescript
export const BLOCK_SLUG_HERO_3 = "hero-3";
```

### Step 5: Register Export

**File**: `src/payload/blocks/Hero/index.ts`

```typescript
export { Hero_3_Block } from "./Hero_3/config";
```

### Step 6: Generate Types (CRITICAL)

**Command**:

```bash
pnpm payload:types
```

**What happens**:

1. PayloadCMS reads your config.ts
2. Generates TypeScript interface in `src/payload-types.ts`
3. Creates `Hero_3_Block` type you can import

**Verify**:

```bash
grep "Hero_3_Block" src/payload-types.ts
# Should show: export interface Hero_3_Block { ... }
```

**⚠️ STOP HERE** - Do NOT create index.tsx until this completes successfully.

### Step 7: Create Component (index.tsx) - REFACTOR APPROACH

**Location**: `src/payload/blocks/[BlockType]/[BlockType]_N/index.tsx`

**RECOMMENDED APPROACH**: Pull source, then refactor it.

#### Method: Pull → Refactor (How Hero_1 and Hero_2 were built)

**Step 7a: Copy source component code**

Take the source component you found and copy it into index.tsx:

```typescript
// Original source from Tailark/Shadcn
"use client";

import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

export default function Hero({ title, subtitle, ctaText }: HeroProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Button>{ctaText}</Button>
    </section>
  );
}
```

**Step 7b: Refactor the component**

Now refactor to work with PayloadCMS:

```typescript
"use client";

// ✅ Update imports to use project paths
import { Button } from "~/ui/button";
// ✅ Import the generated PayloadCMS type
import type { Hero_3_Block } from "~/payload-types";

// ❌ REMOVE the original interface - PayloadCMS provides this
// interface HeroProps { ... }  ← DELETE THIS

// ✅ Use PayloadCMS generated type
export default function Hero3Section(props: Hero_3_Block) {
  return (
    <section>
      {/* ✅ Update to use PayloadCMS field names from config.ts */}
      <h1>{props.header}</h1>           {/* was: title */}
      <p>{props.subheader}</p>          {/* was: subtitle */}
      <Button>{props.primaryCtaLabel}</Button>  {/* was: ctaText */}
    </section>
  );
}
```

**Key Refactoring Steps**:

1. ✅ Change imports from `@/components/...` to `~/ui/...` or `~/payload/...`
2. ✅ DELETE any custom prop interfaces
3. ✅ Add import: `import type { [BlockType]_N_Block } from "~/payload-types"`
4. ✅ Change component props to use generated type
5. ✅ Update JSX to reference PayloadCMS field names (from your config.ts)
6. ✅ Keep all styling, animations, and structure from original

**DO NOT**:

```typescript
// ❌ WRONG - Don't keep custom interfaces
interface Hero3Props {
  header: string;
  subheader?: string;
}

// ❌ WRONG - Don't create new types
type Hero3Type = {
  title: string;
};
```

**THIS IS EASIER** than writing from scratch - you're just updating import paths and removing redundant type definitions!

**DO NOT**:

```typescript
// ❌ WRONG - Don't create custom interfaces
interface Hero3Props {
  header: string;
  subheader?: string;
}

// ❌ WRONG - Don't try to define the shape yourself
// PayloadCMS already did this in config.ts
```

### Step 8: Register in Renderer

**File**: `src/components/RenderBlocks/RenderBlocks.tsx` (or similar)

```typescript
import Hero3 from "~/payload/blocks/Hero/Hero_3";
import { BLOCK_SLUG_HERO_3 } from "~/payload/constants/blocks";

// In render switch/map:
case BLOCK_SLUG_HERO_3:
  return <Hero3 key={block.id} {...block} />;
```

### Step 9: Test

```bash
# Visit admin panel
http://localhost:3001/admin

# Create page, add block, fill fields, preview
```

---

## Why This Order Matters

### Config BEFORE Component

**Reason**: The component needs types that config.ts generates.

**What happens if reversed**:

```typescript
// If you create index.tsx first:
import type { Hero_3_Block } from "~/payload-types";
// ❌ ERROR: Cannot find name 'Hero_3_Block'
// Because pnpm payload:types hasn't run yet
```

### pnpm payload:types Is Mandatory

**What it does**:

- Reads all PayloadCMS configs
- Generates TypeScript types in `src/payload-types.ts`
- Creates interfaces matching your config structure

**Without it**:

- Component can't import the block type
- TypeScript errors everywhere
- Props don't match config fields

### Export Registration Matters

**Why**: PayloadCMS can't find your block if not exported

**Location**: `src/payload/blocks/[BlockType]/index.ts`

**Must happen before** `pnpm payload:types` so PayloadCMS can read the config.

---

## Common Mistakes

### ❌ Mistake 1: Creating index.tsx Before Types

```bash
# Wrong order:
1. Create config.ts
2. Create index.tsx ← TOO EARLY
3. Run pnpm payload:types

# Result: Type errors in index.tsx
```

### ❌ Mistake 2: Skipping pnpm payload:types

```bash
# Wrong:
1. Create config.ts
2. Create index.tsx
3. Skip type generation

# Result: import type { Hero_3_Block } fails
```

### ❌ Mistake 3: Creating Custom Interfaces

```typescript
// ❌ WRONG - Duplicates PayloadCMS types
interface Hero3Props {
  header: string;
  subheader?: string;
}

// ✅ CORRECT - Use generated types
import type { Hero_3_Block } from "~/payload-types";
```

### ❌ Mistake 4: Writing From Scratch

```typescript
// ❌ WRONG - Never write from scratch
export default function Hero3Section(props: Hero_3_Block) {
  return <div>I made this up</div>;
}

// ✅ CORRECT - Always base on source
// Copy structure/styling from MIT-licensed component
// Adapt to use PayloadCMS props
```

---

## Verification Checklist

After each step, verify before proceeding:

**After config.ts**:

- [ ] File exists at correct path
- [ ] Uses correct slug from constants
- [ ] Fields match source component props
- [ ] No TypeScript errors in config.ts

**After constants update**:

- [ ] BLOCK*SLUG*[TYPE]\_N exists
- [ ] Follows naming convention (kebab-case)
- [ ] Added to array if needed

**After export registration**:

- [ ] Block exported from index.ts
- [ ] Export uses correct path
- [ ] No import errors

**After pnpm payload:types**:

- [ ] Command completes without errors
- [ ] Type exists in payload-types.ts
- [ ] Can grep for block type name

**After component creation**:

- [ ] Imports generated type successfully
- [ ] No custom prop interfaces created
- [ ] Uses props matching config fields
- [ ] No TypeScript errors

**After renderer registration**:

- [ ] Case added to switch/map
- [ ] Correct slug constant imported
- [ ] Component imported correctly

**After testing**:

- [ ] Block appears in admin panel
- [ ] Fields render correctly
- [ ] Data saves successfully
- [ ] Preview/frontend renders correctly

---

## Quick Reference Card

```
BUILD ORDER CHECKLIST:

□ Get source code (MIT licensed)
□ Install dependencies (pnpm add ...)
□ Create config.ts
□ Update constants (blocks.ts)
□ Register export (index.ts)
□ Run pnpm payload:types ← MUST DO
□ Create index.tsx (component)
□ Register in renderer
□ Test in admin panel
□ Test on frontend

CRITICAL RULE:
config.ts → pnpm payload:types → index.tsx
       ↑ MUST HAPPEN IN THIS ORDER ↑
```

---

## For Agents: Enforcement

When building blocks, you MUST:

1. ✅ Create config.ts FIRST
2. ✅ Run `pnpm payload:types` BEFORE creating index.tsx
3. ✅ Use generated types (NO custom interfaces)
4. ✅ Base on MIT-licensed source (NO writing from scratch)

If you skip or reorder these steps, the build WILL FAIL.

---

## Example: Full Sequence

```bash
# 1. Install dependencies
pnpm add framer-motion @heroicons/react

# 2. Create config.ts
# (Create src/payload/blocks/Hero/Hero_3/config.ts)

# 3. Update constants
# (Edit src/payload/constants/blocks.ts)

# 4. Register export
# (Edit src/payload/blocks/Hero/index.ts)

# 5. GENERATE TYPES (CRITICAL)
pnpm payload:types

# 6. Verify types exist
grep "Hero_3_Block" src/payload-types.ts

# 7. NOW create component
# (Create src/payload/blocks/Hero/Hero_3/index.tsx)

# 8. Register in renderer
# (Edit RenderBlocks.tsx)

# 9. Test
# Visit localhost:3001/admin
```

**Total time if done correctly**: 5-7 minutes
**Total time if order wrong**: Hours of debugging type errors

Follow the order. Save yourself time.
