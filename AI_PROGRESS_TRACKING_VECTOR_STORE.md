# Progress Tracking & Vector Store Architecture

**Purpose**: Real-time subagent coordination + cross-user learning from thousands of builds

---

## Problem Statement

### 1. Subagent Coordination
**Need**: Orchestrator must track status of all specialized agents in real-time
- Which agent is working on what?
- What's completed vs. in-progress vs. failed?
- Update UI as each task completes

### 2. Cross-User Learning
**Need**: Agents should learn from thousands of previous builds
- "Other coffee shops typically use these blocks"
- "SaaS sites usually have these sections"
- "This headline style works well for fitness brands"

**Benefit**: First-time users get quality of experienced users

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Generation Process                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌────────────────────┼────────────────────┐
        ↓                    ↓                    ↓
   Orchestrator         Subagents           Progress Store
   (Coordinator)     (Specialists)          (Real-time)
        │                    │                    │
        │  1. Assigns task   │                    │
        ├───────────────────→│                    │
        │                    │                    │
        │                    │  2. Updates status │
        │                    ├───────────────────→│
        │                    │                    │
        │  3. Polls progress │                    │
        ├────────────────────┴───────────────────→│
        │                                         │
        │  4. Streams to UI                       │
        └─────────────────────────────────────────┘
                              │
                              ↓
                    ┌─────────────────┐
                    │  Vector Store   │
                    │  (Cross-User    │
                    │   Learning)     │
                    └─────────────────┘
                              ↑
                    On completion, embed:
                    - User intent
                    - Blocks selected
                    - Copy patterns
                    - User feedback
                    - Industry/type
```

---

## Part 1: Progress Tracking Store

### Option A: MongoDB (Recommended for MVP)

**Why**: You're already using it, familiar, good for this use case

```typescript
// Collection: generation-tasks
interface GenerationTask {
  id: string;
  jobId: string; // Parent generation job
  projectId: string;

  // Task identification
  taskType: 'plan' | 'colors' | 'select_block' | 'write_copy' | 'curate_media' | 'validate';
  agent: 'orchestrator' | 'color_palette' | 'block_selector' | 'copywriter' | 'media_curator' | 'validator';

  // Context
  context: {
    pageSlug?: string;
    blockPosition?: number;
    parentTaskId?: string; // For subtasks
  };

  // Status tracking
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'retry';
  progress: number; // 0-100

  // Timing
  queuedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number; // milliseconds

  // Input/Output
  input: any; // What was given to agent
  output?: any; // What agent produced
  error?: string;

  // For retries
  retryCount: number;
  maxRetries: number;

  // Metadata
  metadata: {
    model: string; // Which LLM
    tokenCount?: number;
    cost?: number;
  };

  updatedAt: Date;
}

// Indexes
// - jobId + status (find active tasks for a job)
// - jobId + taskType (find specific task types)
// - agent + status (see what each agent is doing)
// - updatedAt (recent activity)
```

**Usage Example**:

```typescript
// Subagent: Block Selector starts work
await payload.create({
  collection: 'generation-tasks',
  data: {
    jobId,
    projectId,
    taskType: 'select_block',
    agent: 'block_selector',
    context: {
      pageSlug: 'home',
      blockPosition: 0,
    },
    status: 'in_progress',
    progress: 0,
    input: { pageSpec, brandGuidelines },
    queuedAt: new Date(),
    startedAt: new Date(),
    retryCount: 0,
    maxRetries: 3,
  }
});

// Subagent: Update progress
await payload.update({
  collection: 'generation-tasks',
  where: {
    jobId: { equals: jobId },
    taskType: { equals: 'select_block' },
    status: { equals: 'in_progress' }
  },
  data: {
    progress: 50,
    updatedAt: new Date(),
  }
});

// Subagent: Mark complete
await payload.update({
  collection: 'generation-tasks',
  where: {
    jobId: { equals: jobId },
    taskType: { equals: 'select_block' },
    status: { equals: 'in_progress' }
  },
  data: {
    status: 'completed',
    progress: 100,
    output: { blockType: 'hero_2', reasoning: '...' },
    completedAt: new Date(),
    duration: Date.now() - startTime,
    metadata: {
      model: 'claude-sonnet-4.5',
      tokenCount: 2500,
      cost: 0.0075,
    },
    updatedAt: new Date(),
  }
});

// Orchestrator: Check all task statuses
const tasks = await payload.find({
  collection: 'generation-tasks',
  where: {
    jobId: { equals: jobId }
  },
  sort: 'queuedAt',
});

const summary = {
  total: tasks.totalDocs,
  completed: tasks.docs.filter(t => t.status === 'completed').length,
  inProgress: tasks.docs.filter(t => t.status === 'in_progress').length,
  failed: tasks.docs.filter(t => t.status === 'failed').length,
  currentTask: tasks.docs.find(t => t.status === 'in_progress'),
};

// Stream to UI
publishUpdate(jobId, {
  type: 'progress',
  summary,
  currentTask: summary.currentTask,
});
```

### Option B: Redis (For High-Frequency Updates)

**Why**: Faster for real-time updates, you already use it for caching

```typescript
// Redis keys structure
generation:job:{jobId}:tasks -> Set of task IDs
generation:task:{taskId} -> Hash of task data
generation:job:{jobId}:current -> Current task ID
generation:job:{jobId}:progress -> Progress %

// Write task status (Subagent)
await redis.hset(`generation:task:${taskId}`, {
  status: 'in_progress',
  agent: 'block_selector',
  progress: 50,
  updatedAt: Date.now(),
});

await redis.sadd(`generation:job:${jobId}:tasks`, taskId);

// Read all tasks (Orchestrator)
const taskIds = await redis.smembers(`generation:job:${jobId}:tasks`);
const tasks = await Promise.all(
  taskIds.map(id => redis.hgetall(`generation:task:${id}`))
);

// Pub/Sub for real-time updates
await redis.publish(`job:${jobId}:task-updates`, JSON.stringify({
  taskId,
  status: 'completed',
  output: result,
}));
```

**Hybrid Approach** (Recommended):
- **Redis** for real-time status updates (fast writes)
- **MongoDB** for permanent task history (queryable, analytics)

```typescript
// Subagent updates both
await Promise.all([
  // Fast: Redis for real-time
  redis.hset(`generation:task:${taskId}`, { status, progress }),

  // Permanent: MongoDB for history
  payload.update({
    collection: 'generation-tasks',
    id: taskId,
    data: { status, progress, updatedAt: new Date() }
  })
]);

// Orchestrator reads from Redis (faster)
const currentStatus = await redis.hgetall(`generation:task:${taskId}`);

// Analytics/history from MongoDB
const pastTasks = await payload.find({
  collection: 'generation-tasks',
  where: { projectId, status: 'completed' }
});
```

---

## Part 2: Vector Store for Cross-User Learning

### What to Vectorize

```typescript
interface BuildInteraction {
  // Context
  industry: string; // 'coffee_shop', 'saas', 'ecommerce', 'portfolio'
  projectType: string; // 'marketing_site', 'landing_page', 'multi_page'
  userIntent: string; // Original prompt

  // Decisions made
  blocks: {
    pageSlug: string;
    blockType: string;
    position: number;
    reasoning: string;
  }[];

  colorPalette: {
    primary: string;
    secondary: string;
    reasoning: string;
  };

  copyPatterns: {
    headlineStyle: string;
    toneDescription: string;
    avgHeadlineLength: number;
    ctaPatterns: string[];
  };

  // User feedback
  feedback: {
    positivePatterns: string[]; // What user loved
    corrections: string[]; // What user changed
  };

  // Outcomes
  completedSuccessfully: boolean;
  timeToComplete: number;
  iterationCount: number;

  // Embedding text (what gets vectorized)
  embeddingText: string;
}

// Generate embedding text
const embeddingText = `
Industry: ${interaction.industry}
Project Type: ${interaction.projectType}
User Intent: ${interaction.userIntent}

Blocks Used:
${interaction.blocks.map(b =>
  `- ${b.blockType} on ${b.pageSlug} (${b.reasoning})`
).join('\n')}

Color Palette: ${interaction.colorPalette.reasoning}

Copy Style: ${interaction.copyPatterns.toneDescription}

User Loved: ${interaction.feedback.positivePatterns.join(', ')}
User Changed: ${interaction.feedback.corrections.join(', ')}
`;
```

### Vector Store Options

#### Option A: Pinecone (Managed, Easy)

```typescript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const index = pinecone.index('uifoundry-builds');

// After successful build, embed and store
const embedding = await generateEmbedding(embeddingText); // OpenAI embeddings

await index.upsert([{
  id: `build_${jobId}`,
  values: embedding,
  metadata: {
    industry: interaction.industry,
    projectType: interaction.projectType,
    blocks: JSON.stringify(interaction.blocks),
    colorPalette: JSON.stringify(interaction.colorPalette),
    successScore: calculateSuccessScore(interaction),
    timestamp: Date.now(),
  }
}]);

// Query similar builds
const queryEmbedding = await generateEmbedding(
  `Industry: coffee_shop, Project Type: marketing_site, User Intent: ${userPrompt}`
);

const results = await index.query({
  vector: queryEmbedding,
  topK: 10,
  filter: {
    industry: { $eq: 'coffee_shop' }
  },
  includeMetadata: true,
});

// Use results to inform decisions
const similarBuilds = results.matches.map(m => ({
  blocks: JSON.parse(m.metadata.blocks),
  colorPalette: JSON.parse(m.metadata.colorPalette),
  similarity: m.score,
}));
```

**Cost**: ~$70/month for 100k vectors (10k users × 10 builds each)

#### Option B: MongoDB Atlas Vector Search (Simpler)

```typescript
// You already have MongoDB, Atlas supports vector search

// Collection: build-learnings
interface BuildLearning {
  id: string;

  // Metadata
  industry: string;
  projectType: string;

  // Embedding
  embedding: number[]; // 1536 dimensions (OpenAI)

  // Data
  blocks: BlockSelection[];
  colorPalette: ColorPalette;
  copyPatterns: CopyPatterns;
  feedback: UserFeedback;

  successScore: number; // 0-1, based on user satisfaction

  createdAt: Date;
}

// Create vector search index in Atlas
// (via Atlas UI or CLI)

// Query similar builds
const queryEmbedding = await generateEmbedding(userIntent);

const similarBuilds = await payload.db.collection('build-learnings')
  .aggregate([
    {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: 'embedding',
        numCandidates: 100,
        limit: 10,
        index: 'build_learnings_vector_index',
        filter: {
          industry: 'coffee_shop',
          successScore: { $gte: 0.8 } // Only learn from successful builds
        }
      }
    }
  ]).toArray();
```

**Cost**: Included in MongoDB Atlas, no extra service needed

**Recommendation**: Use MongoDB Atlas Vector Search for MVP (simpler, one less service)

---

## Integration: Agents Using Vector Store

### At Build Time

```typescript
// Block Selector Agent with cross-user learning

const blockSelectorAgent = new Agent({
  name: 'Block Selector',
  model: 'claude-sonnet-4.5',

  tools: [
    {
      name: 'query_similar_builds',
      description: 'Find how similar projects chose their blocks',

      parameters: z.object({
        industry: z.string(),
        pageType: z.string(),
        userIntent: z.string(),
      }),

      execute: async ({ industry, pageType, userIntent }) => {
        // Generate embedding
        const embedding = await generateEmbedding(
          `Industry: ${industry}, Page: ${pageType}, Intent: ${userIntent}`
        );

        // Query vector store
        const similar = await findSimilarBuilds(embedding, {
          industry,
          minSuccessScore: 0.8,
          limit: 5,
        });

        // Aggregate patterns
        const blockPopularity = {};
        similar.forEach(build => {
          build.blocks
            .filter(b => b.pageType === pageType)
            .forEach(b => {
              blockPopularity[b.blockType] = (blockPopularity[b.blockType] || 0) + 1;
            });
        });

        return {
          similarBuildsFound: similar.length,
          commonPatterns: blockPopularity,
          recommendations: Object.entries(blockPopularity)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([block, count]) => ({
              blockType: block,
              frequency: count / similar.length,
              reasoning: `${Math.round(count / similar.length * 100)}% of similar ${industry} sites use this block`
            })),
        };
      }
    }
  ],

  instructions: `You select UI blocks for pages.

  Before choosing, use the query_similar_builds tool to see what
  worked well for similar projects.

  Consider:
  1. What similar successful builds used
  2. User's specific requirements
  3. Page purpose and position

  Explain your reasoning including insights from similar builds.`
});

// Agent output
{
  blockType: 'hero_2',
  reasoning: `Based on 8 similar coffee shop sites (87% success rate),
              Hero 2's centered layout is most effective for emphasizing
              ambiance and sustainability messaging, which aligns with
              your "eco-friendly coffee" focus. Alternative Hero blocks
              (1, 3, 5) were used but scored lower on user satisfaction.`
}
```

### After Build: Store Learning

```typescript
// After successful completion
async function storeBuildLearning(jobId: string) {
  const job = await getJob(jobId);
  const tasks = await getTasks(jobId);
  const feedback = await getFeedback(jobId);

  // Compile interaction data
  const interaction = {
    industry: job.detectedIndustry,
    projectType: job.projectType,
    userIntent: job.originalPrompt,

    blocks: tasks
      .filter(t => t.taskType === 'select_block' && t.status === 'completed')
      .map(t => ({
        pageSlug: t.context.pageSlug,
        blockType: t.output.blockType,
        position: t.context.blockPosition,
        reasoning: t.output.reasoning,
      })),

    colorPalette: tasks.find(t => t.taskType === 'colors').output,

    copyPatterns: extractCopyPatterns(tasks),

    feedback: {
      positivePatterns: feedback.filter(f => f.sentiment === 'positive').map(f => f.pattern),
      corrections: feedback.filter(f => f.type === 'correction').map(f => f.change),
    },

    completedSuccessfully: job.status === 'completed',
    timeToComplete: job.completedAt - job.createdAt,
    iterationCount: tasks.filter(t => t.retryCount > 0).length,
  };

  // Calculate success score
  const successScore = calculateSuccessScore(interaction);

  // Generate embedding
  const embeddingText = buildEmbeddingText(interaction);
  const embedding = await generateEmbedding(embeddingText);

  // Store in vector DB
  await payload.create({
    collection: 'build-learnings',
    data: {
      industry: interaction.industry,
      projectType: interaction.projectType,
      embedding,
      blocks: interaction.blocks,
      colorPalette: interaction.colorPalette,
      copyPatterns: interaction.copyPatterns,
      feedback: interaction.feedback,
      successScore,
      jobId,
      createdAt: new Date(),
    }
  });

  console.log(`Stored learning from ${jobId} (success: ${successScore})`);
}

// Success score calculation
function calculateSuccessScore(interaction: BuildInteraction): number {
  let score = 0.5; // Base score

  // Completed successfully
  if (interaction.completedSuccessfully) score += 0.2;

  // Low iteration count (few retries)
  if (interaction.iterationCount < 3) score += 0.15;

  // Positive user feedback
  score += Math.min(interaction.feedback.positivePatterns.length * 0.05, 0.2);

  // Few corrections (user was happy)
  if (interaction.feedback.corrections.length === 0) score += 0.1;
  else if (interaction.feedback.corrections.length < 3) score += 0.05;

  // Fast completion (under 5 minutes)
  if (interaction.timeToComplete < 300000) score += 0.1;

  return Math.min(score, 1.0);
}
```

---

## UI Updates from Progress Store

### Real-Time Progress Feed

```typescript
// Frontend component
function GenerationProgress({ jobId }) {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource(`/api/generate/${jobId}/stream`);

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);

      switch (update.type) {
        case 'task_started':
          setCurrentTask({
            agent: update.agent,
            taskType: update.taskType,
            context: update.context,
            startedAt: new Date(),
          });
          break;

        case 'task_progress':
          setCurrentTask(prev => ({
            ...prev,
            progress: update.progress,
          }));
          break;

        case 'task_completed':
          setTasks(prev => [...prev, {
            ...update.task,
            completedAt: new Date(),
          }]);
          setCurrentTask(null);
          break;

        case 'overall_progress':
          setProgress(update.percent);
          break;
      }
    };

    return () => eventSource.close();
  }, [jobId]);

  return (
    <div className="generation-progress">
      {/* Overall progress */}
      <ProgressBar value={progress} />
      <p>{Math.round(progress)}% Complete</p>

      {/* Current task */}
      {currentTask && (
        <CurrentTask>
          <AgentIcon agent={currentTask.agent} />
          <TaskDescription>
            {formatTaskDescription(currentTask)}
          </TaskDescription>
          <TaskProgress value={currentTask.progress} />
        </CurrentTask>
      )}

      {/* Completed tasks */}
      <CompletedTasks>
        {tasks.map(task => (
          <TaskItem key={task.id} completed>
            <CheckIcon />
            <span>{formatTaskDescription(task)}</span>
            <Duration>{formatDuration(task.duration)}</Duration>
          </TaskItem>
        ))}
      </CompletedTasks>
    </div>
  );
}

// Task descriptions
function formatTaskDescription(task) {
  const descriptions = {
    plan: 'Planning site structure',
    colors: 'Selecting color palette',
    select_block: `Choosing block for ${task.context.pageSlug} page`,
    write_copy: `Writing content for ${task.context.pageSlug}`,
    curate_media: 'Finding images',
    validate: 'Validating and saving',
  };

  return descriptions[task.taskType] || 'Working...';
}
```

### Orchestrator Polling Progress

```typescript
// Orchestrator monitors subagents

class GenerationOrchestrator {
  private jobId: string;
  private activeTasks: Map<string, Task> = new Map();

  async monitorProgress() {
    // Poll every 2 seconds
    setInterval(async () => {
      const tasks = await this.getActiveTasks();

      // Check for stuck tasks
      tasks.forEach(task => {
        const elapsed = Date.now() - task.startedAt.getTime();

        if (elapsed > 120000 && task.progress < 100) {
          // Task stuck for 2+ minutes
          this.handleStuckTask(task);
        }
      });

      // Calculate overall progress
      const overall = this.calculateOverallProgress(tasks);

      // Stream to UI
      await this.publishUpdate({
        type: 'overall_progress',
        percent: overall,
        activeTasks: tasks.length,
      });
    }, 2000);
  }

  private async getActiveTasks() {
    return await payload.find({
      collection: 'generation-tasks',
      where: {
        jobId: { equals: this.jobId },
        status: { in: ['queued', 'in_progress'] }
      }
    });
  }

  private calculateOverallProgress(tasks: Task[]) {
    // Weight by task type importance
    const weights = {
      plan: 0.05,
      colors: 0.05,
      select_block: 0.15,
      write_copy: 0.50,
      curate_media: 0.20,
      validate: 0.05,
    };

    let totalWeight = 0;
    let completedWeight = 0;

    tasks.forEach(task => {
      const weight = weights[task.taskType] || 0.1;
      totalWeight += weight;

      if (task.status === 'completed') {
        completedWeight += weight;
      } else if (task.status === 'in_progress') {
        completedWeight += weight * (task.progress / 100);
      }
    });

    return (completedWeight / totalWeight) * 100;
  }

  private async handleStuckTask(task: Task) {
    console.error(`Task ${task.id} appears stuck`);

    // Retry or fail gracefully
    if (task.retryCount < task.maxRetries) {
      await this.retryTask(task);
    } else {
      await this.failTask(task, 'Task timeout');
    }
  }
}
```

---

## Benefits Summary

### Progress Tracking
- ✅ Real-time UI updates as agents work
- ✅ Orchestrator knows exactly what's happening
- ✅ Can detect stuck/failed tasks and retry
- ✅ Historical data for analytics/optimization
- ✅ Users see transparent process

### Vector Store Learning
- ✅ Agents learn from thousands of builds
- ✅ Better decisions from day 1
- ✅ Industry-specific patterns
- ✅ Improves quality over time
- ✅ "Other coffee shops use..." context
- ✅ Network effects (more users = smarter agents)

### Combined Power
First-time user gets:
- Quality of 10,000th user (vector learning)
- Real-time feedback (progress tracking)
- Personalized memory (project documents)

---

## Implementation Priority

### Phase 1: Basic Progress Tracking
- [ ] MongoDB collection for tasks
- [ ] Subagent write status updates
- [ ] Orchestrator polls and streams to UI
- [ ] Simple progress percentage

### Phase 2: Vector Store Foundation
- [ ] Set up MongoDB Atlas vector search (or Pinecone)
- [ ] Create embedding generation function
- [ ] Store first successful build
- [ ] Test similarity search

### Phase 3: Agent Integration
- [ ] Add query_similar_builds tool
- [ ] Agents reference similar builds
- [ ] Include insights in reasoning
- [ ] Test with industry filter

### Phase 4: Continuous Learning
- [ ] Store all successful builds
- [ ] Calculate success scores
- [ ] Implement feedback loop
- [ ] Analytics on what works

---

## Cost Estimates

### Progress Tracking
- **MongoDB**: Included in current plan
- **Redis**: ~$20/month for real-time updates
- **Total**: ~$20/month

### Vector Store
- **MongoDB Atlas Vector Search**: Included in Atlas M10+ ($57/month base)
- **OpenAI Embeddings**: $0.13 per 1M tokens
  - 1000 builds/month × 500 tokens each = 500k tokens = $0.065/month
- **Pinecone (alternative)**: $70/month for 100k vectors
- **Total**: ~$1-70/month depending on choice

### Grand Total: ~$21-90/month
(MongoDB Atlas vector search is most cost-effective)

---

## Next Steps

1. **Decide on storage**:
   - Progress: MongoDB + Redis hybrid
   - Vectors: MongoDB Atlas vector search

2. **Set up collections/indexes**:
   - generation-tasks (progress)
   - build-learnings (vectors)

3. **Build tools**:
   - Subagent status update helper
   - Orchestrator progress monitor
   - Vector query tool for agents

4. **Test flow**:
   - Single build with progress tracking
   - Store learning in vector DB
   - Query in next build

Ready to implement? We should start with progress tracking first (simpler, immediate value).
