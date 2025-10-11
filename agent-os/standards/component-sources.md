# Component Sources Registry

**Purpose**: Track all external sources used for components in this project to:
- Provide proper attribution
- Avoid duplicate sourcing from same components
- Maintain licensing compliance
- Enable quick reference for agents building new blocks

**Update Frequency**: Every time a new block is created or rebuilt from an external source.

---

## Hero Blocks

### Hero_1
- **Source**: Custom design (original to this project)
- **License**: N/A
- **Date Added**: Before tracking system
- **Notes**: Original hero component with animated gradient background

### Hero_2
- **Source**: [Tailark Hero Section 4](https://tailark.com/preview/dusk/hero-section/four)
- **License**: Free Tier
- **Date Added**: 2025-10-10
- **Notes**: Rebuilt without logo carousel. Features two-column layout with content on left, image on right with gradient overlay.

### Hero_3
- **Source**: [Tailark Hero Section 1](https://tailark.com/preview/dusk/hero-section/one)
- **License**: Free Tier
- **Date Added**: Before tracking system
- **Notes**: Center-aligned hero with badge, heading, subheader, CTA buttons, and background media with overlay

### Hero_4
- **Source**: [Tailark Hero Section 6](https://tailark.com/preview/dusk/hero-section/six)
- **License**: Free Tier
- **Date Added**: 2025-10-10
- **Notes**: Hero with badge, heading, subheader, email signup form, and features list. Background image with radial gradient overlay.

### Hero_5
- **Source**: Inspired by Hero_1 + [MagicUI FlickeringGrid](https://magicui.design/docs/components/flickering-grid)
- **License**: MIT (MagicUI)
- **Date Added**: 2025-10-10
- **Notes**: Hero with animated FlickeringGrid background (20fps throttled), text effects, CTA buttons, and optional media section.

---

## Header Blocks

### Header_1
- **Source**: Custom design (original to this project)
- **License**: N/A
- **Date Added**: Before tracking system
- **Notes**: Centered navigation with scroll-based backdrop blur and border animation

### Header_2
- **Source**: Custom design (original to this project)
- **License**: N/A
- **Date Added**: Before tracking system
- **Notes**: Standard navigation header with mobile menu

### Header_3
- **Source**: [Tailark Hero Section 5 - Header Component](https://tailark.com/r/hero-section-5.json)
- **License**: Free Tier
- **Date Added**: 2025-10-10
- **Notes**: Navigation with scroll-based backdrop blur animation. Uses motion/react for scroll detection. Features rounded container that adds background on scroll.

### Header_4
- **Source**: [Tailark Hero Section 6 - Navigation Component](https://tailark.com/r/hero-section-6.json)
- **License**: Free Tier
- **Date Added**: 2025-10-10
- **Notes**: Navigation with dashed border and fixed positioning. Extracted from hero section main component. Features login/signup buttons with border separator.

### Header_5
- **Source**: [Tailark Hero Section 4 - Header Component](https://tailark.com/r/hero-section-4.json)
- **License**: Free Tier
- **Date Added**: 2025-10-10
- **Notes**: Navigation with backdrop blur and solid border. Features centered menu items on desktop with mobile menu overlay.

---

## CTA Blocks

- No entries yet.

---

## Feature Blocks

- No entries yet.

---

## Testimonial Blocks

- No entries yet.

---

## Pricing Blocks

- No entries yet.

---

## FAQ Blocks

- No entries yet.

---

## Contact Blocks

- No entries yet.

---

## Sources Used

**External Component Libraries**:
- **Tailark** (<https://tailark.com>) - Free tier components
  - Hero Section 1 (used in Hero_3)
  - Hero Section 4 (used in Hero_2, Header_5)
  - Hero Section 5 (header used in Header_3)
  - Hero Section 6 (used in Hero_4, header used in Header_4)
- **MagicUI** (<https://magicui.design>) - MIT licensed components
  - FlickeringGrid (used in Hero_5)
- **Awesome Shadcn UI** (<https://github.com/birobirobiro/awesome-shadcn-ui>) - Community registry (fallback source)

**Available Free Tier Sources NOT Yet Used**:
- Tailark Hero Section 2
- Tailark Hero Section 3
- Tailark Hero Section 7+
- (Add more as discovered)

---

## Update Instructions for Agents

When creating or rebuilding a block from an external source:

1. **Add block entry** under appropriate category with:
   - Source URL
   - License type
   - Date added (use ISO format: YYYY-MM-DD)
   - Notes about modifications/features

2. **Update "Sources Used" section** if using a new external library

3. **Update "Available Free Tier Sources NOT Yet Used"** section:
   - Remove source if it was used
   - Add newly discovered sources

4. **Check for duplicates** before sourcing - if a component from the same source exists, consider:
   - Creating a variant instead of a new block
   - Choosing a different source for variety
   - Consulting with user if uncertain

---

## Attribution Template

When adding source attribution comments to block component files, use this template:

```typescript
/**
 * [BlockType] [N] Component
 *
 * Source: [Full URL to original component]
 * License: [MIT/Free Tier/etc.]
 * Adapted from: [Original author/project name]
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 * - [Any other significant changes]
 */
```

Example:
```typescript
/**
 * Hero 4 Component
 *
 * Source: https://tailark.com/preview/dusk/hero-section/six
 * License: Free Tier
 * Adapted from: Tailark Dusk UI Kit
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props from Hero_4_Block
 * - Added MediaField for theme-aware background image rendering
 * - Implemented email form with controlled input placeholder and button text
 * - Converted static features list to dynamic array field
 */
```
