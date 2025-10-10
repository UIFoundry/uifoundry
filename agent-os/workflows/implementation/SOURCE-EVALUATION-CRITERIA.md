# Source Component Evaluation Criteria

> **Purpose**: Evaluate source components BEFORE starting development to avoid wasted effort on components with complex dependencies or features that won't work in the project.

---

## Why This Matters

During Hero_3 build, we initially chose Tailark Hero Section "Four" which had an infinite logo carousel. The carousel used complex CSS-in-JS animations that didn't work properly in our Next.js setup. We had to restart and choose a different source (Hero Section "Five").

**Lesson**: Evaluate sources upfront for technical feasibility, not just visual appeal.

---

## Evaluation Checklist

### 1. Visual Complexity Assessment

**Low Risk** (Easy to implement):
- Static layouts
- Basic Tailwind CSS styling
- Standard HTML elements
- Simple hover states
- CSS transitions/transforms

**Medium Risk** (May need adjustment):
- Framer Motion animations
- Third-party component libraries (usually fine)
- Custom SVG graphics
- CSS Grid/Flexbox complex layouts
- Responsive design with many breakpoints

**High Risk** (Likely to cause issues):
- Infinite scrollers/carousels
- Complex JavaScript animations
- CSS-in-JS with styled-components/emotion
- WebGL/Three.js
- Canvas-based animations
- External API dependencies
- Real-time data dependencies

### 2. Dependency Analysis

**Check for**:

```typescript
// ✅ SAFE - Common packages we use
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// ⚠️ CAUTION - May need alternatives
import styled from "styled-components";
import { Swiper } from "swiper";
import gsap from "gsap";

// ❌ AVOID - Likely incompatible
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

**Safe Packages** (we use these):
- framer-motion
- lucide-react
- @radix-ui/react-*
- clsx / tailwind-merge
- next/link, next/image
- react-hook-form
- zod

**Avoid Packages**:
- styled-components / emotion
- anime.js / gsap (unless simple usage)
- swiper / slick-carousel (infinite scroll issues)
- three.js / react-three-fiber
- lottie-react (large file sizes)

### 3. Animation Evaluation

**Types of Animations**:

| Animation Type | Difficulty | Notes |
|----------------|------------|-------|
| CSS transitions | ✅ Easy | Fully supported |
| CSS transforms | ✅ Easy | Fully supported |
| Framer Motion | ✅ Easy | We use this extensively |
| Scroll-triggered | ⚠️ Medium | May need adjustments |
| Infinite scroll/carousel | ❌ Hard | Often breaks, avoid |
| Timeline-based (GSAP) | ❌ Hard | Difficult to refactor |
| Canvas/WebGL | ❌ Very Hard | Usually not worth it |

### 4. Technical Feasibility Test

**Quick Test Questions**:

1. **Can animations be removed without breaking layout?**
   - If YES → Safe to proceed
   - If NO → High risk, consider alternative

2. **Does it use standard shadcn/ui components?**
   - If YES → Easy integration
   - If NO → More refactoring needed

3. **Is the layout responsive with mobile-first CSS?**
   - If YES → Easy to adapt
   - If NO → May need significant rework

4. **Does it have inline styles or styled-components?**
   - If NO → Easy to adapt
   - If YES → Will need conversion to Tailwind

5. **Are there custom hooks or complex state management?**
   - Simple state → Fine
   - Complex state/context → May be difficult

### 5. Complexity Scoring System

**Assign points for each YES answer**:

- [ ] Uses CSS-in-JS (styled-components, emotion) → +3 points
- [ ] Has infinite scrollers/carousels → +3 points
- [ ] Uses GSAP or anime.js → +2 points
- [ ] Has canvas/WebGL → +5 points
- [ ] Complex animations (timelines, sequences) → +2 points
- [ ] External API calls → +2 points
- [ ] More than 5 external dependencies → +1 point
- [ ] Custom hooks beyond useState/useEffect → +1 point
- [ ] Non-standard package manager (not npm/yarn/pnpm) → +1 point

**Scoring**:
- **0-2 points**: ✅ **Low risk** - Proceed with confidence
- **3-5 points**: ⚠️ **Medium risk** - Proceed with caution, have backup source
- **6+ points**: ❌ **High risk** - Find alternative source

---

## Evaluation Process

### Step 1: Initial Visual Review

1. Preview the component in browser
2. Note key features you want to preserve
3. List any "deal-breaker" features (must-haves)

### Step 2: Source Code Analysis

```bash
# If from GitHub repo
git clone [repo-url] temp-source
cd temp-source

# Check package.json for dependencies
cat package.json | jq '.dependencies'

# Check for CSS-in-JS
grep -r "styled\." src/
grep -r "css=" src/

# Check for complex animations
grep -r "gsap\|anime\|canvas\|three" src/

# Check for carousels
grep -r "swiper\|slick\|carousel" src/
```

### Step 3: Feature Extraction

**List must-have features**:
- Layout structure
- Color scheme
- Typography
- Key interactions
- CTA buttons
- Form elements

**List nice-to-have features**:
- Animations
- Hover effects
- Transitions
- Micro-interactions

**List can-skip features**:
- Complex animations
- Infinite scrollers
- External integrations

### Step 4: Decision Matrix

| Criteria | Weight | Score (1-5) | Weighted Score |
|----------|--------|-------------|----------------|
| Visual quality | 25% | | |
| Code cleanliness | 20% | | |
| Dependency safety | 30% | | |
| Animation simplicity | 15% | | |
| Layout complexity | 10% | | |

**Decision**:
- **70%+**: Excellent choice, proceed
- **50-69%**: Good choice, some challenges expected
- **Below 50%**: Poor choice, find alternative

---

## Practical Example: Hero_3 Evaluation

### Initial Choice: Tailark Hero Section "Four"

**Features**:
- ✅ Two-column layout
- ✅ Two CTA buttons
- ✅ Background image
- ❌ Infinite logo carousel

**Complexity Score**:
- Infinite carousel → +3 points
- Custom animation logic → +2 points
- **Total: 5 points (Medium risk)**

**Outcome**: Carousel didn't work, had to restart

### Better Choice: Tailark Hero Section "Five"

**Features**:
- ✅ Centered layout
- ✅ Two CTA buttons
- ✅ Video background (simpler than carousel)
- ❌ No carousel

**Complexity Score**:
- Video element → +0 points (standard HTML)
- Simple opacity/invert CSS → +0 points
- **Total: 0 points (Low risk)**

**Outcome**: Built successfully without issues

---

## When to Pivot to Alternative Source

**Red Flags During Development**:

1. **Animations not working after 15 minutes**
   - Don't keep trying to fix
   - Pivot to simpler source

2. **Dependency conflicts**
   - If can't resolve in 10 minutes
   - Find source with fewer dependencies

3. **Layout breaks in multiple places**
   - Indicates poor responsive design
   - Choose source with better mobile-first approach

4. **TypeScript errors in multiple files**
   - Usually indicates incompatible patterns
   - Switch to more compatible source

**Decision Rule**: If you spend more than 30 minutes fighting technical issues, pivot to a different source.

---

## Recommended Source Patterns

### ✅ Ideal Source Components

**Characteristics**:
- Tailwind CSS for styling
- Minimal external dependencies
- Framer Motion for animations (optional)
- shadcn/ui components
- Standard HTML video/image tags
- Mobile-first responsive design

**Example**:
```typescript
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Heading
      </motion.h1>
      <Button>CTA</Button>
      <Image src="/image.jpg" />
    </section>
  );
}
```

### ❌ Avoid Source Components

**Characteristics**:
- styled-components / emotion
- GSAP ScrollTrigger
- Custom canvas animations
- Infinite scrollers
- External API calls in component

**Example** (AVOID):
```typescript
import styled from "styled-components";
import { gsap } from "gsap";
import Swiper from "swiper";

const StyledSection = styled.section`
  background: ${props => props.theme.bg};
`;

export function HeroSection() {
  useEffect(() => {
    gsap.to(".element", { /* complex timeline */ });
    new Swiper(".swiper", { /* infinite loop */ });
  }, []);

  return <StyledSection>...</StyledSection>;
}
```

---

## Quick Decision Flowchart

```
Is source visually appealing?
  ├─ NO → Find different source
  └─ YES
      └─ Does it use Tailwind CSS?
          ├─ NO → Does it use CSS-in-JS?
          │    ├─ YES → Find different source
          │    └─ NO → Proceed with caution (+1 risk)
          └─ YES
              └─ Does it have infinite scroll/carousel?
                  ├─ YES → Can you remove it without breaking layout?
                  │    ├─ NO → Find different source
                  │    └─ YES → Proceed with caution
                  └─ NO
                      └─ ✅ PROCEED - Low risk source
```

---

## Summary

**Before choosing a source, ask**:

1. Can I build this with Tailwind + standard HTML elements?
2. Are the animations simple enough to recreate with Framer Motion?
3. Does it avoid infinite scrollers, carousels, and complex timelines?
4. Can I remove problematic features without destroying the design?
5. Is there a simpler alternative that achieves 80% of the visual impact?

**Remember**: **Simple sources with clean code are better than visually complex sources that cause technical headaches.**
