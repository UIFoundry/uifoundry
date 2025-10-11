# Cleanup & Learning

Analyze the ENTIRE conversation history and user corrections after a marketing blocks batch to improve future agent performance.

**Usage**: Run after completing Phase 1-3 of a batch and making manual corrections.

**CRITICAL**: This command must retrace the full conversation to identify where agents got confused, what questions they shouldn't have asked, and when user intervention was needed.

---

## Process

This command implements **Phase 4** of the Build Marketing Blocks workflow.

**Priority**: Conversation analysis BEFORE code analysis

### Step 1: Identify Work Scope

```bash
# Check recent commits
git log --oneline -15
```

**Two Scenarios**:

1. **All changes in one commit** (agent + user corrections together):
   - Analyze the commit message and files changed
   - Review the actual code to identify learnings
   - Focus on patterns that can improve future agent output

2. **Separate commits** (agent work, then user corrections):
   - Ask user: "Which commit hash represents when the agents finished?"
   - Use git diff to compare agent output vs final code

### Step 2: Analyze Changes

**If all in one commit**:
```bash
# View what was changed
git show <commit-hash> --stat

# Read key files to understand patterns
# Focus on config files, component files, registry files
```

**If separate commits**:
```bash
# Compare changes since agent completion
git diff <agent-commit> HEAD --stat

# Examine specific changed files
git diff <agent-commit> HEAD -- <file-path>
```

### Step 3: Extract Conversation Interventions

**Go through the conversation turn by turn** and document:

**Critical Questions**:
1. Where did the agent ask questions that docs should have answered?
2. When did the user have to correct the agent's direction?
3. What clarifications did the user provide?
4. Which assumptions did the agent make incorrectly?

**For Each Intervention**:
- **User Quote**: Exact words user said
- **Agent Confusion**: What agent was doing wrong
- **Root Cause**: Why agent didn't know (missing docs, wrong timing, unclear workflow)
- **Timing**: When in workflow agent needed this info
- **Fix Location**: Where in docs to add this

**Example**:
```markdown
**Turn #15**: User said "uploadField is used by mediaField, don't remove it"
- Agent was: Trying to delete all uploadField files
- Root Cause: Agent didn't understand field architecture
- Needed At: Phase 1, Step 2, BEFORE starting any migration
- Add To: New section "Understanding Field Dependencies" before migration steps
```

### Step 4: Categorize Code Corrections

Group code changes into categories:

**Code Quality**:
- Tailwind class ordering
- Code formatting
- Import organization

**Functional Fixes**:
- Array field configuration
- Import path corrections
- Missing validations

**Performance**:
- Animation speed adjustments
- Rendering optimizations

**UX/Design**:
- Layout tweaks
- Spacing adjustments

### Step 5: Map Learnings to Workflow Timing

**CRITICAL STEP**: For each learning, determine WHEN in the workflow it should appear:

**Timing Questions**:
1. At what phase/step did agent need this info?
2. What was agent about to do when they needed it?
3. Should this be BEFORE an action (warning) or AFTER (validation)?
4. Is this a pre-requisite for a step?

**Example Mapping**:
```markdown
Learning: "Registry has both index.tsx AND config.ts files"
- User intervention: Turn #23, after agent finished registry migration
- Agent needed it: Phase 2, Step 1, BEFORE starting transformation
- Format: Explicit checklist item
- Location: Phase 2, Quick Process Overview
```

### Step 6: Identify Learnable Patterns

For each correction AND intervention ask:
1. Was this predictable?
2. Is this project-specific or general?
3. Can it be automated?
4. Should it be documented?

### Step 7: Update Documentation

Add learnings to the RIGHT place at the RIGHT time:
- `agent-os/workflows/implementation/build-marketing-blocks.md`
- `agent-os/workflows/documentation/add-registry-component.md`
- Create new standards docs as needed

### Step 8: Generate Comprehensive Report

Create summary report at: `agent-os/workflows/implementation/learning-reports/YYYY-MM-DD-[name].md`

**Report Must Include**:

**Part 1: Conversation Analysis**
- Critical intervention points with quotes
- Questions agent asked that shouldn't have been necessary
- User explanations that should be documentation
**Part 2: Code Corrections Analysis**
- Files changed count by category
- Detailed functional fixes
- Architecture improvements

**Part 3: Extracted Learnings with Timing**
- Each learning with conversation context
- Timing map (when agent needed it)
- Documentation fixes with exact locations

**Part 4: Documentation Updates Made**
- Workflow updates (with line numbers/sections)
- New documents created
- Agent prompt enhancements

**Part 5: Future Prevention**
- Immediate actions completed
- Recommended automation

**Part 6: Impact Assessment**
- Time saved (this session vs future)
- Quality improvements
- Knowledge transfer metrics

**Part 7: Conversation-to-Documentation Map**
- Table showing each user quote → where it was added to docs

---

## Example Output

```markdown
## Cleanup & Learning Report - Hero Batch

### User Corrections Analyzed
- 10 files changed
- 3 functional fixes
- 7 code quality improvements

### Key Learnings
1. **Array Field Configuration**: Always add minRows: 0, maxRows: 10
2. **MediaField Import**: Use @/registry/default/lib/fields/media
3. **Animation Speed**: Canvas at 20fps, fade rate 0.97
4. **Tailwind Classes**: Prettier handles ordering (agents skip this)

### Documentation Updated
- ✅ Added array field rules to Phase 1 Step 3B
- ✅ Updated registry import patterns in Phase 2
- ✅ Added animation performance to Phase 1 Step 4B

### Estimated Impact
- **Time Saved**: 15-20 minutes per future batch
- **Quality**: More consistent code patterns
- **Knowledge**: Preserved for all future agents
```

---

## See Full Documentation

**Phase 4 Details**: `@agent-os/workflows/implementation/build-marketing-blocks.md` (Phase 4 section)
