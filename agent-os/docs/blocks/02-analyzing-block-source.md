# Analyzing Block Source & Extracting Content Components

## Overview

This guide covers how to analyze an installed block component to identify what content should be made editable in the PayloadCMS admin panel. This is the most critical step in the block creation process.

## Core Principle

**Goal**: Transform hardcoded content into configurable fields that users can edit in the PayloadCMS admin panel.

**Rule**: If content appears in the UI and a user might want to change it, it should be a field in the block config.

## Content Identification Process

### Step 1: Read the Component Source

Open the installed component and read through the entire JSX structure:

```bash
# Use Read tool to examine the component
Read file_path: "components/ui/[block-name].tsx"
```

### Step 2: Identify Content Types

As you read, categorize every piece of content:

#### Text Content

**Headings** (h1, h2, h3, h4, h5, h6):
```tsx
<h1>Ship Faster with Modern Tools</h1>
```
**Analysis**: Main heading text
**Field Type**: `headerField()` or text field
**Field Name**: `header`

**Subheadings/Paragraphs** (p, span with descriptive text):
```tsx
<p>Build your next project with confidence using battle-tested components</p>
```
**Analysis**: Supporting text
**Field Type**: `subheaderField()` or textarea
**Field Name**: `subheader` or `description`

**Small Text** (labels, captions, badges):
```tsx
<Badge>New</Badge>
<span className="text-sm">Starting at $99/mo</span>
```
**Analysis**: Small accent text
**Field Type**: text field
**Field Name**: `badge`, `label`, `caption`, etc.

#### Interactive Content

**Call-to-Action Buttons**:
```tsx
<Button>
  Get Started
  <ChevronRight className="ml-2" />
</Button>
<Button variant="outline">Learn More</Button>
```
**Analysis**: Action buttons with labels and links
**Field Type**: `callToActionPair()` or array of CTAs
**Field Name**: `actions` or `buttons`
**Structure**: `{ label: string, href: string, variant?: string }`

**Links**:
```tsx
<Link href="/docs">Documentation</Link>
```
**Analysis**: Navigation links
**Field Type**: array field with label + href
**Field Name**: `links`

#### Media Content

**Images**:
```tsx
<img src="/hero-image.png" alt="Product dashboard" />
// or
<Image src={heroImage} alt="Dashboard" width={600} height={400} />
```
**Analysis**: Images that should be uploadable
**Field Type**: `mediaField()` (supports light/dark themes)
**Field Name**: `media`, `image`, `heroImage`, etc.

**Background Images**:
```tsx
<div style={{ backgroundImage: `url(${bgImage})` }}>
```
**Analysis**: Background images
**Field Type**: `uploadField()` or `mediaField()`
**Field Name**: `backgroundImage`, `bgImage`

#### List Content

**Feature Lists**:
```tsx
{features.map((feature) => (
  <div key={feature.id}>
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
  </div>
))}
```
**Analysis**: Repeating content with structure
**Field Type**: array field with nested fields
**Field Name**: `features` or `items`
**Structure**:
```typescript
{
  name: "features",
  type: "array",
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
  ],
}
```

**Icon Lists**:
```tsx
{features.map((f) => (
  <div>
    <CheckCircle className="w-5 h-5" />
    <span>{f.text}</span>
  </div>
))}
```
**Analysis**: List with icons
**Field Type**: array with `iconField()` + text
**Field Name**: `features`, `benefits`, `items`

#### Styling Content

**Colors**:
```tsx
<div className="bg-blue-500">
// or
<div style={{ backgroundColor: primaryColor }}>
```
**Analysis**: Customizable colors
**Field Type**: `colorField()`
**Field Name**: `primaryColor`, `accentColor`, etc.
**Note**: Only add if block explicitly needs color customization

**Layout Options**:
```tsx
{layout === 'grid' ? <GridLayout /> : <ListLayout />}
```
**Analysis**: Layout variants
**Field Type**: select field
**Field Name**: `layout`
**Options**: `['grid', 'list', 'carousel']`

### Step 3: Identify Content Patterns

Look for common patterns that indicate content structure:

#### Pattern 1: Hardcoded Arrays

```tsx
const features = [
  { title: "Fast", desc: "Lightning quick" },
  { title: "Secure", desc: "Bank-level security" },
  { title: "Reliable", desc: "99.9% uptime" },
];
```
**Analysis**: This should be an array field in the config
**Action**: Convert to PayloadCMS array field

#### Pattern 2: Conditional Content

```tsx
{showBadge && <Badge>New Feature</Badge>}
```
**Analysis**: Optional content controlled by boolean
**Field Type**: checkbox field
**Field Name**: `showBadge`

#### Pattern 3: Nested Components

```tsx
<Card>
  <CardHeader>{title}</CardHeader>
  <CardContent>{content}</CardContent>
  <CardFooter>
    <Button>{cta}</Button>
  </CardFooter>
</Card>
```
**Analysis**: Group of related fields
**Field Type**: group field or nested fields
**Structure**:
```typescript
{
  name: "card",
  type: "group",
  fields: [
    { name: "title", type: "text" },
    { name: "content", type: "textarea" },
    { name: "cta", type: "text" },
  ],
}
```

#### Pattern 4: Dynamic Data

```tsx
// Data fetched from API or props
const stats = await fetchStats();

{stats.map(stat => (
  <div>
    <div className="text-4xl">{stat.value}</div>
    <div>{stat.label}</div>
  </div>
))}
```
**Analysis**: Dynamic data that changes
**Action**: Make it configurable via array field
**Note**: Remove API fetching - data should come from config

### Step 4: Create Content Analysis Document

Create a structured document listing all identified fields:

```markdown
# Content Analysis: [Block Name]

## Component: components/ui/hero-section.tsx

### Text Fields

1. **Header** (Main heading)
   - Current value: "Ship Faster with Modern Tools"
   - Type: text
   - Required: yes
   - Field helper: `headerField()`
   - Prop name: `header`

2. **Subheader** (Supporting text)
   - Current value: "Build your next project with confidence..."
   - Type: textarea
   - Required: yes
   - Field helper: `subheaderField()`
   - Prop name: `subheader`

3. **Badge** (Small label)
   - Current value: "New"
   - Type: text
   - Required: no
   - Field helper: custom text field
   - Prop name: `badge`

### Array Fields

4. **Actions** (CTA buttons)
   - Current value: [
       { label: "Get Started", href: "/signup" },
       { label: "Learn More", href: "/docs" }
     ]
   - Type: array
   - Structure: { label: string, href: string }
   - Min rows: 0
   - Max rows: 2
   - Field helper: `callToActionPair()`
   - Prop name: `actions`

5. **Features** (Feature list)
   - Current value: [
       { icon: "Zap", title: "Fast", description: "..." },
       { icon: "Shield", title: "Secure", description: "..." },
       { icon: "Check", title: "Reliable", description: "..." }
     ]
   - Type: array
   - Structure: { icon: string, title: string, description: string }
   - Min rows: 0
   - Max rows: 6
   - Field helper: custom array with `iconField()`
   - Prop name: `features`

### Media Fields

6. **Hero Image**
   - Current value: "/hero.png"
   - Type: upload (with light/dark variants)
   - Required: no
   - Field helper: `mediaField()`
   - Prop name: `media`

### Boolean Fields

7. **Show Badge**
   - Current value: true
   - Type: checkbox
   - Required: no
   - Default: true
   - Field helper: custom checkbox
   - Prop name: `showBadge`

## Total Fields: 7

## Component Type: Server Component
- No "use client" needed
- No React hooks (useState, useEffect)
- No event handlers
- Pure rendering component

## Dependencies to Preserve:
- lucide-react icons (Zap, Shield, Check, ChevronRight)
- Button component → ~/ui/button
- Badge component → ~/ui/badge
- cn utility → ~/lib/utils

## Import Transformations Needed:
- @/components/ui/button → ~/ui/button
- @/components/ui/badge → ~/ui/badge
- @/lib/utils → ~/lib/utils
```

## Field Naming Conventions

Follow consistent naming patterns:

| Content Type | Field Name | Field Helper |
|--------------|------------|--------------|
| Main heading | `header` | `headerField()` |
| Subheading | `subheader` | `subheaderField()` |
| Long text | `description` | `descriptionField()` |
| Image | `media` or `image` | `mediaField()` or `uploadField()` |
| CTA buttons | `actions` or `buttons` | `callToActionPair()` |
| Icon | `icon` | `iconField()` |
| Color | `[name]Color` | `colorField()` |
| Social links | `socialLinks` | `socialLinksField()` |

## Array Field Requirements

**CRITICAL**: All array fields MUST have:

```typescript
{
  name: "items",
  type: "array",
  minRows: 0,      // REQUIRED - allows deletion
  maxRows: 10,     // REQUIRED - sets upper limit
  fields: [...]
}
```

**Why**:
- `minRows: 0` allows users to delete all items
- Without `minRows`, users can't delete the last item
- `maxRows` prevents performance issues with too many items

## Special Cases

### Case 1: Hardcoded Variants

```tsx
// Component has multiple visual variants
function HeroSection({ variant = 'default' }) {
  if (variant === 'centered') return <CenteredLayout />
  if (variant === 'split') return <SplitLayout />
  return <DefaultLayout />
}
```

**Analysis**: Don't add variant field
**Reasoning**: Create separate blocks (Hero_1, Hero_2, Hero_3) for each variant
**Action**: Split into multiple blocks during build

### Case 2: Complex Interactive Features

```tsx
// Component with complex interactions
const [activeTab, setActiveTab] = useState(0);
const [isOpen, setIsOpen] = useState(false);
```

**Analysis**: Component needs to remain client-side
**Action**:
1. Add `"use client"` directive
2. Keep all state and handlers
3. Only make content configurable via props
4. Do NOT export config from client component

### Case 3: Third-Party Integrations

```tsx
// Component with external service
import { TwitterEmbed } from 'react-twitter-embed';

<TwitterEmbed tweetId={tweetId} />
```

**Analysis**: External service IDs should be configurable
**Field Type**: text field for IDs/URLs
**Field Name**: `tweetId`, `videoUrl`, etc.

### Case 4: Date/Time Content

```tsx
<time dateTime={publishDate}>
  {formatDate(publishDate)}
</time>
```

**Analysis**: Dates should be configurable
**Field Type**: `date` field in PayloadCMS
**Field Name**: `publishDate`, `eventDate`, etc.

## Validation Rules

Before proceeding to config creation, validate your analysis:

### Validation Checklist

- [ ] Every text element in the UI is accounted for
- [ ] All images/media have upload fields
- [ ] All buttons/links have CTA fields
- [ ] All repeating content has array fields
- [ ] All array fields have minRows/maxRows
- [ ] Component type (client/server) is identified
- [ ] Dependencies are documented
- [ ] Import transformations are listed
- [ ] No fields are missing
- [ ] No unnecessary fields are added

### Common Mistakes to Avoid

**Mistake 1**: Adding fields for internal state

```tsx
// DON'T add config fields for this:
const [isHovered, setIsHovered] = useState(false);
```

**Reasoning**: Internal state is not content - it's behavior

**Mistake 2**: Adding fields for calculated values

```tsx
// DON'T add config fields for this:
const fullName = `${firstName} ${lastName}`;
```

**Reasoning**: Calculated values should be computed from other fields

**Mistake 3**: Adding fields for styling classes

```tsx
// DON'T add config fields for this:
const buttonClass = "px-4 py-2 bg-blue-500";
```

**Reasoning**: Styling should be in component code, not config (unless specifically color customization)

**Mistake 4**: Forgetting optional content

```tsx
// DO add config field for this:
{badge && <Badge>{badge}</Badge>}
```

**Reasoning**: Optional content still needs a field (just not required)

## Example Analysis: Complete Walkthrough

Let's analyze a real block step-by-step:

### Original Component (hero-section.tsx)

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield } from "lucide-react";

export default function HeroSection() {
  const features = [
    { icon: Zap, title: "Fast", desc: "Lightning quick performance" },
    { icon: Shield, title: "Secure", desc: "Bank-level security" },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <Badge>New Release</Badge>
        <h1>Ship Faster with Modern Tools</h1>
        <p>Build your next project with confidence</p>

        <div className="flex gap-4">
          <Button>
            Get Started <ArrowRight />
          </Button>
          <Button variant="outline">Learn More</Button>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-16">
          {features.map((f, i) => (
            <div key={i}>
              <f.icon className="w-8 h-8" />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Analysis Document

```markdown
# Analysis: Hero Section

## Fields Required

1. **badge** (text, optional)
   - Value: "New Release"
   - Helper: text field with name "badge"

2. **header** (text, required)
   - Value: "Ship Faster with Modern Tools"
   - Helper: `headerField()`

3. **subheader** (textarea, required)
   - Value: "Build your next project with confidence"
   - Helper: `subheaderField()`

4. **actions** (array, min: 0, max: 2)
   - Value: [
       { label: "Get Started", href: "/" },
       { label: "Learn More", href: "/" }
     ]
   - Helper: `callToActionPair({ maxRows: 2, minRows: 0 })`

5. **features** (array, min: 0, max: 4)
   - Value: [
       { icon: "Zap", title: "Fast", desc: "Lightning quick performance" },
       { icon: "Shield", title: "Secure", desc: "Bank-level security" }
     ]
   - Helper: Custom array with iconField()

## Component Type
- Server component (no "use client" needed)
- No hooks, no state, no effects

## Dependencies
- Button → ~/ui/button
- Badge → ~/ui/badge
- Icons → lucide-react (keep as-is)

## Next Step
Create config.ts with these 5 fields
```

## Output Requirements

Your analysis should produce:

1. **Structured field list** with types and helpers
2. **Component type determination** (client vs server)
3. **Dependency documentation**
4. **Import transformation map**

This analysis document will be the blueprint for creating the block config in the next step.

---

**Next Guide**: [03-creating-block-configs.md](./03-creating-block-configs.md)
