# How to Build Marketing Blocks - OpenCode Edition

## TL;DR

```bash
# Make sure dev server is running first
pnpm dev

# Then run one of these commands with or without context:
/build-marketing-block                           # Will ask for details
/build-marketing-block Hero 3                    # Specify type and number
/build-marketing-block Feature using [URL]       # Provide source URL

/build-marketing-blocks-batch                    # Will ask for details
/build-marketing-blocks-batch 5 Hero blocks      # Specify count and type
/build-marketing-blocks-batch 3 Pricing starting at 4  # Full context
```

That's it! The commands will guide you through the process.

---

## Command Usage: Full Context Support

Both commands support providing context inline to skip questions.

### Single Block Command

```bash
# Minimal (asks all questions)
/build-marketing-block

# Specify type and number
/build-marketing-block Hero 3

# Specify type, ask for number and source
/build-marketing-block Feature block

# Provide everything except source
/build-marketing-block Pricing 5

# Provide source URL
/build-marketing-block Hero 3 using https://github.com/magicui/hero-section

# Request search
/build-marketing-block CTA 2, search for sources
```

**The command will only ask for missing information.**

### Batch Command

```bash
# Minimal (asks all questions)
/build-marketing-blocks-batch

# Specify count and type
/build-marketing-blocks-batch 5 Hero blocks

# Full context with starting number
/build-marketing-blocks-batch 3 Features starting at number 4

# Request search for sources
/build-marketing-blocks-batch 5 Pricing blocks, search sources

# Provide specific URLs
/build-marketing-blocks-batch 2 CTAs using [url1], [url2]

# Let it determine next numbers from README
/build-marketing-blocks-batch 5 Hero blocks, use next available numbers
```

---

## Step-by-Step: Build Your First Component

### 1. Start Dev Server

```bash
# In a separate terminal, run and keep it running
pnpm dev
```

Wait for: `Ready on http://localhost:3001`

### 2. Run the Command with Context

```bash
/build-marketing-block Hero 3
```

Or without context:

```bash
/build-marketing-block
```

### 3. Answer Any Missing Questions

**If you didn't specify everything, it will ask**:

**Q: What type of block?** (if not specified)

```
Hero
```

**Q: What number variant?** (if not specified)

```
3
```

**Q: Provide URL or search Awesome Shadcn UI?** (always asks unless URL provided)

```
Search
```

### 4. Select a Source

**The command ALWAYS searches Awesome Shadcn UI first**, then falls back to Tailark if needed.

It will show you ~10 options:

```
1. magicui/hero-section - Animated hero (⭐️ 2.5k, MIT)
2. aceternity-ui/hero - 3D card hero (⭐️ 1.8k, MIT)
3. shadcn-landing/hero - Minimal hero (⭐️ 1.2k, MIT)
...

Select one by number:
```

Type: `1`

### 5. Wait for Automation

The command will automatically follow the critical build order:

**Phase 1: Source & Build**

1. ✅ Fetch source code
2. ✅ Install dependencies (`pnpm add ...`)
3. ✅ Create config.ts
4. ✅ Update constants
5. ✅ Register exports
6. ✅ Run `pnpm payload:types` (generates types)
7. ✅ Create index.tsx (using generated types)
8. ✅ Test at localhost:3001

**Phase 2: Registry Migration**

1. ✅ Transform imports
2. ✅ Copy to registry/
3. ✅ Update registry.json
4. ✅ Test CLI installation
5. ✅ Test in browser

**Phase 3: Documentation**

1. ✅ Create MDX file
2. ✅ Update registry mappings
3. ✅ Update navigation
4. ✅ Build docs

**Total: ~10-15 minutes**

### 6. Test the Result

Visit `localhost:3001/admin`:

1. Login
2. Create a new page
3. Add your new Hero_3 block
4. Fill in the fields
5. Preview the page

**You're done!** ✅

---

## Build Multiple Components (Batch)

```bash
# With full context
/build-marketing-blocks-batch 5 Hero blocks

# Or let it ask
/build-marketing-blocks-batch
```

**Process**:

1. Specify missing details (or none if you provided them)
2. Search or provide URLs
3. Select 5 sources
4. Wait ~30-45 minutes

**Result**: 5 complete Hero blocks ready to use

---

## Example Workflows

### Build Remaining Blocks to Complete MVP

Check your README.md to see what's needed:

```markdown
- [ ] Hero (2/5) # Need 3 more
- [ ] Features (0/5) # Need 5
- [ ] Pricing (1/5) # Need 4
```

Then run:

```bash
# Complete Hero blocks
/build-marketing-blocks-batch 3 Hero blocks starting at 3

# Start Features
/build-marketing-blocks-batch 5 Feature blocks

# Continue Pricing
/build-marketing-blocks-batch 4 Pricing blocks starting at 2
```

### Build from Specific Sources

If you found great components:

```bash
/build-marketing-block Hero 3 using https://github.com/magicui/hero-section
/build-marketing-block Hero 4 using https://github.com/aceternity-ui/3d-hero
/build-marketing-block Hero 5 using https://github.com/shadcn-landing/minimal-hero
```

### Auto-number from README

Let the command check README and use next available:

```bash
/build-marketing-blocks-batch 5 Hero blocks, use next numbers
```

It will check README, see you have 2/5, and build Hero_3, Hero_4, Hero_5, Hero_6, Hero_7.

---

## Critical Build Order (MUST FOLLOW)

The commands enforce this order automatically:

```
1. Source Code (from MIT-licensed component)
2. Dependencies (pnpm add ...)
3. config.ts (PayloadCMS block definition)
4. Constants (block slugs)
5. Exports (register in index.ts)
6. pnpm payload:types ← CRITICAL STEP
7. index.tsx (React component using generated types)
8. Renderer (register in RenderBlocks)
9. Testing (admin + frontend)
```

**WHY**:

- config.ts defines the block structure
- `pnpm payload:types` generates TypeScript types from config
- index.tsx imports these generated types
- You CANNOT create index.tsx before running `pnpm payload:types`

See `agent-os/workflows/implementation/CRITICAL-BLOCK-BUILD-ORDER.md` for full details.

---

## What Gets Created

For each component, you get:

### Source Files

```
src/payload/blocks/Hero/Hero_3/
├── config.ts         # PayloadCMS block configuration
└── index.tsx         # React component (uses generated types)
```

### Registry Files

```
registry/payload/blocks/hero/hero-3/
├── config.ts         # Registry version with transformed imports
└── index.tsx         # Registry version
```

### Documentation

```
content/docs/blocks/hero/hero-3.mdx    # 5-section documentation
```

### Updated Files

- `package.json` - Dependencies added
- `src/payload-types.ts` - Generated types from config
- `registry.json` - Component entry added
- `src/payload/constants/blocks.ts` - Slug constant added
- `README.md` - Roadmap count updated

---

## Important Rules the Commands Follow

### ✅ DO:

- Always source from MIT-licensed components
- Search Awesome Shadcn UI first (or accept user URL)
- Install all required dependencies automatically
- Create config.ts BEFORE index.tsx
- Run `pnpm payload:types` after config, before component
- Use PayloadCMS generated types (NEVER custom interfaces)
- Test in browser before moving to next phase
- Delegate to specialist agents (@source-helper, @registry-porter, @docs-writer)

### ❌ DON'T:

- Write components from scratch
- Create custom TypeScript prop interfaces
- Create index.tsx before running `pnpm payload:types`
- Skip the source selection step
- Build more than 5 components per batch
- Modify the dev server (keep it running)

---

## Troubleshooting

### "Command not found"

Make sure you're in the project root directory where `.claude/commands/` exists.

### "Cannot find name [BlockType]\_N_Block"

This means `pnpm payload:types` wasn't run after creating config.ts.

**Fix**: The command should handle this automatically, but you can run manually:

```bash
pnpm payload:types
grep "Hero_3_Block" src/payload-types.ts  # Verify type exists
```

### "Dev server not responding"

```bash
# Kill and restart
pkill -f "next dev"
pnpm dev
```

### "Type errors after building"

```bash
# Regenerate PayloadCMS types
pnpm payload:types
```

### "Component not showing in admin"

1. Check `src/payload/constants/blocks.ts` has the slug
2. Check component is exported in `src/payload/blocks/[Type]/index.ts`
3. Check component is registered in the block renderer
4. Run `pnpm payload:types` to regenerate types

### "Dependencies not installing"

```bash
# Clear cache and retry
pnpm store prune
pnpm install
```

---

## Context Examples

Here are all the ways you can provide context to skip questions:

### Just Type and Number

```bash
/build-marketing-block Hero 3
/build-marketing-block Feature 5
/build-marketing-block Pricing 2
```

### Type Only (will ask for number and source)

```bash
/build-marketing-block Hero
/build-marketing-block Features block
/build-marketing-block Pricing component
```

### With Source URL

```bash
/build-marketing-block Hero 3 using https://github.com/magicui/hero
/build-marketing-block CTA 2, source: https://example.com/cta
```

### Request Search

```bash
/build-marketing-block Hero 3, search for sources
/build-marketing-block Feature 5, search shadcn
```

### Batch with Count

```bash
/build-marketing-blocks-batch 5 Hero blocks
/build-marketing-blocks-batch Build 3 Features
/build-marketing-blocks-batch 4 Pricing components
```

### Batch with Starting Numbers

```bash
/build-marketing-blocks-batch 5 Hero starting at 3
/build-marketing-blocks-batch 3 Features blocks 4, 5, 6
/build-marketing-blocks-batch Build 5 Pricing from number 2
```

### Batch with Auto-numbering

```bash
/build-marketing-blocks-batch 5 Hero, use next numbers
/build-marketing-blocks-batch 3 Features, check README for next
```

---

## Advanced Usage

### Check What Numbers Are Available

```bash
# Look at README.md
grep "Hero" README.md
# Shows: - [ ] Hero (2/5)
# Means: Hero_1 and Hero_2 exist, build Hero_3 next
```

### Build Specific Range

```bash
/build-marketing-blocks-batch 3 Hero blocks: 5, 6, 7
```

### Provide Multiple URLs

```bash
/build-marketing-blocks-batch 3 CTAs using:
- https://github.com/example/cta-1
- https://github.com/example/cta-2
- https://github.com/example/cta-3
```

---

## Quick Reference Card

| Command                         | Context              | Example                |
| ------------------------------- | -------------------- | ---------------------- |
| `/build-marketing-block`        | Type + Number        | `Hero 3`               |
| `/build-marketing-block`        | Type + Number + URL  | `Hero 3 using [url]`   |
| `/build-marketing-block`        | Type only            | `Feature block`        |
| `/build-marketing-blocks-batch` | Count + Type         | `5 Hero blocks`        |
| `/build-marketing-blocks-batch` | Count + Type + Start | `5 Hero starting at 3` |
| `/build-marketing-blocks-batch` | Count + Type + Auto  | `5 Hero, next numbers` |

---

## Ready to Start?

```bash
# Step 1: Dev server (separate terminal)
pnpm dev

# Step 2: Build with context
/build-marketing-block Hero 3

# Or without context (it will ask)
/build-marketing-block

# For batch
/build-marketing-blocks-batch 5 Hero blocks
```

The commands handle dependency installation, PayloadCMS config creation, type generation, component creation, registry migration, documentation, and README updates automatically.

**Just provide context, select sources, and let it work!**
