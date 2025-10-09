# Source Component Priority

## Mandatory Search Order

When finding source components for marketing blocks, **ALWAYS** follow this exact order:

```
1. Tailark Free Tier (PRIMARY - ALWAYS CHECK FIRST)
   ↓
2. Awesome Shadcn UI (FALLBACK - if Tailark insufficient)
   ↓
3. User-Provided URLs (LAST RESORT - if both fail or user insists)
```

---

## 1. Tailark Free Tier (PRIMARY)

**URL**: https://tailark.com/

**Why Primary**:

- Clean, professional components
- Free tier available
- Tailwind CSS based
- Copy-paste ready
- Well-organized by category

### Search Process

**Step 1: Navigate to category**

Tailark categories:

- Hero Sections: https://tailark.com/hero-sections
- Features: https://tailark.com/features
- Pricing: https://tailark.com/pricing
- CTAs: https://tailark.com/cta
- Stats: https://tailark.com/stats
- Testimonials: https://tailark.com/testimonials
- FAQ: https://tailark.com/faq
- etc.

**Step 2: Filter for FREE tier**

Look for components marked as:

- ✅ Free
- ✅ No "Pro" or "Premium" badge
- ✅ Accessible without payment
  Use WebFetch to load: https://github.com/birobirobiro/awesome-shadcn-ui

````

**Step 3: Evaluate components**

Quality indicators:
1. ✅ **Free tier** - REQUIRED
2. ✅ **Tailwind CSS** - Should be all of them
3. ✅ **Modern design** - Clean, professional
4. ✅ **Responsive** - Mobile-friendly
5. ✅ **Copy-paste ready** - Easy to extract

**Step 4: Check existing blocks and filter**

**CRITICAL**: Before presenting options, check what's already built.

1. Read README.md to see current progress:
   ```
   - [ ] Hero (2/5)  ← Already has 2 built
   ```

2. Check `src/payload/blocks/[BlockType]/` directory

3. **Exclude already-built blocks from Tailark**:
   - If Hero_1 exists, DON'T show "Tailark Hero 1"
   - If Hero_2 exists, DON'T show "Tailark Hero 2"
   - Only show Hero 3, 4, 5, etc.

**Why**: Tailark components are numbered (Hero 1, Hero 2, etc.). If you already built Hero_1 and Hero_2, you used Tailark's first two hero components. Don't duplicate them.

**Step 5: Present filtered findings**

Present 8-15 free tier options, **excluding already-built numbers**:
```markdown
🔍 Tailark FREE Tier - Hero Components:

Current progress: Hero (2/5) - Hero_1 and Hero_2 already exist

Available components (excluding already used):
3. Tailark Hero 3 - [description]
   Preview: [tailark.com/preview/hero-3]
   License: Free ✅ | Tech: Tailwind CSS

4. Tailark Hero 4 - [description]
   Preview: [tailark.com/preview/hero-4]
   License: Free ✅ | Tech: Tailwind CSS

5. Tailark Hero 5 - [description]
   Preview: [tailark.com/preview/hero-5]
   License: Free ✅ | Tech: Tailwind CSS

...

⚠️ Not showing Hero 1 and Hero 2 (already built)

Select by number or type 'shadcn' to check Awesome Shadcn UI.
```

**When to Move to Awesome Shadcn UI**:
- Found <5 suitable options on Tailark
- User specifically requests Awesome Shadcn UI
- User types 'shadcn'
- Need more complex animations or interactions

---

## 2. Awesome Shadcn UI (FALLBACK)

**URL**: https://github.com/birobirobiro/awesome-shadcn-ui

**Why Fallback**:
- More complex/animated components
- Community-driven collections
- MIT licensed repositories
- Good for advanced interactions

### Search Process

**Step 1: Browse the list**
```
Use WebFetch to load: https://github.com/birobirobiro/awesome-shadcn-ui
```

**Step 2: Filter by category**

Categories to look for:
- **Hero Sections**: Repositories with hero components
- **Landing Pages**: Often contain multiple block types
- **UI Libraries**: Collections with various components
- **Component Collections**: Organized by type

**Step 3: Evaluate repositories**

Quality indicators (in priority order):
1. ⭐️ **2000+ stars** - High quality, battle-tested
2. ⭐️ **500-2000 stars** - Good quality, reliable
3. ⭐️ **100-500 stars** - Acceptable, verify quality
4. 📅 **Updated within 6 months** - Actively maintained
5. 📝 **MIT License** - REQUIRED
6. ⚡ **TypeScript** - Preferred
7. 🎨 **Tailwind CSS** - REQUIRED
8. 📦 **shadcn/ui based** - Preferred
9. 🔗 **Live preview** - Helpful for evaluation

**Step 4: Present findings**

```markdown
⚠️ Tailark had limited options.

Checking Awesome Shadcn UI for more [BlockType] components:

**Premium Quality** (⭐️ 2k+):
1. [name] - [description]
   Preview: [url]
   Stars: [count] | License: MIT ✅ | Tech: [stack]

2. [name] - [description]
   ...

Combined options available:
- Tailark: [X] components
- Awesome Shadcn UI: [Y] components

Select from both lists by number.
```

### Top Repositories to Check

**Hero/Landing Pages**:
- magicui/magicui
- shadcn-landing-page/shadcn-landing-page
- origin-ui/originui
- saas-ui/saas-ui
- tremor-raw/tremor-raw

**Component Collections**:
- shadcn/ui (official)
- origin-ui/originui
- lukacho/components
- ibelick/background-snippets

**When to Use Awesome Shadcn UI**:

**Good for**:
- Complex animations (Framer Motion)
- 3D effects or advanced interactions
- When Tailark lacks specific block type
- User preference for more dynamic designs

**Not as good for**:
- Simple, clean components (Tailark better)
- Quick copy-paste solutions (Tailark easier)

---

## 3. User-Provided URLs (LAST RESORT)

**Only accept when**:

- Both Awesome Shadcn UI and Tailark searches failed
- User has a specific component they want to use
- User explicitly provides URLs

### Verification Process

**Step 1: Check accessibility**

```
Can I fetch the code from this URL? ✅/❌
```

**Step 2: Verify license**

```
License check:
- MIT: ✅ Proceed
- Apache 2.0: ✅ Proceed (with attribution)
- Free/Open Source: ✅ Verify specifics
- Unknown: ⚠️ Ask user to confirm
- Proprietary: ❌ Cannot use
```

**Step 3: Check tech stack**

```
Tech requirements:
- React: ✅ REQUIRED
- TypeScript: ✅ Preferred
- Tailwind CSS: ✅ REQUIRED
- Next.js compatible: ✅ Preferred
```

**Step 4: Confirm with user**

```markdown
Verifying: [URL]

✅ Accessible: Yes
✅ License: MIT
✅ Tech: React + TypeScript + Tailwind
⚠️ No live preview available

Proceed with this source? (yes/no)
```

### Reject If

- ❌ Not accessible/downloadable
- ❌ No clear license
- ❌ Uses Vue/Angular/Svelte (not React)
- ❌ Uses Bootstrap/Foundation (not Tailwind)
- ❌ Paid/premium with no free tier
- ❌ Too complex to integrate

---

## Decision Tree

```
START: Need source component
  ↓
Search Tailark Free Tier
  ↓
Found 5+ suitable?
  ↓ YES → Present options → DONE
  ↓ NO
  ↓
Search Awesome Shadcn UI
  ↓
Combined total 5+ suitable?
  ↓ YES → Present combined options → DONE
  ↓ NO
  ↓
Ask user for URLs
  ↓
Verify each URL
  ↓
At least 1 valid?
  ↓ YES → Proceed with valid URLs → DONE
  ↓ NO
  ↓
Inform user: Cannot build without valid source
```

---

## Quality Standards

### Minimum Requirements (ALL sources)

- ✅ MIT license or verifiable free tier
- ✅ React components
- ✅ Tailwind CSS styling
- ✅ Modern JavaScript (ES6+)
- ✅ No jQuery or legacy dependencies
- ✅ Copy-paste accessible code

### Preferred Characteristics

- ⭐ TypeScript
- ⭐ shadcn/ui components
- ⭐ Framer Motion for animations
- ⭐ Lucide or Heroicons for icons
- ⭐ Responsive by default
- ⭐ Accessible (a11y)
- ⭐ Well-documented
- ⭐ Live preview available

### Red Flags (avoid if possible)

- ⚠️ Unmaintained (>2 years old, no updates)
- ⚠️ Too many dependencies
- ⚠️ Unclear license
- ⚠️ jQuery or vanilla JS (not React)
- ⚠️ Bootstrap or other CSS frameworks (not Tailwind)
- ⚠️ Overly complex (would need major refactoring)
- ⚠️ No code access (only screenshots)

---

## For Agents: Enforcement Checklist

When sourcing components, verify:

- [ ] **Searched Tailark first** (not Awesome Shadcn UI, not user URL)
- [ ] **Presented 8-15 options** from Tailark free tier
- [ ] **Only searched Awesome Shadcn UI** if Tailark insufficient
- [ ] **Only accepted user URLs** as last resort
- [ ] **Verified free tier/MIT license** for all sources
- [ ] **Confirmed React + Tailwind** tech stack
- [ ] **Provided live previews** when available
- [ ] **Sorted by quality** (design, responsiveness, simplicity)
1. Search Awesome Shadcn UI → Found 12 options
2. Present all 12 to user
3. User selects
4. Proceed to build
```

**Not**:

```
❌ Check Tailark first
❌ Skip Awesome Shadcn UI
❌ Present only 2-3 options when 12 available
❌ Accept user URL without searching
```

---

## Summary

**Always remember**:
1. 🥇 **Tailark Free Tier** - Primary, search FIRST
2. 🥈 **Awesome Shadcn UI** - Fallback if needed
3. 🥉 **User URLs** - Last resort only

**Never**:
- Skip Tailark search
- Start with Awesome Shadcn UI
- Accept URLs without verification
- Use non-MIT/non-free licensed code
- Use non-React/Tailwind components

**Priority violation examples**:
- ❌ Searching Awesome Shadcn UI before Tailark
- ❌ Accepting user URL without searching first
- ❌ Not showing Tailark options at all
- ❌ Presenting <5 options when more available

**Correct approach**:
```
1. Search Tailark → Found 12 options
2. Present all 12 to user
3. User selects
4. Proceed to build
```

This order ensures clean, professional components with easy copy-paste implementation for UIFoundry.
````
