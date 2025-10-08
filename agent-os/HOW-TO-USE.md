# How to Use UIFoundry's Multi-Agent System

## Quick Answer: YES! ✅

**You already have a conversational multi-agent system set up.** Just talk naturally, and the system automatically spawns specialist agents to complete your tasks.

## What You Have

### Agent OS 2.0 Multi-Agent Mode (Already Installed)

```
agent-os/
├── config.yml              # Multi-agent mode: ENABLED ✅
├── workflows/              # Process instructions for agents
├── standards/              # Coding rules injected into agents
└── specs/                  # Generated specifications

.claude/
├── agents/agent-os/        # Specialist subagents (compiled)
│   ├── spec-initializer.md
│   ├── spec-researcher.md
│   ├── spec-writer.md
│   ├── tasks-list-creator.md
│   ├── implementers/
│   │   ├── ui-designer.md
│   │   ├── api-engineer.md
│   │   ├── database-engineer.md
│   │   ├── testing-engineer.md
│   │   ├── registry-porter.md    # ← Just added!
│   │   └── docs-writer.md        # ← Just added!
│   └── verifiers/
│       ├── frontend-verifier.md
│       └── backend-verifier.md
└── commands/agent-os/      # Slash commands (trigger workflows)
    ├── /plan-product
    ├── /new-spec
    ├── /create-spec
    └── /implement-spec
```

## How to Use It

### Option 1: Talk Naturally (Recommended)

Just describe what you want in plain English:

```
You: "I want to add a Stats block component with 3 different layout variants"

AI: [Automatically understands intent]
    ├─ Recognizes "new feature" pattern
    ├─ Spawns spec-initializer agent
    ├─ Spawns spec-researcher agent
    └─ Asks you questions to gather requirements

[Conversation continues naturally...]

AI: Spec created! Ready to implement?

You: Yes

AI: [Automatically starts implementation]
    ├─ Spawns ui-designer agent
    ├─ Spawns testing-engineer agent
    ├─ Spawns registry-porter agent
    ├─ Spawns docs-writer agent
    └─ Spawns implementation-verifier agent
```

**No commands needed. Just conversation.**

### Option 2: Use Slash Commands (If Preferred)

You can also use explicit commands:

```
/new-spec Stats block with 3 variants
```

The system spawns the same agents either way.

## Available Specialist Agents

### Planning & Specification

- **spec-initializer** - Creates spec folder structure
- **spec-researcher** - Gathers requirements through Q&A with you
- **spec-writer** - Writes comprehensive specifications
- **tasks-list-creator** - Breaks work into actionable tasks
- **spec-verifier** - Verifies completeness

### Implementation

- **ui-designer** - Implements UI components, blocks, fields
- **api-engineer** - Implements backend/API features
- **database-engineer** - Implements database changes
- **testing-engineer** - Implements tests
- **registry-porter** - Migrates to registry + CLI/browser testing
- **docs-writer** - Creates documentation + updates mappings

### Verification

- **implementation-verifier** - Verifies overall quality
- **frontend-verifier** - Verifies frontend code standards
- **backend-verifier** - Verifies backend code standards

## Example Workflows

### Example 1: New Component (Full Flow)

```
You: "I want to add a Footer block with social links and newsletter signup"

AI: Great! Let me gather requirements...
    [spec-researcher asks you questions]

You: [Answer questions about features, layout, integrations]

AI: [spec-writer creates detailed spec]
    [tasks-list-creator breaks it into tasks]
    [spec-verifier validates completeness]

    Spec created! 15 tasks identified. Ready to implement?

You: Yes, let's build it

AI: [ui-designer implements Footer_1 component]
    [api-engineer adds ConvertKit integration]
    [testing-engineer adds tests]
    [registry-porter migrates to registry + tests CLI + browser]
    [docs-writer creates documentation]
    [implementation-verifier validates everything]

    ✅ Complete! Footer_1 ready to use.
```

### Example 2: Quick Fix (Skip Spec)

```
You: "Fix the TypeScript error in the Header field config"

AI: [ui-designer agent fixes the error directly]
    [registry-porter updates registry if needed]

    ✅ Fixed! TypeScript error resolved.
```

### Example 3: Documentation Only

```
You: "Create documentation for the media field"

AI: [docs-writer agent creates MDX file]
    [Updates registry mappings]
    [Updates navigation]

    ✅ Documentation created at content/docs/fields/media-field.mdx
```

### Example 4: Testing

```
You: "Test the Hero_3 block - make sure CLI installation works and it renders correctly"

AI: [registry-porter agent runs CLI test]
    [Opens browser to localhost:3001]
    [Tests rendering and interactions]
    [Checks console for errors]

    ✅ Tests passed:
    - CLI installation successful
    - Component renders correctly
    - No console errors
    - Responsive design validated
```

## Conversational Triggers

The AI automatically detects intent from natural language:

### New Feature Triggers

- "I want to add..."
- "Let's create..."
- "Can we build..."
- "Add a new..."

### Implementation Triggers

- "Let's implement..."
- "Build this"
- "Let's build..."
- "Execute the tasks"

### Documentation Triggers

- "Create docs for..."
- "Document the..."
- "Write docs for..."

### Testing Triggers

- "Test the..."
- "Make sure it works..."
- "Verify that..."

## Agent Coordination

### The System Automatically:

1. **Understands your intent** - Recognizes what you want to accomplish
2. **Chooses the right workflow** - Selects planning, spec, or implementation
3. **Spawns specialist agents** - Delegates to experts for each task
4. **Coordinates dependencies** - Ensures proper sequencing
5. **Tests and verifies** - Quality checks at each phase
6. **Reports results** - Keeps you informed of progress

### You Just:

1. **Describe what you want** - In plain English
2. **Answer questions** - When AI needs clarification
3. **Approve next steps** - When prompted
4. **Provide feedback** - If adjustments needed

## Workflow Phases

### Phase 0: Product Planning (One-Time)

```
You: /plan-product
```

- Defines mission, roadmap, tech stack
- Run once at project start

### Phase 1: Research & Requirements

```
You: "I want to add [feature]"
```

- spec-initializer creates spec folder
- spec-researcher asks questions
- Saves requirements

### Phase 2: Specification

```
AI: [Automatically after Phase 1]
```

- spec-writer creates detailed spec
- tasks-list-creator makes task breakdown
- spec-verifier validates completeness

### Phase 3: Implementation

```
You: "Let's build it"
```

- ui-designer / api-engineer / etc. implement code
- testing-engineer adds tests
- registry-porter migrates to registry
- docs-writer creates documentation
- verifiers check quality

## Key Features

### Intelligent Agent Selection

The system chooses the right agents based on the task:

- **UI work** → ui-designer
- **API work** → api-engineer
- **Database** → database-engineer
- **Testing** → testing-engineer
- **Registry** → registry-porter
- **Docs** → docs-writer

### Standards Injection

Each agent gets relevant coding standards:

- **Frontend agents** get frontend + global standards
- **Backend agents** get backend + global standards
- **All agents** get critical restrictions (no deploy/push)

### Automatic Verification

Quality checks happen automatically:

- Code follows standards
- Tests pass
- Documentation complete
- Registry installation works
- Browser functionality validated

## Best Practices

### 1. Be Specific

❌ "Add a component"
✅ "Add a Stats block with 3 variants showing metrics in different layouts"

### 2. Provide Context

❌ "Make it work"
✅ "Follow the same pattern as Hero_1 but with video background"

### 3. Ask Questions

✅ "What's the best way to handle responsive images?"
✅ "Should this use the existing media field?"

### 4. Iterate Naturally

✅ "Actually, also add dark mode support"
✅ "Let's refactor that to use shared config"

## Documents to Read

### Essential

1. **`agent-os/README.md`** - Agent OS 2.0 overview
2. **`agent-os/CONVERSATIONAL-WORKFLOW.md`** - How to use conversationally
3. **`agent-os/OPENCODE-WORKFLOW.md`** - Detailed workflow guide

### For Reference

4. **`agent-os/standards/global/critical-restrictions.md`** - What agents can't do
5. **`agent-os/workflows/documentation/`** - Component development workflows
6. **`agent-os/MIGRATION-SUMMARY.md`** - What changed in v2.0

## Quick Start

### To Build a New Component:

1. **Start the conversation**:

   ```
   "I want to add a [component type] that [does what]"
   ```

2. **Answer questions** when the AI asks for details

3. **Approve implementation** when spec is ready

4. **Review results** when complete

That's it! The system handles the rest.

### To Fix Something:

```
"Fix [the problem] in [the file/component]"
```

The AI will fix it directly (no spec needed for simple fixes).

### To Create Documentation:

```
"Create documentation for [component name]"
```

The AI spawns docs-writer to create complete docs.

### To Test Something:

```
"Test [component] - make sure it works in the browser"
```

The AI spawns registry-porter to run tests.

## Summary

You have a **fully functional multi-agent system** that:

✅ Works conversationally (just talk naturally)
✅ Spawns specialist agents automatically  
✅ Coordinates complex workflows
✅ Tests and verifies quality
✅ Creates documentation
✅ Reports results clearly

**No complex setup needed. It's ready to use right now.**

Just start a conversation and describe what you want to build! 🚀

---

## Next Steps

1. **Try it**: Start a conversation with a feature idea
2. **Read**: `CONVERSATIONAL-WORKFLOW.md` for detailed examples
3. **Customize**: Add more specialist agents as needed
4. **Enjoy**: Building features with AI coordination!
