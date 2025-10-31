# Roadmap Changes - October 30, 2025

## Summary

The UIFoundry roadmap has been scaled down to focus on shipping an MVP AI-powered site builder with essential features. The goal is to launch quickly, validate the concept, and use learnings for future products.

## Key Changes

### Block Variants Reduced
- **Before**: 5+ variants per block type (targeting 7 as stretch goal)
- **After**: 3 variants per block type
- **Rationale**: Sufficient variety for AI to generate diverse sites while reducing development time

### Priority Shifts

**Stage 0 - Marketing Blocks (Scaled Down)**
- Focus on 6 essential block types: Hero, Header, Footer, Features, Pricing, CTA
- Optional: Testimonials, FAQ, Contact (deferred to Stage 4)
- Target: 9-12 total blocks minimum for AI site builder

**Stage 1 - AI Site Builder (NEW PRIORITY)**
- Moved from Stage 2 to Stage 1
- Core differentiator for the platform
- Full implementation:
  - AI chat interface (Vercel AI SDK)
  - Multi-agent system (analyzer, selector, generator)
  - SQS + Lambda for async processing
  - Real-time progress updates
  - Theme generation
  - Block metadata system

**Stage 2 - Custom Domains (Simplified)**
- CNAME-only support (www.example.com)
- Apex domains deferred to v2
- Manual DNS verification for MVP
- One domain per site limit
- Essential for monetization

**Stage 3 - Subscription & Payments (NEW)**
- Stripe integration
- Three tiers: Free, Starter ($15/mo), Pro ($30/mo)
- Usage enforcement
- Billing portal

**Stage 4 - Polish & Growth (NEW)**
- Additional blocks
- AI quality improvements
- SEO optimization
- Performance optimization

### Deferred to Backlog

The following features have been moved to the backlog (not scheduled):

1. **Multi-site & RBAC**:
   - Data model for multi-tenancy
   - Role-based access control
   - User-site relationships
   - *Reason*: Adds complexity without validating core concept

2. **Apex Domain Support**:
   - example.com (not just www.example.com)
   - ALIAS records for Route 53
   - Redirect service for other DNS providers
   - *Reason*: CNAME-only sufficient for MVP validation

3. **Template Export**:
   - Repository generator
   - Single-site template transformation
   - GitHub integration
   - *Reason*: Can be added after validating hosted SaaS model

4. **Form Builder Plugin**:
   - Dynamic form creation
   - Submission handling
   - *Reason*: Not essential for initial site builder

## Timeline Impact

### Before
- Stage 0: 3-4 months (15+ block types × 5 variants = 75+ blocks)
- Stage 1: 2 months (Template Export)
- Stage 2: 3-4 months (Custom Domains + AI + RBAC)
- **Total to revenue**: 8-10 months

### After
- Stage 0: 3-4 weeks (6 block types × 3 variants = 18 blocks, already have 15)
- Stage 1: 2-3 weeks (AI Site Builder)
- Stage 2: 2 weeks (Custom Domains - CNAME only)
- Stage 3: 1 week (Stripe integration)
- **Total to revenue**: 8-10 weeks

**Time savings**: 6-8 months to reach first revenue

## Strategic Rationale

### Focus on Learning & Portfolio
- Primary goal: Learn Vercel AI SDK and agent architecture patterns
- Secondary goal: Have working portfolio piece
- Tertiary goal: Validate if AI site builder has market demand
- No pressure to compete with established players (v0.dev, Webflow, Wix)

### Prepare for Next Product
- Skills learned (AI SDK, agent patterns, serverless) transfer to TourGenie
- Infrastructure reusable (Next.js, Payload, Better Auth, Stripe)
- Can soft launch UIFoundry with zero marketing
- Focus marketing efforts on TourGenie (less crowded market)

### Two-Product Strategy
- UIFoundry: Build as learning experience, launch passively
- TourGenie: Focus marketing and growth efforts here
- Both under UIFoundry LLC (DBA for TourGenie)
- Reuse 70% of codebase between products

## Exit Criteria Comparison

### Before (Comprehensive)
- 75+ blocks across 15+ types (5 variants each)
- Multi-site architecture working
- RBAC fully implemented
- Template export system
- Custom domains (all types)
- AI site builder
- Full documentation

### After (MVP)
- 18 blocks minimum across 6 types (3 variants each)
- AI site builder working well
- Custom domains (CNAME only)
- Stripe subscriptions
- Basic documentation

## Archive Reference

The original comprehensive roadmap is preserved at:
`agent-os/archive/README-original-roadmap-2025-10-30.md`

This allows reverting to the original plan if needed or referencing future features that were deferred.

## Next Steps

1. ✅ Complete remaining blocks (1 Features, 3 Pricing, 3 CTA)
2. ✅ Add block metadata (tags, default content)
3. ✅ Build AI site builder (Stage 1)
4. ✅ Implement custom domains (Stage 2)
5. ✅ Add Stripe subscriptions (Stage 3)
6. ✅ Soft launch with zero marketing
7. ✅ Move to TourGenie development
8. 📊 Evaluate UIFoundry traction after 3 months

## Lessons Applied

This roadmap change reflects learnings from strategic analysis:

1. **Ship fast, validate early**: Don't build comprehensive features before proving demand
2. **Focus on differentiation**: AI site builder is unique, not more block variants
3. **Start simple, scale complexity**: CNAME before apex, one domain before multiple
4. **Portfolio over perfection**: Working product > comprehensive product (for learning goals)
5. **Reusable foundation**: Build infrastructure that serves multiple products

---

*Document created: October 30, 2025*
*Last updated: October 30, 2025*
