# 🚀 Get Started Building Marketing Blocks

## Everything is Ready - Here's How to Start

The complete marketing blocks workflow is set up. You can build all your marketing blocks using automated commands.

---

## Prerequisites (5 seconds)

```bash
# Start dev server in a separate terminal (keep it running)
pnpm dev

# Wait for: "Ready on http://localhost:3001"
```

---

## Option 1: Build Single Component (Recommended for First Time)

```bash
/build-marketing-block Hero 3
```

**What happens**:

1. **Searches Tailark** for Hero components (primary source)
2. **Falls back to Awesome Shadcn UI** if Tailark insufficient
3. Shows you ~10 options with previews
4. You select one by number
5. **Automatically**:
   - Installs npm packages + shadcn components
   - Creates PayloadCMS config.ts
   - Runs `pnpm payload:types` (generates types)
   - Creates React component (refactored from source)
   - Tests at localhost:3001
   - Migrates to registry
   - Creates documentation
   - Updates README.md

**Timeline**: ~10-15 minutes

---

## Option 2: Build Batch of 5 (After First Test)

```bash
/build-marketing-blocks-batch 5 Hero blocks
```

**What happens**:

1. Searches Tailark → Awesome Shadcn UI
2. Shows you ~15 options
3. You select 5 by number (e.g., "1, 2, 3, 4, 5")
4. **Processes all 5 through**:
   - Phase 1: Source & Build (all 5)
   - Phase 2: Registry Migration (all 5)
   - Phase 3: Documentation (all 5)
   - Updates README.md

**Timeline**: ~35-45 minutes for 5 complete blocks

---

## Step-by-Step: Your First Block

### Step 1: Run the Command

```bash
/build-marketing-block Hero 3
```

### Step 2: Review Source Options

The command will search Tailark and show you options:

```
🔍 Tailark FREE tier - Hero Components:

Current progress: Hero (2/5) - Hero_1 and Hero_2 already exist

Available (excluding already built):
3. Tailark Hero 3 - Animated fade-in (Free ✅)
4. Tailark Hero 4 - Split screen (Free ✅)
5. Tailark Hero 5 - Video background (Free ✅)
...

⚠️ Not showing Hero 1 and Hero 2 (already built)

Select one (3-10) or type 'shadcn' for Awesome Shadcn UI
```

### Step 3: Select a Source

```
3
```

### Step 4: Wait for Automation

The command automatically:

- ✅ Installs dependencies (e.g., framer-motion, lucide-react)
- ✅ Installs shadcn components (e.g., button, card)
- ✅ Creates `src/payload/blocks/Hero/Hero_3/config.ts`
- ✅ Registers exports and constants
- ✅ Runs `pnpm payload:types` (generates PayloadCMS types)
- ✅ Creates `src/payload/blocks/Hero/Hero_3/index.tsx`
- ✅ Refactors imports (`@/lib/utils` → `~/styles/utils`)
- ✅ Tests at localhost:3001
- ✅ Migrates to `registry/payload/blocks/hero/hero-3/`
- ✅ Creates `content/docs/blocks/hero/hero-3.mdx`
- ✅ Updates README: `- [ ] Hero (2/5)` → `- [ ] Hero (3/5)`

### Step 5: Test It

Visit `localhost:3001/admin`:

1. Login
2. Create a test page
3. Add Hero_3 block
4. Fill in fields (header, subheader, CTA, etc.)
5. Preview → Your new block renders!

---

## Understanding the Workflow

### Tailark Filtering (Prevents Duplicates)

**Smart filtering**: Since Hero_1 and Hero_2 already exist, the command assumes they came from Tailark Hero 1 and Hero 2, so it **won't show those again**.

You'll only see Hero 3, 4, 5, etc. from Tailark (unused designs).

### The Critical Build Order (Automated)

The command enforces this sequence automatically:

```
1. Fetch source from Tailark/Shadcn
2. Install npm packages (pnpm add ...)
3. Install shadcn components (npx shadcn add ...)
4. Create config.ts ← FIRST
5. Update constants
6. Register exports
7. Run pnpm payload:types ← CRITICAL (generates types)
8. Create index.tsx ← USES GENERATED TYPES
9. Refactor imports (fix paths)
10. Test in browser
11. Migrate to registry
12. Create documentation
13. Update README
```

**Why this order**:

- config.ts defines block structure
- `pnpm payload:types` generates TypeScript types from config
- index.tsx imports these generated types
- You CAN'T create index.tsx before types exist!

### The Refactor Approach (How You Built Hero_1 & Hero_2)

Instead of writing from scratch:

1. **Pull** source component code
2. **Refactor** it:
   - Change `@/lib/utils` → `~/styles/utils` (cn function)
   - Change `@/components/ui/*` → `~/ui/*`
   - Delete custom interfaces
   - Import PayloadCMS type
   - Update JSX to use PayloadCMS fields

This is MUCH easier than writing from scratch!

### Source Priority (NEW ORDER)

1. **Tailark FREE tier** (primary) - Clean, simple components
2. **Awesome Shadcn UI** (fallback) - Complex, animated components
3. **User URLs** (last resort)

---

## What Gets Created Per Block

### Source Files

```
src/payload/blocks/Hero/Hero_3/
├── config.ts         # PayloadCMS configuration
└── index.tsx         # React component (refactored from source)
```

### Registry Files

```
registry/payload/blocks/hero/hero-3/
├── config.ts         # Registry version
└── index.tsx         # Registry version
```

### Documentation

```
content/docs/blocks/hero/hero-3.mdx    # 5-section docs
```

### Updated Files

- `package.json` (dependencies)
- `src/payload-types.ts` (generated types)
- `registry.json` (component entry)
- `src/payload/constants/blocks.ts` (slug constant)
- `README.md` (roadmap progress)

---

## Building All Marketing Blocks (15 Types × 5 Variants = 75 Total)

```bash
# Hero blocks (batch 1)
/build-marketing-blocks-batch 5 Hero blocks

# Features blocks (batch 2)
/build-marketing-blocks-batch 5 Feature blocks

# Pricing blocks (batch 3)
/build-marketing-blocks-batch 5 Pricing blocks

# Testimonials (batch 4)
/build-marketing-blocks-batch 5 Testimonial blocks

# FAQ (batch 5)
/build-marketing-blocks-batch 5 FAQ blocks

# CTA (batch 6)
/build-marketing-blocks-batch 5 CTA blocks

# Gallery (batch 7)
/build-marketing-blocks-batch 5 Gallery blocks

# Stats (batch 8)
/build-marketing-blocks-batch 5 Stats blocks

# Teams (batch 9)
/build-marketing-blocks-batch 5 Team blocks

# Newsletter (batch 10)
/build-marketing-blocks-batch 5 Newsletter blocks

# About (batch 11)
/build-marketing-blocks-batch 5 About blocks

# Contact (batch 12)
/build-marketing-blocks-batch 5 Contact blocks

# Feedback (batch 13)
/build-marketing-blocks-batch 5 Feedback blocks

# Header (batch 14)
/build-marketing-blocks-batch 5 Header blocks

# Footer (batch 15)
/build-marketing-blocks-batch 5 Footer blocks
```

**Total time**: ~8-10 hours (15 batches × ~35 min each)

Check progress anytime in `README.md`:

```markdown
- [x] Hero (5/5) ✅
- [x] Features (5/5) ✅
- [ ] Pricing (3/5)
      ...
```

---

## Context Examples (Skip Questions)

You can provide context inline to skip questions:

```bash
# Just type and number
/build-marketing-block Hero 3

# With source preference
/build-marketing-block Hero 3, search tailark

# Batch with count
/build-marketing-blocks-batch 5 Hero blocks

# Batch with starting number
/build-marketing-blocks-batch 3 Features starting at 4

# Batch with auto-numbering
/build-marketing-blocks-batch 5 Hero blocks, use next numbers
```

---

## Important Rules (Enforced Automatically)

### ✅ The Command WILL:

- Search Tailark first, then Awesome Shadcn UI
- Install ALL dependencies (npm + shadcn)
- Create config.ts BEFORE index.tsx
- Run `pnpm payload:types` at the right time
- Refactor imports correctly (`@/` → `~/`)
- Remove custom interfaces
- Use PayloadCMS generated types
- Test everything in browser
- Create complete documentation

### ❌ The Command WON'T:

- Write components from scratch
- Use non-free/non-MIT sources
- Create custom prop interfaces
- Skip the type generation step
- Use wrong import paths
- Build more than 5 at once (batch limit)

---

## Troubleshooting

### "Cannot find name Hero_3_Block"

**Cause**: Types weren't generated  
**Fix**: The command should handle this, but if it fails:

```bash
pnpm payload:types
```

### "Cannot find module '~/styles/utils'"

**Cause**: Import path not refactored  
**Fix**: The command fixes this automatically during refactoring

### "Shadcn component not found"

**Cause**: Shadcn component not installed  
**Fix**: The command detects and installs these automatically

### Dev server stopped

**Cause**: Terminal closed  
**Fix**:

```bash
pnpm dev
```

---

## Documentation Reference

**Quick Guides**:

- `GET-STARTED.md` (this file) - Start here
- `HOW-TO-BUILD-BLOCKS.md` - Detailed usage
- `OPENCODE-QUICKSTART.md` - OpenCode specifics

**Complete Workflows**:

- `agent-os/workflows/implementation/build-marketing-blocks.md` - Full workflow
- `agent-os/workflows/implementation/CRITICAL-BLOCK-BUILD-ORDER.md` - Build sequence
- `agent-os/workflows/implementation/SOURCE-PRIORITY.md` - Search order
- `agent-os/workflows/implementation/IMPORT-PATH-RULES.md` - Refactoring rules

---

## Ready to Start! 🎉

```bash
# 1. Start dev server (if not running)
pnpm dev

# 2. Build your first block
/build-marketing-block Hero 3

# Or jump to batch mode
/build-marketing-blocks-batch 5 Hero blocks
```

The command handles everything - you just select sources and approve at checkpoints!

---

## What to Expect

**Command output**:

```
🔍 Searching Tailark FREE tier...
Found 10 Hero components

1. Modern Hero - Clean gradient (Free ✅)
2. Minimal Hero - Simple layout (Free ✅)
...

Select one: 1

✅ Selected: Modern Hero

📦 Installing dependencies...
✅ framer-motion@^11.0.0
✅ lucide-react@^0.400.0
✅ shadcn: button, card

📝 Creating config.ts...
✅ src/payload/blocks/Hero/Hero_3/config.ts

🔧 Generating types...
✅ pnpm payload:types completed

⚛️  Creating component...
✅ Refactored from source
✅ Fixed imports: @/ → ~/
✅ Using PayloadCMS type: Hero_3_Block

🧪 Testing at localhost:3001...
✅ Renders correctly

📦 Migrating to registry...
✅ registry/payload/blocks/hero/hero-3/

📚 Creating documentation...
✅ content/docs/blocks/hero/hero-3.mdx

✅ COMPLETE: Hero_3
README updated: Hero (3/5)

Total time: 12 minutes
```

Start building! 🚀
