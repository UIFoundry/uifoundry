# Import Path Rules for UIFoundry

## Critical Import Path Changes

When adapting source components from shadcn ecosystem to UIFoundry, you MUST update import paths to match the project structure.

---

## The cn() Function (MOST IMPORTANT)

**Original shadcn/source path**:

```typescript
import { cn } from "@/lib/utils";
```

**UIFoundry project path**:

```typescript
import { cn } from "~/styles/utils";
```

**⚠️ CRITICAL**: This is the most common mistake. The `cn` utility is in a DIFFERENT location in UIFoundry.

---

## UI Components

**Original shadcn/source paths**:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
```

**UIFoundry project paths**:

```typescript
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader } from "~/ui/card";
import { Dialog, DialogContent } from "~/ui/dialog";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Badge } from "~/ui/badge";
```

**Pattern**: `@/components/ui/[name]` → `~/ui/[name]`

---

## PayloadCMS Components

**UIFoundry PayloadCMS imports**:

```typescript
import type { Hero_3_Block } from "~/payload-types";
import MediaField from "~/payload/fields/mediaField";
import headerField from "~/payload/fields/header/config";
import { BLOCK_SLUG_HERO_3 } from "~/payload/constants/blocks";
```

**Pattern**: Always use `~/payload/...` prefix

---

## Icon Libraries

**Keep as-is** - No changes needed:

```typescript
import { ArrowRight, Check, X } from "lucide-react";
import { CheckIcon, XIcon } from "@heroicons/react/24/outline";
import { CheckCircledIcon } from "@radix-ui/react-icons";
```

**Pattern**: External packages don't use `@/` or `~/` prefix

---

## Animation Libraries

**Keep as-is** - No changes needed:

```typescript
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
```

**Pattern**: External packages don't use `@/` or `~/` prefix

---

## Next.js Imports

**Keep as-is** - No changes needed:

```typescript
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
```

**Pattern**: Framework imports stay unchanged

---

## Complete Refactoring Example

### Before (Original Source):

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className={cn("container mx-auto")}>
      <Card>
        <CardContent>
          <h1>{title}</h1>
          <p>{description}</p>
          <Button asChild>
            <Link href="/signup">
              Get Started <ArrowRight />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
```

### After (UIFoundry):

```typescript
"use client";

// ✅ Updated: @/components/ui → ~/ui
import { Button } from "~/ui/button";
import { Card, CardContent } from "~/ui/card";

// ✅ Updated: @/lib/utils → ~/styles/utils (CRITICAL)
import { cn } from "~/styles/utils";

// ✅ Unchanged: External package
import { ArrowRight } from "lucide-react";

// ✅ Unchanged: Next.js framework
import Link from "next/link";

// ✅ Added: PayloadCMS type
import type { Hero_3_Block } from "~/payload-types";

// ❌ Removed: Custom interface
// interface HeroProps { ... }

// ✅ Updated: Use PayloadCMS type
export default function Hero3Section(props: Hero_3_Block) {
  return (
    <section className={cn("container mx-auto")}>
      <Card>
        <CardContent>
          {/* ✅ Updated: Use PayloadCMS field names */}
          <h1>{props.header}</h1>
          <p>{props.subheader}</p>
          <Button asChild>
            <Link href={props.primaryCtaHref}>
              {props.primaryCtaLabel} <ArrowRight />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
```

---

## Quick Reference Table

| Type                  | Original Path            | UIFoundry Path                 |
| --------------------- | ------------------------ | ------------------------------ |
| **cn utility**        | `@/lib/utils`            | `~/styles/utils`               |
| **UI components**     | `@/components/ui/[name]` | `~/ui/[name]`                  |
| **Payload types**     | N/A                      | `~/payload-types`              |
| **Payload fields**    | N/A                      | `~/payload/fields/[name]`      |
| **Payload constants** | N/A                      | `~/payload/constants/blocks`   |
| **Icons**             | `lucide-react`           | `lucide-react` (unchanged)     |
| **Icons**             | `@heroicons/react`       | `@heroicons/react` (unchanged) |
| **Animation**         | `framer-motion`          | `framer-motion` (unchanged)    |
| **Next.js**           | `next/[module]`          | `next/[module]` (unchanged)    |

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to change cn path

```typescript
// WRONG - will fail
import { cn } from "@/lib/utils";
```

### ❌ Mistake 2: Using wrong UI component path

```typescript
// WRONG - will fail
import { Button } from "@/components/ui/button";
```

### ❌ Mistake 3: Keeping custom interfaces

```typescript
// WRONG - creates type conflicts
interface Hero3Props {
  header: string;
}
```

### ❌ Mistake 4: Not importing PayloadCMS types

```typescript
// WRONG - no type safety
export default function Hero3Section(props: any) {
```

---

## Validation Checklist

Before considering a component refactored, verify:

- [ ] **cn import** changed from `@/lib/utils` to `~/styles/utils`
- [ ] **All UI imports** changed from `@/components/ui/` to `~/ui/`
- [ ] **PayloadCMS type** imported from `~/payload-types`
- [ ] **Custom interfaces** removed
- [ ] **Icon imports** unchanged (external packages)
- [ ] **Next.js imports** unchanged (framework)
- [ ] **Animation imports** unchanged (external packages)
- [ ] **No `@/` imports** remain in the file
- [ ] **TypeScript compiles** without errors

---

## Regex Find/Replace (for bulk updates)

If you have many files to update:

**Find**: `from "@/lib/utils"`  
**Replace**: `from "~/styles/utils"`

**Find**: `from "@/components/ui/`  
**Replace**: `from "~/ui/`

**Find**: `interface \w+Props \{[^}]+\}`  
**Replace**: (delete - use PayloadCMS types instead)

---

## For Agents: Critical Enforcement

When refactoring source components, you MUST:

1. ✅ **ALWAYS change** `@/lib/utils` to `~/styles/utils` (for cn)
2. ✅ **ALWAYS change** `@/components/ui/` to `~/ui/` (for components)
3. ✅ **NEVER keep** custom prop interfaces
4. ✅ **ALWAYS import** PayloadCMS generated types
5. ✅ **VERIFY** no `@/` imports remain

**Test after refactoring**:

```bash
# Check for remaining @/ imports (should be zero)
grep -r "@/" src/payload/blocks/[BlockType]/[BlockType]_N/

# Verify imports compile
pnpm typecheck
```

If any `@/` imports remain (except in comments), the refactoring is incomplete.
