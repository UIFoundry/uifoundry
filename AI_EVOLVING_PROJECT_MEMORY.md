# Evolving Project Memory System

**Vision**: Agents that learn and remember user preferences per-project, building a living knowledge base that improves with each interaction.

---

## Core Concept: "The Agent Never Forgets"

Instead of treating each generation as isolated, agents build and maintain **project-specific knowledge** that compounds over time:

```
First Site Build:
User: "Make headlines more casual"
Agent: "Got it!" → Documents this preference
         ↓
      Builds site with casual headlines

Second Page Added (Week Later):
Agent: [Reads project docs] → "User prefers casual tone"
       Automatically writes casual headlines
       No reminder needed

Third Iteration (Month Later):
User: "Add a blog section"
Agent: [Reads project docs] → Knows brand voice, color palette, style preferences
       Builds blog section matching existing site perfectly
```

---

## Architecture: Nested Document Tree

### Project Document Structure

```
Project Root Document (System Prompt)
├── Brand Guidelines
│   ├── Voice & Tone Preferences
│   ├── Color Palette
│   └── Target Audience Profile
│
├── Content Preferences
│   ├── Headline Style Guide
│   ├── CTA Patterns
│   └── Copy Length Preferences
│
├── Design Patterns
│   ├── Preferred Block Types
│   ├── Layout Preferences
│   └── Section Ordering Rules
│
├── User Feedback History
│   ├── Positive Feedback (What Worked)
│   └── Corrections (What to Avoid)
│
└── Technical Decisions
    ├── Feature Requirements
    └── Integration Notes
```

### Document Linking Example

```typescript
// Root System Prompt Document
{
  id: "sys_prompt_project_123",
  projectId: "project_123",
  type: "system_prompt",
  content: `You are building a website for Brew Haven coffee shop.

  IMPORTANT PROJECT CONTEXT:
  - Review {{doc:brand_guidelines_project_123}} before any decisions
  - Follow patterns in {{doc:design_preferences_project_123}}
  - Check {{doc:user_feedback_project_123}} for learned preferences
  - Refer to {{doc:git_history_project_123}} for past changes

  User's Communication Style: Direct and collaborative
  Current Phase: Expanding site (original site complete)`,

  linkedDocs: [
    "brand_guidelines_project_123",
    "design_preferences_project_123",
    "user_feedback_project_123",
    "git_history_project_123"
  ],
  lastUpdated: "2025-12-12T10:30:00Z",
  updatedBy: "execution_agent"
}

// Brand Guidelines Document (linked from root)
{
  id: "brand_guidelines_project_123",
  projectId: "project_123",
  type: "brand_guidelines",
  content: `# Brand Guidelines for Brew Haven

  ## Voice & Tone
  - ALWAYS use casual, friendly language
  - Avoid formal/corporate tone
  - User feedback (2025-12-10): "More emphasis on sustainability"

  ## Color Palette
  Primary: Forest Green (#2D5016)
  Secondary: Coffee Brown (#6F4E37)
  Accent: Sage Green (#87AE73)
  - User approved these colors on first build
  - User loves green, represents eco-friendly values

  ## Key Messages (learned from user)
  1. Sustainability is core value
  2. Local sourcing matters
  3. Community gathering place
  4. Quality over quantity

  See {{doc:content_preferences_project_123}} for writing style details.`,

  linkedDocs: ["content_preferences_project_123"],
  lastUpdated: "2025-12-11T14:20:00Z",
  updatedBy: "color_palette_agent"
}

// Content Preferences Document
{
  id: "content_preferences_project_123",
  projectId: "project_123",
  type: "content_preferences",
  content: `# Content Writing Preferences

  ## Headlines (learned from feedback)
  - User prefers: "Where Every Cup Grows a Greener Tomorrow"
  - User rejected: "Welcome to Brew Haven" (too generic)
  - Pattern: Action-oriented, benefit-focused, sustainability angle
  - Max length: ~50 characters (user said "keep them punchy")

  ## CTAs
  - Primary CTA: Always relate to menu or visiting
  - Avoid: "Learn More" (user said it's vague)
  - Prefer: "View Our Menu", "Visit Us Today", "Order Now"

  ## Section Ordering (learned from user)
  Homepage flow user approved:
  1. Hero (sustainability angle)
  2. Features (quality focus)
  3. Testimonials (community feeling)
  4. Pricing/Menu preview
  5. CTA (visit us)

  ## Testimonials
  - User said: "Make them feel authentic, not corporate"
  - Include first names only
  - Mention specific drinks/experiences
  - Keep under 150 characters`,

  linkedDocs: [],
  lastUpdated: "2025-12-12T09:15:00Z",
  updatedBy: "copywriter_agent"
}

// User Feedback History Document
{
  id: "user_feedback_project_123",
  projectId: "project_123",
  type: "feedback_history",
  content: `# User Feedback & Learnings

  ## What User Loves ✓
  - Casual, friendly tone (multiple positive comments)
  - Sustainability focus in all messaging
  - Current color palette (green/brown earth tones)
  - Hero 2 block style (centered layout)
  - Testimonials placement before pricing

  ## What to Avoid ✗
  - Generic headlines ("Welcome to...")
  - Corporate/formal language
  - Vague CTAs ("Learn More")
  - Too much text (user prefers concise)

  ## Patterns Observed
  1. User often says "make it more [casual/friendly/personal]"
     → Default to casual tone from the start
  2. User always approves sustainability angles
     → Emphasize eco-friendly aspects
  3. User likes seeing options
     → When uncertain, show 2-3 choices

  ## Recent Feedback (Last 7 Days)
  - 2025-12-11: "Love the new menu section!"
  - 2025-12-10: "Can you emphasize sustainability more?"
  - 2025-12-09: "This headline is perfect!"`,

  linkedDocs: [],
  lastUpdated: "2025-12-12T10:00:00Z",
  updatedBy: "execution_agent"
}
```

---

## Agent Tools: Document Management

### Tool Set for Project Memory

```typescript
// Tool: Read Project Document
const readProjectDoc = {
  name: 'read_project_document',
  description: 'Read a project-specific document containing learnings, preferences, or guidelines',

  parameters: z.object({
    docType: z.enum([
      'system_prompt',
      'brand_guidelines',
      'content_preferences',
      'design_patterns',
      'feedback_history',
      'git_history'
    ]),
    projectId: z.string(),
  }),

  execute: async ({ docType, projectId }) => {
    const doc = await payload.find({
      collection: 'project-documents',
      where: {
        projectId: { equals: projectId },
        type: { equals: docType },
      },
      limit: 1,
      sort: '-updatedAt', // Get latest version
    });

    if (doc.docs.length === 0) {
      return {
        exists: false,
        message: `No ${docType} document found for this project yet.`
      };
    }

    // Resolve linked documents
    const resolved = await resolveLinkedDocs(doc.docs[0]);

    return {
      exists: true,
      content: resolved.content,
      linkedDocs: resolved.linkedDocs,
      lastUpdated: resolved.lastUpdated,
    };
  }
};

// Tool: Update Project Document
const updateProjectDoc = {
  name: 'update_project_document',
  description: 'Add or update learnings in a project document',

  parameters: z.object({
    docType: z.string(),
    projectId: z.string(),
    updates: z.string(), // What to add/change
    reasoning: z.string(), // Why this update is needed
  }),

  execute: async ({ docType, projectId, updates, reasoning }) => {
    // Get existing document
    const existing = await payload.find({
      collection: 'project-documents',
      where: {
        projectId: { equals: projectId },
        type: { equals: docType },
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      // Update existing document
      const doc = existing.docs[0];

      // Use LLM to merge updates intelligently
      const updatedContent = await mergeDocumentUpdates(
        doc.content,
        updates,
        reasoning
      );

      await payload.update({
        collection: 'project-documents',
        id: doc.id,
        data: {
          content: updatedContent,
          lastUpdated: new Date(),
          updatedBy: getCurrentAgentName(),
          updateHistory: [
            ...doc.updateHistory,
            {
              timestamp: new Date(),
              agent: getCurrentAgentName(),
              change: updates,
              reasoning: reasoning,
            }
          ]
        }
      });

      return { success: true, action: 'updated' };
    } else {
      // Create new document
      await payload.create({
        collection: 'project-documents',
        data: {
          projectId,
          type: docType,
          content: updates,
          linkedDocs: [],
          lastUpdated: new Date(),
          updatedBy: getCurrentAgentName(),
          updateHistory: [{
            timestamp: new Date(),
            agent: getCurrentAgentName(),
            change: 'Initial creation',
            reasoning: reasoning,
          }]
        }
      });

      return { success: true, action: 'created' };
    }
  }
};

// Tool: Link Documents
const linkProjectDocs = {
  name: 'link_project_documents',
  description: 'Create a reference link between two project documents',

  parameters: z.object({
    fromDocId: z.string(),
    toDocId: z.string(),
    reasoning: z.string(),
  }),

  execute: async ({ fromDocId, toDocId, reasoning }) => {
    const doc = await payload.findByID({
      collection: 'project-documents',
      id: fromDocId,
    });

    if (!doc.linkedDocs.includes(toDocId)) {
      await payload.update({
        collection: 'project-documents',
        id: fromDocId,
        data: {
          linkedDocs: [...doc.linkedDocs, toDocId],
        }
      });
    }

    return { success: true, linked: true };
  }
};

// Tool: Query Learning History
const queryLearnings = {
  name: 'query_project_learnings',
  description: 'Search all project documents for relevant learnings about a topic',

  parameters: z.object({
    projectId: z.string(),
    query: z.string(), // e.g., "headline preferences", "color choices"
  }),

  execute: async ({ projectId, query }) => {
    // Vector search across all project docs (if using embeddings)
    // Or simple text search for MVP
    const allDocs = await payload.find({
      collection: 'project-documents',
      where: {
        projectId: { equals: projectId },
      },
    });

    // Search content for query
    const relevant = allDocs.docs
      .filter(doc => doc.content.toLowerCase().includes(query.toLowerCase()))
      .map(doc => ({
        type: doc.type,
        excerpt: extractRelevantExcerpt(doc.content, query),
        lastUpdated: doc.lastUpdated,
      }));

    return {
      found: relevant.length > 0,
      learnings: relevant,
    };
  }
};
```

---

## Execution Flow with Learning

### Initial Site Build (First Interaction)

```typescript
// User starts fresh project
POST /api/projects/generate
{
  prompt: "Build a website for my coffee shop, Brew Haven. We focus on sustainability."
}

// Execution Agent orchestrates
async function buildSiteWithLearning(projectId, prompt) {

  // 1. Check for existing project documents
  const projectDocs = await agent.useTool('read_project_document', {
    docType: 'system_prompt',
    projectId,
  });

  if (!projectDocs.exists) {
    // First time - create project memory

    // 1a. Create system prompt
    await agent.useTool('update_project_document', {
      docType: 'system_prompt',
      projectId,
      updates: `Building website for Brew Haven coffee shop.

        Key info from user:
        - Business: Coffee shop
        - Name: Brew Haven
        - Core value: Sustainability focus

        Initial build in progress...`,
      reasoning: 'Initialize project memory'
    });
  }

  // 2. Run orchestrator to create plan
  streamToClient({ type: 'status', message: 'Planning your site...' });

  const plan = await orchestratorAgent.run({
    prompt,
    projectContext: projectDocs.exists ? projectDocs.content : null,
  });

  // 3. Document the plan
  await agent.useTool('update_project_document', {
    docType: 'system_prompt',
    projectId,
    updates: `Site Structure:
      ${plan.sitemap.map(p => `- ${p.title} (${p.purpose})`).join('\n')}`,
    reasoning: 'Document approved site plan'
  });

  streamToClient({ type: 'plan', data: plan });

  // 4. Get color palette
  streamToClient({ type: 'status', message: 'Choosing colors...' });

  const colors = await colorPaletteAgent.run({
    brandGuidelines: plan.brandGuidelines,
    projectDocs, // Agent can reference existing preferences
  });

  // 5. Document color choices
  await agent.useTool('update_project_document', {
    docType: 'brand_guidelines',
    projectId,
    updates: `Color Palette:
      Primary: ${colors.primary}
      Secondary: ${colors.secondary}
      Reasoning: ${colors.reasoning}

      User feedback: [Will update after user responds]`,
    reasoning: 'Record color palette for future reference'
  });

  streamToClient({ type: 'colors', data: colors });

  // 6. Build pages (autopilot)
  for (const pageSpec of plan.sitemap) {
    streamToClient({
      type: 'page_started',
      page: pageSpec.title
    });

    // 6a. Select blocks
    const blocks = await blockSelectorAgent.run({
      pageSpec,
      projectDocs, // Check if user has block preferences
    });

    // 6b. Generate copy
    const copy = await copywriterAgent.run({
      blocks,
      projectDocs, // Use learned tone preferences
    });

    // 6c. Check for user interjection (non-blocking)
    const feedback = await checkForUserFeedback(projectId);

    if (feedback) {
      streamToClient({
        type: 'agent_message',
        message: `I see you said: "${feedback.content}". Let me adjust...`
      });

      // Re-run with feedback
      const revisedCopy = await copywriterAgent.run({
        blocks,
        projectDocs,
        userFeedback: feedback.content,
      });

      // LEARN from this feedback
      await agent.useTool('update_project_document', {
        docType: 'feedback_history',
        projectId,
        updates: `User feedback on ${pageSpec.title} page:
          "${feedback.content}"

          Action taken: ${describeCopyChanges(copy, revisedCopy)}
          Result: User approved

          Learning: ${extractLearning(feedback.content)}`,
        reasoning: 'Document user preference for future builds'
      });

      // Also update content preferences if applicable
      if (feedback.content.includes('headline') ||
          feedback.content.includes('tone') ||
          feedback.content.includes('casual')) {
        await agent.useTool('update_project_document', {
          docType: 'content_preferences',
          projectId,
          updates: `Headline/Tone Preference Update:
            User said: "${feedback.content}"
            Pattern observed: ${extractPattern(feedback.content)}
            Apply to: All future headlines`,
          reasoning: 'User expressed tone preference'
        });
      }

      copy = revisedCopy;
    }

    // 6d. Create blocks in DB
    await createPageBlocks(pageSpec, copy);

    streamToClient({
      type: 'page_complete',
      page: pageSpec.title
    });
  }

  // 7. Final learning update
  await agent.useTool('update_project_document', {
    docType: 'system_prompt',
    projectId,
    updates: `
      Initial build complete (${new Date().toISOString()})

      Site is live. User can now:
      - Add new pages (agents will match existing style)
      - Edit content (preferences will be learned)
      - Expand features (context is preserved)

      All learnings documented in linked documents.`,
    reasoning: 'Mark initial build complete'
  });

  streamToClient({
    type: 'complete',
    message: "Site is ready! I've documented everything I learned about your preferences."
  });
}
```

### Second Interaction (Adding Content Later)

```typescript
// User returns weeks later
POST /api/projects/${projectId}/pages/generate
{
  prompt: "Add a blog section"
}

async function addPageWithMemory(projectId, prompt) {

  // 1. Load ALL project context
  streamToClient({
    type: 'status',
    message: 'Loading project context...'
  });

  const systemPrompt = await agent.useTool('read_project_document', {
    docType: 'system_prompt',
    projectId,
  });

  const brandGuidelines = await agent.useTool('read_project_document', {
    docType: 'brand_guidelines',
    projectId,
  });

  const contentPrefs = await agent.useTool('read_project_document', {
    docType: 'content_preferences',
    projectId,
  });

  const feedbackHistory = await agent.useTool('read_project_document', {
    docType: 'feedback_history',
    projectId,
  });

  streamToClient({
    type: 'agent_message',
    message: `I remember Brew Haven! I'll build the blog section to match your existing site's casual, sustainability-focused style.`
  });

  // 2. Agent has full context - builds with learned preferences
  const blogPage = await buildPageAgent.run({
    prompt,
    projectContext: {
      systemPrompt: systemPrompt.content,
      brandGuidelines: brandGuidelines.content,
      contentPreferences: contentPrefs.content,
      pastFeedback: feedbackHistory.content,
    }
  });

  // Agent automatically:
  // - Uses casual tone (learned)
  // - Emphasizes sustainability (learned)
  // - Uses approved color palette (documented)
  // - Follows preferred block patterns (learned)
  // - Keeps headlines punchy (learned)

  streamToClient({
    type: 'preview',
    data: blogPage
  });

  // 3. Update learnings with new page
  await agent.useTool('update_project_document', {
    docType: 'system_prompt',
    projectId,
    updates: `
      Blog section added (${new Date().toISOString()})
      Purpose: ${blogPage.purpose}
      Blocks used: ${blogPage.blocks.map(b => b.type).join(', ')}`,
    reasoning: 'Track site expansion'
  });

  // NO need to ask about tone - already knows
  // NO need to ask about colors - already documented
  // NO need to ask about style - already learned
}
```

---

## Autopilot with Soft Interjections

### User Experience

```typescript
// Frontend: Generation UI with chat

<GenerationView>
  {/* Left: Live preview of site being built */}
  <SitePreview siteId={siteId} streaming={true} />

  {/* Right: Agent activity stream + chat */}
  <AgentActivity>
    <StatusFeed>
      <Status>Planning 5-page site...</Status>
      <Status>Choosing colors...</Status>
      <Status>Building homepage hero...</Status>
      <Status>Writing headline...</Status>
      <LiveCopy>"Where Every Cup Grows a Greener Tomorrow"</LiveCopy>
      <Status>Adding features section...</Status>
    </StatusFeed>

    <UserFeedbackInput>
      {/* User can type anytime - doesn't interrupt agent */}
      <textarea
        placeholder="Add feedback anytime..."
        onChange={(e) => sendFeedback(e.target.value)}
      />
      <Button onClick={pauseAgent}>⏸ Pause Agent</Button>
    </UserFeedbackInput>

    <AgentConversation>
      {/* Agent acknowledges feedback when appropriate */}
      <AgentMessage>
        I see you mentioned "more emphasis on local sourcing."
        I'll incorporate that into the About page.
      </AgentMessage>

      {/* Agent may ask clarifying questions */}
      <AgentMessage>
        For the menu section, would you like categories by
        coffee type or by brewing method?
      </AgentMessage>

      {/* User responds */}
      <UserMessage>By brewing method</UserMessage>

      {/* Agent continues */}
      <AgentMessage>
        Perfect! Continuing with espresso, pour-over, and cold brew sections.
      </AgentMessage>
    </AgentConversation>
  </AgentActivity>
</GenerationView>
```

### Implementation: Non-Blocking Feedback

```typescript
// Feedback collection (non-blocking)
const checkForUserFeedback = async (projectId: string) => {
  // Check if user said anything in last 10 seconds
  const recentFeedback = await payload.find({
    collection: 'generation-feedback',
    where: {
      projectId: { equals: projectId },
      processed: { equals: false },
      timestamp: { greater_than: new Date(Date.now() - 10000) }
    },
    sort: '-timestamp',
    limit: 1,
  });

  if (recentFeedback.docs.length === 0) {
    return null;
  }

  const feedback = recentFeedback.docs[0];

  // Mark as processed
  await payload.update({
    collection: 'generation-feedback',
    id: feedback.id,
    data: { processed: true }
  });

  return feedback;
};

// Agent loop with periodic feedback checks
async function buildWithAutopilot(projectId, plan) {

  for (const pageSpec of plan.sitemap) {

    // Agent works on page
    for (const blockSpec of pageSpec.blocks) {

      // Select block
      const selection = await blockSelectorAgent.run(context);

      streamToClient({
        type: 'block_selected',
        block: selection.blockType
      });

      // Check for feedback BEFORE writing copy
      const feedback1 = await checkForUserFeedback(projectId);
      if (feedback1) {
        // User said something about block selection
        await handleFeedback(feedback1, 'block_selection');
      }

      // Write copy
      const copy = await copywriterAgent.run(context);

      streamToClient({
        type: 'copy_preview',
        copy: copy
      });

      // Check for feedback AFTER writing copy
      const feedback2 = await checkForUserFeedback(projectId);
      if (feedback2) {
        // User commented on the copy
        if (requiresAdjustment(feedback2)) {
          // Regenerate with feedback
          const revised = await copywriterAgent.run({
            ...context,
            userFeedback: feedback2.content
          });
          copy = revised;

          // LEARN from this
          await agent.useTool('update_project_document', {
            docType: 'feedback_history',
            projectId,
            updates: documentLearning(feedback2),
            reasoning: 'User provided preference'
          });
        } else {
          // Just acknowledgment ("looks good!")
          streamToClient({
            type: 'agent_message',
            message: "Thanks! Continuing..."
          });
        }
      }

      // Create block
      await createBlock(copy);

      // Small pause between blocks for user to review
      await sleep(1000);
    }
  }
}

// Intelligent feedback handling
const handleFeedback = async (feedback, stage) => {
  // Use small LLM to classify feedback type
  const classification = await classifyFeedback(feedback.content);

  switch (classification.type) {
    case 'adjustment_request':
      // "Make it more casual"
      return { action: 'regenerate', reason: feedback.content };

    case 'approval':
      // "Looks great!"
      return { action: 'continue', acknowledgment: true };

    case 'question':
      // "What colors are you using?"
      return { action: 'pause_and_answer', question: feedback.content };

    case 'new_requirement':
      // "Also, we're open 7 days a week"
      return { action: 'document_and_continue', info: feedback.content };

    case 'stop_request':
      // "Wait, pause for a moment"
      return { action: 'pause', reason: 'user_requested' };

    default:
      return { action: 'continue' };
  }
};
```

---

## Agent Learning Triggers

### When to Update Documents

```typescript
const learningTriggers = {

  // User corrects something
  correction: async (original, corrected, subject) => {
    await agent.useTool('update_project_document', {
      docType: 'feedback_history',
      projectId,
      updates: `User Correction:
        Original: "${original}"
        Corrected to: "${corrected}"
        Subject: ${subject}

        Pattern: ${extractPattern(original, corrected)}
        Apply to: Future ${subject}`,
      reasoning: 'Learn from correction'
    });
  },

  // User approves something enthusiastically
  strongApproval: async (item, subject) => {
    await agent.useTool('update_project_document', {
      docType: 'feedback_history',
      projectId,
      updates: `User Loves:
        "${item}" in ${subject}

        Note: User strongly approved this.
        Apply similar style to future ${subject}`,
      reasoning: 'Reinforce successful pattern'
    });
  },

  // User provides new information
  newInfo: async (info) => {
    // Classify where this info belongs
    const category = await classifyInfo(info);

    await agent.useTool('update_project_document', {
      docType: category, // brand_guidelines, content_preferences, etc.
      projectId,
      updates: `New Information:
        ${info}

        Learned: ${new Date().toISOString()}
        Source: User feedback during build`,
      reasoning: 'Incorporate new project information'
    });
  },

  // User asks clarifying questions about past decisions
  clarificationRequest: async (question, answer) => {
    // Document the clarification for future reference
    await agent.useTool('update_project_document', {
      docType: 'system_prompt',
      projectId,
      updates: `User Question: "${question}"
        Answer: ${answer}

        Context: ${getRelevantContext(question)}`,
      reasoning: 'Document clarification for future reference'
    });
  },

  // User makes repeated similar requests
  patternDetected: async (pattern) => {
    await agent.useTool('update_project_document', {
      docType: 'content_preferences',
      projectId,
      updates: `Detected Pattern:
        User frequently requests: ${pattern.description}
        Occurrences: ${pattern.count}
        Examples: ${pattern.examples.join(', ')}

        Recommendation: Apply this pattern by default in future`,
      reasoning: 'Detected recurring user preference'
    });
  }
};
```

---

## Git Integration for History

### Future Feature: Git as Memory

```typescript
// Tool: Check Git History
const checkGitHistory = {
  name: 'check_site_history',
  description: 'Query git history to see what has been tried or changed',

  parameters: z.object({
    projectId: z.string(),
    query: z.string(), // "Has the homepage hero been changed?"
  }),

  execute: async ({ projectId, query }) => {
    const site = await getSiteByProjectId(projectId);

    if (!site.gitRepo) {
      return { available: false, message: 'Git history not enabled' };
    }

    // Search git log
    const commits = await gitAgent.searchHistory({
      repo: site.gitRepo,
      query: query,
      maxResults: 10,
    });

    const relevant = commits
      .filter(c => isRelevantToQuery(c.message, query))
      .map(c => ({
        date: c.date,
        message: c.message,
        changes: c.files,
        author: c.author,
      }));

    return {
      available: true,
      commits: relevant,
      summary: summarizeHistory(relevant, query),
    };
  }
};

// Usage in agent
const history = await agent.useTool('check_site_history', {
  projectId,
  query: 'homepage hero changes'
});

if (history.available && history.commits.length > 0) {
  streamToClient({
    type: 'agent_message',
    message: `I see the homepage hero was updated 3 times before.
             The current version emphasizes sustainability, which users loved.
             I'll maintain that theme.`
  });
}

// Git Agent saves all changes
const gitAgent = new Agent({
  name: 'Git History Manager',
  model: 'gpt-4o-mini', // Cheap model for commits

  tools: [
    {
      name: 'commit_site_change',
      parameters: z.object({
        projectId: z.string(),
        changes: z.array(z.string()),
        message: z.string(),
      }),
      execute: async ({ projectId, changes, message }) => {
        // Commit to project's git repo
        await git.commit({
          repo: getProjectRepo(projectId),
          files: changes,
          message: `[AI Build] ${message}`,
          author: 'UIFoundry Agent <agent@uifoundry.dev>'
        });
      }
    },

    {
      name: 'search_history',
      parameters: z.object({
        repo: z.string(),
        query: z.string(),
      }),
      execute: async ({ repo, query }) => {
        // Search git log intelligently
        return await git.log({
          repo,
          search: query,
          maxCount: 10,
        });
      }
    }
  ]
});
```

### Automatic Commits During Build

```typescript
// After each page is complete
await gitAgent.useTool('commit_site_change', {
  projectId,
  changes: [`pages/${page.slug}.json`, `blocks/${page.slug}/*.json`],
  message: `Add ${page.title} page with ${page.blocks.length} blocks

  Blocks used: ${page.blocks.map(b => b.blockType).join(', ')}
  Generated by: Execution Agent
  User prompt: "${truncate(originalPrompt, 100)}"`,
});

// After user feedback correction
await gitAgent.useTool('commit_site_change', {
  projectId,
  changes: [`blocks/hero_${blockId}.json`],
  message: `Update hero headline per user feedback

  Old: "Welcome to Brew Haven"
  New: "Where Every Cup Grows a Greener Tomorrow"

  User feedback: "Make it more unique and emphasize sustainability"
  Updated by: Copywriter Agent`,
});

// This creates searchable history
// Later, agent can query: "Why did the headline change?"
// Answer: Commit history shows user wanted more sustainability emphasis
```

---

## Dynamic System Prompt Construction

### Loading Context for Each Agent Run

```typescript
// Helper: Build full context from document tree
const buildAgentContext = async (projectId: string) => {

  // 1. Load root system prompt
  const root = await readProjectDoc('system_prompt', projectId);

  if (!root.exists) {
    // First time - no context yet
    return { isNewProject: true, context: null };
  }

  // 2. Recursively load all linked documents
  const allDocs = await loadDocumentTree(root.linkedDocs, projectId);

  // 3. Construct comprehensive context
  const context = `
# PROJECT CONTEXT FOR ${projectId}

## System Prompt
${root.content}

${allDocs.map(doc => `
## ${formatDocType(doc.type)}
${doc.content}
`).join('\n')}

---
IMPORTANT: Review all sections above before making any decisions.
User preferences and past learnings are documented throughout.
  `;

  return {
    isNewProject: false,
    context,
    documents: allDocs,
    lastUpdated: Math.max(...allDocs.map(d => d.lastUpdated.getTime())),
  };
};

// Use in agent initialization
const copywriterAgent = new Agent({
  name: 'Copywriter',
  model: 'gpt-4o',

  async instructions(input) {
    // Dynamic instructions based on project context
    const projectContext = await buildAgentContext(input.projectId);

    if (projectContext.isNewProject) {
      return `You are writing copy for a new website project.

        User prompt: ${input.prompt}

        Since this is the first build, establish a clear voice and style.
        Document any patterns you use for future reference.`;
    } else {
      return `You are writing copy for an existing project.

        ${projectContext.context}

        IMPORTANT: Follow the established voice, tone, and patterns above.
        User should not need to repeat preferences.

        Current task: ${input.task}`;
    }
  },

  // ... tools, outputType, etc.
});
```

---

## Database Schema

### Project Documents Collection

```typescript
interface ProjectDocument {
  id: string;
  projectId: string;

  type:
    | 'system_prompt'
    | 'brand_guidelines'
    | 'content_preferences'
    | 'design_patterns'
    | 'feedback_history'
    | 'technical_decisions'
    | 'git_history_summary';

  content: string; // Markdown format

  linkedDocs: string[]; // IDs of referenced documents

  version: number; // Incremented on each update

  updateHistory: {
    timestamp: Date;
    agent: string; // Which agent updated
    change: string; // What was changed
    reasoning: string; // Why it was changed
  }[];

  lastUpdated: Date;
  updatedBy: string; // Agent name

  // Optional: Embeddings for semantic search
  embedding?: number[];

  createdAt: Date;
}

// Indexes
// - projectId + type (find documents by type)
// - projectId + lastUpdated (recent changes)
// - embedding (vector search for learnings)
```

### Project Metadata

```typescript
interface Project {
  id: string;
  userId: string;
  siteId: string;

  name: string;
  status: 'active' | 'archived';

  // Quick access to key documents
  systemPromptId: string;
  brandGuidelinesId: string;

  // Git integration
  gitRepo?: string;
  gitBranch?: string;

  // Learning stats
  learningStats: {
    totalFeedbackItems: number;
    totalCorrections: number;
    totalApprovals: number;
    lastLearnedAt: Date;
  };

  createdAt: Date;
  lastModifiedAt: Date;
}
```

---

## Summary: The Learning Loop

```
User Interaction
       ↓
Agent takes action
       ↓
User provides feedback (or just approves)
       ↓
Agent documents learning in appropriate document
       ↓
Learning persists for next interaction
       ↓
User returns days/weeks later
       ↓
Agent loads project documents
       ↓
Agent already knows user preferences
       ↓
Builds new content matching established patterns
       ↓
Less feedback needed over time
       ↓
Stronger project memory
       ↓
Better results
```

---

## Implementation Priority

### Phase 1: Basic Learning (MVP)
- [ ] Create project-documents collection
- [ ] Implement read/update document tools
- [ ] Basic system prompt per project
- [ ] Simple feedback history tracking
- [ ] Test with one full build + one addition

### Phase 2: Structured Memory
- [ ] Add all document types (brand, content, design, etc.)
- [ ] Implement document linking
- [ ] Automatic learning triggers
- [ ] Pattern detection from repeated feedback

### Phase 3: Git Integration
- [ ] Set up git repo per project
- [ ] Automatic commits on changes
- [ ] Git history search agent
- [ ] Commit message generation

### Phase 4: Advanced Features
- [ ] Vector embeddings for semantic search
- [ ] Cross-project learning (anonymized patterns)
- [ ] Learning analytics dashboard
- [ ] Export project memory as documentation

---

## User Value Proposition

**First Build**:
"Tell me what you want, I'll build it and remember everything"

**Every Build After**:
"I remember your style. Just tell me what to add."

**Result**:
- Less repetition
- Faster iterations
- Consistent brand voice
- Compounding intelligence
- Project memory that never forgets

This is like having a **long-term creative partner** who learns your preferences and applies them automatically.

---

## Next Steps

Ready to start building this? We should tackle:

1. **Database schema** for project documents ✓ (defined above)
2. **Basic document CRUD** tools for agents
3. **Test with simple learning** (user corrects headline, agent remembers)
4. **Autopilot + soft feedback** workflow
5. **Git integration** (later phase)

Which part should we implement first?
