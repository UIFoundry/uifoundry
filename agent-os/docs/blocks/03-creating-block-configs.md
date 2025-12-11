# Creating PayloadCMS Block Configs

## Overview

This guide covers how to create the PayloadCMS block configuration file (`config.ts`) based on your content analysis. The block config defines the schema that generates the admin panel UI and TypeScript types.

## Prerequisites

Before creating the config:

- [ ] Completed content analysis (see [02-analyzing-block-source.md](./02-analyzing-block-source.md))
- [ ] Identified all content fields
- [ ] Determined component type (client/server)
- [ ] Documented field types and helpers

## Block Config Structure

Every block config follows this pattern:

```typescript
import type { Block } from "payload";
import { BLOCK_GROUP_[TYPE], BLOCK_SLUG_[TYPE]_[N] } from "~/payload/constants/blocks";
// Import field helpers
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";
// ... other field helpers

export const [BlockName]_Block: Block = {
  slug: BLOCK_SLUG_[TYPE]_[N],
  admin: {
    group: BLOCK_GROUP_[TYPE],
  },
  fields: [
    // Field definitions go here
  ],
  interfaceName: "[BlockName]_Block",
  labels: {
    plural: "[Block Display Names]",
    singular: "[Block Display Name]",
  },
};
```

## Step-by-Step Config Creation

### Step 1: Add Constants First

Before creating the config, add constants to the constants file:

**File**: `src/payload/constants/blocks.ts`

```typescript
// Add to appropriate section or create new section

// [Block Type] - e.g., Hero, Features, etc.
export const BLOCK_GROUP_[TYPE] = "[Type]" as const;
export const BLOCK_SLUG_[TYPE]_[N] = "[type]_[n]" as const;

// Example for Hero 6:
export const BLOCK_GROUP_HERO = "Hero" as const;
export const BLOCK_SLUG_HERO_6 = "hero_6" as const;
```

**Naming Rules**:
- Group constant: PascalCase in value (e.g., "Hero", "CallToAction")
- Slug constant: snake_case in value (e.g., "hero_6", "call_to_action_1")
- Constant names: SCREAMING_SNAKE_CASE (e.g., `BLOCK_SLUG_HERO_6`)

### Step 2: Create Config File Structure

**Location**: `src/payload/blocks/[BlockType]/[BlockType]_[N]/config.ts`

**Example**: For Hero 6, create `src/payload/blocks/Hero/Hero_6/config.ts`

Start with the imports:

```typescript
import type { Block } from "payload";
import { BLOCK_GROUP_HERO, BLOCK_SLUG_HERO_6 } from "~/payload/constants/blocks";
```

### Step 3: Import Field Helpers

Based on your content analysis, import the required field helpers:

```typescript
// Common field helpers
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";
import descriptionField from "~/payload/fields/description/config";
import mediaField from "~/payload/fields/media/config";
import uploadField from "~/payload/fields/upload/config";
import callToActionPair from "~/payload/fields/callToActionPair/config";
import iconField from "~/payload/fields/icon/config";
import colorField from "~/payload/fields/color/config";
import socialLinksField from "~/payload/fields/socialLinks/config";
```

**Available Field Helpers**:

Use Glob to find all available helpers:

```bash
# Pattern: "src/payload/fields/**/config.ts"
```

Common helpers include:
- `headerField()` - Main heading text
- `subheaderField()` - Secondary text
- `descriptionField()` - Long-form text
- `mediaField()` - Image with light/dark variants
- `uploadField()` - Single file upload
- `callToActionPair()` - Array of CTA buttons
- `iconField()` - Icon selector
- `colorField()` - Color picker
- `socialLinksField()` - Social media links

### Step 4: Define the Block Object

```typescript
export const Hero_6_Block: Block = {
  slug: BLOCK_SLUG_HERO_6,
  admin: {
    group: BLOCK_GROUP_HERO,
  },
  fields: [
    // Fields will be added in next step
  ],
  interfaceName: "Hero_6_Block",
  labels: {
    plural: "Hero 6's",
    singular: "Hero 6",
  },
};
```

**Naming Rules**:
- Export name: `[BlockType]_[N]_Block` (e.g., `Hero_6_Block`)
- Interface name: Same as export name (e.g., `"Hero_6_Block"`)
- Labels: User-friendly names (e.g., "Hero 6", "Hero 6's")

### Step 5: Add Fields

Add fields based on your content analysis. Field order matters - it determines the order in the admin UI.

#### Using Field Helpers

**Simple Fields**:

```typescript
fields: [
  headerField({
    defaultValue: "Ship Faster with Modern Tools",
  }),
  subheaderField({
    defaultValue: "Build your next project with confidence",
  }),
]
```

**Customized Fields**:

```typescript
fields: [
  headerField({
    name: "mainHeading",        // Custom field name
    label: "Main Heading",       // Custom label in admin
    required: true,
    defaultValue: "Welcome",
  }),
  callToActionPair({
    maxRows: 3,                  // Maximum 3 CTAs
    minRows: 0,                  // Can delete all
    defaultValue: [
      { label: "Get Started", href: "/" },
      { label: "Learn More", href: "/docs" },
    ],
  }),
]
```

**Media Fields**:

```typescript
fields: [
  mediaField({
    name: "heroImage",
    label: "Hero Image",
    // Supports light/dark theme variants
  }),
  // Or single upload:
  uploadField({
    name: "logo",
    label: "Logo",
  }),
]
```

#### Custom Fields (No Helper Available)

**Text Field**:

```typescript
{
  name: "badge",
  type: "text",
  label: "Badge Text",
  required: false,
  defaultValue: "New",
}
```

**Textarea Field**:

```typescript
{
  name: "longDescription",
  type: "textarea",
  label: "Long Description",
  required: false,
}
```

**Checkbox Field**:

```typescript
{
  name: "showBadge",
  type: "checkbox",
  label: "Show Badge",
  defaultValue: true,
}
```

**Select Field**:

```typescript
{
  name: "layout",
  type: "select",
  label: "Layout",
  options: [
    { label: "Grid", value: "grid" },
    { label: "List", value: "list" },
    { label: "Carousel", value: "carousel" },
  ],
  defaultValue: "grid",
}
```

**Number Field**:

```typescript
{
  name: "columns",
  type: "number",
  label: "Number of Columns",
  min: 1,
  max: 4,
  defaultValue: 3,
}
```

#### Array Fields (Repeatable Content)

**CRITICAL**: Always set `minRows: 0` and `maxRows` on array fields!

**Simple Array**:

```typescript
{
  name: "features",
  type: "array",
  label: "Features",
  minRows: 0,                    // REQUIRED
  maxRows: 6,                    // REQUIRED
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
  ],
}
```

**Array with Icon Field**:

```typescript
{
  name: "features",
  type: "array",
  label: "Features",
  minRows: 0,
  maxRows: 6,
  fields: [
    iconField({
      required: true,
    }),
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
}
```

**Array with Nested Group**:

```typescript
{
  name: "testimonials",
  type: "array",
  label: "Testimonials",
  minRows: 0,
  maxRows: 10,
  fields: [
    {
      name: "author",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "title",
          type: "text",
        },
        uploadField({
          name: "avatar",
          label: "Avatar Image",
        }),
      ],
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
    },
  ],
}
```

#### Group Fields (Collapsible Sections)

Use groups to organize related fields:

```typescript
{
  name: "callToAction",
  type: "group",
  label: "Call to Action",
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "buttonText",
      type: "text",
    },
    {
      name: "buttonHref",
      type: "text",
    },
  ],
}
```

**Admin UI Organization**:

```typescript
{
  name: "settings",
  type: "group",
  label: "Settings",
  admin: {
    description: "Configure block behavior",
  },
  fields: [
    {
      name: "showAnimation",
      type: "checkbox",
    },
    {
      name: "animationDelay",
      type: "number",
      admin: {
        condition: (data) => data.showAnimation === true,  // Conditional visibility
      },
    },
  ],
}
```

### Step 6: Add Default Values

Set sensible defaults for all fields:

**Why Default Values Matter**:
1. Provides example content for users
2. Prevents empty blocks in admin UI
3. Shows expected format
4. Helps with testing

**Best Practices**:

```typescript
headerField({
  defaultValue: "Descriptive Example That Shows Purpose",  // Good
  // NOT: defaultValue: "Header"  // Bad - too generic
}),

callToActionPair({
  defaultValue: [
    { label: "Get Started", href: "/" },
    { label: "Learn More", href: "/docs" },
  ],
  // Shows users the expected structure
}),

{
  name: "features",
  type: "array",
  defaultValue: [
    {
      icon: "Zap",
      title: "Fast Performance",
      description: "Lightning quick load times",
    },
    {
      icon: "Shield",
      title: "Secure",
      description: "Bank-level security",
    },
  ],
  // Provides 2 example items
}
```

### Step 7: Validate Config Structure

Before saving, verify:

#### Validation Checklist

- [ ] All constants are imported from `~/payload/constants/blocks`
- [ ] All field helpers are imported
- [ ] Slug matches constant value
- [ ] Interface name follows naming convention
- [ ] All array fields have `minRows: 0` and `maxRows`
- [ ] All fields have appropriate default values
- [ ] Field names are camelCase
- [ ] No duplicate field names
- [ ] Export statement is present: `export const [Name]_Block`

#### Common Mistakes

**Mistake 1**: Missing minRows on array field

```typescript
// WRONG:
{
  name: "items",
  type: "array",
  fields: [...]
}

// CORRECT:
{
  name: "items",
  type: "array",
  minRows: 0,      // Add this!
  maxRows: 10,     // Add this!
  fields: [...]
}
```

**Mistake 2**: Inconsistent naming

```typescript
// WRONG:
export const Hero6Block: Block = {  // Missing underscore
  slug: BLOCK_SLUG_HERO_6,
  interfaceName: "HeroSixBlock",    // Inconsistent
}

// CORRECT:
export const Hero_6_Block: Block = {
  slug: BLOCK_SLUG_HERO_6,
  interfaceName: "Hero_6_Block",
}
```

**Mistake 3**: Missing required imports

```typescript
// WRONG:
import { Block } from "payload";  // Missing 'type'

// CORRECT:
import type { Block } from "payload";  // Type-only import
```

**Mistake 4**: Incorrect path to helpers

```typescript
// WRONG:
import headerField from "../../../fields/header/config";

// CORRECT:
import headerField from "~/payload/fields/header/config";  // Use alias
```

## Complete Config Examples

### Example 1: Simple Hero Block

```typescript
import type { Block } from "payload";
import { BLOCK_GROUP_HERO, BLOCK_SLUG_HERO_6 } from "~/payload/constants/blocks";
import callToActionPair from "~/payload/fields/callToActionPair/config";
import headerField from "~/payload/fields/header/config";
import mediaField from "~/payload/fields/media/config";
import subheaderField from "~/payload/fields/subheader/config";

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
      defaultValue: "Build your next project with confidence using battle-tested components",
    }),
    callToActionPair({
      defaultValue: [
        { label: "Get Started", href: "/" },
        { label: "Learn More", href: "/docs" },
      ],
      maxRows: 2,
      minRows: 0,
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

### Example 2: Complex Features Block

```typescript
import type { Block } from "payload";
import { BLOCK_GROUP_FEATURES, BLOCK_SLUG_FEATURES_4 } from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import iconField from "~/payload/fields/icon/config";
import subheaderField from "~/payload/fields/subheader/config";

export const Features_4_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_4,
  admin: {
    group: BLOCK_GROUP_FEATURES,
  },
  fields: [
    headerField({
      defaultValue: "Everything You Need to Succeed",
    }),
    subheaderField({
      defaultValue: "Powerful features to help you build faster",
    }),
    {
      name: "features",
      type: "array",
      label: "Features",
      minRows: 0,
      maxRows: 6,
      fields: [
        iconField({
          required: true,
        }),
        {
          name: "title",
          type: "text",
          label: "Feature Title",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Feature Description",
        },
        {
          name: "link",
          type: "group",
          label: "Optional Link",
          fields: [
            {
              name: "text",
              type: "text",
              label: "Link Text",
            },
            {
              name: "href",
              type: "text",
              label: "Link URL",
            },
          ],
        },
      ],
      defaultValue: [
        {
          icon: "Zap",
          title: "Lightning Fast",
          description: "Optimized for speed and performance",
          link: {
            text: "Learn more",
            href: "/performance",
          },
        },
        {
          icon: "Shield",
          title: "Secure by Default",
          description: "Built with security best practices",
          link: {
            text: "View security",
            href: "/security",
          },
        },
      ],
    },
  ],
  interfaceName: "Features_4_Block",
  labels: {
    plural: "Features 4's",
    singular: "Features 4",
  },
};
```

## Field Helper Reference

### When to Use Each Helper

| Helper | Use Case | Returns |
|--------|----------|---------|
| `headerField()` | Main headings (h1, h2) | TextField |
| `subheaderField()` | Supporting text under headers | TextField |
| `descriptionField()` | Long-form content | TextareaField |
| `mediaField()` | Images with light/dark themes | GroupField with 2 uploads |
| `uploadField()` | Single file uploads | UploadField |
| `callToActionPair()` | CTA buttons array | ArrayField with label+href |
| `iconField()` | Icon selection | TextField (icon name) |
| `colorField()` | Color customization | TextField (hex color) |
| `socialLinksField()` | Social media links array | ArrayField with platform+url |

### Helper Customization Options

All helpers accept props to override defaults:

```typescript
headerField({
  name: "customName",              // Override field name
  label: "Custom Label",           // Override admin label
  required: false,                 // Override required status
  defaultValue: "Custom Default",  // Override default value
  admin: {
    description: "Help text",      // Add admin description
  },
})
```

## Type Generation

After creating the config, PayloadCMS will auto-generate TypeScript types.

**Run Type Generation**:

```bash
pnpm payload:types
```

This creates `~/payload-types.ts` with your block interface:

```typescript
export interface Hero_6_Block {
  badge?: string | null;
  header: string;
  subheader: string;
  actions?: {
    label?: string | null;
    href?: string | null;
  }[] | null;
  media?: {
    light?: string | Media | null;
    dark?: string | Media | null;
  } | null;
  blockType: 'hero_6';
  id?: string | null;
}
```

**Important**: Never write these types manually - they're auto-generated from your config!

## Next Steps

After creating the config:

1. **Add Constants**: Ensure constants are in `src/payload/constants/blocks.ts`
2. **Generate Types**: Run `pnpm payload:types`
3. **Create Component**: See [04-transforming-block-components.md](./04-transforming-block-components.md)

## Troubleshooting

### Type Generation Fails

**Error**: `Cannot find slug 'hero_6'`

**Solution**: Check that:
1. Config is exported: `export const Hero_6_Block`
2. Slug constant exists in constants file
3. Config is registered (see [05-registering-blocks.md](./05-registering-blocks.md))

### Admin UI Not Showing Block

**Error**: Block doesn't appear in admin panel

**Solution**: Check that:
1. Block is added to blocks array in `src/payload/blocks/index.tsx`
2. Config slug is unique (no duplicates)
3. PayloadCMS server is restarted

### Array Field Can't Delete Items

**Error**: Users can't delete the last item in array

**Solution**: Add `minRows: 0` to array field config

---

**Next Guide**: [04-transforming-block-components.md](./04-transforming-block-components.md)
