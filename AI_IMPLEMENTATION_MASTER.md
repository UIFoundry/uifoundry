# AI Site Generation - Implementation Master Document

**Last Updated**: 2025-12-16
**Status**: Planning Phase → Phase 1 Implementation

---

## Document Index

### Planning Documents (Completed)

1. **[AI_INFRASTRUCTURE_PLAN.md](./AI_INFRASTRUCTURE_PLAN.md)**
   - Original infrastructure analysis
   - Lambda vs server considerations
   - Agent architecture overview
   - Cost estimates

2. **[AI_INFRASTRUCTURE_PLAN_V2.md](./AI_INFRASTRUCTURE_PLAN_V2.md)**
   - Iterative building architecture
   - Real-time streaming approach
   - User watching agents build live
   - Color palette agent addition

3. **[AI_HITL_HYBRID_APPROACH.md](./AI_HITL_HYBRID_APPROACH.md)**
   - OpenAI Agents SDK native HITL features
   - Hybrid: SDK HITL + custom streaming
   - When to pause vs. stream
   - Autopilot with soft interjections

4. **[AI_EVOLVING_PROJECT_MEMORY.md](./AI_EVOLVING_PROJECT_MEMORY.md)**
   - Per-project knowledge base
   - Nested document structure
   - Agent learning system
   - Git integration (future)

5. **[AI_PROGRESS_TRACKING_VECTOR_STORE.md](./AI_PROGRESS_TRACKING_VECTOR_STORE.md)**
   - Subagent coordination
   - Progress tracking database
   - Vector store for cross-user learning
   - MongoDB + Redis architecture

6. **[AI_LAMBDA_TIMEOUT_SOLUTIONS.md](./AI_LAMBDA_TIMEOUT_SOLUTIONS.md)**
   - Lambda handoff approach
   - Step Functions alternative
   - ECS Fargate option
   - Hybrid recommendation

### Implementation Documents (This Section)

7. **[AI_PHASE_1_IMPLEMENTATION.md](./AI_PHASE_1_IMPLEMENTATION.md)** ← **START HERE**
   - V1 MVP implementation guide
   - Lambda setup
   - OpenAI Agents SDK integration
   - PayloadCMS API usage
   - Authentication setup
   - Event system for client updates

---

## V1 MVP Scope

### What We're Building (Phase 1)

**Core Goal**: User can trigger an AI agent to build their site, watch it happen in real-time, and see results in PayloadCMS admin.

**Included in Phase 1**:
- ✅ Lambda per project (one at a time)
- ✅ OpenAI Agents SDK with HITL
- ✅ Basic orchestrator + 1-2 specialist agents
- ✅ Event streaming: server → client
- ✅ PayloadCMS API for database writes
- ✅ Authentication (user can only modify their sites)
- ✅ Real-time updates in admin panel

**Explicitly Deferred** (Later Phases):
- ❌ 15-minute timeout handling
- ❌ Vector store learning
- ❌ Complex project memory
- ❌ Git integration
- ❌ Multiple concurrent generations
- ❌ Cost optimization
- ❌ Full agent system (just MVP agents)

---

## Phase Breakdown

### Phase 1: Basic Generation (Weeks 1-3) ← **CURRENT**
**Goal**: Get first end-to-end generation working

**Deliverables**:
1. Lambda infrastructure
2. OpenAI Agents SDK integrated
3. Basic HITL workflow
4. 1 working agent (orchestrator or simple builder)
5. Events streaming to client
6. Blocks saving via PayloadCMS API
7. Authentication working

**Success Criteria**:
- User clicks "Generate with AI"
- Agent builds 1 page with 3 blocks
- User sees updates in real-time
- Blocks appear in PayloadCMS admin
- Properly authenticated

**Document**: [AI_PHASE_1_IMPLEMENTATION.md](./AI_PHASE_1_IMPLEMENTATION.md)

---

### Phase 2: Multi-Agent System (Weeks 4-6)
**Goal**: Add specialized agents for better quality

**Includes**:
- Orchestrator agent
- Color palette agent
- Block selector agent
- Copywriter agent
- Basic coordination

**Defers**:
- Still ignoring 15-min timeout
- No vector learning yet
- Simple project memory only

---

### Phase 3: Learning & Memory (Weeks 7-10)
**Goal**: Agents remember and improve

**Includes**:
- Project memory documents
- Learning from user feedback
- Basic pattern detection
- Per-project preferences

---

### Phase 4: Production Readiness (Weeks 11-14)
**Goal**: Handle scale and edge cases

**Includes**:
- Lambda timeout solution (handoff or hybrid)
- Vector store learning
- Error handling
- Performance optimization
- Analytics

---

### Phase 5: Advanced Features (Weeks 15+)
**Goal**: Differentiated experience

**Includes**:
- Git history integration
- Advanced HITL options
- Cross-project learning
- Agent improvements based on data

---

## Current Focus: Phase 1

### Technical Stack

**Infrastructure**:
- AWS Lambda (via SST)
- AWS SQS (for job queue)
- MongoDB (existing)
- Redis (existing, Upstash)
- PayloadCMS (existing)

**New Dependencies**:
```json
{
  "@openai/agents": "^1.x",
  "zod": "^4.0.5", // Already have
  "openai": "^4.x", // For embeddings later
  "ioredis": "^5.8.2" // Already have
}
```

**Services**:
- OpenAI API (GPT-4o, Claude via Anthropic API)
- Anthropic API (Claude models)

---

## Key Architecture Decisions

### 1. Lambda Strategy (Phase 1)
```
One Lambda per active generation
- Simple, easy to reason about
- No complex coordination needed
- Can run for ~13 minutes before worrying
- Optimization in later phase
```

### 2. Event Flow
```
API Route → SQS Queue → Worker Lambda → Redis Pub/Sub → SSE Endpoint → Client
                              ↓                ↓
                         (Auto retry)    MongoDB (permanent log)
```

### 3. PayloadCMS Integration
```
Agent → Payload Local API → MongoDB
(Using payload.create() directly, not REST API)
```

### 4. Authentication
```
Client Request → API Route → Verify JWT
                                ↓
                         Check site ownership
                                ↓
                         Send to SQS Queue
                                ↓
                         Worker Lambda processes
```

### 5. HITL Workflow
```
Agent needs approval → Publishes to Redis → SSE to Client
                                                 ↓
                                    Client shows approval UI
                                                 ↓
                                    User approves/rejects
                                                 ↓
                                    POST to API route
                                                 ↓
                                    Saved in MongoDB
                                                 ↓
                                    Lambda polls and continues
```

---

## Implementation Order

### Week 1: Infrastructure
1. Create SQS queue in SST config
2. Create Lambda function structure
3. Set up Redis pub/sub channels
4. Create SSE endpoint
5. Test basic communication (SQS → Lambda → Redis → SSE)

### Week 2: Agent Integration
1. Install OpenAI Agents SDK
2. Create simple orchestrator agent
3. Implement HITL approval flow
4. Test agent execution

### Week 3: PayloadCMS Integration
1. Agent creates blocks via Payload API
2. Events trigger client cache invalidation
3. Blocks appear in admin panel
4. Add authentication

---

## Critical Path Items

### Must Have for V1:
- [x] Planning documents (complete)
- [ ] SQS queue created
- [ ] Lambda function created
- [ ] Queue → Lambda connection working
- [ ] OpenAI Agents SDK installed
- [ ] Basic agent working
- [ ] Event streaming working (Redis pub/sub)
- [ ] PayloadCMS writes working
- [ ] Auth implemented
- [ ] Client can see updates

### Nice to Have (Can defer):
- [ ] Multiple agents
- [ ] Complex memory
- [ ] Vector learning
- [ ] Timeout handling
- [ ] Error recovery

---

## Success Metrics (Phase 1)

**Technical**:
- Lambda executes successfully
- Events stream in <500ms
- Blocks save to database correctly
- Client invalidates cache and shows new blocks
- No unauthorized access possible

**User Experience**:
- User clicks button, sees immediate feedback
- Agent actions visible in real-time
- Blocks appear in admin without refresh
- User can approve/reject at key points

**Quality** (Can be basic):
- 1 page generated successfully
- 3+ blocks with reasonable content
- Blocks render correctly in admin
- No crashes or timeouts (under 15 min)

---

## Risk Mitigation

### Risk 1: Lambda Timeout
**Mitigation**: Keep Phase 1 generation very simple
- Only generate 1 page
- 3-5 blocks maximum
- Should complete in 3-5 minutes

### Risk 2: PayloadCMS Cache Issues
**Mitigation**: Research cache invalidation
- Check PayloadCMS docs for cache control
- May need to call specific API methods
- Test with admin panel open

### Risk 3: SSE Connection Drops
**Mitigation**: Implement reconnection
- Client tracks lastEventId
- Server stores events in Redis (TTL 5 min)
- Client can catch up on reconnect

### Risk 4: Auth Complexity
**Mitigation**: Use existing Better Auth
- Leverage current JWT setup
- Simple middleware check
- Site ownership verification via Payload

---

## Quick Start Guide

**To begin Phase 1 implementation**:

1. Read [AI_PHASE_1_IMPLEMENTATION.md](./AI_PHASE_1_IMPLEMENTATION.md)
2. Create feature branch: `git checkout -b feat/ai-generation-v1`
3. Follow implementation steps in order
4. Test each step before moving forward
5. Commit frequently with clear messages

---

## Questions to Resolve Before Starting

### Infrastructure
- [x] Use Lambda? **Yes**
- [x] One Lambda per project? **Yes, for now**
- [x] Event system? **Redis pub/sub + SSE**
- [x] Database writes? **PayloadCMS local API**

### Scope
- [x] Which agents for V1? **Just orchestrator + simple builder**
- [x] How many pages to generate? **1 page for testing**
- [x] Memory system? **Defer to Phase 2/3**
- [x] Learning system? **Defer to Phase 3/4**

### Technical Details
- [ ] PayloadCMS cache invalidation method? **Research needed**
- [ ] Lambda memory allocation? **Suggest 3008 MB**
- [ ] Timeout setting? **Start with 900s (15 min)**
- [ ] Which models? **GPT-4o for MVP, add Claude later**

---

## Next Steps

1. **Read Phase 1 doc**: [AI_PHASE_1_IMPLEMENTATION.md](./AI_PHASE_1_IMPLEMENTATION.md)

2. **Set up development environment**:
   ```bash
   # Install new dependency
   pnpm add @openai/agents

   # Set up environment variables
   # Add to .env.local:
   # OPENAI_API_KEY=sk-...
   # ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Create infrastructure**:
   ```bash
   # Create directory structure
   mkdir -p src/workers/ai-generation
   touch src/workers/ai-generation/handler.ts

   # Add SQS queue to sst.config.ts (see Phase 1 doc)
   ```

4. **Start with smallest possible test**:
   - Send message to SQS
   - Lambda receives from queue
   - Publishes to Redis
   - SSE receives event
   - Client shows message

5. **Iterate and expand**

---

## Resources

### Documentation
- [OpenAI Agents SDK](https://github.com/openai/openai-agents-js)
- [OpenAI HITL Guide](https://openai.github.io/openai-agents-js/guides/human-in-the-loop/)
- [PayloadCMS Local API](https://payloadcms.com/docs/local-api/overview)
- [SST Lambda Docs](https://sst.dev/docs/component/aws/function)
- [Redis Pub/Sub](https://redis.io/docs/interact/pubsub/)

### Example Code
- OpenAI Agents examples: `pnpm examples:human-in-the-loop`
- Streaming example: `pnpm examples:streamed:human-in-the-loop`

---

## Contact & Questions

As you implement, track questions and blockers. Common areas:

- **Lambda setup**: Check SST docs, existing Lambda functions
- **Redis pub/sub**: Reference existing Redis usage in codebase
- **PayloadCMS API**: Check existing Payload usage patterns
- **Auth**: Reference Better Auth implementation

---

## Status Tracking

### Phase 1 Progress: 0% Complete

- [ ] SQS queue setup (0%)
- [ ] Lambda infrastructure (0%)
- [ ] Queue → Lambda integration (0%)
- [ ] OpenAI Agents SDK setup (0%)
- [ ] Basic agent implementation (0%)
- [ ] Event streaming system (Redis) (0%)
- [ ] PayloadCMS integration (0%)
- [ ] Authentication (0%)
- [ ] Client updates (0%)

**Current Task**: Set up Lambda function structure

**Next Milestone**: First event from Lambda to client

**Estimated Phase 1 Completion**: 3 weeks from start

---

## Version History

- **v1.0** (2025-12-16): Initial planning complete, ready for Phase 1 implementation
- **v1.1** (TBD): Phase 1 complete, moving to Phase 2
- **v2.0** (TBD): Multi-agent system operational
- **v3.0** (TBD): Learning and memory systems active

---

**Ready to build? → Start with [AI_PHASE_1_IMPLEMENTATION.md](./AI_PHASE_1_IMPLEMENTATION.md)**
