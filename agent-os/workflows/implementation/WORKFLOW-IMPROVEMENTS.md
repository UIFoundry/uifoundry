# Workflow Improvements & Best Practices

> **Date Added**: 2025-10-09
> **Source**: User feedback from Hero_3 build

This document captures important workflow improvements and best practices discovered during component builds.

---

## 1. Always Provide DefaultValues for Header/Subheader Fields

**Issue**: The `extractBlockDefaults` function in `mdx-components.tsx` couldn't pull default values when header and subheader fields didn't have explicit `defaultValue` properties.

**Solution**: Always pass `defaultValue` to headerField() and subHeaderField():

```typescript
// ❌ WRONG - No defaults
headerField(),
subHeaderField(),

// ✅ CORRECT - With defaults
headerField({
  defaultValue: "Build 10x Faster with NS",
}),
subHeaderField({
  defaultValue: "Highly customizable components for building modern websites and applications",
}),
```

**Why**: The documentation system relies on these defaults to auto-populate component previews and examples.

**Where to apply**: All block config.ts files

---

## 2. Remove Unused Imports from Registry Files

**Issue**: Registry files sometimes include imports for fields that were removed or not used in the final version (e.g., mediaField import when only using string URL).

**Solution**: After completing component development, audit registry files for unused imports:

```typescript
// ❌ WRONG - mediaField imported but not used
import mediaField from "@/registry/default/lib/fields/media/config";

export const Hero_3_Block: Block = {
  fields: [
    // ... no mediaField() call
  ]
};

// ✅ CORRECT - Remove unused import
// import mediaField removed

export const Hero_3_Block: Block = {
  fields: [
    // ... only used fields
  ]
};
```

**Checklist**:
- [ ] Check config.ts for unused field imports
- [ ] Check index.tsx for unused component imports
- [ ] Run TypeScript compilation to catch undefined references

---

## 3. NEVER Include Version Numbers in registry.json Dependencies

**Issue**: Including version numbers in `dependencies` array breaks shadcn CLI installation.

**Wrong**:
```json
{
  "dependencies": [
    "react",
    "next",
    "payload@^3.49.1",  // ❌ Version number breaks installation
    "lucide-react"
  ]
}
```

**Correct**:
```json
{
  "dependencies": [
    "react",
    "next",
    "payload",  // ✅ No version number
    "lucide-react"
  ]
}
```

**Why**: The shadcn CLI expects package names only. Version resolution is handled by the user's package manager.

**Where to check**:
- registry.json (all component entries)
- Always remove version numbers during registry migration

---

## 4. Support Both Media Upload and URL Fallback

**Pattern**: For components that need media (images/videos), always support both upload and URL fallback.

**Benefits**:
- Flexibility for users (upload OR provide URL)
- Better theme support (light/dark variants via uploads)
- Graceful fallback when uploads not available

**Implementation**:

### Config Pattern:
```typescript
fields: [
  mediaField({
    label: "Background Video",
    admin: {
      description: "Upload background video (light/dark variants). Falls back to Video URL if not provided.",
    },
  }),
  {
    name: "videoUrl",
    label: "Video URL (Fallback)",
    type: "text",
    admin: {
      description: "Fallback video URL if media upload not provided",
    },
    defaultValue: "https://example.com/default-video.mp4",
  },
]
```

### Component Pattern:
```typescript
export default function Component(props: ComponentBlock) {
  // Prioritize media upload, fallback to URL
  const lightMedia = typeof props.media?.light === "object"
    ? (props.media.light as Media)?.url
    : null;
  const darkMedia = typeof props.media?.dark === "object"
    ? (props.media.dark as Media)?.url
    : null;
  const mediaSrc = lightMedia || darkMedia || props.videoUrl;

  return (
    <section>
      {mediaSrc && (
        <video src={mediaSrc} />
      )}
    </section>
  );
}
```

**Priority Order**:
1. Light variant from media upload
2. Dark variant from media upload
3. URL fallback

---

## 5. Update Documentation When Component Logic Changes

**Issue**: Documentation can become stale if component behavior changes after initial docs are written.

**Solution**: Whenever you change how a component works (e.g., adding media upload support), update the corresponding MDX documentation:

**Files to update**:
1. **Props table**: Add new props, update descriptions
2. **Key features**: Highlight new functionality
3. **Registry dependencies**: Add new dependencies (e.g., @uifoundry/media-field)
4. **Design notes**: Explain new behavior (priority order, fallback logic, etc.)
5. **Default values**: Update to match config.ts

**Example updates for Hero_3**:
- Added `media` prop to props table
- Updated `videoUrl` description to mention "fallback"
- Added media-field to registry dependencies
- Added "Video Source Priority" section to Design Notes
- Updated default values to match new config

---

## 6. Registry Migration Checklist

Use this checklist for every component migrated to registry:

### Source Files (src/)
- [ ] headerField() has defaultValue
- [ ] subHeaderField() has defaultValue
- [ ] All imports are used
- [ ] TypeScript compiles
- [ ] Component tested in browser

### Registry Files (registry/)
- [ ] All imports transformed (~/  → @/registry/)
- [ ] No unused imports
- [ ] All field helpers use correct registry paths
- [ ] payload-types import unchanged (~/payload-types)
- [ ] TypeScript compiles

### registry.json
- [ ] Component entry added
- [ ] Dependencies list has NO version numbers
- [ ] registryDependencies includes all @uifoundry/* dependencies
- [ ] Description is accurate and helpful
- [ ] File paths and targets are correct

### Documentation (content/docs/)
- [ ] Props table matches config.ts exactly
- [ ] Default values match config.ts
- [ ] Registry dependencies list is complete
- [ ] NPM dependencies list is complete
- [ ] Design notes explain behavior clearly
- [ ] All links work

### Testing
- [ ] pnpm registry:build succeeds
- [ ] public/r/[component].json generated
- [ ] pnpm typecheck passes
- [ ] Component renders correctly
- [ ] No console errors

---

## 7. Common Pitfalls and How to Avoid Them

### Pitfall #1: Forgetting to regenerate types
**Problem**: After changing config.ts, forgetting to run `pnpm payload:types`
**Solution**: Always run after config changes, before creating/updating component

### Pitfall #2: Inconsistent default values
**Problem**: Config defaults don't match documentation defaults
**Solution**: Copy defaults directly from config.ts when writing docs

### Pitfall #3: Missing registry dependencies
**Problem**: Component uses @uifoundry/* components but they're not in registryDependencies
**Solution**: Check all imports in both config.ts and index.tsx, add to registry.json

### Pitfall #4: Wrong import paths in registry
**Problem**: Using `~/` instead of `@/registry/` in registry files
**Solution**: Follow IMPORT-PATH-RULES.md strictly during migration

### Pitfall #5: Stale documentation
**Problem**: Docs don't reflect component changes
**Solution**: Update docs immediately after changing component logic

---

## 8. Use Correct Import Paths for Field Helpers

**Pattern**: Field helper imports should use the folder name, not the file pattern.

**Correct**:
```typescript
// ✅ Import from folder name
import mediaField from "~/payload/fields/media/config";
import MediaField from "~/payload/fields/media";
```

**Wrong**:
```typescript
// ❌ Don't append "Field" to import path
import mediaField from "~/payload/fields/mediaField/config";
import MediaField from "~/payload/fields/mediaField";
```

**Why**: The actual folder is named `media/`, not `mediaField/`. Always check the actual filesystem structure.

**Registry equivalent**:
```typescript
import mediaField from "@/registry/default/lib/fields/media/config";
```

---

## 9. Use `useTheme()` for Theme-Aware Media

**Pattern**: When components need to switch media based on theme (light/dark), use the `useTheme()` hook from `next-themes`.

**Implementation**:
```typescript
"use client";

import { useTheme } from "next-themes";

export default function Component(props: ComponentBlock) {
  const { theme } = useTheme();

  // Use theme to select appropriate media
  const mediaSrc = theme === "dark"
    ? (darkMedia ?? fallback)
    : (lightMedia ?? fallback);

  return <video src={mediaSrc} />;
}
```

**Dependencies to add**:
- **NPM**: Add `next-themes` to package.json dependencies
- **Registry**: Add `next-themes` to registry.json dependencies array

**When to use**:
- Components with light/dark media variants
- Components that need theme-aware styling beyond CSS
- Video/image sources that differ by theme

---

## Quick Reference: Essential Commands

```bash
# After config.ts changes
pnpm payload:types

# After registry changes
pnpm registry:build

# Check TypeScript
pnpm typecheck

# Full check before committing
pnpm payload:types && pnpm registry:build && pnpm typecheck
```

---

## Documentation

For detailed workflow information, see:
- `CRITICAL-BLOCK-BUILD-ORDER.md` - Component build order
- `IMPORT-PATH-RULES.md` - Import path transformations
- `add-registry-component.md` - Registry migration process
- `maintain-documentation-system.md` - Documentation updates
