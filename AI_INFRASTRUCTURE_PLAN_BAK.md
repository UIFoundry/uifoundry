# UIFoundry AI Integration Infrastructure & Architecture Plan

**Date**: 2025-12-12
**Purpose**: Evaluate infrastructure requirements and design agent system for AI-powered site generation

---

## Executive Summary

Based on analysis of your current infrastructure and the OpenAI Agents SDK, **you can continue using Lambda** for your AI site generation with some architectural considerations. The OpenAI Agents SDK is designed to work in serverless environments including Lambda, and your current SST setup already provides a solid foundation.

**Key Recommendations**:
- ✅ Continue using Lambda (via SST) with increased timeout and memory
- ✅ Use OpenAI Agents SDK with multi-agent orchestration pattern
- ✅ Implement queue-based processing for longer-running generation tasks
- ✅ Leverage structured outputs with Zod schemas to match PayloadCMS types

---

## Current Infrastructure Analysis

### Your Stack
- **Framework**: Next.js (v16 canary) with App Router
- **Backend**: PayloadCMS (v3.61.1) with MongoDB
- **Deployment**: SST (Serverless Stack) on AWS
- **Runtime**: Node.js 22.x on Lambda (60 second timeout currently)
- **Caching**: Redis via `payloadcms-redis-plugin` and `ioredis`
- **Storage**: S3 for media assets

### Current Lambda Configuration
```typescript
// From sst.config.ts:100-104
server: {
  install: ["sharp"],
  runtime: "nodejs22.x",
  timeout: "60 seconds",
}
```

### Block Registry Structure
You have **40+ marketing blocks** across categories:
- Hero (5 variants)
- Headers (5 + custom)
- Footers (5 variants)
- Features (3 variants)
- Testimonials (5 variants)
- Pricing (3 variants)
- FAQ (5 variants)
- CTA (3 variants)
- Stats (3 variants)
- Contact, Newsletter, About, Gallery, Teams, Coming Soon

Each block has structured PayloadCMS field definitions (see `/src/payload/blocks/*/config.ts`).

---

## OpenAI Agents SDK Analysis

### Core Capabilities

**Multi-Agent Coordination**
- Uses "handoff" mechanism for agent-to-agent transfers
- Agents declare other agents via `handoffs` parameter
- Control flows through specialized agents until final output
- Support for hierarchical agent composition

**Schema Enforcement with Zod**
- Tool parameters: Define required inputs via `z.object()`
- Agent outputs: Specify `outputType` as Zod schema for structured responses
- Built-in validation: System validates LLM responses against schemas
- **Perfect for generating PayloadCMS-compatible JSON**

**Infrastructure Compatibility**
✅ Node.js 22+ (you're using this)
✅ Supports multiple environments
✅ **Experimental: Cloudflare Workers with `nodejs_compat`**
✅ Provider-agnostic (OpenAI, Anthropic via Vercel AI SDK adapters)

**Safety & Control**
- Max turns parameter to prevent infinite loops
- Throws `MaxTurnsExceededError` when exceeded
- Input/output guardrails with validation
- Built-in tracing for debugging

**Performance Characteristics**
- Iterative agent loop runs until completion
- Tool results append to conversation history (context grows)
- Parallel tool execution support
- Streaming support for real-time output

---

## Infrastructure Decision: Lambda vs. Dedicated Server

### ✅ Recommendation: Stick with Lambda (Enhanced)

**Why Lambda Works**:

1. **SDK Compatibility**: OpenAI Agents SDK explicitly supports serverless environments
2. **Variable Workload**: Site generation is sporadic, not continuous
3. **Cost Efficiency**: Pay per generation, not idle server time
4. **Existing Infrastructure**: You're already on SST with AWS integration
5. **Scalability**: Auto-scales with demand without config changes

**Required Adjustments**:

```typescript
// Update sst.config.ts server config:
server: {
  install: ["sharp"],
  runtime: "nodejs22.x",
  timeout: "15 minutes",  // Increase from 60 seconds (Lambda max)
  memory: "3008 MB",      // Increase for LLM operations
}
```

### Hybrid Architecture for Long-Running Jobs

For generations that may exceed 15 minutes, implement **queue-based processing**:

```
User Request → API Route (Lambda) → SQS Queue → Worker Lambda → Status Updates
                    ↓                                ↓
              Return Job ID                   Update MongoDB Job Status
```

**Benefits**:
- API responds immediately with job ID
- Worker Lambda processes with full 15 min timeout
- Can implement retries and error handling
- User polls for status or receives webhook

**Implementation Pattern**:
```typescript
// API Route: /api/generate-site
POST /api/generate-site → {
  jobId: "uuid",
  status: "queued",
  estimatedTime: "2-5 minutes"
}

// Status endpoint: /api/generate-site/[jobId]
GET /api/generate-site/uuid → {
  status: "processing" | "completed" | "failed",
  progress: { step: "selecting-blocks", percent: 60 },
  result?: { siteId: "..." }
}
```

### When to Consider Dedicated Server

Only if you experience:
- Consistent 15+ minute generation times
- Very high volume (100+ simultaneous generations)
- Need for long-lived WebSocket connections
- Complex stateful workflows that benefit from persistent memory

**For MVP**: Lambda is the right choice.

---

## Agent System Architecture

### Recommended Multi-Agent Structure

#### 1. **Orchestrator Agent** (Claude Opus 4.5)
**Role**: Strategic planning and coordination
**Input**: User's site generation prompt
**Output**: Structured site plan

```typescript
interface SitePlan {
  sitemap: {
    slug: string;
    title: string;
    purpose: string; // "homepage", "about", "pricing", etc.
    priority: number;
  }[];
  brandGuidelines: {
    tone: string; // "professional", "friendly", "technical"
    industry: string;
    targetAudience: string;
    keyMessages: string[];
  };
  technicalRequirements: {
    requiresAuth: boolean;
    requiresPayments: boolean;
    customFunctionality: string[];
  };
}
```

**Tools**:
- `create_sitemap`: Analyzes user intent and creates page structure
- `extract_brand_info`: Identifies brand voice, industry, audience
- `handoff_to_block_selector`: Transfers to next agent

**Cost**: ~$0.50-2.00 per generation (strategic thinking required)

---

#### 2. **Block Selector Agent** (Claude Sonnet 4.5)
**Role**: Select appropriate blocks for each page
**Input**: Single page from sitemap + brand guidelines
**Output**: Selected blocks with layout order

```typescript
interface PageBlockSelection {
  pageSlug: string;
  blocks: {
    blockType: "hero_1" | "features_2" | "testimonials_3" | ...; // From your constants
    position: number; // Order on page
    purpose: string; // Why this block was chosen
    requiredFields: string[]; // Which fields need content
  }[];
}
```

**Tools**:
- `query_block_registry`: Searches your 40+ blocks by purpose/category
- `get_block_schema`: Retrieves field definitions for selected blocks
- `validate_block_selection`: Ensures logical page flow
- `handoff_to_copywriter`: Transfers with block selections

**Logic**:
```typescript
// Example tool implementation
const queryBlockRegistry = z.object({
  purpose: z.enum(["hero", "social-proof", "pricing", "cta", "features"]),
  style: z.enum(["minimal", "bold", "corporate", "modern"]),
  complexity: z.enum(["simple", "medium", "detailed"])
});

// Block selection rules:
// - Every page MUST have header_* block
// - Homepage typically: header + hero + features + testimonials + cta + footer
// - About page: header + hero + about + teams + footer
// - Pricing page: header + pricing + faq + cta + footer
```

**Cost**: ~$0.10-0.40 per page (structured selection task)

---

#### 3. **Copywriter Agent** (GPT-4o or Claude Sonnet 4.5)
**Role**: Generate marketing copy for all block fields
**Input**: Page blocks + brand guidelines + block schemas
**Output**: Complete field values for each block

```typescript
interface BlockContent {
  blockId: string;
  blockType: string;
  fields: {
    header?: string;
    subheader?: string;
    description?: string;
    ctaPrimaryLabel?: string;
    ctaPrimaryHref?: string;
    ctaSecondaryLabel?: string;
    // ... all fields from block schema
  };
}
```

**Tools**:
- `generate_hero_copy`: Creates headlines, subheads, CTAs
- `generate_feature_descriptions`: Writes benefit-focused features
- `generate_testimonial_content`: Creates realistic social proof
- `generate_faq_items`: Produces Q&A pairs
- `validate_copy_length`: Ensures text fits UI constraints

**Schema Enforcement**:
```typescript
// Use Zod schemas that mirror your PayloadCMS block definitions
const hero1Schema = z.object({
  alertLabel: z.string().max(100),
  alertLink: z.string().url(),
  header: z.string().min(10).max(200),
  subheader: z.string().min(20).max(500),
  primaryCtaLabel: z.string().max(30),
  primaryCtaHref: z.string().url(),
  secondaryCtaLabel: z.string().max(30),
  secondaryCtaHref: z.string().url(),
  media: z.object({
    // media field schema
  })
});
```

**Cost**: ~$0.20-0.80 per page (creative but structured task)

---

#### 4. **Media Curator Agent** (GPT-4o)
**Role**: Select/generate media assets and handle uploads
**Input**: Page blocks needing images + brand guidelines
**Output**: Media IDs from PayloadCMS

```typescript
interface MediaAssignment {
  blockId: string;
  mediaType: "hero_image" | "feature_icon" | "testimonial_avatar";
  mediaId: string; // PayloadCMS media collection ID
  alt: string;
  source: "unsplash" | "generated" | "placeholder";
}
```

**Tools**:
- `search_unsplash`: Finds stock photos by keyword
- `generate_image_prompt`: Creates DALL-E prompts
- `upload_to_payload`: Uploads image to S3 + creates PayloadCMS record
- `create_placeholder`: Generates colored placeholder SVGs

**Cost**: ~$0.05-0.20 per page (mostly API calls, less LLM)

---

#### 5. **Schema Validator Agent** (GPT-4o-mini or Claude Haiku)
**Role**: Final validation before PayloadCMS submission
**Input**: Complete site JSON structure
**Output**: Validated + corrected JSON or error report

```typescript
interface ValidationResult {
  valid: boolean;
  errors: {
    path: string; // "pages[0].blocks[2].fields.header"
    error: string;
    suggestion: string;
  }[];
  correctedJson?: SiteSchema;
}
```

**Tools**:
- `validate_against_payload_types`: Uses your generated `payload-types.ts`
- `check_field_constraints`: Validates min/max lengths, required fields
- `verify_relationships`: Ensures references to media/blocks exist
- `auto_correct_minor_issues`: Fixes common formatting errors

**Cost**: ~$0.01-0.05 per site (lightweight validation task)

---

### Complete Agent Flow

```
User Prompt
    ↓
┌─────────────────────┐
│ Orchestrator Agent  │ (Opus 4.5) - $0.50-2.00
│ - Analyze intent    │
│ - Create sitemap    │
│ - Set guidelines    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ For each page:      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Block Selector      │ (Sonnet 4.5) - $0.10-0.40/page
│ - Query registry    │
│ - Select blocks     │
│ - Order layout      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Copywriter Agent    │ (GPT-4o/Sonnet) - $0.20-0.80/page
│ - Generate copy     │
│ - Fill all fields   │
│ - Match brand voice │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Media Curator       │ (GPT-4o) - $0.05-0.20/page
│ - Find images       │
│ - Upload to S3      │
│ - Create records    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Schema Validator    │ (Haiku/4o-mini) - $0.01-0.05
│ - Validate JSON     │
│ - Auto-correct      │
│ - Return final      │
└──────────┬──────────┘
           ↓
    Submit to PayloadCMS API
           ↓
    Return Site ID
```

**Total Cost Estimate**: $2-5 per site generation (5-page site)

---

## Implementation Approach

### Phase 1: Core Infrastructure Setup

```typescript
// app/api/generate-site/route.ts
import { Agent } from '@openai/agents';
import { z } from 'zod';

export async function POST(request: Request) {
  const { prompt, userId } = await request.json();

  // Create job record
  const job = await payload.create({
    collection: 'generation-jobs',
    data: {
      userId,
      prompt,
      status: 'queued',
      createdAt: new Date(),
    }
  });

  // Send to SQS (or process immediately for MVP)
  await sqs.sendMessage({
    QueueUrl: process.env.GENERATION_QUEUE_URL,
    MessageBody: JSON.stringify({
      jobId: job.id,
      prompt,
      userId,
    })
  });

  return Response.json({
    jobId: job.id,
    status: 'queued'
  });
}
```

### Phase 2: Agent Implementation

```typescript
// lib/agents/orchestrator.ts
import { Agent } from '@openai/agents';
import { z } from 'zod';

const sitePlanSchema = z.object({
  sitemap: z.array(z.object({
    slug: z.string(),
    title: z.string(),
    purpose: z.string(),
    priority: z.number(),
  })),
  brandGuidelines: z.object({
    tone: z.string(),
    industry: z.string(),
    targetAudience: z.string(),
    keyMessages: z.array(z.string()),
  }),
});

export const orchestratorAgent = new Agent({
  name: 'Site Orchestrator',
  model: 'claude-opus-4-5',
  instructions: `You are a strategic site planner. Analyze user prompts and create
    comprehensive site structures. Consider:
    - User's business goals
    - Industry best practices
    - Target audience needs
    - Typical page requirements for the business type

    Create a logical sitemap with 3-7 pages prioritized by importance.`,

  outputType: sitePlanSchema,

  handoffs: [blockSelectorAgent], // Hand off to next agent

  maxTurns: 5, // Prevent infinite loops
});
```

### Phase 3: Block Registry Integration

```typescript
// lib/agents/tools/query-blocks.ts
import { z } from 'zod';
import { BLOCK_GROUPS, BLOCK_SLUGS } from '~/payload/constants/blocks';

export const queryBlockRegistryTool = {
  name: 'query_block_registry',
  description: 'Search available UI blocks by purpose and category',
  parameters: z.object({
    category: z.enum(['hero', 'features', 'testimonials', 'pricing', 'faq', 'cta', 'footer', 'header']),
    style: z.enum(['minimal', 'modern', 'corporate', 'bold']).optional(),
    complexity: z.enum(['simple', 'detailed']).optional(),
  }),

  execute: async ({ category, style, complexity }) => {
    // Query your block registry
    const blocks = await payload.find({
      collection: 'blocks',
      where: {
        category: { equals: category }
      }
    });

    // Return block metadata including field schemas
    return blocks.docs.map(block => ({
      slug: block.slug,
      name: block.name,
      fields: block.fields, // Field definitions
      preview: block.previewUrl,
      bestFor: block.useCases,
    }));
  }
};
```

### Phase 4: Schema Validation & Submission

```typescript
// lib/agents/validator.ts
import { z } from 'zod';
import type { Page } from '~/payload-types'; // Your generated types

export const validateAndSubmit = async (siteData: unknown) => {
  // Validate against PayloadCMS types
  const pageSchema = z.object({
    title: z.string(),
    slug: z.string(),
    blocks: z.array(z.object({
      blockType: z.string(),
      // ... field validations matching payload-types.ts
    })),
  });

  // Validate each page
  const validatedPages = siteData.pages.map(page =>
    pageSchema.parse(page)
  );

  // Submit to PayloadCMS
  const site = await payload.create({
    collection: 'sites',
    data: {
      title: siteData.title,
      domain: siteData.domain,
      userId: siteData.userId,
    }
  });

  // Create all pages
  for (const page of validatedPages) {
    await payload.create({
      collection: 'pages',
      data: {
        ...page,
        site: site.id,
      }
    });
  }

  return { siteId: site.id };
};
```

---

## Cost Optimization Strategies

### 1. Model Selection by Task Complexity

| Agent | Current Model | Alternative | Savings |
|-------|--------------|-------------|---------|
| Orchestrator | Opus 4.5 ($15/1M in) | Keep as-is | Strategic task needs best model |
| Block Selector | Sonnet 4.5 ($3/1M in) | GPT-4o ($2.50/1M in) | 15% savings |
| Copywriter | Sonnet 4.5 | GPT-4o ($2.50/1M in) | 15% savings |
| Media Curator | GPT-4o | Keep as-is | Already optimized |
| Validator | Haiku ($0.25/1M in) | GPT-4o-mini ($0.15/1M in) | 40% savings |

### 2. Parallel Processing

Run independent agents in parallel:
```typescript
// Process all pages simultaneously
const pageResults = await Promise.all(
  sitemap.pages.map(page =>
    processPage(page, blockSelectorAgent, copywriterAgent)
  )
);
```

**Time Savings**: 5 pages sequentially (5-10 min) → parallel (1-2 min)

### 3. Caching Strategy

```typescript
// Cache common block selections
const blockCache = new Map<string, BlockSelection>();

// Cache format: "purpose:industry:style" → selected blocks
if (blockCache.has(`${page.purpose}:${industry}:${style}`)) {
  return blockCache.get(key);
}
```

### 4. Progressive Enhancement

```typescript
// MVP: Simple generation
const basicSite = await generateWithDefaults(prompt);

// Future: Iterative refinement
const refinedSite = await refineWithUserFeedback(basicSite, feedback);
```

---

## Error Handling & Reliability

### 1. Agent Timeout Protection

```typescript
const orchestratorAgent = new Agent({
  // ...
  maxTurns: 5, // Prevents infinite loops
});

// Wrapper with timeout
const runAgentWithTimeout = async (agent, input, timeoutMs = 120000) => {
  return Promise.race([
    agent.run(input),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Agent timeout')), timeoutMs)
    )
  ]);
};
```

### 2. Validation Checkpoints

```typescript
// After each agent
const result = await blockSelectorAgent.run(input);

if (!result.valid) {
  // Retry with corrections
  return await blockSelectorAgent.run({
    ...input,
    previousErrors: result.errors,
    retryCount: 1,
  });
}
```

### 3. Fallback Strategies

```typescript
// If agent fails, use template
const generateFallbackSite = (industry: string) => {
  return INDUSTRY_TEMPLATES[industry] || DEFAULT_TEMPLATE;
};

try {
  return await agentGeneration(prompt);
} catch (error) {
  logger.error('Agent generation failed', error);
  return generateFallbackSite(detectedIndustry);
}
```

---

## Monitoring & Observability

### Key Metrics to Track

```typescript
// In generation worker
const metrics = {
  jobId: job.id,
  startTime: Date.now(),
  stages: {
    orchestrator: { duration: 0, cost: 0, tokens: 0 },
    blockSelector: { duration: 0, cost: 0, tokens: 0 },
    copywriter: { duration: 0, cost: 0, tokens: 0 },
    mediaCurator: { duration: 0, cost: 0, tokens: 0 },
    validator: { duration: 0, cost: 0, tokens: 0 },
  },
  totalDuration: 0,
  totalCost: 0,
  totalTokens: 0,
  status: 'success' | 'failed',
  errorStage?: string,
};

// Store in MongoDB for analytics
await payload.create({
  collection: 'generation-metrics',
  data: metrics,
});
```

### Tracing with OpenAI Agents SDK

```typescript
// Built-in tracing
const agent = new Agent({
  // ...
  tracing: true, // Enable for debugging
});

// Access trace data
agent.on('trace', (event) => {
  console.log('Agent trace:', event);
  // Send to your monitoring service (DataDog, etc.)
});
```

---

## Security Considerations

### 1. Input Validation

```typescript
const promptSchema = z.object({
  prompt: z.string().min(10).max(5000),
  industry: z.string().optional(),
  style: z.enum(['minimal', 'modern', 'corporate']).optional(),
});

// Sanitize before sending to agents
const sanitizedInput = promptSchema.parse(rawInput);
```

### 2. Rate Limiting

```typescript
// Use Redis for rate limiting
const rateLimiter = new RateLimiter(redis, {
  points: 10, // 10 generations
  duration: 3600, // per hour
});

await rateLimiter.consume(userId);
```

### 3. Cost Controls

```typescript
// Set per-generation budget
const MAX_COST_PER_GENERATION = 5.00; // $5 max

let currentCost = 0;

agent.on('completion', (event) => {
  currentCost += calculateCost(event.tokens, event.model);

  if (currentCost > MAX_COST_PER_GENERATION) {
    throw new Error('Generation exceeded cost budget');
  }
});
```

---

## Migration Path for MVP

### Week 1-2: Foundation
- [ ] Install OpenAI Agents SDK: `npm install @openai/agents`
- [ ] Set up basic Lambda function for agent execution
- [ ] Create Zod schemas matching your PayloadCMS types
- [ ] Implement job queue (SQS) and status tracking

### Week 3-4: Core Agents
- [ ] Build Orchestrator Agent (simple sitemap generation)
- [ ] Build Block Selector Agent (rule-based selection)
- [ ] Create block registry query tools
- [ ] Test with simple "coffee shop website" prompt

### Week 5-6: Content Generation
- [ ] Build Copywriter Agent
- [ ] Integrate with PayloadCMS API
- [ ] Implement basic Media Curator (Unsplash integration)
- [ ] End-to-end test: prompt → generated site

### Week 7-8: Polish & Deploy
- [ ] Add Schema Validator Agent
- [ ] Implement error handling and retries
- [ ] Add monitoring and metrics
- [ ] Deploy to production with SST

---

## Alternative Considerations

### Option B: Dedicated Server (If Needed Later)

**When to consider**:
- Lambda timeouts becoming frequent (>15 min regularly)
- Need WebSocket connections for real-time updates
- Very high volume justifies always-on server

**Implementation**:
```typescript
// Add to sst.config.ts
new sst.aws.Cluster("GenerationCluster", {
  vpc: true,
  services: {
    generator: {
      image: {
        dockerfile: "./Dockerfile.generator"
      },
      memory: "4 GB",
      cpu: "2 vCPU",
    }
  }
});
```

**Cost Comparison**:
- Lambda: ~$0.01-0.05 per generation + LLM costs
- ECS Fargate: ~$50-100/month fixed + LLM costs

**Verdict for MVP**: Lambda is 10-100x cheaper at low volumes.

---

## Conclusion

### TL;DR Recommendations

✅ **Stick with Lambda** - Increase timeout to 15 min and memory to 3GB
✅ **Use OpenAI Agents SDK** - Perfect fit for your structured output needs
✅ **5-Agent Architecture** - Orchestrator → Block Selector → Copywriter → Media → Validator
✅ **Queue-Based Processing** - SQS for jobs, polling for status updates
✅ **Cost-Optimized** - $2-5 per site generation with mixed model usage
✅ **Zod Schema Validation** - Enforce PayloadCMS structure at agent level

### Next Steps

1. Install `@openai/agents` and set up basic orchestrator
2. Create Zod schemas matching your `payload-types.ts`
3. Build block query tool using your existing constants
4. Test single-page generation end-to-end
5. Iterate and add remaining agents

### Questions to Answer Before Building

1. **User Experience**: Synchronous (wait 2-5 min) or async (email when ready)?
2. **Customization Level**: Allow users to pick blocks or fully automatic?
3. **Image Strategy**: Stock photos (Unsplash) or AI-generated (DALL-E)?
4. **Pricing Model**: Per-site, subscription, or usage-based?
5. **Preview Before Publish**: Should users approve before site creation?

---

## Additional Resources

- OpenAI Agents SDK: https://github.com/openai/openai-agents-js
- SST Lambda Docs: https://sst.dev/docs/component/aws/function
- PayloadCMS API: https://payloadcms.com/docs/rest-api/overview
- Zod Documentation: https://zod.dev

**Ready to start building? Let me know which part you want to tackle first!**
