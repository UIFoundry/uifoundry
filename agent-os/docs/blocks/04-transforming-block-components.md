# Transforming Block Components to Use Config Props

## Overview

This guide covers how to transform an installed block component to use the PayloadCMS block config you created. This is the final step in making a block fully editable in the admin panel.

## Prerequisites

Before transforming the component:

- [ ] Config file created (see [03-creating-block-configs.md](./03-creating-block-configs.md))
- [ ] Types generated with `pnpm payload:types`
- [ ] Content analysis completed
- [ ] Original component source available

## Transformation Goals

**Transform this**:
```tsx
export default function HeroSection() {
  return (
    <section>
      <h1>Ship Faster with Modern Tools</h1>
      <p>Build your next project</p>
    </section>
  );
}
```

**Into this**:
```tsx
import type { Hero_6_Block } from "~/payload-types";

export * from "./config";  // Export config

export default function HeroSection(props: Hero_6_Block) {
  return (
    <section>
      <h1>{props.header}</h1>
      <p>{props.subheader}</p>
    </section>
  );
}
```

## Step-by-Step Transformation

### Step 1: Move Component to Correct Location

**From**: `components/ui/hero-section.tsx` (temporary location)
**To**: `src/payload/blocks/Hero/Hero_6/index.tsx`

**Directory Structure**:
```
src/payload/blocks/Hero/Hero_6/
├── config.ts          (Already created)
└── index.tsx          (Create this now)
```

**Create Component File**:

```bash
# If using Bash tool:
mkdir -p src/payload/blocks/Hero/Hero_6
# Then use Write tool to create index.tsx
```

### Step 2: Add Type Import and Props

**Import the generated type**:

```typescript
import type { Hero_6_Block } from "~/payload-types";
```

**Add props parameter**:

```typescript
// BEFORE (no props):
export default function HeroSection() {

// AFTER (with props):
export default function HeroSection(props: Hero_6_Block) {
```

**Type Safety**: The `Hero_6_Block` type was auto-generated from your config and includes all fields you defined.

### Step 3: Export Config (Server Components Only)

**If component is a server component** (no "use client"):

```typescript
// Add this at the top of the file, after imports
export * from "./config";

export default function HeroSection(props: Hero_6_Block) {
  // Component code...
}
```

**If component is a client component** (has "use client"):

```typescript
"use client";

// DO NOT add: export * from "./config"
// Client components cannot export server code

export default function HeroSection(props: Hero_6_Block) {
  // Component code...
}
```

**Why This Matters**:
- Server components can export both component and config
- Client components can only export the component
- Config registration happens separately for client components

### Step 4: Transform Hardcoded Content to Props

Replace all hardcoded content with props from the config.

#### Text Content

**Before**:
```tsx
<h1>Ship Faster with Modern Tools</h1>
<p>Build your next project with confidence</p>
```

**After**:
```tsx
<h1>{props.header}</h1>
<p>{props.subheader}</p>
```

#### Optional Content

**Before**:
```tsx
<Badge>New Release</Badge>
```

**After**:
```tsx
{props.badge && <Badge>{props.badge}</Badge>}
```

**Pattern**: Use conditional rendering for optional fields

#### Arrays - CTA Buttons

**Before**:
```tsx
<div className="flex gap-4">
  <Button>Get Started</Button>
  <Button variant="outline">Learn More</Button>
</div>
```

**After**:
```tsx
<div className="flex gap-4">
  {(props.actions ?? []).map((action, index) => (
    <Button
      key={`hero_6_action_${index}`}
      variant={index === 0 ? "default" : "outline"}
      asChild
    >
      <Link href={action.href ?? "/"}>
        {action.label ?? "Learn More"}
      </Link>
    </Button>
  ))}
</div>
```

**Key Patterns**:
- `?? []`: Default to empty array if null/undefined
- `key`: Unique key using block slug + index
- `?? "default"`: Fallback values for optional fields
- `asChild`: Use with Link component for proper navigation

#### Arrays - Feature Lists

**Before**:
```tsx
const features = [
  { icon: Zap, title: "Fast", desc: "Lightning quick" },
  { icon: Shield, title: "Secure", desc: "Bank-level security" },
];

{features.map((feature, i) => (
  <div key={i}>
    <feature.icon className="w-8 h-8" />
    <h3>{feature.title}</h3>
    <p>{feature.desc}</p>
  </div>
))}
```

**After**:
```tsx
{(props.features ?? []).map((feature, index) => {
  // Get icon component from lucide-react
  const IconComponent = feature.icon
    ? Icons[feature.icon as keyof typeof Icons]
    : Icons.Circle;

  return (
    <div key={`hero_6_feature_${index}`}>
      <IconComponent className="w-8 h-8" />
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
})}
```

**Icon Handling**: See "Icon Field Transformation" section below

#### Arrays - Nested Objects

**Before**:
```tsx
const testimonials = [
  {
    author: { name: "John Doe", title: "CEO", avatar: "/avatar.jpg" },
    quote: "Amazing product!",
    rating: 5,
  },
];

{testimonials.map((t, i) => (
  <div key={i}>
    <img src={t.author.avatar} alt={t.author.name} />
    <div>{t.author.name} - {t.author.title}</div>
    <p>{t.quote}</p>
    <div>{"⭐".repeat(t.rating)}</div>
  </div>
))}
```

**After**:
```tsx
{(props.testimonials ?? []).map((testimonial, index) => (
  <div key={`hero_6_testimonial_${index}`}>
    {testimonial.author?.avatar && (
      <img
        src={testimonial.author.avatar}
        alt={testimonial.author.name ?? "Author"}
      />
    )}
    <div>
      {testimonial.author?.name ?? "Anonymous"} - {testimonial.author?.title}
    </div>
    <p>{testimonial.quote}</p>
    <div>{"⭐".repeat(testimonial.rating ?? 5)}</div>
  </div>
))}
```

**Pattern**: Use optional chaining (`?.`) for nested optional fields

#### Images - Media Field

**Before**:
```tsx
<img src="/hero-image.png" alt="Hero" />
```

**After**:
```tsx
{props.media?.light && (
  <img
    src={typeof props.media.light === 'string'
      ? props.media.light
      : props.media.light.url}
    alt={props.header ?? "Hero image"}
    className="dark:hidden"
  />
)}
{props.media?.dark && (
  <img
    src={typeof props.media.dark === 'string'
      ? props.media.dark
      : props.media.dark.url}
    alt={props.header ?? "Hero image"}
    className="hidden dark:block"
  />
)}
```

**Pattern**: Media fields support light/dark themes

**With Next.js Image**:
```tsx
import Image from "next/image";

{props.media?.light && (
  <Image
    src={typeof props.media.light === 'string'
      ? props.media.light
      : props.media.light.url}
    alt={props.header ?? "Hero image"}
    width={600}
    height={400}
    className="dark:hidden"
  />
)}
```

#### Images - Single Upload Field

**Before**:
```tsx
<img src="/logo.png" alt="Logo" />
```

**After**:
```tsx
{props.logo && (
  <img
    src={typeof props.logo === 'string'
      ? props.logo
      : props.logo.url}
    alt="Logo"
  />
)}
```

### Step 5: Transform Import Paths

Change all import paths to use project aliases:

**Before** (IntentUI/shadcn imports):
```typescript
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
```

**After** (UIFoundry imports):
```typescript
import { Button } from "~/ui/button";
import { Badge } from "~/ui/badge";
import { cn } from "~/lib/utils";
```

**Import Mapping**:
| Original | UIFoundry |
|----------|-----------|
| `@/components/ui/*` | `~/ui/*` |
| `@/lib/*` | `~/lib/*` |
| `@/components/*` | Check if exists in `~/components/*` |

**Icon Imports** (keep as-is):
```typescript
import { ChevronRight, Zap, Shield } from "lucide-react";
// No change needed
```

### Step 6: Handle Icon Fields

Icon fields store the icon name as a string, not the component.

**Setup Icons Helper**:

Check if project has an icons helper (usually `~/lib/icons.ts` or similar):

```typescript
// If icons helper exists:
import { Icons } from "~/lib/icons";

// Usage:
const IconComponent = Icons[props.icon as keyof typeof Icons];
```

**If no icons helper exists, create inline mapping**:

```typescript
import * as LucideIcons from "lucide-react";

// In component:
const feature = props.features?.[0];
const IconComponent = feature?.icon
  ? LucideIcons[feature.icon as keyof typeof LucideIcons] ?? LucideIcons.Circle
  : LucideIcons.Circle;

<IconComponent className="w-6 h-6" />
```

**Complete Example**:

```tsx
{(props.features ?? []).map((feature, index) => {
  const IconComponent = feature.icon
    ? LucideIcons[feature.icon as keyof typeof LucideIcons] ?? LucideIcons.Circle
    : LucideIcons.Circle;

  return (
    <div key={`hero_6_feature_${index}`}>
      <IconComponent className="w-8 h-8" />
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
})}
```

### Step 7: Handle Conditional Logic

Transform hardcoded conditionals to use props:

**Before**:
```tsx
const showBadge = true;
{showBadge && <Badge>New</Badge>}
```

**After**:
```tsx
{props.showBadge && props.badge && <Badge>{props.badge}</Badge>}
```

**Select Field Conditionals**:

**Before**:
```tsx
const layout = "grid";
{layout === "grid" && <GridLayout />}
{layout === "list" && <ListLayout />}
```

**After**:
```tsx
{props.layout === "grid" && <GridLayout />}
{props.layout === "list" && <ListLayout />}
```

### Step 8: Remove All Hardcoded Data

Ensure no hardcoded content remains:

**Check for**:
- [ ] Hardcoded strings in JSX
- [ ] Hardcoded arrays/objects
- [ ] Hardcoded image paths
- [ ] Hardcoded URLs
- [ ] Hardcoded boolean values
- [ ] Hardcoded style values (unless they're fixed design)

**Keep**:
- [x] Styling classes (e.g., `className="text-4xl font-bold"`)
- [x] Layout structure (e.g., `grid grid-cols-2 gap-8`)
- [x] Animation configurations
- [x] Event handlers (onClick, etc.)
- [x] Component logic (state, effects)

### Step 9: Add Fallback Values

Always provide fallback values for optional content:

```tsx
// Good:
<h1>{props.header ?? "Welcome"}</h1>
<img src={props.logo ?? "/default-logo.png"} alt="Logo" />

// Also good (for required fields):
<h1>{props.header}</h1>  // No fallback needed if required: true
```

**Fallback Strategies**:

1. **Empty strings** (for optional text):
   ```tsx
   <p>{props.description ?? ""}</p>
   ```

2. **Default content** (for important fields):
   ```tsx
   <h1>{props.header ?? "Welcome to our platform"}</h1>
   ```

3. **Hide element** (for optional features):
   ```tsx
   {props.badge && <Badge>{props.badge}</Badge>}
   ```

4. **Default arrays** (for lists):
   ```tsx
   {(props.items ?? []).map(...)}
   ```

### Step 10: Preserve Client-Side Features

If the original component had interactive features, keep them:

**State**:
```tsx
"use client";  // Keep this!

const [activeTab, setActiveTab] = useState(0);
const [isOpen, setIsOpen] = useState(false);

// Use props for content, state for interactions
```

**Effects**:
```tsx
"use client";

useEffect(() => {
  // Keep effects for animations, scroll handlers, etc.
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Event Handlers**:
```tsx
"use client";

const handleClick = () => {
  // Keep click handlers
  setIsOpen(!isOpen);
};

// But use props for content:
<Button onClick={handleClick}>
  {props.buttonText ?? "Click me"}
</Button>
```

**Animation Libraries**:
```tsx
"use client";

import { motion } from "framer-motion";

// Keep animations, use props for content:
<motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {props.header}
</motion.h1>
```

## Complete Transformation Examples

### Example 1: Simple Server Component

**Before** (hardcoded):
```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="py-20">
      <Badge>New Release</Badge>
      <h1>Ship Faster</h1>
      <p>Build with confidence</p>
      <Button>Get Started</Button>
    </section>
  );
}
```

**After** (props-based):
```tsx
import Link from "next/link";
import type { Hero_6_Block } from "~/payload-types";
import { Badge } from "~/ui/badge";
import { Button } from "~/ui/button";

export * from "./config";  // Export config

export default function HeroSection(props: Hero_6_Block) {
  return (
    <section className="py-20">
      {props.badge && <Badge>{props.badge}</Badge>}
      <h1>{props.header}</h1>
      <p>{props.subheader}</p>
      {(props.actions ?? []).map((action, index) => (
        <Button key={`hero_6_action_${index}`} asChild>
          <Link href={action.href ?? "/"}>
            {action.label ?? "Get Started"}
          </Link>
        </Button>
      ))}
    </section>
  );
}
```

### Example 2: Complex Client Component

**Before** (hardcoded):
```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    { icon: Zap, title: "Fast", desc: "Lightning quick" },
    { icon: Shield, title: "Secure", desc: "Bank-level security" },
    { icon: Check, title: "Reliable", desc: "99.9% uptime" },
  ];

  return (
    <section>
      <h2>Our Features</h2>
      <p>Everything you need</p>

      <div className="grid grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <f.icon className="w-8 h-8" />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <Button>Learn More</Button>
    </section>
  );
}
```

**After** (props-based):
```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Features_4_Block } from "~/payload-types";
import { Button } from "~/ui/button";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

// NO: export * from "./config";  ← Client component!

export default function FeaturesSection(props: Features_4_Block) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section>
      <h2>{props.header}</h2>
      <p>{props.subheader}</p>

      <div className="grid grid-cols-3 gap-8">
        {(props.features ?? []).map((feature, index) => {
          const IconComponent = feature.icon
            ? LucideIcons[feature.icon as keyof typeof LucideIcons] ?? LucideIcons.Circle
            : LucideIcons.Circle;

          return (
            <motion.div
              key={`features_4_feature_${index}`}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <IconComponent className="w-8 h-8" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      {(props.actions ?? []).map((action, index) => (
        <Button key={`features_4_action_${index}`} asChild>
          <Link href={action.href ?? "/"}>
            {action.label ?? "Learn More"}
          </Link>
        </Button>
      ))}
    </section>
  );
}
```

## Validation Checklist

Before considering the transformation complete:

### Content Validation
- [ ] All hardcoded text replaced with props
- [ ] All hardcoded images replaced with props
- [ ] All hardcoded arrays replaced with props
- [ ] All hardcoded URLs replaced with props
- [ ] All optional content has conditional rendering
- [ ] All arrays have fallback to empty array (`?? []`)
- [ ] All optional fields have fallbacks or conditionals

### Type Validation
- [ ] Component has type import: `import type { [Block]_Block } from "~/payload-types"`
- [ ] Component accepts props: `(props: [Block]_Block)`
- [ ] All prop accesses match generated type structure

### Import Validation
- [ ] All `@/components/ui/*` changed to `~/ui/*`
- [ ] All `@/lib/*` changed to `~/lib/*`
- [ ] Icon imports remain from `lucide-react`
- [ ] No broken import paths

### Export Validation
- [ ] Server components export config: `export * from "./config"`
- [ ] Client components do NOT export config
- [ ] Component has default export

### Functional Validation
- [ ] Component preserves all original styling
- [ ] Component preserves all original interactions
- [ ] Component preserves all animations
- [ ] Arrays render correctly with map
- [ ] Conditional content renders correctly
- [ ] Links work with Next.js Link component
- [ ] Images load correctly

### Best Practices
- [ ] Unique keys on all mapped elements
- [ ] Proper fallback values for optional fields
- [ ] Optional chaining for nested optional fields
- [ ] Alt text on images uses meaningful prop or fallback
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Component follows existing project patterns

## Common Transformation Mistakes

### Mistake 1: Missing Fallback for Arrays

```tsx
// WRONG:
{props.items.map(...)}  // Error if items is null!

// CORRECT:
{(props.items ?? []).map(...)}
```

### Mistake 2: Incorrect Key in Map

```tsx
// WRONG:
{props.items?.map((item, i) => <div key={i}>...)}  // Non-unique keys

// CORRECT:
{(props.items ?? []).map((item, index) => (
  <div key={`hero_6_item_${index}`}>...</div>
))}
```

### Mistake 3: Forgetting Optional Chaining

```tsx
// WRONG:
<img src={props.media.light.url} />  // Error if media is null!

// CORRECT:
{props.media?.light && (
  <img src={typeof props.media.light === 'string'
    ? props.media.light
    : props.media.light.url}
  />
)}
```

### Mistake 4: Wrong Icon Handling

```tsx
// WRONG:
<props.icon className="w-6 h-6" />  // icon is a string, not component!

// CORRECT:
const IconComponent = LucideIcons[props.icon as keyof typeof LucideIcons];
<IconComponent className="w-6 h-6" />
```

### Mistake 5: Client Component Exports Config

```tsx
// WRONG:
"use client";
export * from "./config";  // Error! Can't export server code from client!

// CORRECT:
"use client";
// Don't export config from client components
```

## Testing the Transformed Component

After transformation, verify the component works:

1. **Type Check**: Run `pnpm typecheck` - no errors
2. **Visual Check**: View in browser - looks correct
3. **Admin Check**: Edit in PayloadCMS admin - fields appear
4. **Functionality Check**: All interactions work
5. **Responsive Check**: Works on mobile/tablet/desktop

## Next Steps

After transforming the component:

1. **Register the Block**: See [05-registering-blocks.md](./05-registering-blocks.md)
2. **Test in Browser**: Verify component renders correctly
3. **Test in Admin**: Create/edit block in PayloadCMS admin panel

---

**Next Guide**: [05-registering-blocks.md](./05-registering-blocks.md)
