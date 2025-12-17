# UIFoundry Block Creation System - Complete Overview

## Introduction

This document provides a comprehensive overview of the UIFoundry block creation system, which enables building custom PayloadCMS blocks from UI component libraries (primarily IntentUI) with full admin panel editability and type safety.

## System Architecture

The block creation system follows a systematic 5-step process, with each step documented in detail:

```
IntentUI Registry
       ↓
[1] Install Block → [2] Analyze Source → [3] Create Config → [4] Transform Component → [5] Register Block
       ↓                   ↓                    ↓                    ↓                      ↓
   components/        Analysis Doc         config.ts            index.tsx            Payload Admin
```

## The Complete Workflow

### Overview of Steps

1. **Install from IntentUI** - Download block from premium UI kit
2. **Analyze Content** - Identify all editable content fields
3. **Create Config** - Define PayloadCMS schema for admin panel
4. **Transform Component** - Replace hardcoded content with config props
5. **Register Block** - Make block available in admin and frontend

### Time Estimates

- **Per Block**: 30-60 minutes for complete implementation
- **Batch of 5**: 2-4 hours with proper workflow
- **Learning Curve**: First block takes longer, subsequent blocks faster

## Phase Breakdown

### Phase 1: Installation (Step 1)

**Goal**: Get the source block component into your workspace for analysis

**Source Options** (in priority order):

1. **IntentUI Registry** (Primary) - https://design.intentui.com/blocks
   - Premium, production-ready components
   - Authentication token required (available)
   - High-quality design and code
   - Consistent patterns

2. **Tailark Free Tier** (Fallback) - https://tailark.com/
   - Community examples
   - Free and open source
   - Good for specific styles

3. **Awesome Shadcn UI** (Additional Fallback)
   - Community collection
   - MIT licensed
   - Variable quality

**Installation Process**:

```bash
# Install from IntentUI registry
npx shadcn@latest add https://design.intentui.com/blocks/[block-id] --yes --overwrite
```

**What Happens**:
- Block installs to `components/ui/` or `components/`
- All dependencies are installed automatically
- Source code is ready for analysis

**Key Success Criteria**:
- ✅ Block successfully downloaded
- ✅ All files located
- ✅ Dependencies identified
- ✅ No installation errors

**Detailed Guide**: `agent-os/docs/blocks/01-installing-from-intentui.md`

---

### Phase 2: Analysis (Step 2)

**Goal**: Identify every piece of content that should be editable in the admin panel

**Core Principle**: If users might want to change it, make it a field in the config.

**Content Categories to Identify**:

1. **Text Content**
   - Headings (h1, h2, h3, etc.)
   - Subheadings and paragraphs
   - Labels, captions, badges
   - Button text
   - Copyright/legal text

2. **Interactive Content**
   - CTA buttons (label + URL)
   - Navigation links
   - Form inputs
   - Social media links

3. **Media Content**
   - Images (hero images, logos, etc.)
   - Background images
   - Icons (lucide-react icon names)

4. **Structured Content**
   - Feature lists
   - Testimonial arrays
   - Team member lists
   - FAQ items
   - Any repeating content

5. **Optional/Conditional Content**
   - Show/hide toggles
   - Optional sections
   - Variant selections

**Analysis Output**:

Create a structured document listing:
- Each field name
- Field type (text, textarea, array, upload, etc.)
- Whether required or optional
- Default value to use
- Which PayloadCMS field helper to use

**Example Analysis**:

```markdown
## Hero 6 Content Analysis

1. **badge** (text, optional)
   - Current: "New Release"
   - Helper: text field
   - Default: "New Release"

2. **header** (text, required)
   - Current: "Ship Faster with Modern Tools"
   - Helper: headerField()
   - Default: "Ship Faster with Modern Tools"

3. **actions** (array, min: 0, max: 2)
   - Current: [{ label: "Get Started", href: "/" }, ...]
   - Helper: callToActionPair()
   - Default: Same as current

4. **media** (upload, optional)
   - Current: "/hero.png"
   - Helper: mediaField()
   - Default: null
```

**Key Success Criteria**:
- ✅ All visible content identified
- ✅ No hardcoded content missed
- ✅ Field types determined
- ✅ Array min/max specified
- ✅ Default values documented

**Detailed Guide**: `agent-os/docs/blocks/02-analyzing-block-source.md`

---

### Phase 3: Config Creation (Step 3)

**Goal**: Create the PayloadCMS block configuration that generates the admin UI and TypeScript types

**Why This Step Is Critical**:
- PayloadCMS generates TypeScript types from this config
- The admin panel UI is built from this config
- The component CANNOT be typed until this exists
- **Must be done BEFORE creating the component**

**Config Structure**:

```typescript
import type { Block } from "payload";
import { BLOCK_GROUP_HERO, BLOCK_SLUG_HERO_6 } from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";
import callToActionPair from "~/payload/fields/callToActionPair/config";
import mediaField from "~/payload/fields/media/config";

export const Hero_6_Block: Block = {
  slug: BLOCK_SLUG_HERO_6,
  admin: {
    group: BLOCK_GROUP_HERO,
  },
  fields: [
    {
      name: "badge",
      type: "text",
      label: "Badge Text",
      defaultValue: "New Release",
    },
    headerField({
      defaultValue: "Ship Faster with Modern Tools",
    }),
    subheaderField({
      defaultValue: "Build your next project with confidence",
    }),
    callToActionPair({
      maxRows: 2,
      minRows: 0,
      defaultValue: [
        { label: "Get Started", href: "/" },
        { label: "Learn More", href: "/docs" },
      ],
    }),
    mediaField({
      name: "heroImage",
      label: "Hero Image",
    }),
  ],
  interfaceName: "Hero_6_Block",
  labels: {
    plural: "Hero 6's",
    singular: "Hero 6",
  },
};
```

**Key Elements**:

1. **Block Metadata**:
   - `slug`: Unique identifier (from constants)
   - `admin.group`: Groups related blocks in admin
   - `interfaceName`: Generated TypeScript type name
   - `labels`: Display names in admin

2. **Fields**:
   - Use field helpers when available
   - Set appropriate default values
   - Mark required fields
   - Add min/max rows for arrays (CRITICAL!)

3. **Field Helpers** (reusable components):
   - `headerField()` - Main headings
   - `subheaderField()` - Supporting text
   - `callToActionPair()` - CTA button arrays
   - `mediaField()` - Images with light/dark themes
   - `uploadField()` - Single file uploads
   - `iconField()` - Icon selection
   - Many more in `src/payload/fields/`

**Critical Requirements**:

```typescript
// ❌ BAD: Array field without minRows/maxRows
{
  name: "items",
  type: "array",
  fields: [...]
}

// ✅ GOOD: Array field with proper configuration
{
  name: "items",
  type: "array",
  minRows: 0,     // Allows deletion of all items
  maxRows: 10,    // Prevents performance issues
  fields: [...]
}
```

**After Config Creation**:

```bash
# Generate TypeScript types
pnpm payload:types

# This creates ~/payload-types.ts with your block interface
```

**Key Success Criteria**:
- ✅ Config file created at correct location
- ✅ Constants added to constants file
- ✅ All fields from analysis included
- ✅ Array fields have minRows: 0 and maxRows
- ✅ Default values populated
- ✅ Types generated successfully
- ✅ No TypeScript errors

**Detailed Guide**: `agent-os/docs/blocks/03-creating-block-configs.md`

---

### Phase 4: Component Transformation (Step 4)

**Goal**: Transform the source component to use PayloadCMS props instead of hardcoded content

**Before**:
```tsx
export default function HeroSection() {
  return (
    <section>
      <h1>Ship Faster with Modern Tools</h1>
      <p>Build your next project with confidence</p>
      <button>Get Started</button>
    </section>
  );
}
```

**After**:
```tsx
import type { Hero_6_Block } from "~/payload-types";

export * from "./config";  // Export config (server components only)

export default function HeroSection(props: Hero_6_Block) {
  return (
    <section>
      <h1>{props.header}</h1>
      <p>{props.subheader}</p>
      <button>{props.ctaLabel}</button>
    </section>
  );
}
```

**Transformation Steps**:

1. **Move to Correct Location**:
   - From: `components/ui/hero-section.tsx`
   - To: `src/payload/blocks/Hero/Hero_6/index.tsx`

2. **Update Imports**:
   ```typescript
   // ❌ Source imports
   import { Button } from "@/components/ui/button";
   import { cn } from "@/lib/utils";

   // ✅ UIFoundry imports
   import { Button } from "~/ui/button";
   import { cn } from "~/lib/utils";
   ```

3. **Add Type Import**:
   ```typescript
   import type { Hero_6_Block } from "~/payload-types";
   ```

4. **Update Component Signature**:
   ```typescript
   export default function HeroSection(props: Hero_6_Block) {
   ```

5. **Export Config** (server components only):
   ```typescript
   export * from "./config";
   ```

6. **Replace Hardcoded Content**:
   ```tsx
   // Text
   <h1>{props.header}</h1>

   // Optional content
   {props.badge && <Badge>{props.badge}</Badge>}

   // Arrays
   {(props.actions ?? []).map((action, index) => (
     <Button key={`hero_6_action_${index}`}>
       {action.label}
     </Button>
   ))}

   // Images
   {props.media?.light && (
     <img src={typeof props.media.light === 'string'
       ? props.media.light
       : props.media.light.url}
     />
   )}
   ```

**Special Cases**:

**Client Components** (with "use client"):
```typescript
"use client";

import type { Hero_6_Block } from "~/payload-types";

// ❌ DO NOT export config from client components
// export * from "./config";  ← WRONG!

export default function HeroSection(props: Hero_6_Block) {
  const [state, setState] = useState();  // Client-side state OK

  return (
    <section>
      <h1>{props.header}</h1>  {/* Use props for content */}
    </section>
  );
}
```

**Icon Handling**:
```typescript
import * as LucideIcons from "lucide-react";

// Icon is stored as string in config
const IconComponent = props.icon
  ? LucideIcons[props.icon as keyof typeof LucideIcons]
  : LucideIcons.Circle;

<IconComponent className="w-6 h-6" />
```

**Key Success Criteria**:
- ✅ Component moved to correct location
- ✅ All imports use project paths (`~/`)
- ✅ Component accepts typed props
- ✅ Config exported (if server component)
- ✅ All hardcoded content replaced
- ✅ Arrays have fallbacks (`?? []`)
- ✅ Optional fields have conditionals
- ✅ No TypeScript errors

**Detailed Guide**: `agent-os/docs/blocks/04-transforming-block-components.md`

---

### Phase 5: Registration (Step 5)

**Goal**: Register the block so it appears in PayloadCMS admin and can render on frontend

**Two-Level Registration**:

#### Level 1: Block Type Registration

**File**: `src/payload/blocks/Hero/index.ts`

```typescript
// 1. Import constants
import {
  BLOCK_SLUG_HERO_1,
  BLOCK_SLUG_HERO_2,
  BLOCK_SLUG_HERO_6,  // Add new
} from "~/payload/constants/blocks";

// 2. Import block and component
import Hero_1, { Hero_1_Block } from "./Hero_1";
import Hero_2, { Hero_2_Block } from "./Hero_2";
import Hero_6, { Hero_6_Block } from "./Hero_6";  // Add new

// 3. Add to blocks array
export const blocks = [
  Hero_1_Block,
  Hero_2_Block,
  Hero_6_Block,  // Add new
];

// 4. Add to blockComponents map
export const blockComponents = {
  [BLOCK_SLUG_HERO_1]: Hero_1,
  [BLOCK_SLUG_HERO_2]: Hero_2,
  [BLOCK_SLUG_HERO_6]: Hero_6,  // Add new
};
```

#### Level 2: Main Index Registration

**File**: `src/payload/blocks/index.tsx`

**Already done if adding to existing block type!**

If creating NEW block type:

```typescript
// 1. Import new block type
import {
  blockComponents as logosBlockComponents,
  blocks as logosBlocks,
} from "./Logos";

// 2. Add to blocks array
export const blocks: Block[] = teamsBlocks
  .concat(heroBlocks)
  .concat(logosBlocks)  // Add new
  .concat(comingSoonBlocks);

// 3. Add to blockComponents object
export const blockComponents = {
  ...heroBlockComponents,
  ...logosBlockComponents,  // Add new
  ...comingSoonBlockComponents,
};
```

**Client Component Registration**:

If component has "use client" directive:

```typescript
// Import component and config SEPARATELY
import Hero_6 from "./Hero_6";
import { Hero_6_Block } from "./Hero_6/config";  // Import from config file

export const blocks = [Hero_6_Block];
export const blockComponents = {
  [BLOCK_SLUG_HERO_6]: Hero_6,
};
```

**Verification Steps**:

1. **Type Check**:
   ```bash
   pnpm typecheck
   ```
   Expected: No errors

2. **Restart Server**:
   Stop and restart dev server to reload PayloadCMS

3. **Check Admin Panel**:
   - Navigate to http://localhost:3005/admin
   - Create/edit a page
   - Click "Add Block"
   - Verify your block appears in the correct group
   - Add block and verify all fields work

4. **Check Frontend**:
   - Save page with your block
   - View page on frontend
   - Verify block renders correctly
   - Check console for errors
   - Test responsive design

**Key Success Criteria**:
- ✅ No TypeScript errors
- ✅ Block appears in admin panel
- ✅ Block in correct group/category
- ✅ All fields functional in admin
- ✅ Block renders on frontend
- ✅ Content from admin displays correctly
- ✅ No console errors
- ✅ Responsive design works

**Detailed Guide**: `agent-os/docs/blocks/05-registering-blocks.md`

---

## Integration with Build System

### The Three-Phase Pipeline

After Phase 5 (Registration) is complete, blocks enter the build-marketing-blocks pipeline:

#### Phase 1: SOURCE & BUILD ✅ (Steps 1-5 Above)

**Agent**: `@source-helper`
**Output**: Working block in `src/payload/blocks/`
**Status**: COMPLETE after registration

#### Phase 2: REGISTRY MIGRATION

**Agent**: `@registry-porter`
**Goal**: Make block installable via CLI
**Process**:
- Copy block to `registry/payload/blocks/`
- Transform imports (`~` → `@/registry`)
- Update `registry.json`
- Test CLI installation
- Validate in browser

**Command**:
```bash
npx shadcn add @uifoundry/hero-6
```

#### Phase 3: DOCUMENTATION

**Agent**: `@docs-writer`
**Goal**: Create user documentation
**Output**: `content/docs/blocks/hero/hero-6.mdx`
**Sections**:
- Preview (visual example)
- Props table
- Installation instructions
- Registry dependencies
- NPM dependencies

---

## Agent System

### Source-Helper Agent

**File**: `.claude/agents/source-helper.md`

**Role**: Implements Steps 1-5 (complete source building)

**Key Features**:
- IntentUI integration
- Dependency management
- PayloadCMS config creation
- Component transformation
- Browser testing
- Type validation

**References**: All 5 helper docs for detailed guidance

**Updated**: Now supports IntentUI as primary source

### Registry-Porter Agent

**File**: `.claude/agents/registry-porter.md`

**Role**: Phase 2 (registry migration)

**Not modified**: Works with output from source-helper

### Docs-Writer Agent

**File**: `.claude/agents/docs-writer.md`

**Role**: Phase 3 (documentation)

**Not modified**: Works with blocks from registry

### Marketing-Blocks-Coordinator Agent

**File**: `.claude/agents/marketing-blocks-coordinator.md`

**Role**: Orchestrates all three phases

**Workflow**:
1. User requests blocks
2. Coordinator delegates to @source-helper (Phase 1)
3. When complete, delegates to @registry-porter (Phase 2)
4. When complete, delegates to @docs-writer (Phase 3)
5. Updates roadmap and reports completion

---

## File Organization

### Directory Structure

```
UIFoundry/
├── .claude/
│   └── agents/
│       ├── source-helper.md              (Updated: IntentUI support)
│       ├── registry-porter.md
│       ├── docs-writer.md
│       └── marketing-blocks-coordinator.md
│
├── agent-os/
│   ├── docs/
│   │   └── blocks/
│   │       ├── 00-OVERVIEW.md            (This file)
│   │       ├── 01-installing-from-intentui.md
│   │       ├── 02-analyzing-block-source.md
│   │       ├── 03-creating-block-configs.md
│   │       ├── 04-transforming-block-components.md
│   │       └── 05-registering-blocks.md
│   │
│   └── workflows/
│       └── implementation/
│           └── build-marketing-blocks.md  (Updated: IntentUI as primary)
│
├── src/
│   └── payload/
│       ├── blocks/
│       │   ├── Hero/
│       │   │   ├── Hero_1/
│       │   │   │   ├── config.ts
│       │   │   │   └── index.tsx
│       │   │   ├── Hero_6/              (New blocks go here)
│       │   │   │   ├── config.ts
│       │   │   │   └── index.tsx
│       │   │   └── index.ts            (Block type registration)
│       │   │
│       │   └── index.tsx               (Main registration)
│       │
│       ├── constants/
│       │   └── blocks.ts               (Block slug constants)
│       │
│       └── fields/                     (Reusable field helpers)
│           ├── header/config.ts
│           ├── subheader/config.ts
│           ├── media/config.ts
│           └── ...
│
└── registry/
    └── payload/blocks/                 (Phase 2 output)
```

---

## Key Concepts

### Type Safety

**PayloadCMS generates TypeScript types from config**:

```typescript
// You create: src/payload/blocks/Hero/Hero_6/config.ts
export const Hero_6_Block: Block = {
  fields: [
    headerField(),
    subheaderField(),
  ]
}

// PayloadCMS generates: src/payload-types.ts
export interface Hero_6_Block {
  header: string;
  subheader: string;
  blockType: 'hero_6';
}

// You use: src/payload/blocks/Hero/Hero_6/index.tsx
export default function HeroSection(props: Hero_6_Block) {
  return <h1>{props.header}</h1>  // ✅ Type-safe!
}
```

### Field Helpers

**Reusable field configurations**:

```typescript
// Instead of writing:
{
  name: "header",
  type: "text",
  label: "Header",
  required: true,
  defaultValue: "Welcome"
}

// Use helper:
headerField({
  defaultValue: "Welcome"
})
```

**Benefits**:
- Consistent field patterns
- Less boilerplate
- Easy to update globally
- Type-safe

### Server vs Client Components

**Server Components** (default):
```typescript
// No "use client"
import type { Hero_6_Block } from "~/payload-types";

export * from "./config";  // ✅ Can export config

export default function Hero(props: Hero_6_Block) {
  return <div>{props.header}</div>
}
```

**Client Components** (when needed):
```typescript
"use client";  // Has hooks, state, or interactions

import { useState } from "react";
import type { Hero_6_Block } from "~/payload-types";

// ❌ CANNOT export config from client component

export default function Hero(props: Hero_6_Block) {
  const [state, setState] = useState();
  return <div>{props.header}</div>
}
```

### Array Fields

**CRITICAL: Always set minRows and maxRows**:

```typescript
// ❌ BAD: Users can't delete last item
{
  name: "items",
  type: "array",
  fields: [...]
}

// ✅ GOOD: Users can delete all items
{
  name: "items",
  type: "array",
  minRows: 0,     // Allows deletion of all
  maxRows: 10,    // Prevents too many
  fields: [...]
}
```

### Default Values

**Extract from source component**:

```typescript
// Source component has:
<h1>Ship Faster with Modern Tools</h1>

// Config should have:
headerField({
  defaultValue: "Ship Faster with Modern Tools"  // Use actual content
})

// NOT:
headerField({
  defaultValue: "Header"  // ❌ Too generic
})
```

**Why**:
- Provides realistic examples
- Shows users expected format
- Blocks work immediately without configuration
- Better documentation previews

---

## Common Patterns

### Pattern 1: Simple Text Block

**Example**: Basic hero with heading and subheading

**Config**:
```typescript
fields: [
  headerField(),
  subheaderField(),
]
```

**Component**:
```tsx
<h1>{props.header}</h1>
<p>{props.subheader}</p>
```

### Pattern 2: Block with CTA Buttons

**Example**: Hero with action buttons

**Config**:
```typescript
fields: [
  headerField(),
  callToActionPair({
    maxRows: 2,
    minRows: 0,
  }),
]
```

**Component**:
```tsx
{(props.actions ?? []).map((action, index) => (
  <Button key={`hero_6_action_${index}`} asChild>
    <Link href={action.href ?? "/"}>
      {action.label}
    </Link>
  </Button>
))}
```

### Pattern 3: Block with Images

**Example**: Hero with background image

**Config**:
```typescript
fields: [
  headerField(),
  mediaField({
    name: "heroImage",
    label: "Hero Background",
  }),
]
```

**Component**:
```tsx
{props.heroImage?.light && (
  <img
    src={typeof props.heroImage.light === 'string'
      ? props.heroImage.light
      : props.heroImage.light.url}
    alt={props.header}
    className="dark:hidden"
  />
)}
{props.heroImage?.dark && (
  <img
    src={typeof props.heroImage.dark === 'string'
      ? props.heroImage.dark
      : props.heroImage.dark.url}
    alt={props.header}
    className="hidden dark:block"
  />
)}
```

### Pattern 4: Block with Feature List

**Example**: Features section with icons

**Config**:
```typescript
fields: [
  {
    name: "features",
    type: "array",
    minRows: 0,
    maxRows: 6,
    fields: [
      iconField(),
      { name: "title", type: "text" },
      { name: "description", type: "textarea" },
    ],
  },
]
```

**Component**:
```tsx
{(props.features ?? []).map((feature, index) => {
  const IconComponent = LucideIcons[feature.icon as keyof typeof LucideIcons];
  return (
    <div key={`features_${index}`}>
      <IconComponent className="w-8 h-8" />
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
})}
```

### Pattern 5: Optional Content

**Example**: Optional badge or alert

**Config**:
```typescript
fields: [
  {
    name: "showBadge",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "badge",
    type: "text",
    defaultValue: "New",
    admin: {
      condition: (data) => data.showBadge === true,
    },
  },
]
```

**Component**:
```tsx
{props.showBadge && props.badge && (
  <Badge>{props.badge}</Badge>
)}
```

---

## Troubleshooting

### Issue: Types Not Generated

**Error**: `Cannot find name 'Hero_6_Block'`

**Solution**:
```bash
# Regenerate types
pnpm payload:types

# If still errors, try full build
pnpm build
```

### Issue: Block Doesn't Appear in Admin

**Possible Causes**:
1. Not registered in main index
2. Server not restarted
3. TypeScript errors

**Solutions**:
1. Check `src/payload/blocks/index.tsx`
2. Restart dev server
3. Run `pnpm typecheck`

### Issue: Can't Delete Array Items

**Error**: Users can't delete last item

**Solution**: Add `minRows: 0` to array config:
```typescript
{
  name: "items",
  type: "array",
  minRows: 0,  // Add this!
  fields: [...]
}
```

### Issue: Component Not Rendering

**Possible Causes**:
1. Props not accessed correctly
2. Missing fallbacks for optional fields
3. TypeScript errors in component

**Solutions**:
1. Use `props.fieldName`, not destructuring
2. Add `?? []` for arrays, `&&` for optional fields
3. Run `pnpm typecheck`

### Issue: Import Errors

**Error**: `Cannot find module '~/ui/button'`

**Solutions**:
1. Check component exists in project
2. Install with shadcn: `npx shadcn add button`
3. Verify import path in tsconfig.json

---

## Best Practices

### Do's

✅ **Always source from IntentUI first** - highest quality
✅ **Extract all hardcoded content** to default values
✅ **Use field helpers** when available
✅ **Set minRows: 0 on arrays** so users can delete all
✅ **Provide realistic default values** from source
✅ **Use empty strings for href fields** - never real URLs
✅ **Add fallbacks** for optional fields (`?? []`, `&&`)
✅ **Test in browser** before marking complete
✅ **Generate types** after creating config
✅ **Check responsive design** at multiple breakpoints

### Don'ts

❌ **Never write blocks from scratch** - always source
❌ **Never skip content analysis** - you'll miss fields
❌ **Never create component before config** - types won't exist
❌ **Never forget minRows on arrays** - users can't delete
❌ **Never use generic defaults** - use actual content
❌ **Never export config from client components** - will error
❌ **Never start/stop dev server** - should always be running
❌ **Never skip browser testing** - catch issues early

---

## Quick Reference

### Commands

```bash
# Install from IntentUI
npx shadcn@latest add https://design.intentui.com/blocks/[id] --yes --overwrite

# Generate types
pnpm payload:types

# Type check
pnpm typecheck

# Full build
pnpm build

# Install shadcn component
npx shadcn add button card badge

# Install npm package
pnpm add framer-motion lucide-react
```

### File Paths

```
Config:     src/payload/blocks/[Type]/[Type]_N/config.ts
Component:  src/payload/blocks/[Type]/[Type]_N/index.tsx
Constants:  src/payload/constants/blocks.ts
Type Index: src/payload/blocks/[Type]/index.ts
Main Index: src/payload/blocks/index.tsx
Generated:  src/payload-types.ts
```

### Import Patterns

```typescript
// Block config
import type { Block } from "payload";
import { BLOCK_SLUG_HERO_6 } from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";

// Block component
import type { Hero_6_Block } from "~/payload-types";
import { Button } from "~/ui/button";
import { cn } from "~/lib/utils";
import { ArrowRight } from "lucide-react";
```

---

## Workflow Checklist

Use this checklist for each new block:

### Step 1: Installation
- [ ] Block installed from IntentUI
- [ ] All files located
- [ ] Dependencies identified
- [ ] No installation errors

### Step 2: Analysis
- [ ] All text content identified
- [ ] All interactive content identified
- [ ] All media content identified
- [ ] Array structures documented
- [ ] Default values listed
- [ ] Analysis document created

### Step 3: Config Creation
- [ ] Constants added to blocks.ts
- [ ] Config file created
- [ ] All fields from analysis included
- [ ] Array fields have minRows: 0 and maxRows
- [ ] Default values populated
- [ ] Types generated: `pnpm payload:types`
- [ ] No TypeScript errors

### Step 4: Transformation
- [ ] Component moved to correct location
- [ ] Imports updated to project paths
- [ ] Type import added
- [ ] Component accepts props parameter
- [ ] Config exported (if server component)
- [ ] All hardcoded content replaced
- [ ] Arrays have fallbacks
- [ ] Optional fields have conditionals
- [ ] No TypeScript errors

### Step 5: Registration
- [ ] Block registered in type index
- [ ] Block registered in main index (if new type)
- [ ] Dev server restarted
- [ ] Block appears in admin panel
- [ ] All fields work in admin
- [ ] Block renders on frontend
- [ ] Content displays correctly
- [ ] No console errors
- [ ] Responsive design works

---

## Summary

The UIFoundry block creation system transforms UI components from IntentUI (and other sources) into fully-editable PayloadCMS blocks through a systematic 5-step process:

1. **Install** - Get the source component
2. **Analyze** - Identify editable content
3. **Create Config** - Define PayloadCMS schema
4. **Transform Component** - Use props instead of hardcoded content
5. **Register** - Make available in admin and frontend

This system enables:
- ✅ **Rapid Development**: 30-60 minutes per block
- ✅ **Type Safety**: Auto-generated TypeScript types
- ✅ **Consistent Patterns**: Reusable field helpers
- ✅ **Quality Assurance**: Browser testing at each step
- ✅ **Scalability**: Batch processing of 5 blocks at a time
- ✅ **Admin Editability**: Full control in PayloadCMS admin
- ✅ **Production Ready**: High-quality source material

The @source-helper agent handles all 5 steps, guided by detailed documentation and integrated with the broader build-marketing-blocks pipeline for registry migration and documentation.

---

## Next Steps

1. **Read the helper docs** in order (01-05) for detailed guides
2. **Try building your first block** following this overview
3. **Use the source-helper agent** for automated workflow
4. **Review existing blocks** in `src/payload/blocks/` for patterns
5. **Refer back to this overview** as needed

**Need Help?**
- Review specific helper docs for detailed guidance
- Check existing blocks for examples
- Use @source-helper agent for assistance
- Consult troubleshooting section

---

**Documentation Links**:

- [01 - Installing from IntentUI](./01-installing-from-intentui.md)
- [02 - Analyzing Block Source](./02-analyzing-block-source.md)
- [03 - Creating Block Configs](./03-creating-block-configs.md)
- [04 - Transforming Components](./04-transforming-block-components.md)
- [05 - Registering Blocks](./05-registering-blocks.md)

**Agent Files**:

- Source Helper: `.claude/agents/source-helper.md`
- Registry Porter: `.claude/agents/registry-porter.md`
- Docs Writer: `.claude/agents/docs-writer.md`
- Coordinator: `.claude/agents/marketing-blocks-coordinator.md`

**Workflow**:

- Build Marketing Blocks: `agent-os/workflows/implementation/build-marketing-blocks.md`
