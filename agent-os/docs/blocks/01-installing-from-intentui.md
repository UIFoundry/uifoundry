# Installing Blocks from IntentUI Registry

## Overview

IntentUI is a premium UI kit that provides high-quality, customizable UI blocks. This guide covers how to download and install blocks from their registry into a temporary location for further processing.

## Registry Information

- **Registry URL**: https://design.intentui.com/blocks
- **Authentication**: Token-based authentication required
- **Block Format**: React + Tailwind CSS components
- **License**: Verify license terms before use

## Installation Process

### Step 1: Explore Available Blocks

First, browse the IntentUI registry to identify the block you want to install:

```bash
# Use WebFetch to explore the registry
# This will show available blocks and their metadata
```

**Important**: Before installing, verify:
- Block category (Hero, Features, CTA, etc.)
- Block dependencies (UI components, icons, animations)
- Block complexity (simple content vs complex interactions)

### Step 2: Download Block to Temporary Location

Use the shadcn CLI to install the block from IntentUI registry:

```bash
# Install block to temporary directory for analysis
npx shadcn@latest add https://design.intentui.com/blocks/[block-id] --yes --overwrite
```

**Default Installation Location**:
- Blocks install to `components/ui/` by default
- Components may also install to `components/` depending on configuration

### Step 3: Locate Installed Files

After installation, find all files that were added:

```bash
# Search for recently modified files
find components -type f -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js"

# Or use Glob tool to find specific patterns
# Glob pattern: "components/**/*.tsx"
```

**Common File Patterns**:
- Main component: `components/ui/[block-name].tsx` or `components/[block-name].tsx`
- Sub-components: May be in same directory or subdirectories
- Supporting files: Types, utilities, hooks

### Step 4: Identify Block Dependencies

Examine the installed component to identify dependencies:

```typescript
// Example component might import:
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
```

**Dependency Categories**:

1. **UI Components** (from shadcn/ui):
   - Button, Badge, Card, Input, etc.
   - These should be mapped to existing `~/ui/*` components
   - If missing, may need to install separately

2. **Icons** (from lucide-react):
   - Direct imports: `import { ChevronRight } from "lucide-react"`
   - Should remain as-is in final component

3. **Animation Libraries**:
   - framer-motion: For animations
   - @studio-freight/react-lenis: For smooth scrolling
   - Check if already available in project

4. **Utilities**:
   - `cn()` function: Maps to `~/lib/utils`
   - Custom hooks: May need to be copied to project

### Step 5: Document Block Structure

Create a temporary analysis document:

```markdown
## Block Analysis: [Block Name]

**Source**: IntentUI - [Block ID]
**Installed To**: components/ui/[block-name].tsx
**Category**: [Hero/Features/CTA/etc.]

### Dependencies
- UI Components: Button, Badge, Card
- Icons: ChevronRight, ArrowRight
- Animations: framer-motion
- Utilities: cn

### Content Components (Editable)
1. Heading text (h1/h2)
2. Subheading text (p)
3. CTA buttons (Button components)
4. Images (img/Image components)
5. Badge/pill text
6. List items/features

### Interactive Features
- [ ] Client-side state (useState)
- [ ] Effects (useEffect)
- [ ] Event handlers (onClick, etc.)
- [ ] Animations (framer-motion)
- [ ] Form inputs

### Component Type
- [ ] Server Component (no "use client")
- [x] Client Component (has "use client" directive)

**Reasoning**: Uses framer-motion animations, requires client-side rendering
```

## Common Issues & Solutions

### Issue: Block Not Found

**Problem**: URL returns 404 or authentication error

**Solutions**:
1. Verify authentication token is configured
2. Check block URL is correct (copy from IntentUI dashboard)
3. Ensure you have active subscription/access

### Issue: Missing Dependencies

**Problem**: Component imports packages not in project

**Solutions**:
1. Check project's `package.json` for existing packages
2. Install missing dependencies: `pnpm add [package-name]`
3. For shadcn components: `npx shadcn@latest add [component]`

### Issue: Import Path Conflicts

**Problem**: Component uses different path aliases than project

**Solutions**:
- IntentUI uses: `@/components/ui/button`
- Project uses: `~/ui/button`
- **Do NOT transform yet** - wait for block config creation phase

## Next Steps

After successful installation and analysis:

1. **Proceed to**: [02-analyzing-block-source.md](./02-analyzing-block-source.md)
2. **Goal**: Identify all content that should be editable in PayloadCMS
3. **Output**: Structured list of fields needed for block config

## File Organization

Keep temporary files organized:

```
/tmp/intentui-blocks/
├── [block-name]/
│   ├── component.tsx          (Original installed component)
│   ├── analysis.md            (Your analysis document)
│   └── dependencies.txt       (List of required packages)
```

**Important**: These are TEMPORARY files for analysis only. The final block will be created in:
- `src/payload/blocks/[BlockType]/[BlockType]_N/`

## Verification Checklist

Before moving to next phase, ensure:

- [ ] Block successfully installed
- [ ] All files located and documented
- [ ] Dependencies identified and listed
- [ ] Content components documented
- [ ] Component type determined (server vs client)
- [ ] Analysis document created
- [ ] Block category identified (matches existing block types)

---

**Next Guide**: [02-analyzing-block-source.md](./02-analyzing-block-source.md)
