# UIFoundry AI Integration - Iterative Building Architecture (v2)

**Date**: 2025-12-12
**Purpose**: Human-in-the-loop, real-time site building with specialized agents

---

## Key Changes from V1

✅ **Added**: Color Palette Agent for brand-consistent theming
✅ **Simplified**: Copywriter agent - no tool overhead, just reads schema and writes
✅ **New Architecture**: Iterative building instead of batch generation
✅ **Real-time Streaming**: Users watch site being built block-by-block
✅ **Human-in-the-Loop**: Users can provide feedback during generation
✅ **Verification Loop**: Agents confirm blocks were created successfully

---

## Core Concept: "Pair Programming with AI"

Instead of:
```
User → Submit Prompt → Wait 5 min → Hope for good result
```

New approach:
```
User → Submit Prompt → Watch live building → Provide feedback → Iterate together
```

**User Experience**:
1. User submits prompt: "Build a website for my coffee shop"
2. Orchestrator streams back: "Planning 5 pages: Home, Menu, About, Contact, Gallery"
3. User sees: "Building homepage... selecting Hero block..."
4. Hero block appears in preview with generated copy
5. User: "The headline is too formal, make it friendlier"
6. Agent adjusts and rebuilds that block
7. Process continues for each block/page
8. User approves or tweaks as they go

---

## Updated Agent Architecture

### 1. **Orchestrator Agent** (Claude Opus 4.5)
**Role**: Strategic planning and high-level coordination
**Interaction**: Converses with user to refine plan

```typescript
interface SitePlan {
  sitemap: {
    slug: string;
    title: string;
    purpose: string;
    blocks: string[]; // Suggested block types
    priority: number;
  }[];
  brandGuidelines: {
    tone: string;
    industry: string;
    targetAudience: string;
    keyMessages: string[];
    existingColors?: {
      primary: string;   // User's brand colors if provided
      secondary: string;
      accent: string;
    };
  };
}
```

**Streaming Output**:
```typescript
// As Orchestrator thinks, stream back to user
agent.on('stream', (chunk) => {
  // "I'm planning a 5-page coffee shop website..."
  // "Homepage will feature: hero, menu preview, testimonials..."
  // "About page will showcase: story, team, values..."
  sendToClient({ type: 'planning', content: chunk });
});
```

**Handoff**: Once plan is approved → hands off to Execution Agent

---

### 2. **Execution Agent** (Claude Sonnet 4.5)
**Role**: Coordinate specialized agents and manage build process
**New agent specifically for this architecture**

```typescript
interface BuildTask {
  pageSlug: string;
  blockPosition: number;
  blockType: string;
  dependencies: string[]; // e.g., needs color palette first
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

interface ExecutionState {
  currentPage: string;
  currentBlock: number;
  completedBlocks: string[];
  pendingTasks: BuildTask[];
  userFeedback: Message[];
}
```

**Responsibilities**:
- Schedule which agent works on which block
- Maintain conversation context with user
- Relay user feedback to specialized agents
- Verify blocks were created in database
- Handle retries if creation fails

**Tools**:
```typescript
const executionAgentTools = {
  schedule_color_palette: async () => {
    // First task: get colors
    return await colorPaletteAgent.run(brandGuidelines);
  },

  schedule_block_creation: async (block) => {
    // For each block, coordinate selector + copywriter
    const selection = await blockSelectorAgent.run(block);
    const content = await copywriterAgent.run(selection, colorPalette);
    return { blockType: selection.type, fields: content };
  },

  create_block_in_db: async (blockData) => {
    // Create in PayloadCMS
    const created = await payload.create({
      collection: 'blocks',
      data: blockData,
    });

    // Verify it exists
    const verified = await payload.findByID({
      collection: 'blocks',
      id: created.id,
    });

    return { success: !!verified, blockId: created.id };
  },

  handle_user_feedback: async (feedback) => {
    // Parse user intent: "make headline friendlier"
    // Determine which agent needs to redo work
    // Re-run that specific agent with feedback context
    return await copywriterAgent.run({
      ...previousContext,
      userFeedback: feedback,
      retryReason: 'user_requested_change'
    });
  },
};
```

**Streaming to Client**:
```typescript
executionAgent.on('stream', (event) => {
  switch (event.type) {
    case 'task_started':
      // "Starting to build homepage hero block..."
      sendToClient({
        type: 'status',
        message: event.message,
        blockId: event.blockId,
      });
      break;

    case 'block_created':
      // Send complete block data to client
      sendToClient({
        type: 'block_ready',
        block: event.blockData,
        preview: event.previewUrl,
      });
      break;

    case 'awaiting_feedback':
      // Agent is pausing for user input
      sendToClient({
        type: 'feedback_prompt',
        question: "How does this hero section look?",
        options: ['approve', 'adjust', 'skip']
      });
      break;
  }
});
```

---

### 3. **Color Palette Agent** (GPT-4o)
**NEW AGENT** - Runs first in the process

**Role**: Establish visual identity and color system

```typescript
interface ColorPalette {
  source: 'user_provided' | 'generated' | 'industry_standard';
  colors: {
    primary: string;      // Main brand color
    secondary: string;    // Supporting color
    accent: string;       // Highlight color
    neutral: {           // Grays for text, backgrounds
      50: string;
      100: string;
      // ... through 900
    };
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  darkMode?: {
    // Alternative palette for dark theme
    primary: string;
    secondary: string;
    // ...
  };
  reasoning: string; // Why these colors were chosen
}
```

**Logic Flow**:
```typescript
// Check if user provided colors
if (brandGuidelines.existingColors) {
  return {
    source: 'user_provided',
    colors: {
      primary: brandGuidelines.existingColors.primary,
      secondary: brandGuidelines.existingColors.secondary,
      accent: brandGuidelines.existingColors.accent,
      // Generate complementary neutral colors
      neutral: generateNeutralsFromPrimary(primary),
      semantic: generateSemanticColors(primary),
    },
    reasoning: "Using your existing brand colors"
  };
}

// Otherwise, generate based on industry and tone
const palette = await colorPaletteAgent.run({
  industry: brandGuidelines.industry,
  tone: brandGuidelines.tone,
  inspiration: brandGuidelines.keyMessages,
});
```

**Tools**:
- `analyze_industry_colors`: Research typical colors for industry (coffee: browns, warm tones)
- `generate_palette`: Create harmonious color combinations
- `validate_accessibility`: Ensure WCAG AA compliance for text contrast
- `create_tailwind_config`: Output as Tailwind CSS theme

**Output**:
```typescript
// Stored in site config, used by all blocks
const themeConfig = {
  colors: {
    primary: {
      50: '#fef7ee',
      500: '#f97316', // Main orange
      900: '#7c2d12',
    },
    // ... full palette
  }
};

// Every block references these colors
<Button className="bg-primary-500 hover:bg-primary-600">
```

**Streaming**:
```typescript
// Show color palette to user for approval
sendToClient({
  type: 'color_palette_ready',
  palette: colorPalette,
  preview: renderColorSwatches(colorPalette),
  message: "I've chosen warm, inviting colors for your coffee shop. What do you think?"
});

// Wait for user approval or adjustment
const feedback = await waitForUserResponse();
if (feedback.adjust) {
  // Re-run with feedback
}
```

---

### 4. **Block Selector Agent** (Claude Sonnet 4.5)
**Role**: Choose appropriate block for current position
**Simplified**: Just makes decisions, no complex tools needed

```typescript
// Input: Context about what's needed
interface BlockSelectionContext {
  pageSlug: string;
  pagePurpose: string;
  position: number; // Where on the page (0 = top)
  previousBlocks: string[]; // What's already on the page
  brandGuidelines: BrandGuidelines;
  availableBlocks: BlockMetadata[]; // Your 40+ blocks
}

// Output: Simple decision
interface BlockSelection {
  blockType: 'hero_2' | 'features_3' | ...; // From your constants
  reasoning: string; // Why this block
  schema: BlockSchema; // Field definitions for copywriter
}
```

**No tools needed** - Just reads context and decides:
```typescript
const blockSelectorAgent = new Agent({
  name: 'Block Selector',
  model: 'claude-sonnet-4.5',

  instructions: `You select the most appropriate UI block for each position.

Available blocks:
${JSON.stringify(BLOCK_REGISTRY, null, 2)}

Selection criteria:
- Position 0: Always choose a hero block (hero_1 through hero_5)
- Consider page purpose (homepage needs different blocks than contact page)
- Ensure logical flow (don't put pricing before features)
- Match complexity to business type (simple cafe = simple blocks)
- Consider what blocks are already on the page (don't repeat similar blocks)

Return the block slug and reasoning.`,

  outputType: z.object({
    blockType: z.enum([/* all your block slugs */]),
    reasoning: z.string(),
  }),
});
```

**Streaming**:
```typescript
sendToClient({
  type: 'block_selected',
  blockType: 'hero_2',
  reasoning: "Hero 2 has a centered layout perfect for showcasing your coffee shop's atmosphere",
  preview: '/previews/hero_2.png'
});
```

---

### 5. **Copywriter Agent** (GPT-4o or Claude Sonnet 4.5)
**Role**: Fill in ALL fields for the selected block
**Simplified**: No tools - just reads schema and writes

```typescript
interface CopywritingContext {
  blockType: string;
  blockSchema: BlockSchema; // Field definitions from PayloadCMS
  pageContext: {
    pageSlug: string;
    pagePurpose: string;
    otherBlocksContent: string[]; // For consistency
  };
  brandGuidelines: BrandGuidelines;
  colorPalette: ColorPalette;
  userFeedback?: string; // If this is a retry
}

interface CopywritingOutput {
  fields: Record<string, any>; // Matches block schema exactly
  reasoning: Record<string, string>; // Why each choice was made
}
```

**How it works**:
```typescript
const copywriterAgent = new Agent({
  name: 'Copywriter',
  model: 'gpt-4o',

  instructions: `You write compelling marketing copy that fills all fields in a UI block.

You will receive:
1. Block schema (field definitions with types, constraints, defaults)
2. Brand guidelines (tone, audience, key messages)
3. Color palette (to reference colors in copy if needed)
4. Page context (what page this is on, other content nearby)

Your job:
- Read the block schema carefully
- Fill EVERY required field
- Respect field constraints (max lengths, required format)
- Match the brand tone (professional, friendly, technical, etc.)
- Ensure consistency with other blocks on the page
- Make CTAs compelling and action-oriented
- For links (href fields), create realistic paths like "/menu" or "/contact"

Return a JSON object where keys match the block schema field names.`,

  outputType: z.record(z.any()), // Will be validated against specific block schema
});

// Usage
const blockSchema = getBlockSchema('hero_2');
const copy = await copywriterAgent.run({
  blockSchema,
  brandGuidelines,
  colorPalette,
  pageContext,
});

// Validate output matches schema
const validatedCopy = blockSchema.parse(copy);
```

**Example for hero_2 block**:
```typescript
// Block schema (from your config):
{
  alertLabel: { type: 'text', maxLength: 100 },
  alertLink: { type: 'text', format: 'url' },
  header: { type: 'text', minLength: 10, maxLength: 200, required: true },
  subheader: { type: 'text', minLength: 20, maxLength: 500 },
  primaryCtaLabel: { type: 'text', maxLength: 30, required: true },
  primaryCtaHref: { type: 'text', format: 'url', required: true },
  secondaryCtaLabel: { type: 'text', maxLength: 30 },
  secondaryCtaHref: { type: 'text', format: 'url' },
  media: { type: 'upload', collection: 'media' }
}

// Copywriter output:
{
  alertLabel: "Now Open Sundays!",
  alertLink: "/hours",
  header: "Artisan Coffee, Crafted with Passion",
  subheader: "Experience the perfect blend of locally-sourced beans and expert roasting. Every cup tells a story, and we can't wait to share ours with you.",
  primaryCtaLabel: "View Our Menu",
  primaryCtaHref: "/menu",
  secondaryCtaLabel: "Visit Us",
  secondaryCtaHref: "/contact",
  media: null // Media Curator will fill this
}
```

**Streaming**:
```typescript
// Stream copy as it's being written
copywriterAgent.on('stream', (chunk) => {
  sendToClient({
    type: 'copy_preview',
    blockId: currentBlock.id,
    field: chunk.field, // 'header', 'subheader', etc.
    content: chunk.content,
  });
});
```

**Handling User Feedback**:
```typescript
// User says: "The headline is too formal, make it friendlier"
const revisedCopy = await copywriterAgent.run({
  ...previousContext,
  userFeedback: "Make the headline more friendly and casual, less formal",
  previousOutput: previousCopy, // Show what was wrong
  retryReason: 'tone_adjustment',
});

// New output:
{
  header: "Welcome to Your New Favorite Coffee Spot!", // Much friendlier
  // ... other fields
}
```

---

### 6. **Media Curator Agent** (GPT-4o)
**Role**: Fill media fields after copy is done

```typescript
interface MediaCurationContext {
  blockType: string;
  copyContent: Record<string, any>; // The copy that was written
  mediaFields: {
    fieldName: string;
    purpose: string; // 'hero_image', 'feature_icon', 'team_photo'
    dimensions?: { width: number; height: number };
  }[];
  brandGuidelines: BrandGuidelines;
  colorPalette: ColorPalette;
}

interface MediaCurationOutput {
  [fieldName: string]: {
    payloadMediaId: string;
    alt: string;
    source: 'unsplash' | 'generated' | 'placeholder';
  };
}
```

**Process**:
1. Analyze what imagery is needed based on copy
2. Search Unsplash or generate with DALL-E
3. Upload to S3 via PayloadCMS API
4. Return media IDs

**Tools**:
```typescript
const mediaCuratorTools = {
  search_unsplash: async (query: string) => {
    const result = await unsplash.search(query);
    return result.photos.map(p => ({
      url: p.urls.regular,
      photographer: p.user.name,
    }));
  },

  upload_to_payload: async (imageUrl: string, alt: string) => {
    // Download image
    const buffer = await fetch(imageUrl).then(r => r.arrayBuffer());

    // Upload to PayloadCMS (which uploads to S3)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt,
      },
      file: {
        data: buffer,
        name: `${slugify(alt)}.jpg`,
        mimetype: 'image/jpeg',
      }
    });

    return media.id;
  },

  generate_placeholder: async (dimensions: any, color: string) => {
    // Create colored SVG placeholder
    const svg = `<svg width="${dimensions.width}" height="${dimensions.height}">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>`;
    return uploadSvgToPayload(svg);
  }
};
```

**Streaming**:
```typescript
sendToClient({
  type: 'media_processing',
  message: "Finding the perfect hero image for your coffee shop...",
  field: 'heroMedia',
});

// After upload
sendToClient({
  type: 'media_ready',
  blockId: currentBlock.id,
  field: 'heroMedia',
  preview: media.url,
  alt: media.alt,
});
```

---

### 7. **Schema Validator** (GPT-4o-mini or Claude Haiku)
**Role**: Final verification before database insert

**Simplified for iterative approach**:
- Validates each block as it's created (not whole site at once)
- Quick checks: required fields present, types correct, no invalid references
- Auto-fixes minor issues (trim whitespace, format URLs)

```typescript
const validateBlockBeforeInsert = async (blockData: unknown, blockType: string) => {
  const schema = getBlockZodSchema(blockType);

  try {
    // Validate
    const validated = schema.parse(blockData);
    return { valid: true, data: validated };
  } catch (error) {
    // Try to auto-fix common issues
    const fixed = await validatorAgent.run({
      blockData,
      errors: error.errors,
      blockType,
    });

    return { valid: true, data: fixed };
  }
};
```

---

## Iterative Building Flow

### Complete Process (User Perspective)

```
1. User: "Build a website for my coffee shop, Brew Haven.
    We're modern and eco-friendly. Use green and brown colors."

2. Orchestrator (streaming):
   "Great! I'm planning a 5-page website:
    - Homepage: Welcome visitors, showcase ambiance
    - Menu: Display your coffee offerings
    - About: Tell your sustainability story
    - Contact: Location and hours
    - Gallery: Photos of your space

    I'll use your green and brown colors as the foundation.
    Ready to start building?"

3. User: "Yes, let's do it!"

4. Execution Agent:
   "Starting with color palette..."

5. Color Palette Agent (streaming):
   "I've chosen earthy greens and warm browns.
    Primary: Forest Green (#2D5016)
    Secondary: Coffee Brown (#6F4E37)
    Accent: Sage Green (#87AE73)

    [Shows color swatches]

    These colors evoke nature and sustainability. Approve?"

6. User: "Perfect!"

7. Execution Agent:
   "Building homepage... Starting with hero section..."

8. Block Selector (streaming):
   "Selecting Hero Block 2 - centered layout with large image,
    perfect for showcasing your cafe's atmosphere."
   [Shows preview of empty Hero 2 block]

9. Copywriter (streaming):
   "Writing headline... 'Welcome to Brew Haven'
    Writing subheader... 'Sustainably-sourced coffee crafted...'
    [Copy appears in preview in real-time]

10. User: "The headline feels generic. Can you make it more unique?"

11. Copywriter (streaming):
    "Adjusting... How about:
     'Where Every Cup Grows a Greener Tomorrow'
     Better?"

12. User: "Love it!"

13. Media Curator:
    "Finding hero image... [Shows options]
     Which vibe: modern-interior, coffee-closeup, or outdoor-seating?"

14. User: "Modern interior"

15. Media Curator:
    [Uploads image to S3]
    "Hero image uploaded! Creating block in database..."

16. Execution Agent:
    [Inserts block into PayloadCMS]
    "✓ Homepage hero complete! Moving to features section..."
    [User sees hero block appear in live preview]

17. [Process repeats for each block on each page]

18. Execution Agent:
    "All 5 pages complete! Review the live preview at:
     https://preview.uifoundry.dev/brew-haven

     Ready to publish?"

19. User: "Yes, publish it!"

20. Site goes live 🎉
```

---

## Real-Time Communication Architecture

### Option A: Server-Sent Events (SSE) - **Recommended for MVP**

**Why SSE**:
- ✅ Simpler than WebSockets
- ✅ Works great with Lambda (via API Gateway)
- ✅ One-way server→client is all you need for streaming
- ✅ Automatic reconnection built-in
- ✅ Works over HTTP (no special protocols)

**Implementation**:

```typescript
// API Route: app/api/generate/[jobId]/stream/route.ts
export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;

  // Create SSE stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`)
      );

      // Subscribe to Redis pub/sub for this job
      const subscriber = redis.duplicate();
      await subscriber.subscribe(`job:${jobId}:updates`);

      subscriber.on('message', (channel, message) => {
        // Forward updates to client
        controller.enqueue(
          encoder.encode(`data: ${message}\n\n`)
        );
      });

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        subscriber.unsubscribe();
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

**Client Side**:
```typescript
// Frontend
const eventSource = new EventSource(`/api/generate/${jobId}/stream`);

eventSource.onmessage = (event) => {
  const update = JSON.parse(event.data);

  switch (update.type) {
    case 'planning':
      showPlanningMessage(update.message);
      break;

    case 'color_palette_ready':
      displayColorPalette(update.palette);
      break;

    case 'block_selected':
      showBlockPreview(update.blockType, update.preview);
      break;

    case 'copy_preview':
      updateBlockField(update.blockId, update.field, update.content);
      break;

    case 'block_ready':
      // Block is complete and in database
      insertBlockIntoPreview(update.block);
      break;

    case 'completed':
      showSuccessMessage(update.siteUrl);
      eventSource.close();
      break;
  }
};

eventSource.onerror = () => {
  console.error('SSE connection lost, reconnecting...');
  // Browser auto-reconnects
};
```

**Sending User Feedback**:
```typescript
// User provides feedback during generation
const sendFeedback = async (feedback: string) => {
  await fetch(`/api/generate/${jobId}/feedback`, {
    method: 'POST',
    body: JSON.stringify({ feedback }),
  });

  // Execution agent picks up feedback from database
  // and relays to appropriate specialized agent
};
```

---

### Option B: WebSockets (If You Need Two-Way)

**When needed**:
- Very frequent user interactions during generation
- Real-time collaboration (multiple users watching same generation)
- Low-latency requirements

**Lambda + WebSockets**:
```typescript
// Via API Gateway WebSocket API (supported by Lambda)
// sst.config.ts additions:

const websocketApi = new sst.aws.ApiGatewayWebSocket("GenerationWS", {
  routes: {
    $connect: "src/websocket/connect.handler",
    $disconnect: "src/websocket/disconnect.handler",
    sendFeedback: "src/websocket/feedback.handler",
    $default: "src/websocket/default.handler"
  }
});

// Store connection IDs in DynamoDB or Redis
// Workers publish to Redis, Lambda pushes to WebSocket clients
```

**Trade-offs**:
- More complex than SSE
- Requires connection management (DynamoDB table for connectionIds)
- Better for real-time collaboration features

**For MVP**: Start with SSE, migrate to WebSockets if needed.

---

## Database Schema for Iterative Building

### Generation Job Tracking

```typescript
// Collection: generation-jobs
interface GenerationJob {
  id: string;
  userId: string;
  status: 'planning' | 'building' | 'completed' | 'failed';
  prompt: string;

  plan?: SitePlan; // From orchestrator
  colorPalette?: ColorPalette; // From color agent

  progress: {
    totalPages: number;
    completedPages: number;
    currentPage: string;
    totalBlocks: number;
    completedBlocks: number;
    currentBlock: string;
  };

  conversation: {
    role: 'agent' | 'user';
    agent?: 'orchestrator' | 'execution' | 'copywriter' | 'color_palette';
    content: string;
    timestamp: Date;
  }[];

  siteId?: string; // Once site is created
  createdAt: Date;
  updatedAt: Date;
}
```

### Site Building State

```typescript
// Collection: sites (existing, add fields)
interface Site {
  // ... existing fields

  generationJobId?: string; // Link back to job
  buildStatus: 'draft' | 'building' | 'review' | 'published';

  // Track what's been built
  builtPages: {
    pageId: string;
    slug: string;
    completedAt: Date;
    blockCount: number;
  }[];
}
```

### Feedback Queue

```typescript
// Collection: generation-feedback (temporary, cleared after processing)
interface GenerationFeedback {
  jobId: string;
  feedback: string;
  targetBlock?: string; // Which block user is commenting on
  timestamp: Date;
  processed: boolean;
}
```

---

## Execution Agent Implementation

### Core Loop

```typescript
// Worker Lambda: src/workers/execution-agent.ts

export const executeGeneration = async (jobId: string) => {
  const job = await payload.findByID({
    collection: 'generation-jobs',
    id: jobId,
  });

  try {
    // 1. Orchestrate planning
    await publishUpdate(jobId, {
      type: 'status',
      message: 'Planning your site...'
    });

    const plan = await orchestratorAgent.run({
      prompt: job.prompt,
    });

    await payload.update({
      collection: 'generation-jobs',
      id: jobId,
      data: { plan, status: 'building' }
    });

    await publishUpdate(jobId, {
      type: 'planning_complete',
      plan,
    });

    // 2. Get color palette
    await publishUpdate(jobId, {
      type: 'status',
      message: 'Choosing colors...'
    });

    const colorPalette = await colorPaletteAgent.run({
      brandGuidelines: plan.brandGuidelines,
    });

    await publishUpdate(jobId, {
      type: 'color_palette_ready',
      palette: colorPalette,
      awaitingFeedback: true,
    });

    // Wait for user approval or timeout
    const approved = await waitForApproval(jobId, 'color_palette', 60000);
    if (!approved) {
      // User wants changes, check feedback
      const feedback = await getFeedback(jobId);
      if (feedback) {
        // Retry with feedback
        colorPalette = await colorPaletteAgent.run({
          brandGuidelines: plan.brandGuidelines,
          userFeedback: feedback,
        });
      }
    }

    // 3. Create site record
    const site = await payload.create({
      collection: 'sites',
      data: {
        title: plan.siteName,
        userId: job.userId,
        generationJobId: jobId,
        buildStatus: 'building',
        colorPalette,
      }
    });

    // 4. Build each page iteratively
    for (const pageSpec of plan.sitemap) {
      await publishUpdate(jobId, {
        type: 'page_started',
        pageSlug: pageSpec.slug,
        pageTitle: pageSpec.title,
      });

      // Create page record
      const page = await payload.create({
        collection: 'pages',
        data: {
          title: pageSpec.title,
          slug: pageSpec.slug,
          site: site.id,
          blocks: [], // Will add blocks as we build
        }
      });

      // Build blocks for this page
      for (let position = 0; position < pageSpec.blocks.length; position++) {
        const blockSpec = pageSpec.blocks[position];

        // 4a. Select block type
        await publishUpdate(jobId, {
          type: 'block_started',
          pageSlug: pageSpec.slug,
          position,
          stage: 'selecting',
        });

        const selection = await blockSelectorAgent.run({
          pageSlug: pageSpec.slug,
          pagePurpose: pageSpec.purpose,
          position,
          previousBlocks: page.blocks.map(b => b.blockType),
          brandGuidelines: plan.brandGuidelines,
        });

        await publishUpdate(jobId, {
          type: 'block_selected',
          blockType: selection.blockType,
          reasoning: selection.reasoning,
        });

        // 4b. Generate copy
        await publishUpdate(jobId, {
          type: 'block_started',
          stage: 'writing_copy',
        });

        const copy = await copywriterAgent.run({
          blockType: selection.blockType,
          blockSchema: selection.schema,
          pageContext: {
            pageSlug: pageSpec.slug,
            pagePurpose: pageSpec.purpose,
          },
          brandGuidelines: plan.brandGuidelines,
          colorPalette,
        });

        // Stream copy as it's written
        await publishUpdate(jobId, {
          type: 'copy_preview',
          blockType: selection.blockType,
          fields: copy,
        });

        // Check for feedback
        const feedback = await checkFeedback(jobId);
        if (feedback && feedback.targetBlock === selection.blockType) {
          // User wants changes, regenerate
          copy = await copywriterAgent.run({
            // ... same context
            userFeedback: feedback.feedback,
            previousOutput: copy,
          });
        }

        // 4c. Handle media
        const mediaFields = getMediaFields(selection.schema);
        if (mediaFields.length > 0) {
          await publishUpdate(jobId, {
            type: 'block_started',
            stage: 'adding_media',
          });

          const media = await mediaCuratorAgent.run({
            blockType: selection.blockType,
            copyContent: copy,
            mediaFields,
            brandGuidelines: plan.brandGuidelines,
            colorPalette,
          });

          // Merge media IDs into copy
          Object.assign(copy, media);
        }

        // 4d. Validate
        const validated = await validateBlockBeforeInsert(
          copy,
          selection.blockType
        );

        if (!validated.valid) {
          throw new Error('Block validation failed');
        }

        // 4e. Create block in database
        const block = await payload.create({
          collection: selection.blockType, // e.g., 'hero_2'
          data: validated.data,
        });

        // 4f. Add block to page
        await payload.update({
          collection: 'pages',
          id: page.id,
          data: {
            blocks: [
              ...page.blocks,
              {
                blockType: selection.blockType,
                blockId: block.id,
              }
            ]
          }
        });

        // 4g. Verify block was created
        const verification = await payload.findByID({
          collection: selection.blockType,
          id: block.id,
        });

        if (!verification) {
          throw new Error('Block creation verification failed');
        }

        // 4h. Notify client
        await publishUpdate(jobId, {
          type: 'block_ready',
          blockId: block.id,
          blockType: selection.blockType,
          block: validated.data,
          preview: generatePreviewUrl(site.id, page.id, block.id),
        });

        // Small delay between blocks for better UX
        await sleep(500);
      }

      // Page complete
      await publishUpdate(jobId, {
        type: 'page_complete',
        pageSlug: pageSpec.slug,
      });
    }

    // 5. All pages complete
    await payload.update({
      collection: 'sites',
      id: site.id,
      data: { buildStatus: 'review' }
    });

    await payload.update({
      collection: 'generation-jobs',
      id: jobId,
      data: { status: 'completed', siteId: site.id }
    });

    await publishUpdate(jobId, {
      type: 'completed',
      siteId: site.id,
      siteUrl: generateSiteUrl(site),
    });

  } catch (error) {
    await payload.update({
      collection: 'generation-jobs',
      id: jobId,
      data: { status: 'failed' }
    });

    await publishUpdate(jobId, {
      type: 'error',
      message: error.message,
    });
  }
};

// Helper: Publish update via Redis pub/sub
const publishUpdate = async (jobId: string, update: any) => {
  await redis.publish(
    `job:${jobId}:updates`,
    JSON.stringify(update)
  );
};

// Helper: Wait for user approval
const waitForApproval = async (
  jobId: string,
  subject: string,
  timeoutMs: number
): Promise<boolean> => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    const feedback = await payload.find({
      collection: 'generation-feedback',
      where: {
        jobId: { equals: jobId },
        processed: { equals: false },
      },
      limit: 1,
    });

    if (feedback.docs.length > 0) {
      const fb = feedback.docs[0];
      if (fb.feedback.toLowerCase().includes('approve') ||
          fb.feedback.toLowerCase().includes('looks good')) {
        await payload.update({
          collection: 'generation-feedback',
          id: fb.id,
          data: { processed: true },
        });
        return true;
      }
      // User wants changes
      return false;
    }

    await sleep(1000); // Poll every second
  }

  // Timeout - proceed anyway
  return true;
};
```

---

## Updated Infrastructure Requirements

### Lambda Configuration

```typescript
// sst.config.ts updates

// Execution worker needs longer timeout
const executionWorker = new sst.aws.Function("ExecutionWorker", {
  handler: "src/workers/execution-agent.handler",
  runtime: "nodejs22.x",
  timeout: "15 minutes",
  memory: "3008 MB",
  link: [
    DATABASE_URI,
    REDIS_URL,
    // ... other secrets
  ],
  environment: {
    OPENAI_API_KEY: OPENAI_API_KEY.value,
    ANTHROPIC_API_KEY: ANTHROPIC_API_KEY.value,
  }
});

// SQS Queue for jobs
const generationQueue = new sst.aws.Queue("GenerationQueue", {
  visibilityTimeout: "15 minutes", // Match Lambda timeout
});

generationQueue.subscribe(executionWorker);
```

### Redis Usage

**Purpose**: Real-time updates distribution

```typescript
// Pub/Sub channels:
// - job:{jobId}:updates - Agent updates
// - job:{jobId}:feedback - User feedback

// Each SSE connection subscribes to job's update channel
// Execution agent publishes to update channel
// Feedback POST writes to feedback channel + database
```

---

## Cost Analysis (Updated)

### Per Site Generation (5 pages, ~20 blocks)

| Agent | Model | Est. Tokens | Cost |
|-------|-------|-------------|------|
| Orchestrator | Opus 4.5 | 10K in, 2K out | $0.30 |
| Color Palette | GPT-4o | 5K in, 1K out | $0.02 |
| Block Selector (×20) | Sonnet 4.5 | 100K in, 20K out | $0.50 |
| Copywriter (×20) | GPT-4o | 200K in, 40K out | $1.20 |
| Media Curator (×20) | GPT-4o | 80K in, 10K out | $0.30 |
| Validator (×20) | GPT-4o-mini | 50K in, 5K out | $0.02 |
| **Total LLM Costs** | | | **~$2.34** |

**Additional AWS Costs**:
- Lambda execution: ~$0.05
- Redis pub/sub: ~$0.01
- S3 storage: ~$0.02
- Total per site: **~$2.42**

**With user feedback/iterations**:
- 2-3 revisions adds ~$0.50-1.00
- Still under **$3.50 per site**

---

## User Experience Enhancements

### 1. Progress Visualization

```typescript
// Show progress bar
const progress = {
  phase: 'building',
  currentPage: 'Homepage',
  currentBlock: 'Hero Section',
  pagesComplete: 1,
  pagesTotal: 5,
  blocksComplete: 8,
  blocksTotal: 23,
  percentComplete: Math.round((8 / 23) * 100), // 35%
};
```

### 2. Live Preview

```typescript
// As blocks are created, render them in iframe
<iframe src={`/preview/${siteId}/${pageId}`} />

// User sees site building in real-time
// Can click blocks to provide feedback on specific sections
```

### 3. Feedback Interface

```typescript
// Floating chat interface during generation
<GenerationChat>
  <Message from="agent">
    I've chosen warm colors for your coffee shop. What do you think?
  </Message>

  <ColorSwatches palette={currentPalette} />

  <UserInput>
    <button onClick={approve}>Looks great!</button>
    <button onClick={adjust}>Make it brighter</button>
    <textarea placeholder="Or provide custom feedback..." />
  </UserInput>
</GenerationChat>
```

### 4. Block-Level Actions

```typescript
// Click any block in preview
<BlockOverlay>
  <button onClick={() => regenerateBlock(blockId)}>
    ↻ Regenerate this section
  </button>
  <button onClick={() => editBlock(blockId)}>
    ✏️ Edit manually
  </button>
  <button onClick={() => deleteBlock(blockId)}>
    🗑️ Remove this section
  </button>
</BlockOverlay>
```

---

## Handling Edge Cases

### 1. User Goes Offline

```typescript
// SSE auto-reconnects, but check generation status
eventSource.onopen = async () => {
  const status = await fetch(`/api/generate/${jobId}/status`);
  const data = await status.json();

  // Catch up on missed updates
  if (data.lastUpdate > lastReceivedUpdate) {
    // Fetch missed updates from database
    const missed = await fetch(`/api/generate/${jobId}/history?since=${lastReceivedUpdate}`);
    applyMissedUpdates(missed);
  }
};
```

### 2. Generation Errors

```typescript
// If agent fails, don't crash entire generation
try {
  const copy = await copywriterAgent.run(context);
} catch (error) {
  // Fall back to template
  const copy = getTemplateContent(blockType, industry);

  await publishUpdate(jobId, {
    type: 'warning',
    message: 'Using template for this section. You can edit it after.',
  });
}
```

### 3. User Abandons Generation

```typescript
// If no activity for 15 minutes
const lastActivity = await redis.get(`job:${jobId}:last_activity`);
if (Date.now() - lastActivity > 900000) {
  // Pause generation
  await publishUpdate(jobId, {
    type: 'paused',
    message: 'Are you still there? Generation paused.',
  });

  // Save state, can resume later
}
```

---

## Migration Timeline

### Phase 1: Foundation (Week 1-2)
- [x] Install OpenAI Agents SDK
- [x] Set up Redis pub/sub
- [x] Create SSE streaming endpoint
- [x] Build Orchestrator agent (basic)
- [x] Create job tracking collection

### Phase 2: Core Agents (Week 3-4)
- [x] Build Color Palette Agent
- [x] Build Block Selector Agent
- [x] Build Copywriter Agent (simplified, no tools)
- [x] Test with single page generation

### Phase 3: Execution Loop (Week 5-6)
- [x] Build Execution Agent with coordinator logic
- [x] Implement feedback handling
- [x] Add Media Curator Agent
- [x] Build verification system

### Phase 4: Real-time UX (Week 7-8)
- [x] Frontend: SSE listener and UI updates
- [x] Live preview rendering
- [x] Chat interface for feedback
- [x] Progress visualization

### Phase 5: Polish (Week 9-10)
- [x] Error handling and retries
- [x] Edge case handling
- [x] Performance optimization
- [x] Load testing
- [x] Launch MVP!

---

## Questions to Resolve

### Technical Decisions

1. **Approval flow**: Should generation pause for approval at key points (colors, first block) or just stream everything and let user intervene if needed?

2. **Media strategy**:
   - Unsplash only (free, limited selection)
   - DALL-E 3 (paid, unlimited custom)
   - Hybrid (Unsplash first, generate if nothing fits)

3. **Preview hosting**:
   - Same domain with `/preview/` routes
   - Separate preview subdomain
   - Iframe sandbox domain

4. **Block creation**:
   - Create blocks directly in their collections (hero_1, features_2, etc.)
   - Create generic "blocks" with polymorphic type
   - Create in temp collection, move to final on approval

### User Experience

1. **Default behavior**: If user doesn't respond to feedback prompts, should agent:
   - Proceed with best judgment after 30s timeout
   - Pause and wait indefinitely
   - Ask once, then proceed

2. **Regeneration scope**: When user asks to "regenerate", should it:
   - Just regenerate that specific block
   - Regenerate that block + adjust subsequent blocks for consistency
   - Offer both options

3. **Manual editing**: After generation, can users:
   - Edit blocks through normal PayloadCMS admin
   - Edit through simplified custom interface
   - Both

---

## Summary of Changes from V1

| Aspect | V1 (Batch) | V2 (Iterative) |
|--------|------------|----------------|
| **User Experience** | Submit and wait | Watch and collaborate |
| **Feedback** | After completion only | During generation |
| **Communication** | Polling for status | Real-time streaming (SSE) |
| **Agent Structure** | Independent agents | Coordinated by Execution Agent |
| **Copywriter** | Has many tools | Simplified, reads schema |
| **New Agents** | - | Color Palette Agent, Execution Agent |
| **Database** | Final insert only | Progressive inserts with verification |
| **Cost** | ~$2-5 | ~$2.50-3.50 (slightly higher for coordination) |
| **Time** | 2-5 min | 3-7 min (with user interaction) |
| **User Satisfaction** | ??? | Much higher! (transparency + control) |

---

## Next Steps

1. **Decide on technical questions above** - Need your input on approval flow, media strategy, etc.

2. **Set up Redis** - Already have it, just need pub/sub channels

3. **Create SSE endpoint** - Start with basic streaming

4. **Build first agent** - Orchestrator or Color Palette?

5. **Test iterative flow** - Single page, single block first

**Ready to start? Which part should we tackle first?**
