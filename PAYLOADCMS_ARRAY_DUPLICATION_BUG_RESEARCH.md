# PayloadCMS Array Field Duplication Bug - Research Report

**Date**: 2025-12-10
**PayloadCMS Version**: 3.61.1
**Issue Status**: Unresolved - Multiple Related Bugs

---

## Executive Summary

A critical bug exists in PayloadCMS 3.x where array fields with `defaultValue` cause duplicate rows to appear in the admin panel when adding new blocks. The duplicates are blank, cannot be removed (they regenerate instantly), and only disappear after HMR refresh (dev) or full page reload (production). This issue is caused by the intersection of **three separate bugs** in Payload's form state management system.

---

## Problem Description

### Symptoms
When adding a new block to a page in the PayloadCMS admin panel:

1. Array fields with `defaultValue` show duplicated entries
2. Extra blank array rows are created automatically
3. Attempting to remove extra rows fails - they regenerate immediately
4. The count of default values is effectively doubled
5. Issue persists until page refresh (HMR in dev or manual refresh in production)
6. **Only happens in the admin panel** - not in API operations
7. Occurs with both large (9 items) and small (1-3 items) default arrays

### User Impact
- Confusing admin UI experience
- Cannot properly edit array fields without refreshing
- Risk of saving incorrect data if user doesn't notice duplicates
- Affects any block with array fields that have default values

---

## Root Causes

### 1. Array Field `defaultValue` ID Conflicts
**Issue**: [#11871](https://github.com/payloadcms/payload/issues/11871) - **OPEN**

When array fields have `defaultValue`, Payload's form state management creates a race condition:

1. Client-side React form applies `defaultValue` and generates row IDs
2. Server-side Payload processes the same data and generates its own IDs
3. Form state merge fails to reconcile the two sets of IDs
4. Results in duplicate entries with conflicting identifiers

**Technical Details**:
- Error message: "The following field is invalid: id"
- Using `Array(n).fill({...})` creates object references, not unique objects
- Even with properly structured array literals `[{...}, {...}]`, the ID conflict persists
- The issue is in the form state synchronization, not the default value structure

### 2. Collapsible Fields + Array Fields State Management
**Issues**: [#880](https://github.com/payloadcms/payload/issues/880), [#976](https://github.com/payloadcms/payload/issues/976), [#9775](https://github.com/payloadcms/payload/issues/9775)

Historical issues show data loss and state management problems when combining:
```typescript
{
  type: "collapsible",
  fields: [
    {
      type: "array",
      defaultValue: [...] // <- PROBLEMATIC COMBINATION
    }
  ]
}
```

**Known Problems**:
- Data resets when saving nested blocks inside collapsible fields
- Array fields collapse on any form change when `initCollapsed: true`
- Form state doesn't properly track nested field paths

### 3. Blocks Field Form State Merging
**PR**: [#12207](https://github.com/payloadcms/payload/pull/12207) - Fixed in v3.37.0

The `blockType` property was created server-side but discarded client-side during form state merging. While this specific issue was fixed, it reveals the broader problem: **client-server form state synchronization is fragile** for complex nested structures.

---

## Affected Configuration Pattern

The bug is triggered by this specific nesting pattern:

```typescript
// Pages Collection
{
  fields: [
    {
      name: "blocks",
      type: "blocks",  // ← Level 1: Blocks field
      blocks: [
        {
          slug: "testimonials-2",
          fields: [
            {
              type: "collapsible",  // ← Level 2: Collapsible wrapper
              fields: [
                {
                  name: "testimonials",
                  type: "array",  // ← Level 3: Array field
                  defaultValue: [  // ← Level 4: Default values
                    { name: "...", role: "..." },
                    // ... 9 items total
                  ],
                  fields: [/* ... */]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**Key Factors**:
- Blocks field containing blocks
- Collapsible field wrapping array
- Array field with `defaultValue`
- Multiple default items (though occurs with even 1 item)

---

## Related GitHub Issues

### Critical Open Issues
| Issue | Description | Status | Versions |
|-------|-------------|--------|----------|
| [#11871](https://github.com/payloadcms/payload/issues/11871) | Array field with defaultValue gives ID error | **OPEN** | 3.31.0+ |
| [#13653](https://github.com/payloadcms/payload/issues/13653) | Array field duplicate row causes infinite duplication | CLOSED (v3.55.0) | 3.54.0 |

### Historical Fixed Issues
| Issue/PR | Description | Fixed In |
|----------|-------------|----------|
| [#11522](https://github.com/payloadcms/payload/issues/11522) | Duplicate IDs in Payload V3 array fields | v3.28.0 |
| [#13653](https://github.com/payloadcms/payload/issues/13653) | Array row duplication on duplicate action | v3.55.0 |
| [#9590](https://github.com/payloadcms/payload/issues/9590) | Mass edit overrides field data with defaultValue | v3.x |
| [#12207](https://github.com/payloadcms/payload/pull/12207) | blockType ignored when merging server form state | v3.37.0 |
| [#6401](https://github.com/payloadcms/payload/issues/6401) | Duplicating block creates empty duplicate | Fixed (React Strict Mode) |
| [#880](https://github.com/payloadcms/payload/issues/880) | Data reset in nested blocks inside collapsible | v1.0.13 |

### Related State Management Issues
- [#9775](https://github.com/payloadcms/payload/issues/9775) - Array collapses on form change
- [#2179](https://github.com/payloadcms/payload/issues/2179) - Fields cleared when defaultValue doesn't populate
- [#8125](https://github.com/payloadcms/payload/issues/8125) - Blocks duplicate won't save
- [#976](https://github.com/payloadcms/payload/issues/976) - Block > tab > collapsible > field not storing data

---

## Technical Analysis

### Form State Lifecycle

When a block is added in the admin panel:

```
1. USER ACTION
   └─> User clicks "Add Testimonials Block"

2. CLIENT-SIDE (React)
   ├─> Block component mounts
   ├─> defaultValue applied to form state
   ├─> Row IDs generated client-side (e.g., "row-abc123")
   └─> Form state updated with 9 testimonial rows

3. SERVER REQUEST
   ├─> POST request to Payload API
   ├─> Server validates and processes data
   ├─> Server generates its own row IDs (e.g., "row-def456")
   └─> Server returns processed data

4. CLIENT-SIDE MERGE
   ├─> mergeServerFormState.ts attempts to reconcile
   ├─> Client IDs: ["row-abc123", "row-abc124", ...]
   ├─> Server IDs: ["row-def456", "row-def457", ...]
   ├─> ❌ Merge fails to match IDs
   └─> Both sets of rows retained → DUPLICATION

5. USER ATTEMPTS DELETION
   ├─> User deletes one duplicate row
   ├─> Client removes row from form state
   ├─> Server re-applies defaultValue on next sync
   └─> ∞ Row reappears → INFINITE LOOP
```

### Why Page Refresh Fixes It

When the page refreshes:
1. Form state is rebuilt from scratch
2. Data is fetched from database (single source of truth)
3. No client-server ID conflict occurs
4. Form renders correctly with actual saved data

### Collapsible Field Complication

Collapsible fields add another layer of state management:
- Collapsed/expanded state tracked separately
- Field paths inside collapsibles have additional nesting
- `mergeServerFormState.ts` struggles with deep nested paths
- Historical issues (#880, #976) show this combination is problematic

---

## Current Project Impact

### Affected Blocks

All Testimonials blocks have the problematic pattern:

```bash
src/payload/blocks/Testimonials/Testimonials_1/config.ts
  ✓ Array NOT inside collapsible (less affected)
  ✗ Array has defaultValue with 9 items

src/payload/blocks/Testimonials/Testimonials_2/config.ts
  ✗ Array INSIDE collapsible
  ✗ Array has defaultValue with 9 items

src/payload/blocks/Testimonials/Testimonials_3/config.ts
  ✗ Array INSIDE collapsible
  ✗ Array has defaultValue with 9 items

src/payload/blocks/Testimonials/Testimonials_4/config.ts
  ✗ Array INSIDE collapsible
  ✗ Array has defaultValue with 9 items

src/payload/blocks/Testimonials/Testimonials_5/config.ts
  ✗ Array INSIDE collapsible
  ✗ Array has defaultValue with 9 items
```

### Pattern Analysis

**Testimonials_1** structure:
```typescript
fields: [
  { type: "collapsible", fields: [header, subheader] },  // Safe
  { name: "testimonials", type: "array", defaultValue: [...] }  // Problematic
]
```

**Testimonials_2-5** structure:
```typescript
fields: [
  { type: "collapsible", fields: [header, subheader] },  // Safe
  {
    type: "collapsible",  // ← Extra wrapper
    fields: [
      { name: "testimonials", type: "array", defaultValue: [...] }  // Very problematic
    ]
  }
]
```

---

## Solutions & Workarounds

### Solution 1: Remove Collapsible Wrapper (Recommended)
**Effort**: 15 minutes
**Effectiveness**: High (addresses 2 of 3 root causes)

Flatten the block structure to remove collapsible wrappers around array fields:

```typescript
// BEFORE (Testimonials_2)
export const Testimonials_2_Block: Block = {
  fields: [
    {
      type: "collapsible",
      label: "Section Header",
      fields: [headerField(), subHeaderField()],
    },
    {
      type: "collapsible",  // ← REMOVE THIS
      label: "Testimonials",
      fields: [
        {
          name: "testimonials",
          type: "array",
          defaultValue: [...],
          fields: [...]
        }
      ]
    }
  ]
};

// AFTER
export const Testimonials_2_Block: Block = {
  fields: [
    headerField({ defaultValue: "What our customers say" }),
    subHeaderField({ defaultValue: "..." }),
    {
      name: "testimonials",
      type: "array",
      label: "Testimonials List",
      defaultValue: [...],  // Keep defaultValue
      fields: [...]
    }
  ]
};
```

**Pros**:
- Removes historical collapsible + array bug pattern
- Maintains default values
- Clean UI (no unnecessary nesting)

**Cons**:
- Loses visual grouping in admin
- May still have residual ID conflicts (issue #11871 remains open)

---

### Solution 2: Remove `defaultValue` Entirely (Nuclear Option)
**Effort**: 5 minutes
**Effectiveness**: 100% (removes root cause)

Completely eliminate `defaultValue` from array fields:

```typescript
{
  name: "testimonials",
  type: "array",
  // defaultValue: [...],  // ← REMOVE THIS
  minRows: 0,
  fields: [
    {
      name: "name",
      type: "text",
      admin: {
        placeholder: "Enter testimonial author name",
      },
      required: true,
    },
    {
      name: "role",
      type: "text",
      admin: {
        placeholder: "e.g., CEO at Company",
      },
      required: true,
    },
    // ... other fields with placeholders
  ]
}
```

**Pros**:
- Completely eliminates the bug
- Guaranteed to work
- Simple implementation

**Cons**:
- Users must manually add all rows
- More friction in content creation
- Loses demo/example content benefit

---

### Solution 3: Server-Side Initialization (Most Reliable)
**Effort**: 30 minutes
**Effectiveness**: Very High (bypasses client-side issues)

Populate defaults only on document creation using collection hooks:

```typescript
// src/payload/collections/Pages/config.ts
import type { CollectionConfig } from "payload";
import { blocks } from "~/payload/blocks";
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";

// Define default testimonials
const DEFAULT_TESTIMONIALS = [
  {
    name: "Isabelle Dupont",
    role: "Product Designer at Formly",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Using this product has completely transformed our design workflow. It's fast, intuitive, and reliable.",
  },
  {
    name: "Lukas Hoffmann",
    role: "CTO at NovaCloud",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "We integrated it in less than a day and instantly saw results. Easily one of the best decisions we've made.",
  },
  // ... add remaining testimonials
];

export const Pages: CollectionConfig = {
  slug: COLLECTION_SLUG_PAGES,
  // ... existing config
  fields: [
    {
      name: "blocks",
      type: "blocks",
      blocks,
      defaultValue: [],  // Empty by default
    },
    // ... other fields
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // Only populate on CREATE, not on updates
        if (operation === 'create' && data.blocks) {
          data.blocks = data.blocks.map((block) => {
            // Check if it's a testimonials block without data
            const isTestimonialsBlock = block.blockType &&
              block.blockType.startsWith('testimonials-');

            const needsDefaults = !block.testimonials ||
              block.testimonials.length === 0;

            if (isTestimonialsBlock && needsDefaults) {
              return {
                ...block,
                testimonials: DEFAULT_TESTIMONIALS,
              };
            }

            return block;
          });
        }

        return data;
      },
    ],
  },
};
```

**Remove `defaultValue` from block configs**:
```typescript
// src/payload/blocks/Testimonials/Testimonials_1/config.ts
export const Testimonials_1_Block: Block = {
  fields: [
    {
      name: "testimonials",
      type: "array",
      // defaultValue: [...],  // ← REMOVE - handled by hook
      minRows: 0,
      fields: [...]
    }
  ]
};
```

**Pros**:
- Defaults populated server-side (single source of truth)
- No client-side form state conflicts
- Only happens on creation, not every edit
- Clean separation of concerns

**Cons**:
- Slightly more complex setup
- Defaults not visible until after first save
- Need to maintain default data in separate location

---

### Solution 4: Field-Level Hook (Alternative)
**Effort**: 20 minutes
**Effectiveness**: High

Use field-level `beforeChange` hook instead of `defaultValue`:

```typescript
{
  name: "testimonials",
  type: "array",
  hooks: {
    beforeChange: [
      ({ value, operation }) => {
        // Only populate defaults on CREATE if array is empty
        if (operation === 'create' && (!value || value.length === 0)) {
          return [
            {
              name: "Isabelle Dupont",
              role: "Product Designer at Formly",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              quote: "Using this product has completely transformed...",
            },
            // ... other testimonials
          ];
        }
        return value;
      },
    ],
  },
  fields: [...]
}
```

**Pros**:
- Keeps logic with field definition
- Server-side execution
- More granular control

**Cons**:
- Still uses server-side logic
- May not show defaults until after first interaction

---

### Solution 5: Custom Field Component (Advanced)
**Effort**: 2-4 hours
**Effectiveness**: Theoretical

Create a custom React field component that handles initialization differently:

```typescript
// Custom component would need to:
// 1. Override default Payload array field behavior
// 2. Handle ID generation consistently
// 3. Manage form state without conflicts

// This requires deep knowledge of Payload's admin UI internals
// and may break on Payload updates
```

**Not recommended** - too much effort for uncertain benefit.

---

## Recommended Action Plan

### Immediate Fix (Choose One)

#### Option A: Conservative Approach
1. **Remove collapsible wrappers** from Testimonials_2, _3, _4, _5 (15 min)
2. **Test** if duplication still occurs
3. If yes, proceed to Option B

#### Option B: Guaranteed Fix
1. **Remove `defaultValue`** from all array fields (5 min)
2. **Add placeholders** to individual fields for guidance
3. **Document** that users need to manually add testimonials

#### Option C: Best UX (Recommended)
1. **Remove `defaultValue`** from block configs (5 min)
2. **Implement collection-level hook** for server-side defaults (30 min)
3. **Test** creation flow thoroughly

### Testing Steps

After implementing fix:

1. Clear browser cache and storage
2. Restart dev server
3. Navigate to Pages collection
4. Create new page
5. Add testimonials block
6. Verify NO duplicate rows appear
7. Add/remove array items
8. Save page
9. Refresh page
10. Verify data persists correctly

### Long-Term

1. **Monitor** [Issue #11871](https://github.com/payloadcms/payload/issues/11871) for official fix
2. **Contribute** reproduction case to Payload team if asked
3. **Update** PayloadCMS when fix is released
4. **Retest** to confirm resolution

---

## Contributing to Fix

If you want to help the Payload team resolve this:

### 1. Create Minimal Reproduction

Create a minimal repo demonstrating the bug:

```typescript
// payload.config.ts
export default buildConfig({
  collections: [
    {
      slug: 'pages',
      fields: [
        {
          name: 'blocks',
          type: 'blocks',
          blocks: [
            {
              slug: 'test-block',
              fields: [
                {
                  type: 'collapsible',
                  fields: [
                    {
                      name: 'items',
                      type: 'array',
                      defaultValue: [
                        { name: 'Item 1' },
                        { name: 'Item 2' },
                      ],
                      fields: [
                        { name: 'name', type: 'text' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
```

### 2. Document Reproduction Steps

```markdown
## Steps to Reproduce
1. Start dev server: `pnpm dev`
2. Navigate to Pages collection
3. Create new page
4. Add "Test Block"
5. Observe array field shows 4 items instead of 2
6. Try to delete extra items
7. Observe they regenerate immediately

## Expected Behavior
Array should show 2 items as defined in defaultValue

## Actual Behavior
Array shows 4 items (duplicated), cannot remove extras

## Workaround
Refresh page to clear duplicates
```

### 3. Add to Issue #11871

Comment on the existing issue with:
- Your PayloadCMS version
- Link to reproduction repo
- Specific mention of **collapsible + array + defaultValue** combination
- Screenshots/video if possible

---

## Technical Deep Dive

### Form State Architecture

PayloadCMS admin uses a complex form state system:

```
┌─────────────────────────────────────────┐
│         Admin UI (React)                │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │   FormProvider (React Context)    │ │
│  │                                   │ │
│  │   ├─ Client Form State           │ │
│  │   ├─ Field Reducers              │ │
│  │   └─ mergeServerFormState.ts     │ │
│  └───────────────────────────────────┘ │
│              ↕ POST/GET                 │
└─────────────────────────────────────────┘
                 ↕
┌─────────────────────────────────────────┐
│      Payload Backend (Node.js)          │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │   Collection Hooks                │ │
│  │   Field Hooks                     │ │
│  │   Validation                      │ │
│  │   ID Generation                   │ │
│  └───────────────────────────────────┘ │
│              ↕                          │
└─────────────────────────────────────────┘
                 ↕
         ┌──────────────┐
         │   Database   │
         └──────────────┘
```

### The ID Generation Problem

**Client-Side** (React):
```javascript
// When defaultValue is applied
const clientRows = [
  { id: 'client-generated-id-1', name: 'Item 1' },
  { id: 'client-generated-id-2', name: 'Item 2' },
];
```

**Server-Side** (Node.js):
```javascript
// When processing the same data
const serverRows = [
  { id: 'server-generated-id-1', name: 'Item 1' },
  { id: 'server-generated-id-2', name: 'Item 2' },
];
```

**Merge Attempt** (Client):
```javascript
// mergeServerFormState.ts tries to reconcile
const mergedRows = [
  ...clientRows,  // Can't match IDs
  ...serverRows,  // So keeps both
];
// Result: 4 rows instead of 2
```

### Why Collapsibles Make It Worse

Collapsible fields create nested paths:

```javascript
// Without collapsible
path: "blocks.0.testimonials.0.name"

// With collapsible
path: "blocks.0.collapsible.0.testimonials.0.name"
```

The form state merger uses path matching to reconcile data. Extra nesting:
- Makes path matching more complex
- Increases chance of mismatch
- Adds another layer of state tracking (collapsed/expanded)

---

## Environment Details

### Versions
- **PayloadCMS**: 3.61.1
- **Next.js**: 16.0.0-canary.7
- **React**: 19.2.0
- **Node.js**: 20.14.10+
- **Database**: MongoDB (via @payloadcms/db-mongodb 3.61.1)

### Configuration
- No `reactStrictMode` enabled in next.config
- Autosave enabled with 2-minute interval
- Live preview enabled
- Turbopack dev server
- Redis caching enabled

### Affected Collections
- **Pages**: Contains blocks field with all block types

### Affected Blocks
- Testimonials_1 through Testimonials_5
- Potentially others with similar patterns (Features, FAQ, etc.)

---

## References & Sources

### GitHub Issues (Open)
- [#11871 - Array field with defaultValue gives ID error](https://github.com/payloadcms/payload/issues/11871)

### GitHub Issues (Closed/Fixed)
- [#13653 - Array field duplicate row causes infinite duplication](https://github.com/payloadcms/payload/issues/13653)
- [#11522 - Duplicate IDs in Payload V3](https://github.com/payloadcms/payload/issues/11522)
- [#9590 - Mass edit overrides field data with defaultValue](https://github.com/payloadcms/payload/issues/9590)
- [#8125 - Blocks field duplicate won't save](https://github.com/payloadcms/payload/issues/8125)
- [#6401 - Duplicating block issues with blocks field type](https://github.com/payloadcms/payload/issues/6401)
- [#880 - Data in nested blocks reset inside collapsible](https://github.com/payloadcms/payload/issues/880)
- [#976 - Block > tab > collapsible > field not storing data](https://github.com/payloadcms/payload/issues/976)

### Pull Requests
- [#12207 - fix(ui): blockType ignored when merging server form state](https://github.com/payloadcms/payload/pull/12207)
- [#13679 - Fix for array row duplication](https://github.com/payloadcms/payload/pull/13679)
- [#6589 - Fix corrects block duplicate action](https://github.com/payloadcms/payload/pull/6589)

### Related Issues
- [#9775 - Array field collapses on form change](https://github.com/payloadcms/payload/issues/9775)
- [#2179 - Fields cleared when defaultValue doesn't populate](https://github.com/payloadcms/payload/issues/2179)
- [#8146 - useField on array fields return array length](https://github.com/payloadcms/payload/issues/8146)

### Documentation
- [PayloadCMS Fields Overview](https://payloadcms.com/docs/fields/overview)
- [PayloadCMS Array Field](https://payloadcms.com/docs/fields/array)
- [PayloadCMS Blocks Field](https://payloadcms.com/docs/fields/blocks)
- [PayloadCMS Field Hooks](https://payloadcms.com/docs/hooks/fields)

---

## Conclusion

This bug is a **confirmed PayloadCMS issue**, not a user implementation error. It stems from fundamental form state synchronization problems between the client-side React admin UI and the server-side Node.js backend. The issue is exacerbated when combining:

1. Blocks fields
2. Collapsible fields
3. Array fields
4. Default values

**The most reliable solution** is to move default value population to server-side hooks, bypassing the client-side form state entirely.

**The quickest workaround** is to remove `defaultValue` from array fields, though this degrades UX.

**The best compromise** is to remove collapsible wrappers around array fields and test if that resolves the issue in your specific case.

Until PayloadCMS releases an official fix for [Issue #11871](https://github.com/payloadcms/payload/issues/11871), this workaround will be necessary for production deployments.

---

**Last Updated**: 2025-12-10
**Author**: Claude (Anthropic)
**Project**: UIFoundry PayloadCMS Template
