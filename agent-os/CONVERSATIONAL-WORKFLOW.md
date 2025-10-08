# Conversational Multi-Agent Workflow Guide

This guide shows how to use UIFoundry's multi-agent system **conversationally** - just talk naturally, and the system automatically spawns the right specialist agents to complete your tasks.

## How It Works

### Traditional vs Conversational

❌ **OLD WAY** (Manual commands):

```
/new-spec "Add Stats block"
[wait for completion]
/create-spec
[wait for completion]
/implement-spec
```

✅ **NEW WAY** (Natural conversation):

```
You: "I want to add a Stats block component with 3 variants for
     displaying statistics in different layouts"

AI: [Automatically recognizes this is a new feature]
    └─ Spawns spec-initializer
    └─ Spawns spec-researcher to gather requirements
    [Asks you questions about the feature]

You: [Answers questions]

AI: [Automatically creates specification]
    └─ Spawns spec-writer
    └─ Spawns tasks-list-creator
    └─ Spawns spec-verifier
    "Spec created! Ready to implement?"

You: "Yes, let's build it"

AI: [Automatically implements]
    └─ Spawns ui-designer for components
    └─ Spawns registry-porter for registry migration
    └─ Spawns docs-writer for documentation
    └─ Spawns implementation-verifier for quality
```

## Your Multi-Agent System

### Main Coordinator (Your Conversation Partner)

The AI you talk to acts as a **coordinator** that:

1. Understands your intent
2. Chooses the right workflow
3. Spawns specialist agents
4. Orchestrates the process
5. Reports results back to you

### Specialist Agents (Auto-Spawned)

These agents work behind the scenes:

#### Planning Phase

- **product-planner** - Product vision and roadmap
- **spec-initializer** - Creates spec folder structure
- **spec-researcher** - Gathers requirements through Q&A

#### Specification Phase

- **spec-writer** - Writes comprehensive specifications
- **tasks-list-creator** - Breaks down into actionable tasks
- **spec-verifier** - Verifies completeness and accuracy

#### Implementation Phase

- **ui-designer** - Implements UI components and blocks
- **api-engineer** - Implements backend/API features
- **database-engineer** - Implements database changes
- **testing-engineer** - Implements tests
- **registry-porter** - Migrates to registry with testing
- **docs-writer** - Creates documentation

#### Verification Phase

- **implementation-verifier** - Verifies implementation quality
- **frontend-verifier** - Verifies frontend code standards
- **backend-verifier** - Verifies backend code standards

## Conversational Patterns

### Pattern 1: New Feature Request

**You say**:

```
"I want to add a Hero block variant with a video background
and call-to-action buttons"
```

**What happens automatically**:

1. System recognizes "I want to add" = new feature
2. Spawns `spec-initializer` → Creates `specs/YYYY-MM-DD-hero-video/`
3. Spawns `spec-researcher` → Asks you questions:
   - "What video formats should be supported?"
   - "How many CTA buttons?"
   - "Should video be muted by default?"
4. You answer questions naturally in conversation
5. Spawns `spec-writer` → Creates detailed spec.md
6. Spawns `tasks-list-creator` → Creates tasks.md
7. Spawns `spec-verifier` → Verifies completeness
8. Reports back: "Spec created! 12 tasks identified. Ready to implement?"

### Pattern 2: Implementation Request

**You say**:

```
"Let's implement the Hero video block we just spec'd"
```

**What happens automatically**:

1. System recognizes "implement" = execution phase
2. Loads spec from `specs/[most-recent]/`
3. Reads tasks list
4. Spawns implementer agents based on task assignments:
   - `ui-designer` for component implementation
   - `testing-engineer` for tests
5. Spawns `registry-porter` for registry migration
6. Spawns `docs-writer` for documentation
7. Spawns `implementation-verifier` for quality check
8. Reports back with implementation summary

### Pattern 3: Documentation Request

**You say**:

```
"Create documentation for the Header_2 block"
```

**What happens automatically**:

1. System recognizes "documentation" task
2. Spawns `docs-writer`
3. Agent reads component from registry
4. Creates MDX file with 5 sections
5. Updates registry mappings
6. Updates component checklist
7. Updates navigation
8. Reports back: "Documentation created at content/docs/blocks/header-2.mdx"

### Pattern 4: Testing Request

**You say**:

```
"Test the Stats block installation and make sure it works in the browser"
```

**What happens automatically**:

1. System recognizes "test" task
2. Spawns `registry-porter` (testing specialist)
3. Agent runs CLI installation test
4. Agent opens browser to localhost:3001
5. Agent tests rendering and interactions
6. Agent checks console for errors
7. Reports back with test results

### Pattern 5: Bug Fix Request

**You say**:

```
"The Header field isn't validating properly - can you fix it?"
```

**What happens automatically**:

1. System recognizes "fix" task
2. Spawns appropriate implementer (`ui-designer` or `api-engineer`)
3. Agent analyzes the issue
4. Agent fixes the code
5. Agent tests the fix
6. Spawns `registry-porter` to update registry if needed
7. Spawns `docs-writer` to update docs if needed
8. Reports back with fix summary

## Natural Language Triggers

### Triggers for New Spec

These phrases trigger the spec creation workflow:

- "I want to add..."
- "Let's create..."
- "Can we build..."
- "I need a feature that..."
- "Add a new..."

### Triggers for Implementation

These phrases trigger the implementation workflow:

- "Let's implement..."
- "Build this spec"
- "Let's build..."
- "Can you implement..."
- "Execute the tasks"

### Triggers for Documentation

These phrases trigger documentation workflow:

- "Create docs for..."
- "Document the..."
- "Add documentation..."
- "Write docs for..."
- "Update the documentation..."

### Triggers for Testing

These phrases trigger testing workflow:

- "Test the..."
- "Verify that..."
- "Make sure it works..."
- "Check if..."
- "Validate the..."

## Example Conversation Flow

### Complete Feature Development

```
You: I want to add a footer block with social links and newsletter signup

AI: Great! I'm creating a spec for the footer block feature.
    [Spawns spec-initializer, spec-researcher]

    To create a comprehensive spec, I need to understand:

    1. Social Links Section:
       - Which social platforms should be supported?
       - Should icons be customizable?
       - Should links open in new tabs?

    2. Newsletter Section:
       - What email service integration? (Mailchimp, ConvertKit, etc.)
       - What fields are needed? (just email, or name + email?)
       - Success message after signup?

    3. Additional Sections:
       - Should there be navigation links?
       - Copyright text customization?
       - Logo display?

You: 1. Support Twitter, LinkedIn, GitHub, and custom links
     2. Integrate with ConvertKit, just email field needed
     3. Yes to all - make everything customizable

AI: Perfect! Creating detailed specification...
    [Spawns spec-writer, tasks-list-creator, spec-verifier]

    ✅ Spec Created: Footer Block with Social Links & Newsletter

    **Features**:
    - Social links (Twitter, LinkedIn, GitHub, custom)
    - ConvertKit newsletter integration
    - Navigation links section
    - Customizable copyright & logo

    **Tasks Breakdown**: 15 tasks identified
    - Planning & architecture (2 tasks)
    - Component implementation (6 tasks)
    - Integration (3 tasks)
    - Testing & documentation (4 tasks)

    Estimated complexity: Medium

    Ready to implement? I can start building this now.

You: Yes, let's build it

AI: Starting implementation...
    [Spawns ui-designer, api-engineer, testing-engineer]

    Phase 1: Component Implementation
    └─ ui-designer: Creating Footer block component ✓
    └─ ui-designer: Implementing social links field ✓
    └─ ui-designer: Adding newsletter form ✓

    Phase 2: Integration
    └─ api-engineer: ConvertKit API integration ✓
    └─ testing-engineer: Adding form validation tests ✓

    Phase 3: Registry & Documentation
    [Spawns registry-porter, docs-writer]
    └─ registry-porter: Migrating to registry ✓
    └─ registry-porter: CLI installation test ✓
    └─ registry-porter: Browser testing ✓
    └─ docs-writer: Creating documentation ✓

    Phase 4: Verification
    [Spawns implementation-verifier]
    └─ Code quality check ✓
    └─ Standards compliance ✓
    └─ Documentation completeness ✓

    ✅ Implementation Complete!

    **What was built**:
    - Footer block at src/payload/blocks/Footer/Footer_1/
    - Registry component at registry/payload/blocks/footer/footer-1/
    - Documentation at content/docs/blocks/footer-1.mdx
    - ConvertKit integration at src/server/api/newsletter/
    - 8 tests added and passing

    **Next Steps**:
    You can now:
    - View the component at localhost:3001
    - Add it to pages through PayloadCMS admin
    - Install via: npx shadcn add @uifoundry/footer-1

You: Perfect! Can you also create a minimal variant without the newsletter?

AI: Absolutely! I'll create Footer_2 variant.
    [Spawns ui-designer]

    Based on Footer_1, creating minimal variant:
    - Same structure, no newsletter form
    - Cleaner layout with just social + copyright
    - All other customization options retained

    [Implementation continues...]
```

## Proactive Agent Behavior

### The AI Will Automatically

1. **Ask clarifying questions** when requirements are unclear
2. **Suggest improvements** based on existing patterns
3. **Check existing code** before implementing duplicates
4. **Run tests** after implementation
5. **Update documentation** when code changes
6. **Verify quality** before marking complete

### You Can Also

1. **Give high-level direction**: "Make it match the Hero block pattern"
2. **Ask for options**: "What's the best way to handle this?"
3. **Request changes mid-flow**: "Actually, let's add dark mode support too"
4. **Skip phases**: "Skip the spec, just implement this quick fix"

## Advanced Patterns

### Iterative Development

```
You: Add a Stats block

AI: [Creates spec, asks questions]

You: [Answers]

AI: [Implements Stats_1]

You: Can you make a version with animated counters?

AI: [Spawns ui-designer]
    Creating Stats_2 with animation...
```

### Batch Operations

```
You: Create 3 Hero variants - video background, split layout,
     and minimal text-only

AI: I'll create specs for all three variants:
    [Spawns spec-researcher for each]

    Let me gather requirements for each variant...

    1. Hero Video variant:
       - [questions about video]

    2. Hero Split variant:
       - [questions about split layout]

    3. Hero Minimal variant:
       - [questions about minimal design]
```

### Cross-Component Work

```
You: Update all Header blocks to support the new logo field

AI: I found 3 Header block variants that need updates:
    - Header_1
    - Header_2
    - Header_Custom

    I'll update each one:
    [Spawns ui-designer for each]
    [Spawns registry-porter for each]
    [Spawns docs-writer for each]
```

## Key Advantages

### Natural Communication

- No need to memorize commands
- Explain what you want in plain English
- AI figures out the right workflow

### Automatic Orchestration

- AI spawns the right agents
- Handles dependencies automatically
- Coordinates sequential phases

### Quality Built-In

- Verification happens automatically
- Testing integrated into flow
- Documentation created alongside code

### Flexible & Iterative

- Change direction mid-conversation
- Add requirements on the fly
- Skip unnecessary steps

## Tips for Effective Conversations

### Be Specific

❌ "Add a component"
✅ "Add a Stats block with 3 layout variants showing different ways to display numerical data"

### Provide Context

❌ "Make it work"
✅ "The Hero_3 block should follow the same pattern as Hero_1 but with video background support"

### Ask Questions

✅ "What's the best way to handle responsive images in this block?"
✅ "Should this integrate with the existing media field or create a new one?"

### Iterate Naturally

✅ "Actually, let's add dark mode support to that component too"
✅ "Can you refactor that to use the shared field config instead?"

## Common Workflows

### Quick Fix (No Spec Needed)

```
You: "Fix the TypeScript error in Header field config"
AI: [Spawns ui-designer, fixes directly, no spec]
```

### New Component (Full Flow)

```
You: "Add new CTA block component"
AI: [Full workflow: spec → implement → test → document]
```

### Update Existing

```
You: "Update Hero_1 to support background videos"
AI: [Updates code → updates registry → updates docs]
```

### Documentation Only

```
You: "Create docs for the media field"
AI: [Spawns docs-writer only]
```

## Summary

Your multi-agent system is **already set up and ready**. Just:

1. **Talk naturally** about what you want to build
2. **Answer questions** when the AI asks for clarification
3. **Approve next steps** when prompted
4. **Provide feedback** if something needs adjustment

The system will automatically:

- Choose the right workflow
- Spawn specialist agents
- Coordinate the process
- Test and verify
- Create documentation
- Report results

**No commands to memorize. No complex syntax. Just conversation.** 🚀
