# Hybrid HITL Approach: Native SDK + Custom Implementation

**Purpose**: Leverage OpenAI Agents SDK's built-in Human-in-the-Loop features while adding custom streaming for optimal UX

---

## OpenAI Agents SDK Native HITL Features

The SDK provides built-in HITL support through **approval gates**:

### How It Works

```typescript
// Tool definition with approval required
const selectBlockTool = {
  name: 'select_block',
  description: 'Choose a UI block for the current position',
  parameters: z.object({
    blockType: z.enum(['hero_1', 'hero_2', /* ... */]),
    reasoning: z.string(),
  }),

  // 🔑 KEY FEATURE: Require approval before executing
  requiresApproval: true,

  async execute({ blockType, reasoning }) {
    // This only runs after human approves
    return {
      blockType,
      schema: getBlockSchema(blockType),
    };
  }
};

const agent = new Agent({
  name: 'Block Selector',
  model: 'claude-sonnet-4.5',
  tools: [selectBlockTool],
});

// Agent loop automatically pauses when requiresApproval tool is called
const result = await agent.run(input, {
  onToolApprovalRequired: async (toolCall) => {
    // SDK pauses here and waits for approval
    console.log('Agent wants to:', toolCall.function.name);
    console.log('Arguments:', toolCall.function.arguments);

    // Show to user, get approval
    const approved = await askUserForApproval({
      action: toolCall.function.name,
      details: toolCall.function.arguments,
    });

    return approved; // true = proceed, false = reject
  }
});
```

### SDK HITL Benefits

✅ **Built-in pause mechanism** - Agent loop naturally waits
✅ **No custom state management** - SDK handles resume logic
✅ **Works with streaming** - Can stream output while paused
✅ **Tool-level granularity** - Choose which tools need approval
✅ **Rejection handling** - Agent can recover if user rejects

---

## Hybrid Architecture: Best of Both Worlds

### What to Use SDK HITL For

**1. Critical Decision Points**
- Color palette approval
- Page structure approval
- First block of each page (set the tone)
- Media selection (choose from options)

**2. Destructive Actions**
- Deleting content user provided
- Overwriting existing data
- Making irreversible changes

**Example**:
```typescript
const colorPaletteAgent = new Agent({
  name: 'Color Palette Designer',
  model: 'gpt-4o',

  tools: [{
    name: 'finalize_color_palette',
    requiresApproval: true, // 🔑 SDK HITL
    parameters: z.object({
      palette: ColorPaletteSchema,
    }),
    async execute({ palette }) {
      // Save to database
      return await saveColorPalette(palette);
    }
  }],
});

// Usage
const result = await colorPaletteAgent.run(input, {
  onToolApprovalRequired: async (toolCall) => {
    const palette = JSON.parse(toolCall.function.arguments).palette;

    // Stream to client: "I've designed this palette, approve?"
    await publishUpdate(jobId, {
      type: 'approval_required',
      subject: 'color_palette',
      data: palette,
      preview: renderColorSwatches(palette),
    });

    // Wait for user response via SSE feedback channel
    const response = await waitForUserResponse(jobId, 'color_palette', 60000);

    return response.approved;
  }
});
```

---

### What to Use Custom Streaming For

**1. Progress Updates**
- "Planning your homepage..."
- "Writing hero headline..."
- "Uploading images..."

**2. Partial Results**
- Stream copy as it's being written
- Show blocks appearing one by one
- Real-time preview updates

**3. Soft Feedback** (non-blocking)
- User can comment without stopping generation
- "This looks good so far"
- "Can you make the next section more technical?"

**4. Multi-Agent Coordination**
- Execution agent orchestrating multiple specialists
- Show which agent is currently working
- Display progress across all pages

**Example**:
```typescript
// Custom streaming (doesn't pause agent)
copywriterAgent.on('stream', (chunk) => {
  // As agent writes, stream to client
  publishUpdate(jobId, {
    type: 'copy_preview',
    blockId: currentBlock,
    field: chunk.field,
    content: chunk.content,
  });
});

// User can watch in real-time, provide soft feedback
// But agent doesn't stop unless user explicitly requests
```

---

## Recommended Hybrid Flow

### Phase 1: Planning (SDK HITL)

```typescript
// Orchestrator plans the site
const orchestrator = new Agent({
  name: 'Site Orchestrator',
  model: 'claude-opus-4.5',

  tools: [{
    name: 'finalize_site_plan',
    requiresApproval: true, // 🔑 Pause for approval

    parameters: z.object({
      sitePlan: SitePlanSchema,
    }),

    execute: async ({ sitePlan }) => {
      return sitePlan;
    }
  }],
});

await orchestrator.run(userPrompt, {
  // Custom streaming: show thinking process
  onStream: (chunk) => {
    publishUpdate(jobId, {
      type: 'planning_progress',
      content: chunk,
    });
  },

  // SDK HITL: pause for plan approval
  onToolApprovalRequired: async (toolCall) => {
    const plan = JSON.parse(toolCall.function.arguments).sitePlan;

    publishUpdate(jobId, {
      type: 'approval_required',
      subject: 'site_plan',
      data: plan,
    });

    return await waitForApproval(jobId, 'site_plan');
  }
});
```

### Phase 2: Color Palette (SDK HITL)

```typescript
const colorAgent = new Agent({
  tools: [{
    name: 'submit_color_palette',
    requiresApproval: true, // 🔑 Pause for approval
  }],
});

await colorAgent.run(brandGuidelines, {
  onStream: (chunk) => {
    // Show thinking: "Analyzing industry trends..."
    publishUpdate(jobId, { type: 'status', content: chunk });
  },

  onToolApprovalRequired: async (toolCall) => {
    // Show palette and wait
    return await waitForApproval(jobId, 'color_palette');
  }
});
```

### Phase 3: Building (Custom Streaming + Optional SDK HITL)

```typescript
// For each block
for (const blockSpec of pageBlocks) {

  // 3a. Block selection (custom streaming, no pause)
  const blockSelector = new Agent({
    tools: [
      {
        name: 'query_blocks',
        requiresApproval: false, // No pause, just inform
      },
      {
        name: 'choose_block',
        // First block of homepage: require approval
        requiresApproval: isFirstBlock && pageSlug === 'home',
      }
    ]
  });

  const selection = await blockSelector.run(context, {
    onStream: (chunk) => {
      publishUpdate(jobId, {
        type: 'block_selection_reasoning',
        content: chunk,
      });
    },

    onToolApprovalRequired: async (toolCall) => {
      // Only for first block of homepage
      publishUpdate(jobId, {
        type: 'approval_required',
        subject: 'first_block',
        message: "This sets the tone for your site. Approve?",
        data: toolCall.function.arguments,
      });

      return await waitForApproval(jobId, 'first_block', 30000);
    }
  });

  // 3b. Copywriting (custom streaming, soft feedback)
  const copywriter = new Agent({
    tools: [] // No tools, just generates structured output
  });

  const copy = await copywriter.run(context, {
    onStream: (chunk) => {
      // Stream each field as it's written
      publishUpdate(jobId, {
        type: 'copy_preview',
        blockId: currentBlock,
        content: chunk,
      });

      // Check for soft feedback (non-blocking)
      checkForSoftFeedback(jobId).then(feedback => {
        if (feedback) {
          // User said something like "make it more casual"
          // Agent can adjust on the fly
          copywriter.provideFeedback(feedback);
        }
      });
    }
  });

  // 3c. Create block (custom streaming)
  publishUpdate(jobId, {
    type: 'status',
    message: 'Creating block in database...'
  });

  await createBlockInDB(copy);

  publishUpdate(jobId, {
    type: 'block_complete',
    blockId: block.id,
  });
}
```

---

## Implementation: SDK HITL + SSE

### Server-Side: Agent Execution

```typescript
// src/workers/generation-worker.ts

export const runGenerationWithHITL = async (jobId: string) => {
  const job = await getJob(jobId);

  // Helper: Wait for user approval via SSE feedback
  const waitForApproval = async (
    subject: string,
    timeoutMs: number = 60000
  ): Promise<boolean> => {
    const startTime = Date.now();

    // Poll for approval from database
    while (Date.now() - startTime < timeoutMs) {
      const approval = await payload.find({
        collection: 'generation-approvals',
        where: {
          jobId: { equals: jobId },
          subject: { equals: subject },
          processed: { equals: false },
        },
        limit: 1,
      });

      if (approval.docs.length > 0) {
        const result = approval.docs[0];

        // Mark as processed
        await payload.update({
          collection: 'generation-approvals',
          id: result.id,
          data: { processed: true },
        });

        return result.approved;
      }

      await sleep(1000);
    }

    // Timeout - auto-approve and continue
    publishUpdate(jobId, {
      type: 'info',
      message: 'No response received, proceeding with suggestion.',
    });

    return true;
  };

  // Run orchestrator with SDK HITL
  const orchestrator = new Agent({
    name: 'Orchestrator',
    model: 'claude-opus-4.5',
    tools: [{
      name: 'finalize_plan',
      requiresApproval: true,
      parameters: z.object({ plan: SitePlanSchema }),
      execute: async ({ plan }) => plan,
    }],
  });

  const plan = await orchestrator.run(job.prompt, {
    // Custom streaming
    onStream: (chunk) => {
      publishUpdate(jobId, {
        type: 'stream',
        agent: 'orchestrator',
        content: chunk,
      });
    },

    // SDK HITL callback
    onToolApprovalRequired: async (toolCall) => {
      const plan = JSON.parse(toolCall.function.arguments).plan;

      publishUpdate(jobId, {
        type: 'approval_required',
        subject: 'site_plan',
        data: plan,
        message: `I've planned a ${plan.sitemap.length}-page site. Approve to continue?`,
      });

      // Wait for user response
      const approved = await waitForApproval('site_plan', 60000);

      if (!approved) {
        // User rejected, agent will retry or stop
        publishUpdate(jobId, {
          type: 'info',
          message: 'Plan rejected, rethinking...',
        });
      }

      return approved;
    },
  });

  // Continue with building...
};
```

### Client-Side: SSE Listener + Approval UI

```typescript
// Frontend: app/generate/[jobId]/page.tsx

export default function GenerationPage({ params }) {
  const { jobId } = params;
  const [updates, setUpdates] = useState([]);
  const [pendingApproval, setPendingApproval] = useState(null);

  useEffect(() => {
    // Connect to SSE
    const eventSource = new EventSource(`/api/generate/${jobId}/stream`);

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);

      switch (update.type) {
        case 'stream':
          // Show agent thinking
          addUpdate(update);
          break;

        case 'copy_preview':
          // Update block preview in real-time
          updateBlockPreview(update.blockId, update.content);
          break;

        case 'approval_required':
          // 🔑 SDK HITL - Show approval dialog
          setPendingApproval(update);
          break;

        case 'block_complete':
          // Show completed block
          markBlockComplete(update.blockId);
          break;
      }
    };

    return () => eventSource.close();
  }, [jobId]);

  const handleApproval = async (approved: boolean) => {
    // Send approval to backend
    await fetch(`/api/generate/${jobId}/approve`, {
      method: 'POST',
      body: JSON.stringify({
        subject: pendingApproval.subject,
        approved,
      }),
    });

    setPendingApproval(null);
  };

  const handleSoftFeedback = async (feedback: string) => {
    // Send non-blocking feedback
    await fetch(`/api/generate/${jobId}/feedback`, {
      method: 'POST',
      body: JSON.stringify({ feedback }),
    });
  };

  return (
    <div>
      {/* Live preview */}
      <SitePreview siteId={siteId} />

      {/* Updates stream */}
      <UpdatesFeed updates={updates} />

      {/* Approval dialog (SDK HITL) */}
      {pendingApproval && (
        <ApprovalDialog
          title="Approval Required"
          message={pendingApproval.message}
          data={pendingApproval.data}
          onApprove={() => handleApproval(true)}
          onReject={() => handleApproval(false)}
        />
      )}

      {/* Soft feedback chat (custom) */}
      <FeedbackChat
        onSend={handleSoftFeedback}
        placeholder="Provide feedback anytime..."
      />
    </div>
  );
}
```

---

## Approval Database Schema

```typescript
// Collection: generation-approvals
interface GenerationApproval {
  jobId: string;
  subject: 'site_plan' | 'color_palette' | 'first_block' | string;
  data: any; // What needs approval
  approved: boolean;
  processed: boolean;
  createdAt: Date;
  respondedAt?: Date;
}

// API: POST /api/generate/[jobId]/approve
export async function POST(request: Request) {
  const { subject, approved } = await request.json();
  const { jobId } = params;

  await payload.create({
    collection: 'generation-approvals',
    data: {
      jobId,
      subject,
      approved,
      processed: false,
      createdAt: new Date(),
    }
  });

  return Response.json({ success: true });
}
```

---

## Decision Matrix: When to Use What

| Scenario | Approach | Reason |
|----------|----------|--------|
| Site structure approval | SDK HITL | Critical decision, needs explicit approval |
| Color palette approval | SDK HITL | Sets visual identity, worth pausing |
| First block selection | SDK HITL | Sets tone for site |
| Subsequent block selection | Custom streaming | Keep flow moving, show reasoning |
| Copy generation | Custom streaming | Let user watch, soft feedback |
| Media selection with options | SDK HITL | User picks from curated choices |
| Media upload progress | Custom streaming | Just informational |
| Block creation | Custom streaming | Technical step, no input needed |
| Major revisions | SDK HITL | "Regenerate entire page?" |
| Minor tweaks | Custom streaming + soft feedback | "Make next section more casual" |

---

## Advantages of Hybrid Approach

### SDK HITL Advantages
✅ Clean pause/resume logic (no custom state management)
✅ Built-in rejection handling (agent can retry)
✅ Tool-level granularity (choose what needs approval)
✅ Works seamlessly with streaming
✅ Less code to maintain

### Custom Streaming Advantages
✅ Non-blocking feedback (user can comment anytime)
✅ Rich progress updates (not just tool calls)
✅ Multi-agent coordination visibility
✅ Partial result streaming (copy field-by-field)
✅ Flexible timing (don't need to pause at tool boundaries)

### Combined Benefits
🎯 **Critical decisions** pause and wait (SDK HITL)
🎯 **Progress updates** stream continuously (custom)
🎯 **Soft feedback** flows naturally without blocking (custom)
🎯 **User feels in control** (SDK HITL) and **informed** (custom streaming)

---

## Example: Full Hybrid Flow

```typescript
// 1. Planning phase (SDK HITL)
"Planning your site..." [streaming status]
"5 pages identified:" [streaming details]
"- Homepage, Menu, About, Contact, Gallery" [streaming list]

[PAUSE - SDK HITL]
"Approve this structure?" [approval dialog]
User clicks "Approve"

// 2. Color phase (SDK HITL)
"Analyzing your brand..." [streaming status]
"Researching coffee shop color trends..." [streaming status]
"I recommend earthy tones:" [streaming conclusion]
[Shows palette preview] [streaming visual]

[PAUSE - SDK HITL]
"Use these colors?" [approval dialog]
User clicks "Yes"

// 3. Building phase (custom streaming + optional HITL)
"Building homepage..." [streaming status]
"Selecting hero block..." [streaming status]
"Hero 2 chosen - centered layout" [streaming reasoning]

[PAUSE - SDK HITL - First block only]
"This will set the tone. Approve?" [approval dialog]
User clicks "Looks good"

"Writing headline..." [streaming status]
"Welcome to Brew Haven" [streaming copy - field by field]

[No pause - user watching]
User types: "More emphasis on sustainability" [soft feedback]

"Adjusting copy..." [streaming status]
"Updated: Where Every Cup Grows a Greener Tomorrow" [streaming copy]

User: "Perfect!" [soft feedback]

"Adding hero image..." [streaming status]
[Image appears in preview] [streaming visual]

"✓ Hero complete!" [streaming status]
"Moving to features section..." [streaming status]

// Process continues with no more pauses
// User can watch and provide soft feedback anytime
// Agent streams progress continuously

"✓ All 5 pages complete!" [streaming status]
"Review at: https://preview.site.com" [streaming result]

[PAUSE - SDK HITL]
"Ready to publish?" [approval dialog]
User clicks "Publish"

"🎉 Site is live!" [streaming celebration]
```

---

## Implementation Priority

### MVP (Week 1-4)
1. **Custom streaming only** - Get basic flow working
   - SSE endpoint
   - Progress updates
   - Block-by-block building

### V1.1 (Week 5-6)
2. **Add SDK HITL for critical points** - Enhance with approvals
   - Site plan approval
   - Color palette approval
   - Publish confirmation

### V1.2 (Week 7-8)
3. **Add soft feedback** - Enable continuous conversation
   - Feedback chat interface
   - Agent adjusts based on ongoing comments
   - No interruption to flow

### V2 (Week 9+)
4. **Advanced HITL** - Selective approvals
   - User preferences: "Require approval for: [X] blocks [ ] copy [ ] colors"
   - Block-level regeneration
   - A/B options: "Choose between these 2 hero blocks"

---

## Code Example: Combined Approach

```typescript
const agent = new Agent({
  name: 'Site Builder',
  model: 'claude-sonnet-4.5',

  tools: [
    {
      name: 'select_block',
      requiresApproval: ({ blockType, position, pageSlug }) => {
        // Dynamic: require approval for first block only
        return position === 0 && pageSlug === 'home';
      },
      execute: async (args) => {
        // Custom streaming during execution
        publishUpdate(jobId, {
          type: 'block_selection',
          blockType: args.blockType,
        });

        return await selectBlock(args);
      }
    }
  ]
});

await agent.run(input, {
  // Custom streaming (continuous)
  onStream: (chunk) => {
    publishUpdate(jobId, {
      type: 'agent_thinking',
      content: chunk,
    });
  },

  // SDK HITL (selective pauses)
  onToolApprovalRequired: async (toolCall) => {
    publishUpdate(jobId, {
      type: 'approval_required',
      data: toolCall.function.arguments,
    });

    return await waitForApproval(jobId, toolCall.function.name);
  },

  // Check for soft feedback (non-blocking)
  onToolExecute: async (toolName, args) => {
    // After any tool executes, check if user said anything
    const feedback = await checkRecentFeedback(jobId);

    if (feedback) {
      // Inject into conversation
      agent.provideFeedback(feedback.content);
    }
  }
});
```

---

## Summary

**Best Architecture**: Hybrid approach that combines:

1. **OpenAI Agents SDK HITL** for:
   - Critical decision points
   - Explicit approvals required
   - Clean pause/resume logic

2. **Custom SSE Streaming** for:
   - Continuous progress updates
   - Real-time previews
   - Multi-agent coordination
   - Soft feedback

3. **Flexible Control**: User decides how much oversight
   - "Autopilot" mode: No approvals, just watch
   - "Guided" mode: Approve at key points (default)
   - "Collaborative" mode: Approve every block

**Result**: Users get:
- ✅ Transparency (see everything happening)
- ✅ Control (approve critical decisions)
- ✅ Flexibility (provide feedback anytime)
- ✅ Speed (doesn't pause unnecessarily)

**Implementation**: Start with custom streaming (MVP), add SDK HITL incrementally for key approval points.

---

## Next Decision

Which approval points do you want for MVP?

**Option A: Minimal** (fastest)
- Site plan approval
- Publish confirmation
- Everything else streams continuously

**Option B: Guided** (balanced)
- Site plan approval
- Color palette approval
- First block approval
- Publish confirmation

**Option C: Collaborative** (most control)
- All of Option B, plus:
- Each page approval before next page
- Media selection choices
- Copy revisions on request

**Recommendation**: Start with Option A, make it configurable later.
