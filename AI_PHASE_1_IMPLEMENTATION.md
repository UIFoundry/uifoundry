# Phase 1: AI Generation V1 Implementation

**Goal**: Get first working AI generation flow from trigger to database

**Duration**: 3 weeks

**Scope**: Minimal viable generation with real-time updates

---

## Phase 1 Requirements

### What We're Building

```
User clicks "Generate with AI" in admin panel
    ↓
Client sends request to API route
    ↓
API route validates auth + creates generation job
    ↓
API route sends message to SQS queue
    ↓
SQS triggers Lambda worker (automatic)
    ↓
Lambda executes agent
    ↓
Agent publishes events to Redis as it works
    ↓
SSE endpoint streams events to client
    ↓
Client shows live updates in UI
    ↓
Agent creates blocks via PayloadCMS API
    ↓
Client invalidates cache, blocks appear in admin
    ↓
Generation complete
```

### Success Criteria

- [ ] SQS queue created and connected to Lambda
- [ ] Lambda function executes when message arrives
- [ ] Automatic retries work if Lambda fails
- [ ] OpenAI Agents SDK HITL workflow works
- [ ] User can approve/reject at key points
- [ ] Events stream to client in real-time via Redis
- [ ] Blocks save to database via Payload API
- [ ] Client sees blocks in admin panel
- [ ] Only authenticated users can trigger
- [ ] Users can only modify their own sites

---

## Implementation Steps

### Step 1: SQS Queue & Lambda Infrastructure

#### 1.1 Create SQS Queue in SST

**File: sst.config.ts** (add before Lambda definition)

```typescript
// Add to run() function

// Create SQS queue for generation jobs
const generationQueue = new sst.aws.Queue("GenerationQueue", {
  visibilityTimeout: "15 minutes", // Match Lambda timeout

  // Dead Letter Queue for failed jobs
  dlq: {
    retry: 3, // Retry 3 times before moving to DLQ
  },
});
```

#### 1.2 Create Lambda Function

```bash
# Create directory structure
mkdir -p src/workers/ai-generation
touch src/workers/ai-generation/handler.ts
touch src/workers/ai-generation/agent.ts
touch src/workers/ai-generation/events.ts
```

**File: src/workers/ai-generation/handler.ts**

```typescript
import { SQSEvent, SQSRecord } from "aws-lambda";
import { getPayload } from "payload";
import configPromise from "~/payload.config";
import { publishEvent } from "./events";
import { runGenerationAgent } from "./agent";

export const handler = async (event: SQSEvent) => {
  // Process all messages in batch (usually just 1 for generation)
  const results = await Promise.allSettled(
    event.Records.map(processRecord)
  );

  // Check for failures
  const failures = results.filter((r) => r.status === "rejected");

  if (failures.length > 0) {
    console.error(`${failures.length} records failed`);
    // Throw error to tell SQS to retry failed messages
    throw new Error(`Failed to process ${failures.length} messages`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ processed: results.length }),
  };
};

async function processRecord(record: SQSRecord) {
  const { jobId, siteId, userId, prompt } = JSON.parse(record.body);

  console.log(`Starting generation for job ${jobId}`);

  try {
    // Initialize Payload
    const payload = await getPayload({ config: configPromise });

    // Publish start event
    await publishEvent(jobId, {
      type: "generation_started",
      jobId,
      timestamp: new Date().toISOString(),
    });

    // Update job status in database
    await payload.update({
      collection: "generation-jobs",
      id: jobId,
      data: { status: "processing", startedAt: new Date() },
    });

    // Run agent
    const result = await runGenerationAgent({
      jobId,
      siteId,
      userId,
      prompt,
      payload,
    });

    // Update job status
    await payload.update({
      collection: "generation-jobs",
      id: jobId,
      data: { status: "completed", completedAt: new Date() },
    });

    // Publish complete event
    await publishEvent(jobId, {
      type: "generation_complete",
      jobId,
      result,
      timestamp: new Date().toISOString(),
    });

    return { success: true, jobId };
  } catch (error) {
    console.error(`Generation failed for job ${jobId}:`, error);

    // Update job status
    try {
      const payload = await getPayload({ config: configPromise });
      await payload.update({
        collection: "generation-jobs",
        id: jobId,
        data: {
          status: "failed",
          error: error.message,
          failedAt: new Date(),
        },
      });
    } catch (updateError) {
      console.error("Failed to update job status:", updateError);
    }

    // Publish error event
    await publishEvent(jobId, {
      type: "generation_error",
      jobId,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    // Re-throw to trigger SQS retry
    throw error;
  }
}
```

#### 1.3 Add Lambda and Connect to Queue

**File: sst.config.ts** (continued)

```typescript
// Create Lambda worker
const aiGenerationWorker = new sst.aws.Function("AIGenerationWorker", {
  handler: "src/workers/ai-generation/handler.handler",
  runtime: "nodejs22.x",
  timeout: "15 minutes",
  memory: "3008 MB",
  link: [
    generationQueue, // Link the queue
    DATABASE_URI,
    REDIS_URL,
    PAYLOAD_SECRET,
    S3_REGION,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
    bucket,
  ],
  environment: {
    DATABASE_URI: DATABASE_URI.value,
    REDIS_URL: REDIS_URL.value,
    OPENAI_API_KEY: OPENAI_API_KEY.value, // Add this secret
    ANTHROPIC_API_KEY: ANTHROPIC_API_KEY.value, // Add this secret
  },
  permissions: [
    {
      actions: ["lambda:InvokeFunction"],
      resources: ["*"],
    },
    {
      actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      resources: [bucket.arn, $interpolate`${bucket.arn}/*`],
    },
  ],
});

// Connect queue to Lambda (automatic polling and invocation)
generationQueue.subscribe(aiGenerationWorker.arn, {
  batchSize: 1, // Process 1 message at a time
  maxConcurrency: 5, // Max 5 concurrent generations
});

// Add secrets (run once)
const OPENAI_API_KEY = new sst.Secret("OPENAI_API_KEY");
const ANTHROPIC_API_KEY = new sst.Secret("ANTHROPIC_API_KEY");
```

**Set secrets**:
```bash
sst secret set OPENAI_API_KEY sk-... --stage dev
sst secret set ANTHROPIC_API_KEY sk-ant-... --stage dev
```

---

### Step 2: Event System

#### 2.1 Redis Pub/Sub Module

**File: src/workers/ai-generation/events.ts**

```typescript
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);
const publisher = redis.duplicate();

export interface GenerationEvent {
  type: string;
  jobId: string;
  timestamp: string;
  [key: string]: any;
}

export async function publishEvent(
  jobId: string,
  event: GenerationEvent
): Promise<void> {
  const channel = `generation:${jobId}`;

  // Publish to Redis pub/sub
  await publisher.publish(channel, JSON.stringify(event));

  // Also store in Redis with TTL for reconnection
  const key = `generation:${jobId}:events`;
  await redis.rpush(key, JSON.stringify(event));
  await redis.expire(key, 3600); // 1 hour TTL

  console.log(`Published event to ${channel}:`, event.type);
}

export async function getEventsSince(
  jobId: string,
  lastEventIndex: number = 0
): Promise<GenerationEvent[]> {
  const key = `generation:${jobId}:events`;
  const events = await redis.lrange(key, lastEventIndex, -1);
  return events.map((e) => JSON.parse(e));
}
```

#### 2.2 SSE Endpoint

**File: src/app/api/generate/[jobId]/stream/route.ts**

```typescript
import { NextRequest } from "next/server";
import Redis from "ioredis";
import { getEventsSince } from "~/workers/ai-generation/events";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;
  const { searchParams } = new URL(request.url);
  const lastEventIndex = parseInt(searchParams.get("lastEventIndex") || "0");

  const redis = new Redis(process.env.REDIS_URL!);
  const subscriber = redis.duplicate();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection event
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "connected", jobId })}\n\n`
        )
      );

      // Send any missed events
      try {
        const missedEvents = await getEventsSince(jobId, lastEventIndex);
        missedEvents.forEach((event, index) => {
          controller.enqueue(
            encoder.encode(
              `id: ${lastEventIndex + index + 1}\ndata: ${JSON.stringify(event)}\n\n`
            )
          );
        });
      } catch (error) {
        console.error("Error fetching missed events:", error);
      }

      // Subscribe to new events
      const channel = `generation:${jobId}`;
      await subscriber.subscribe(channel);

      let eventIndex = lastEventIndex + 1;

      subscriber.on("message", (ch, message) => {
        if (ch === channel) {
          controller.enqueue(
            encoder.encode(
              `id: ${eventIndex}\ndata: ${message}\n\n`
            )
          );
          eventIndex++;
        }
      });

      // Handle client disconnect
      request.signal.addEventListener("abort", () => {
        subscriber.unsubscribe(channel);
        subscriber.quit();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
```

---

### Step 3: OpenAI Agents SDK Integration

#### 3.1 Install Package

```bash
pnpm add @openai/agents
```

#### 3.2 Basic Agent Implementation

**File: src/workers/ai-generation/agent.ts**

```typescript
import { Agent } from "@openai/agents";
import { z } from "zod";
import type { Payload } from "payload";
import { publishEvent } from "./events";

interface GenerationContext {
  jobId: string;
  siteId: string;
  userId: string;
  prompt: string;
  payload: Payload;
}

export async function runGenerationAgent(context: GenerationContext) {
  const { jobId, siteId, userId, prompt, payload } = context;

  // Define block creation tool
  const createBlockTool = {
    name: "create_block",
    description: "Create a new block in the site",

    parameters: z.object({
      blockType: z.enum(["hero_1", "hero_2", "features_1", "features_2"]),
      fields: z.record(z.any()),
      reasoning: z.string(),
    }),

    execute: async ({ blockType, fields, reasoning }) => {
      await publishEvent(jobId, {
        type: "block_creating",
        jobId,
        blockType,
        reasoning,
        timestamp: new Date().toISOString(),
      });

      // Create block via PayloadCMS API
      const block = await payload.create({
        collection: "blocks",
        data: {
          blockType,
          ...fields,
          site: siteId,
        },
      });

      await publishEvent(jobId, {
        type: "block_created",
        jobId,
        blockId: block.id,
        blockType,
        timestamp: new Date().toISOString(),
      });

      return {
        success: true,
        blockId: block.id,
      };
    },
  };

  // Create agent
  const agent = new Agent({
    name: "Site Builder",
    model: "gpt-4o",

    instructions: `You are building a website based on user requirements.

User prompt: ${prompt}

Your job:
1. Understand what kind of site the user wants
2. Choose appropriate blocks from available types
3. Create blocks with appropriate content
4. Use the create_block tool for each block

Available blocks:
- hero_1: Simple centered hero with headline and CTA
- hero_2: Hero with image and dual CTAs
- features_1: 3-column features grid
- features_2: Features with icons

Create 3-5 blocks for a simple homepage.`,

    tools: [createBlockTool],
  });

  // Run agent with HITL
  const result = await agent.run(
    { prompt },
    {
      // Stream thinking
      onStream: async (chunk) => {
        await publishEvent(jobId, {
          type: "agent_thinking",
          jobId,
          content: chunk,
          timestamp: new Date().toISOString(),
        });
      },

      // HITL approval
      onToolApprovalRequired: async (toolCall) => {
        await publishEvent(jobId, {
          type: "approval_required",
          jobId,
          subject: toolCall.function.name,
          details: JSON.parse(toolCall.function.arguments),
          timestamp: new Date().toISOString(),
        });

        // Wait for user approval
        const approved = await waitForApproval(jobId, payload);

        await publishEvent(jobId, {
          type: "approval_received",
          jobId,
          approved,
          timestamp: new Date().toISOString(),
        });

        return approved;
      },
    }
  );

  return result;
}

// Helper: Wait for user approval
async function waitForApproval(
  jobId: string,
  payload: Payload
): Promise<boolean> {
  const maxWait = 60000; // 60 seconds
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    // Check for approval in database
    const approvals = await payload.find({
      collection: "generation-approvals",
      where: {
        jobId: { equals: jobId },
        processed: { equals: false },
      },
      limit: 1,
      sort: "-createdAt",
    });

    if (approvals.docs.length > 0) {
      const approval = approvals.docs[0];

      // Mark as processed
      await payload.update({
        collection: "generation-approvals",
        id: approval.id,
        data: { processed: true },
      });

      return approval.approved;
    }

    // Poll every second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Timeout - auto-approve
  return true;
}
```

---

### Step 4: PayloadCMS Integration

#### 4.1 Create Blocks Collection (if needed)

**File: src/payload/collections/blocks.ts** (or extend existing)

```typescript
import type { CollectionConfig } from "payload";

export const Blocks: CollectionConfig = {
  slug: "blocks",
  admin: {
    useAsTitle: "blockType",
  },
  fields: [
    {
      name: "blockType",
      type: "select",
      required: true,
      options: [
        { label: "Hero 1", value: "hero_1" },
        { label: "Hero 2", value: "hero_2" },
        { label: "Features 1", value: "features_1" },
        { label: "Features 2", value: "features_2" },
      ],
    },
    {
      name: "site",
      type: "relationship",
      relationTo: "sites",
      required: true,
    },
    {
      name: "fields",
      type: "json",
      required: true,
    },
    {
      name: "generatedByAI",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "generationJobId",
      type: "text",
    },
  ],
};
```

#### 4.2 Create Generation Approvals Collection

**File: src/payload/collections/generation-approvals.ts**

```typescript
import type { CollectionConfig } from "payload";

export const GenerationApprovals: CollectionConfig = {
  slug: "generation-approvals",
  fields: [
    {
      name: "jobId",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "details",
      type: "json",
    },
    {
      name: "approved",
      type: "checkbox",
      required: true,
    },
    {
      name: "processed",
      type: "checkbox",
      defaultValue: false,
      index: true,
    },
  ],
};
```

Add to `src/payload/collections/index.ts`:
```typescript
import { Blocks } from "./blocks";
import { GenerationApprovals } from "./generation-approvals";

export const collections = [
  // ... existing collections
  Blocks,
  GenerationApprovals,
];
```

---

### Step 5: Authentication

#### 5.1 API Route with Auth

**File: src/app/api/generate/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { getPayload } from "payload";
import configPromise from "~/payload.config";
import { SQS } from "@aws-sdk/client-sqs";

const sqs = new SQS({ region: process.env.AWS_REGION || "us-west-1" });

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // 2. Parse request
    const body = await request.json();
    const { siteId, prompt } = body;

    if (!siteId || !prompt) {
      return NextResponse.json(
        { error: "Missing siteId or prompt" },
        { status: 400 }
      );
    }

    // 3. Verify site ownership
    const payload = await getPayload({ config: configPromise });

    const site = await payload.findByID({
      collection: "sites",
      id: siteId,
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Check ownership (adjust based on your Site model)
    if (site.owner !== userId && site.user !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 4. Create generation job
    const job = await payload.create({
      collection: "generation-jobs",
      data: {
        siteId,
        userId,
        prompt,
        status: "queued",
        createdAt: new Date(),
      },
    });

    // 5. Send to SQS queue
    await sqs.sendMessage({
      QueueUrl: process.env.GENERATION_QUEUE_URL!,
      MessageBody: JSON.stringify({
        jobId: job.id,
        siteId,
        userId,
        prompt,
      }),
    });

    return NextResponse.json({
      jobId: job.id,
      status: "queued",
      message: "Generation started",
    });
  } catch (error) {
    console.error("Error starting generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### 5.2 Approval Endpoint

**File: src/app/api/generate/[jobId]/approve/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { getPayload } from "payload";
import configPromise from "~/payload.config";

export async function POST(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    // 1. Authenticate
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { jobId } = params;

    // 2. Parse request
    const { approved, subject } = await request.json();

    if (typeof approved !== "boolean") {
      return NextResponse.json(
        { error: "Missing approved field" },
        { status: 400 }
      );
    }

    // 3. Verify job ownership
    const payload = await getPayload({ config: configPromise });

    const job = await payload.findByID({
      collection: "generation-jobs",
      id: jobId,
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 4. Create approval record
    await payload.create({
      collection: "generation-approvals",
      data: {
        jobId,
        subject,
        approved,
        processed: false,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving approval:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

### Step 6: Client Integration

#### 6.1 React Hook for SSE

**File: src/hooks/useGenerationStream.ts**

```typescript
import { useEffect, useState, useCallback } from "react";

interface GenerationEvent {
  type: string;
  jobId: string;
  [key: string]: any;
}

export function useGenerationStream(jobId: string | null) {
  const [events, setEvents] = useState<GenerationEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastEventIndex, setLastEventIndex] = useState(0);

  useEffect(() => {
    if (!jobId) return;

    let eventSource: EventSource | null = null;

    const connect = () => {
      const url = `/api/generate/${jobId}/stream?lastEventIndex=${lastEventIndex}`;
      eventSource = new EventSource(url);

      eventSource.onopen = () => {
        console.log("SSE connected");
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setEvents((prev) => [...prev, data]);

        // Track last event ID for reconnection
        if (event.lastEventId) {
          setLastEventIndex(parseInt(event.lastEventId));
        }

        // If generation complete, close connection
        if (
          data.type === "generation_complete" ||
          data.type === "generation_error"
        ) {
          eventSource?.close();
          setIsConnected(false);
        }
      };

      eventSource.onerror = () => {
        console.error("SSE error, reconnecting...");
        setIsConnected(false);
        eventSource?.close();

        // Reconnect after delay
        setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      eventSource?.close();
    };
  }, [jobId, lastEventIndex]);

  return { events, isConnected };
}
```

#### 6.2 Generation UI Component

**File: src/app/admin/collections/sites/[id]/generate/page.tsx**

```typescript
"use client";

import { useState } from "react";
import { useGenerationStream } from "~/hooks/useGenerationStream";
import { useRouter } from "next/navigation";

export default function GeneratePage({ params }: { params: { id: string } }) {
  const siteId = params.id;
  const router = useRouter();

  const [jobId, setJobId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { events, isConnected } = useGenerationStream(jobId);

  const startGeneration = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setJobId(data.jobId);
      } else {
        alert(`Error: ${data.error}`);
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Failed to start generation:", error);
      alert("Failed to start generation");
      setIsGenerating(false);
    }
  };

  const handleApproval = async (approved: boolean, subject: string) => {
    if (!jobId) return;

    await fetch(`/api/generate/${jobId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved, subject }),
    });
  };

  // Handle different event types
  const currentEvent = events[events.length - 1];
  const needsApproval = currentEvent?.type === "approval_required";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generate Site with AI</h1>

      {!jobId ? (
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to build..."
            className="w-full h-32 p-4 border rounded"
          />

          <button
            onClick={startGeneration}
            disabled={isGenerating || !prompt.trim()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {isGenerating ? "Starting..." : "Generate"}
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <span className="font-semibold">Status:</span>{" "}
            {isConnected ? "Connected" : "Reconnecting..."}
          </div>

          {/* Event Feed */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.map((event, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded">
                <div className="font-semibold">{event.type}</div>
                {event.content && (
                  <div className="text-sm text-gray-600">{event.content}</div>
                )}
                {event.reasoning && (
                  <div className="text-sm text-gray-600">{event.reasoning}</div>
                )}
              </div>
            ))}
          </div>

          {/* Approval UI */}
          {needsApproval && (
            <div className="mt-4 p-4 border-2 border-yellow-400 rounded">
              <h3 className="font-bold mb-2">Approval Required</h3>
              <p className="mb-2">Subject: {currentEvent.subject}</p>
              <pre className="bg-gray-100 p-2 rounded text-sm mb-4">
                {JSON.stringify(currentEvent.details, null, 2)}
              </pre>

              <div className="flex gap-2">
                <button
                  onClick={() => handleApproval(true, currentEvent.subject)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(false, currentEvent.subject)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          )}

          {/* Completion */}
          {currentEvent?.type === "generation_complete" && (
            <div className="mt-4">
              <button
                onClick={() => router.push(`/admin/collections/sites/${siteId}`)}
                className="px-6 py-2 bg-blue-600 text-white rounded"
              >
                View Site
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### Step 7: PayloadCMS Admin Integration

#### 7.1 Cache Invalidation

**Research needed**: Check PayloadCMS docs for cache invalidation patterns.

**Options**:

1. **Automatic (via hooks)**:
```typescript
// In blocks collection config
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      // Trigger cache refresh
      // May need to use specific Payload API methods
    }
  ]
}
```

2. **Manual (client-side)**:
```typescript
// In client after receiving block_created event
import { usePayload } from '@payloadcms/ui';

const { refresh } = usePayload();

// When block created event received
refresh();
```

3. **Query invalidation (if using React Query)**:
```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// Invalidate site blocks query
queryClient.invalidateQueries(['blocks', siteId]);
```

**Action**: Test which method works with your setup.

---

## Testing Plan

### Test 1: SQS to Lambda Flow

```bash
# Send message to SQS queue
aws sqs send-message \
  --queue-url $GENERATION_QUEUE_URL \
  --message-body '{"jobId":"test123","siteId":"abc","userId":"user1","prompt":"test"}'

# Check Lambda was triggered (wait ~5 seconds)
aws logs tail /aws/lambda/AIGenerationWorker --follow

# Or check SQS metrics
aws sqs get-queue-attributes \
  --queue-url $GENERATION_QUEUE_URL \
  --attribute-names ApproximateNumberOfMessagesVisible
```

Expected: Message sent to queue, Lambda executes automatically, message deleted from queue.

---

### Test 2: Event Streaming

**Terminal 1**: Start SSE listener
```bash
curl -N http://localhost:3005/api/generate/test123/stream
```

**Terminal 2**: Send message to SQS
```bash
aws sqs send-message \
  --queue-url $GENERATION_QUEUE_URL \
  --message-body '{"jobId":"test123","siteId":"abc","userId":"user1","prompt":"test"}'
```

Expected: See events streaming in Terminal 1 as Lambda processes the job.

---

### Test 3: End-to-End Flow

1. Open PayloadCMS admin
2. Navigate to site
3. Click "Generate with AI"
4. Enter prompt: "Build a simple homepage"
5. Click "Generate"

Expected:
- Events appear in UI
- Approval dialog shows for block creation
- After approval, block appears in database
- Block visible in admin panel

---

### Test 4: Authentication

1. Try generating without login
   - Expected: 401 Unauthorized

2. Try generating for another user's site
   - Expected: 403 Forbidden

3. Try approving another user's job
   - Expected: 403 Forbidden

---

## Troubleshooting

### Lambda doesn't start
- Check SST deployment: `sst deploy --stage dev`
- Check secrets are set: `sst secret list --stage dev`
- Check IAM permissions in SST config

### Events not streaming
- Check Redis connection: `redis-cli ping`
- Check Redis pub/sub: `redis-cli monitor`
- Verify channel names match

### Blocks not appearing
- Check PayloadCMS local API initialization
- Check block collection exists
- Check site relationship field
- Try manual cache refresh

### Auth failing
- Check Better Auth session
- Verify JWT in request headers
- Check site ownership field name

---

## Environment Variables Checklist

```bash
# .env.local (for local development)
DATABASE_URI=mongodb://...
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GENERATION_QUEUE_URL=https://sqs.us-west-1.amazonaws.com/.../GenerationQueue
# SST provides queue URL automatically via resource linking
```

---

## Success Metrics

At the end of Phase 1, you should have:

- [ ] SQS queue created and connected to Lambda
- [ ] Messages sent to queue successfully
- [ ] Lambda executes when messages arrive
- [ ] Automatic retries work on failure
- [ ] Events stream to client via Redis in <500ms
- [ ] User can see live updates
- [ ] Blocks save to database
- [ ] Blocks appear in admin panel (with refresh)
- [ ] Auth prevents unauthorized access
- [ ] HITL approval flow works
- [ ] No errors in logs

---

## Next Steps (Phase 2)

After Phase 1 is complete:

1. Add more agents (orchestrator, specialists)
2. Implement multi-page generation
3. Add project memory system
4. Improve quality with better prompts
5. Add retry logic and error handling

---

## Resources

- [OpenAI Agents SDK Docs](https://github.com/openai/openai-agents-js)
- [HITL Guide](https://openai.github.io/openai-agents-js/guides/human-in-the-loop/)
- [PayloadCMS Local API](https://payloadcms.com/docs/local-api/overview)
- [SST Lambda](https://sst.dev/docs/component/aws/function)
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

---

**Ready to start building? Begin with Step 1: Lambda Infrastructure**
