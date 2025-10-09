# Tailark Component Filtering Rules

## Critical Assumption

**Tailark components are numbered sequentially** (Hero 1, Hero 2, Hero 3, etc.).

**If a PayloadCMS block already exists** (e.g., Hero_1, Hero_2), **assume it was built from the corresponding Tailark component** (Tailark Hero 1, Tailark Hero 2).

**Therefore**: When searching Tailark, exclude already-built component numbers to prevent duplication.

---

## Filtering Logic

### Step 1: Check What Exists

**Before searching Tailark, check**:

1. **README.md progress**:

   ```bash
   grep "Hero" README.md
   # Output: - [ ] Hero (2/5)
   # Interpretation: 2 Hero blocks already built
   ```

2. **Source directory**:
   ```bash
   ls src/payload/blocks/Hero/
   # Output: Hero_1/ Hero_2/
   # Interpretation: Hero_1 and Hero_2 exist
   ```

### Step 2: Determine What to Exclude

**Mapping rule**: `Hero_N` = `Tailark Hero N`

**Examples**:

- `Hero_1` exists → Exclude "Tailark Hero 1"
- `Hero_2` exists → Exclude "Tailark Hero 2"
- `Hero_3` doesn't exist → Show "Tailark Hero 3"

**Result**: Only show Tailark Hero 3, 4, 5, 6, etc.

### Step 3: Present Filtered Results

```markdown
🔍 Tailark FREE tier - Hero Components:

**Current progress**: Hero (2/5)
**Already built**: Hero_1, Hero_2

**Available components (excluding already built)**: 3. Tailark Hero 3 - [description] 4. Tailark Hero 4 - [description] 5. Tailark Hero 5 - [description]
...

⚠️ Not showing Hero 1 and Hero 2 (already built as Hero_1 and Hero_2)
```

---

## Examples by Block Type

### Hero Blocks

**Scenario**: Hero_1 and Hero_2 exist

**Filtering**:

- ❌ Don't show: Tailark Hero 1, Tailark Hero 2
- ✅ Show: Tailark Hero 3, 4, 5, 6, 7, 8, etc.

**User sees**:

```
Available:
3. Tailark Hero 3 - Animated fade
4. Tailark Hero 4 - Split screen
5. Tailark Hero 5 - Video background
...
```

### Features Blocks

**Scenario**: Feature_1, Feature_2, Feature_3 exist

**Filtering**:

- ❌ Don't show: Tailark Features 1, 2, 3
- ✅ Show: Tailark Features 4, 5, 6, 7, etc.

**User sees**:

```
Available:
4. Tailark Features 4 - Grid layout
5. Tailark Features 5 - Cards with icons
6. Tailark Features 6 - List with images
...
```

### Pricing Blocks

**Scenario**: Nothing exists yet (Pricing_1, etc. don't exist)

**Filtering**:

- ✅ Show: Tailark Pricing 1, 2, 3, 4, 5, etc. (all available)

**User sees**:

```
Available:
1. Tailark Pricing 1 - Simple 3-column
2. Tailark Pricing 2 - Popular badge
3. Tailark Pricing 3 - Feature comparison
...
```

---

## Why This Matters

### Problem Without Filtering

**Without filtering**:

```
User already built Hero_1 from Tailark Hero 1
Command shows: Tailark Hero 1, 2, 3, 4...
User might select Hero 1 again
Result: Duplicate component (Hero_1 already exists with same design)
```

### Solution With Filtering

**With filtering**:

```
User already built Hero_1 from Tailark Hero 1
Command checks: Hero_1 exists
Command hides: Tailark Hero 1
Command shows: Tailark Hero 3, 4, 5, 6... (only unused)
User selects: Hero 3
Result: New unique component (Hero_3 with different design)
```

---

## Implementation

### In Commands

**build-marketing-block.md**:

```markdown
1. Check existing blocks: ls src/payload/blocks/Hero/
2. Extract numbers: Hero_1, Hero_2 → [1, 2]
3. Search Tailark for Hero components
4. Filter out numbers 1 and 2
5. Present only Hero 3, 4, 5, etc.
```

**build-marketing-blocks-batch.md**:

```markdown
1. Check existing blocks: grep "Hero" README.md → (2/5)
2. Extract count: 2 blocks exist
3. Search Tailark for Hero components
4. Filter out first 2 numbers
5. Present only Hero 3, 4, 5, 6, 7, etc.
6. User selects 5 → likely Hero 3, 4, 5, 6, 7
```

### Pseudo-code

```python
# Get existing blocks
existing = ls("src/payload/blocks/Hero/")
# Result: ["Hero_1", "Hero_2"]

# Extract numbers
existing_numbers = [1, 2]

# Fetch Tailark components
tailark_components = fetch_tailark("hero-sections")
# Result: [
#   {name: "Hero 1", url: "..."},
#   {name: "Hero 2", url: "..."},
#   {name: "Hero 3", url: "..."},
#   ...
# ]

# Filter out existing
filtered = [
  c for c in tailark_components
  if extract_number(c.name) not in existing_numbers
]
# Result: [
#   {name: "Hero 3", url: "..."},
#   {name: "Hero 4", url: "..."},
#   ...
# ]

# Present to user
present(filtered)
```

---

## Edge Cases

### What if Tailark doesn't have numbered components?

**Fallback**: If Tailark components aren't clearly numbered, present all and let user choose (they'll see duplicate if any).

**Example**: Some categories might use names instead of numbers:

- "Modern Hero"
- "Minimal Hero"
- "Gradient Hero"

In this case, filtering by number won't work. Just present all options.

### What if user built from non-Tailark source?

**Scenario**: Hero_1 was built from Awesome Shadcn UI, not Tailark

**Problem**: Filtering would incorrectly exclude Tailark Hero 1

**Mitigation**: This is acceptable. The assumption is that you're building sequentially from Tailark. If you deviate, you might see some already-used designs, but user can skip them.

### What if gaps exist?

**Scenario**: Hero_1 and Hero_3 exist, but not Hero_2

**Filtering**: Would exclude only 1 and 3, show 2, 4, 5, etc.

**User can**: Select Hero 2 to fill the gap, or continue with 4, 5, etc.

---

## For Agents: Enforcement

When searching Tailark for components, you MUST:

1. ✅ **Check existing blocks** before presenting options
2. ✅ **Extract block numbers** from existing block names
3. ✅ **Filter Tailark results** to exclude those numbers
4. ✅ **Inform user** which numbers were excluded and why
5. ✅ **Present only available** (non-duplicate) options

**Validation**:

```bash
# After filtering, verify no duplicates would be created
# Compare: Tailark Hero 3 selection
# Against: ls src/payload/blocks/Hero/
# Ensure: Hero_3 doesn't already exist
```

**Error handling**:

```
If user selects filtered number (shouldn't happen):
  Warn: "Hero_3 already exists. Select a different option."
  Re-prompt for selection
```

---

## Summary

**Rule**: When searching Tailark, exclude component numbers that already exist as PayloadCMS blocks.

**Why**: Prevents building duplicate components with the same design.

**How**:

1. Check what exists: `ls src/payload/blocks/[Type]/`
2. Extract numbers: `Hero_1, Hero_2` → `[1, 2]`
3. Filter Tailark: Hide Hero 1, Hero 2
4. Present: Show Hero 3, 4, 5, etc.

**User experience**: Always sees fresh, unused component designs from Tailark.
