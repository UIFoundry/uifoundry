# Solutions for Lambda 15-Minute Timeout

**Problem**: Users building sites with agents may take >15 minutes (Lambda max timeout)

**Your Proposed Solution**: Start new Lambda before timeout, handoff state from permanent storage

---

## Overview of Solutions

| Solution | Max Duration | Complexity | Cost | Best For |
|----------|-------------|------------|------|----------|
| Lambda Handoff | Unlimited (chains) | Medium | Low | MVP |
| Step Functions | 1 year | Low | Very Low | Simple orchestration |
| ECS Fargate | Unlimited | High | Medium | Production scale |
| SQS + Lambda Chunks | Unlimited | Medium | Low | Task-based work |
| Hybrid | Unlimited | Medium | Low-Medium | Best of all |

---

## Solution 1: Lambda Handoff (Your Idea)

### Concept

```
Lambda 1 (14 min) → Saves state → Spawns Lambda 2
                                         ↓
                                    Loads state
                                         ↓
                                  Continues work (14 min)
                                         ↓
                                  Saves state → Spawns Lambda 3
                                                      ↓
                                                  ... continues
```

### Implementation

```typescript
// Lambda 1: Execution Worker
export const executeGeneration = async (event) => {
  const { jobId, continuationState } = event;

  // Start timeout monitor
  const startTime = Date.now();
  const TIMEOUT_THRESHOLD = 13 * 60 * 1000; // 13 minutes (2 min buffer)

  // Load state if continuing
  let state = continuationState || await initializeState(jobId);

  // Process with timeout check
  while (state.hasMoreWork) {
    // Check if approaching timeout
    if (Date.now() - startTime > TIMEOUT_THRESHOLD) {
      console.log('Approaching timeout, handing off...');

      // Save current state
      await saveExecutionState(jobId, state);

      // Invoke new Lambda
      await lambda.invoke({
        FunctionName: process.env.FUNCTION_NAME, // Self-invoke
        InvocationType: 'Event', // Async
        Payload: JSON.stringify({
          jobId,
          continuationState: state,
        })
      });

      // Send handoff notification to user
      await publishUpdate(jobId, {
        type: 'status',
        message: 'Still working on your site, switching to fresh worker...'
      });

      return { status: 'handed_off', continuedBy: 'new_lambda' };
    }

    // Do work
    const task = state.nextTask();
    const result = await processTask(task);

    // Update state
    state.complete(task, result);

    // Persist state periodically (every task)
    await saveExecutionState(jobId, state);
  }

  return { status: 'completed', jobId };
};

// State structure
interface ExecutionState {
  jobId: string;
  projectId: string;

  // What's been done
  completedTasks: string[];
  completedPages: string[];

  // What's next
  currentPage: string;
  currentBlockPosition: number;
  remainingPages: PageSpec[];

  // Context to continue
  plan: SitePlan;
  colorPalette: ColorPalette;
  projectDocs: ProjectDocuments;

  // Progress
  totalBlocks: number;
  completedBlocks: number;

  // Metadata
  startedAt: Date;
  lastUpdatedAt: Date;
  handoffCount: number;
}

// Save state to MongoDB
async function saveExecutionState(jobId: string, state: ExecutionState) {
  await payload.upsert({
    collection: 'execution-states',
    where: { jobId: { equals: jobId } },
    data: {
      ...state,
      lastUpdatedAt: new Date(),
    }
  });
}

// Load state
async function loadExecutionState(jobId: string): Promise<ExecutionState> {
  const result = await payload.find({
    collection: 'execution-states',
    where: { jobId: { equals: jobId } },
    limit: 1,
  });

  if (result.docs.length === 0) {
    throw new Error('No execution state found');
  }

  return result.docs[0] as ExecutionState;
}

// Initialize state for first Lambda
async function initializeState(jobId: string): Promise<ExecutionState> {
  const job = await getJob(jobId);
  const plan = await createPlan(job.prompt);

  return {
    jobId,
    projectId: job.projectId,
    completedTasks: [],
    completedPages: [],
    currentPage: plan.sitemap[0].slug,
    currentBlockPosition: 0,
    remainingPages: plan.sitemap,
    plan,
    colorPalette: null, // Will be set after color agent
    projectDocs: await loadProjectDocs(job.projectId),
    totalBlocks: plan.sitemap.reduce((sum, page) => sum + page.blocks.length, 0),
    completedBlocks: 0,
    startedAt: new Date(),
    lastUpdatedAt: new Date(),
    handoffCount: 0,
  };
}
```

### Pros
✅ Unlimited duration (chain indefinitely)
✅ Uses existing Lambda infrastructure
✅ State in permanent storage (MongoDB)
✅ Relatively simple to implement
✅ Low additional cost
✅ User connection stays alive (via SSE to different endpoint)

### Cons
❌ Cold start on each handoff (2-5 second pause)
❌ Need to carefully manage state serialization
❌ SSE client needs to reconnect or handle continuity
❌ Slightly complex error recovery (which Lambda failed?)
❌ Each handoff is a potential failure point

### Best For
- MVP/early product
- Most builds complete in <15 min
- Occasional need for longer builds
- Don't want to manage containers

---

## Solution 2: AWS Step Functions

### Concept

Step Functions orchestrate long-running workflows by coordinating multiple Lambda invocations.

```
Start → Orchestrator Lambda → State Machine → Task Lambdas → Complete
              ↓                     ↓              ↓
        Creates workflow      Tracks progress   Execute tasks
```

### Implementation

```typescript
// Step Functions definition (via SST)
const generationWorkflow = new sst.aws.StepFunction("GenerationWorkflow", {
  definition: {
    Comment: "Multi-agent site generation workflow",
    StartAt: "CreatePlan",
    States: {
      CreatePlan: {
        Type: "Task",
        Resource: orchestratorLambda.arn,
        Next: "SelectColors",
        TimeoutSeconds: 300,
        Retry: [{
          ErrorEquals: ["States.TaskFailed"],
          IntervalSeconds: 2,
          MaxAttempts: 3,
        }],
      },

      SelectColors: {
        Type: "Task",
        Resource: colorPaletteLambda.arn,
        Next: "BuildPages",
        TimeoutSeconds: 120,
      },

      BuildPages: {
        Type: "Map",
        ItemsPath: "$.plan.pages",
        MaxConcurrency: 3, // Process 3 pages in parallel
        Iterator: {
          StartAt: "BuildPage",
          States: {
            BuildPage: {
              Type: "Task",
              Resource: pageBuilderLambda.arn,
              End: true,
              TimeoutSeconds: 600, // 10 min per page
            }
          }
        },
        Next: "Finalize"
      },

      Finalize: {
        Type: "Task",
        Resource: finalizerLambda.arn,
        End: true,
        TimeoutSeconds: 60,
      }
    }
  }
});

// Start workflow
export async function POST(request: Request) {
  const { jobId, prompt } = await request.json();

  const execution = await stepFunctions.startExecution({
    stateMachineArn: WORKFLOW_ARN,
    name: `generation-${jobId}`,
    input: JSON.stringify({
      jobId,
      prompt,
      projectId,
    })
  });

  return Response.json({
    jobId,
    executionArn: execution.executionArn,
  });
}

// Each Lambda is simple and focused
export const buildPage = async (event) => {
  const { pageSpec, colorPalette, projectDocs } = event;

  // Build page (under 10 minutes)
  const blocks = await buildPageBlocks(pageSpec, colorPalette, projectDocs);

  // Return result to Step Function
  return {
    pageSlug: pageSpec.slug,
    blocks,
    completedAt: new Date().toISOString(),
  };
};

// Monitor execution
export async function checkStatus(executionArn: string) {
  const execution = await stepFunctions.describeExecution({
    executionArn
  });

  return {
    status: execution.status, // RUNNING, SUCCEEDED, FAILED
    startDate: execution.startDate,
    stopDate: execution.stopDate,
    output: execution.output ? JSON.parse(execution.output) : null,
  };
}
```

### Pros
✅ **Max 1 year duration** (effectively unlimited)
✅ Built-in error handling and retries
✅ Visual workflow in AWS Console
✅ Parallel execution (Map state)
✅ No handoff logic needed
✅ Automatic state management
✅ Very low cost ($25 per 1M state transitions)
✅ SST has great support

### Cons
❌ Each step is separate Lambda (more granular design needed)
❌ Limited to 25KB state size (need external storage for large state)
❌ Streaming updates require external mechanism (still need SSE + Redis/MongoDB)
❌ Learning curve for Step Functions syntax
❌ Less flexible than pure code

### Best For
- Production-ready long-running workflows
- Clear task boundaries (plan → colors → pages → finalize)
- Want built-in orchestration
- Don't mind AWS-specific solution

---

## Solution 3: ECS Fargate (Long-Running Container)

### Concept

Run agent execution in a container instead of Lambda. Container can run indefinitely.

```
API Request → SQS → ECS Fargate Task → Agent Execution (unlimited time)
                         ↓
                    Streams via WebSocket/SSE
```

### Implementation

```typescript
// sst.config.ts - Add ECS cluster
const vpc = new sst.aws.Vpc("GenerationVpc");

const cluster = new sst.aws.Cluster("GenerationCluster", { vpc });

cluster.addService("GenerationWorker", {
  image: {
    dockerfile: "./docker/generation-worker/Dockerfile",
  },
  memory: "4 GB",
  cpu: "2 vCPU",

  environment: {
    DATABASE_URI: DATABASE_URI.value,
    REDIS_URL: REDIS_URL.value,
    OPENAI_API_KEY: OPENAI_API_KEY.value,
    // ... other secrets
  },

  scaling: {
    min: 0, // Scale to zero when no jobs
    max: 10, // Max concurrent generations
  },

  // Auto-scaling based on SQS queue depth
  autoscaling: {
    cpu: 70,
    memory: 80,
  }
});

// API triggers ECS task
export async function POST(request: Request) {
  const { jobId, prompt } = await request.json();

  // Put job in SQS
  await sqs.sendMessage({
    QueueUrl: GENERATION_QUEUE_URL,
    MessageBody: JSON.stringify({ jobId, prompt })
  });

  return Response.json({ jobId, status: 'queued' });
}

// ECS task picks up from SQS
// docker/generation-worker/worker.ts
async function main() {
  console.log('Worker started, polling SQS...');

  while (true) {
    const messages = await sqs.receiveMessage({
      QueueUrl: GENERATION_QUEUE_URL,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 20,
    });

    if (!messages.Messages || messages.Messages.length === 0) {
      continue;
    }

    const message = messages.Messages[0];
    const { jobId, prompt } = JSON.parse(message.Body);

    try {
      // Process generation (no time limit!)
      await executeGeneration(jobId, prompt);

      // Delete message from queue
      await sqs.deleteMessage({
        QueueUrl: GENERATION_QUEUE_URL,
        ReceiptHandle: message.ReceiptHandle,
      });
    } catch (error) {
      console.error('Generation failed:', error);
      // Message will become visible again for retry
    }
  }
}

main();
```

### Pros
✅ **Unlimited execution time**
✅ More memory/CPU available
✅ Can use any runtime/libraries
✅ Persistent connections (WebSockets easier)
✅ No cold starts during execution
✅ Better for CPU-intensive tasks

### Cons
❌ Higher cost (always-on or slower scale-to-zero)
❌ More complex infrastructure (VPC, containers, etc.)
❌ Need to manage Docker images
❌ Slower cold start (30-60 seconds to start container)
❌ More operational overhead

### Cost Example
- Fargate: $0.04/vCPU-hour + $0.004/GB-hour
- 2 vCPU, 4GB: ~$0.10/hour
- 30-minute build: ~$0.05
- Lambda equivalent: ~$0.02

**~2.5x more expensive than Lambda**

### Best For
- Production scale (hundreds of concurrent generations)
- Consistently long builds (>10 min average)
- Need more resources (CPU/memory)
- WebSocket requirements

---

## Solution 4: SQS + Lambda Task Chunks

### Concept

Break generation into many small tasks, each <5 minutes. Queue them in SQS.

```
API → Create Tasks → SQS Queue ← Lambda Workers (parallel)
                         ↓
                    MongoDB State
                         ↓
                    Orchestrator monitors
```

### Implementation

```typescript
// API creates task queue
export async function POST(request: Request) {
  const { jobId, prompt } = await request.json();

  // Create plan
  const plan = await quickPlan(prompt);

  // Break into tasks
  const tasks = [
    { type: 'plan', jobId },
    { type: 'colors', jobId },
    ...plan.pages.flatMap(page => [
      { type: 'select_blocks', jobId, pageSlug: page.slug },
      ...page.blocks.map((_, i) => ({
        type: 'write_copy',
        jobId,
        pageSlug: page.slug,
        blockPosition: i,
      })),
      ...page.blocks.map((_, i) => ({
        type: 'curate_media',
        jobId,
        pageSlug: page.slug,
        blockPosition: i,
      })),
    ]),
    { type: 'finalize', jobId },
  ];

  // Queue all tasks
  await Promise.all(
    tasks.map(task =>
      sqs.sendMessage({
        QueueUrl: TASK_QUEUE_URL,
        MessageBody: JSON.stringify(task),
      })
    )
  );

  return Response.json({ jobId, totalTasks: tasks.length });
}

// Lambda workers process tasks (many in parallel)
export const processTask = async (event) => {
  const records = event.Records;

  for (const record of records) {
    const task = JSON.parse(record.body);

    // Load context
    const context = await loadTaskContext(task.jobId);

    // Execute specific task type
    switch (task.type) {
      case 'write_copy':
        await writeCopyTask(task, context);
        break;
      case 'curate_media':
        await curateMediaTask(task, context);
        break;
      // ... other task types
    }

    // Mark task complete
    await markTaskComplete(task);

    // Check if all tasks done
    const allDone = await checkAllTasksComplete(task.jobId);
    if (allDone) {
      await finalizeGeneration(task.jobId);
    }
  }
};
```

### Pros
✅ Unlimited duration (tasks can take any combined time)
✅ Parallel processing (many Lambdas work simultaneously)
✅ Natural retries (SQS redelivery)
✅ Cheap (pay per task, not per hour)
✅ Scales automatically

### Cons
❌ Complex coordination (task dependencies)
❌ Need careful state management
❌ Tasks may complete out of order
❌ Hard to maintain conversation context across tasks
❌ Streaming updates more complex

### Best For
- Highly parallelizable work
- Independent tasks (blocks can be written in any order)
- Cost optimization (only pay for active work)
- Scale to many concurrent users

---

## Solution 5: Hybrid Approach (Recommended)

### Concept

Use Lambda for most builds, automatically upgrade to Fargate for long builds.

```
Start → Lambda (15 min) → Still running? → Fargate continuation
            ↓                     ↓
        Most builds          Long builds
         complete              continue
```

### Implementation

```typescript
// Lambda execution with automatic upgrade
export const executeGeneration = async (event) => {
  const { jobId, startTime } = event;
  const elapsed = Date.now() - (startTime || Date.now());

  // First invocation or continuing?
  if (!startTime) {
    // First time - try in Lambda
    return await executeInLambda(jobId);
  }

  // Continuing - check if we should upgrade
  if (elapsed > 10 * 60 * 1000) {
    // Been running 10+ minutes, upgrade to Fargate
    await upgradeToFargate(jobId);

    return { status: 'upgraded_to_fargate' };
  }

  // Continue in Lambda
  return await executeInLambda(jobId);
};

async function executeInLambda(jobId: string) {
  const startTime = Date.now();
  const TIMEOUT_THRESHOLD = 13 * 60 * 1000;

  let state = await loadOrInitState(jobId);

  while (state.hasMoreWork) {
    if (Date.now() - startTime > TIMEOUT_THRESHOLD) {
      // Save and continue
      await saveState(jobId, state);

      // Self-invoke with continuation
      await lambda.invoke({
        FunctionName: process.env.FUNCTION_NAME,
        InvocationType: 'Event',
        Payload: JSON.stringify({
          jobId,
          startTime: state.startedAt.getTime(),
        })
      });

      return { status: 'continuing' };
    }

    await processNextTask(state);
  }

  return { status: 'completed' };
}

async function upgradeToFargate(jobId: string) {
  // Launch Fargate task
  await ecs.runTask({
    cluster: GENERATION_CLUSTER,
    taskDefinition: GENERATION_WORKER_TASK,
    launchType: 'FARGATE',
    overrides: {
      containerOverrides: [{
        name: 'generation-worker',
        environment: [
          { name: 'JOB_ID', value: jobId },
          { name: 'CONTINUATION', value: 'true' }
        ]
      }]
    },
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [SUBNET_ID],
        securityGroups: [SECURITY_GROUP_ID],
        assignPublicIp: 'ENABLED',
      }
    }
  });

  await publishUpdate(jobId, {
    type: 'status',
    message: 'This is taking longer than expected. Upgrading to more powerful worker...'
  });
}
```

### Pros
✅ Best of both worlds
✅ Most users stay in Lambda (cheap)
✅ Long builds automatically upgrade (unlimited)
✅ Gradual cost scaling
✅ User doesn't notice transition

### Cons
❌ Most complex implementation
❌ Need both Lambda and Fargate infrastructure
❌ Handoff logic required

### Best For
- Production product
- Variable build times
- Cost optimization
- Best user experience

---

## Recommendation Matrix

### For MVP (Next 3 Months)
**Lambda Handoff** or **Step Functions**

Both are simple, use existing infrastructure, low cost.

- Use **Lambda Handoff** if you want full control and simple code
- Use **Step Functions** if you want AWS to handle orchestration

### For Production (6+ Months)
**Hybrid Approach**

Start in Lambda, automatically upgrade long builds to Fargate.

- Optimizes cost (most builds stay cheap)
- Handles edge cases (long builds)
- Best user experience

---

## SSE Connection Handling

All solutions need to handle SSE continuity:

```typescript
// Client reconnection logic
class GenerationStreamManager {
  private eventSource: EventSource | null = null;
  private jobId: string;
  private lastEventId: string = '0';

  connect() {
    // Include last event ID for resume
    this.eventSource = new EventSource(
      `/api/generate/${this.jobId}/stream?lastEventId=${this.lastEventId}`
    );

    this.eventSource.onmessage = (event) => {
      this.lastEventId = event.lastEventId;
      this.handleUpdate(JSON.parse(event.data));
    };

    this.eventSource.onerror = () => {
      // Reconnect after delay
      setTimeout(() => this.connect(), 1000);
    };
  }

  handleUpdate(update: any) {
    // Process update
    // UI stays responsive even through handoffs
  }
}

// Server: Support lastEventId for resume
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lastEventId = searchParams.get('lastEventId') || '0';

  // Stream events since lastEventId
  const stream = new ReadableStream({
    async start(controller) {
      // Subscribe to Redis
      const subscriber = redis.duplicate();
      await subscriber.subscribe(`job:${jobId}:updates`);

      // Send any missed events
      const missed = await getMissedEvents(jobId, lastEventId);
      missed.forEach(event => {
        controller.enqueue(formatSSE(event));
      });

      // Stream new events
      subscriber.on('message', (channel, message) => {
        controller.enqueue(formatSSE(message));
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  });
}
```

---

## Decision Framework

Ask yourself:

**1. What % of builds will exceed 15 minutes?**
- <5%: Lambda Handoff (simple)
- 5-20%: Step Functions or Hybrid
- >20%: Fargate from start

**2. How important is cost optimization?**
- Critical: Lambda Handoff or Step Functions
- Important: Hybrid
- Not important: Fargate

**3. How much complexity can you handle?**
- Low: Step Functions (AWS manages)
- Medium: Lambda Handoff
- High: Hybrid or Fargate

**4. What's your timeline?**
- 1-2 weeks: Lambda Handoff
- 3-4 weeks: Step Functions
- 2+ months: Hybrid

---

## My Recommendation

### For Your MVP: **Lambda Handoff**

**Why**:
1. ✅ Simplest to implement (1 week)
2. ✅ Uses existing SST/Lambda infrastructure
3. ✅ State already in MongoDB
4. ✅ Low cost
5. ✅ Easy to upgrade later

**Implementation Plan**:
1. Add execution-states collection
2. Add timeout monitor to Lambda
3. Add self-invocation on timeout
4. Test with 20-minute build

**Then migrate to**: Hybrid approach once you have data on actual build times

### Long-Term: **Hybrid (Lambda → Fargate)**

Best combination of cost and capability.

---

## Next Steps

Want to implement Lambda Handoff for MVP? I can help you:

1. Design execution state schema
2. Build timeout monitor
3. Implement handoff logic
4. Test continuity
5. Handle SSE reconnection

Ready to start?
