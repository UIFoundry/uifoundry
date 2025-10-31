# Spec Requirements: Custom Domain Management

## Initial Description

The user wants to enable users to deploy their sites under their own custom domains. Currently, sites are hosted at uifoundry.dev/[siteID]. The goal is to allow users to connect custom domains purchased from any DNS provider (GoDaddy, Namecheap, Cloudflare, etc.) to their UIFoundry-hosted sites.

The user's initial thinking was that they just need to update DNS records to point to the existing site URL, but discovered additional infrastructure is needed including:
- SSL/TLS certificate management
- Domain verification
- Multi-tenant routing
- DNS configuration with CNAME records
- Background job orchestration for verification and monitoring

This is a Stage 2 roadmap feature that will enable users to use professional custom domains instead of uifoundry.dev/[siteID] subdomains.

## Feature Value Proposition

**For End Users:**
- Professional branding with custom domains (www.mycompany.com instead of uifoundry.dev/mysite)
- Enhanced trust and credibility
- Better SEO with owned domain names
- Seamless experience - visitors never see UIFoundry branding

**For UIFoundry:**
- Key Stage 2 roadmap feature enabling enterprise adoption
- Competitive parity with Webflow, Framer, Vercel
- Revenue opportunity through premium tier gating
- Foundation for advanced features (multiple domains, wildcard subdomains)

## Requirements Discussion

### Infrastructure & SSL/TLS

**Certificate Management Approach:**
- **Decision:** AWS Certificate Manager (ACM) with Let's Encrypt
- **Rationale:**
  - Automatic certificate renewal (no manual intervention)
  - Native CloudFront integration (seamless setup)
  - Free SSL certificates
  - Managed service reduces operational overhead
- **Implementation:** Request certificates via ACM API when user adds custom domain

**Validation Method:**
- **Decision:** DNS Validation using CNAME records
- **Rationale:**
  - More reliable than email validation
  - Automated verification through Route 53 API
  - No manual user intervention after DNS setup
  - Aligns with industry best practices (Vercel, Netlify pattern)
- **User Action Required:** User adds CNAME records provided by UIFoundry to their DNS provider

### Domain Configuration

**DNS Record Type:**
- **Decision:** CNAME-only for v1 (supports subdomains like www.example.com)
- **v1 Limitation:** No apex domain support (example.com without www)
- **v2 Enhancement:** Add apex domain support via A/ALIAS records
- **Rationale:**
  - CNAME setup is simpler and more universal
  - Most DNS providers support CNAME
  - Reduces complexity for initial release
  - Apex domains require provider-specific solutions (ALIAS, ANAME, or CNAME flattening)

**WWW Handling:**
- **Decision:** Support both www and apex with auto-redirect
- **v1 Implementation:** User configures CNAME for www.example.com
- **User Responsibility in v1:** User manually sets up apex → www redirect at their DNS provider
- **v2 Enhancement:** UIFoundry handles apex → www redirect automatically

### Multi-Tenancy & Routing

**Routing Strategy:**
- **Decision:** Lambda@Edge for dynamic routing
- **How it works:**
  - Lambda@Edge runs on every request to custom domains
  - Function queries domain→siteID mapping
  - Dynamically routes request to correct site origin
- **Open Concern:** Lambda@Edge costs since it runs per-request
- **Optimization Opportunity:** Cache domain→siteID mappings to reduce database lookups
  - Consider CloudFront key-value store or CloudFront Functions (cheaper alternative)
  - Cache mapping at edge with TTL to reduce Lambda invocations

**Domain Conflict Prevention:**
- **Decision:** DNS Verification Required before domain goes live
- **Flow:**
  1. User adds custom domain → Status: "Pending Verification"
  2. System provides CNAME records for DNS validation
  3. User adds CNAME records to their DNS provider
  4. Background job polls DNS to verify CNAME records exist
  5. Once verified → System requests ACM certificate
  6. ACM validates ownership via DNS CNAME
  7. Certificate issued → Status: "Active"
- **Benefit:** Prevents domain hijacking - user must prove ownership before domain routes to their site

### Domain Verification & Status

**Monitoring Frequency:**
- **Decision:** Aggressive during setup, backoff over time
- **Implementation:**
  - First 1 hour: Check every 15 minutes (4 checks)
  - Hours 1-6: Check every 30 minutes (10 checks)
  - Hours 6-24: Check every 1 hour (18 checks)
  - After 24 hours: Check every 6 hours (4 checks/day)
  - After 72 hours: Check daily (1 check/day)
  - After 7 days: Mark as "Failed" if still not verified
- **Rationale:** Balance between good UX (fast verification) and cost efficiency

**Background Job Infrastructure:**
- **Decision:** AWS Step Functions for verification workflow + EventBridge for health checks
- **Rationale:**
  - User concern: PayloadCMS background jobs don't work well in serverless
  - Step Functions are serverless-native (perfect for SST stack)
  - EventBridge provides reliable scheduling
  - No need to run persistent job workers
- **Workflows:**
  1. **Domain Verification Workflow (Step Functions):**
     - Check DNS CNAME records
     - Request ACM certificate if DNS verified
     - Poll ACM certificate status
     - Update domain status in database
     - Retry with exponential backoff
  2. **Health Monitoring (EventBridge):**
     - Scheduled checks for active domains
     - Verify SSL certificate not expiring (should auto-renew but monitor)
     - Verify DNS still points to UIFoundry
     - Alert if issues detected

**UX - Status Updates:**
- **Decision:** Real-time status with live updates and step-by-step progress
- **Implementation:**
  - WebSocket or polling for live updates in admin UI
  - Progress bar showing: DNS Verification → SSL Provisioning → Propagation → Active
  - Estimated time remaining based on current step
  - Clear error messages with actionable next steps
- **Status Types:**
  - `pending_verification` - Waiting for DNS CNAME records
  - `verifying_dns` - Checking DNS records
  - `provisioning_ssl` - Requesting ACM certificate
  - `provisioning_ssl_validation` - ACM validating via DNS
  - `propagating` - DNS/SSL changes propagating (24-48 hours)
  - `active` - Domain live and serving traffic
  - `failed` - Verification failed (with specific error reason)
  - `error` - System error (needs admin attention)

### UI & Admin Experience

**UI Location:**
- **Decision:** Separate "Domains" global in PayloadCMS admin panel
- **Rationale:**
  - Clean separation from site configuration
  - Dedicated space for domain management
  - Room for v2 features (multiple domains, analytics)
  - Aligns with standard SaaS patterns (similar to Vercel's Domains tab)

**Error Handling:**
- **Decision:** Multi-channel approach - all three methods
  1. **Exponential Backoff Retry:**
     - Automatic retries for transient errors
     - Step Functions built-in retry logic
     - Prevents false negatives from temporary DNS propagation delays
  2. **Email Notifications:**
     - Alert user when domain is active
     - Alert when verification fails after 7 days
     - Alert for SSL certificate issues
  3. **In-App Error Messages:**
     - Real-time error display in admin panel
     - Specific error messages with troubleshooting steps
     - Link to documentation for common issues
- **Rationale:** Users need to know immediately if something fails + have recovery options

## Scope Boundaries

### In Scope - v1

**Core Functionality:**
- Add one custom CNAME domain per site (e.g., www.mysite.com)
- Automatic SSL certificate provisioning via ACM + Let's Encrypt
- DNS validation via CNAME records
- Domain verification workflow with status tracking
- Multi-tenant routing via Lambda@Edge
- Real-time status updates in admin UI
- Email notifications for domain status changes
- Background jobs via Step Functions + EventBridge
- Error handling with retries and user alerts
- Both custom domain AND uifoundry.dev/[siteID] remain active simultaneously

**User Actions Required:**
- Add CNAME record for www.mysite.com → [provided CloudFront URL]
- Add CNAME records for ACM DNS validation
- Optionally configure apex domain redirect at their DNS provider

**Technical Implementation:**
- PayloadCMS global for domain management UI
- MongoDB collection for domain records (domain, siteID, status, timestamps, error logs)
- Step Functions state machine for verification workflow
- EventBridge rules for scheduled health checks
- Lambda@Edge function for request routing
- ACM API integration for certificate management
- Route 53 API for DNS verification checks
- CloudFront behavior configuration for custom domain routing

### Out of Scope - v1 (Deferred to v2+)

**Deferred Features:**
- **Multiple domains per site** - v1 supports exactly one custom domain per site
- **Apex domain support** - v1 only supports CNAME (subdomains), no A/ALIAS records for apex
- **Wildcard subdomains** - No *.mysite.com support (e.g., blog.mysite.com, shop.mysite.com)
- **Domain migration tools** - No automated transfer from other platforms
- **Email forwarding** - No email@customdomain.com handling
- **Custom DNS records** - No TXT, MX, or other record management
- **Domain purchase/registration** - User must own domain already (no registrar integration)
- **Auto-renewal alerts** - No proactive monitoring of domain expiration at registrar
- **Internationalized domains (IDN)** - No punycode/unicode domain support in v1
- **DDoS protection customization** - Rely on CloudFront defaults

**Rationale for Deferrals:**
- Focus v1 on core "connect a custom domain" flow
- Prove value and gather user feedback before expanding
- Reduce technical complexity for initial release
- Multiple domains and apex support are common requests but not blockers for launch

## Technical Constraints & Considerations

### Current Tech Stack
- **Frontend:** Next.js 15
- **Infrastructure:** AWS SST (Serverless Stack)
- **CDN:** CloudFront
- **DNS:** Route 53
- **Database:** MongoDB
- **CMS:** PayloadCMS
- **Hosting Pattern:** Sites currently at uifoundry.dev/[siteID]

### Infrastructure Constraints

**CloudFront & Lambda@Edge:**
- Lambda@Edge has higher latency than CloudFront Functions
- Consider CloudFront Functions for routing if logic is simple enough (cheaper, faster)
- Lambda@Edge limited to us-east-1 for creation/updates
- Cold start latency on first request to new domain
- **Cost Concern:** Lambda@Edge runs on every request (per-request pricing)
  - **Mitigation:** Cache domain→siteID mapping in CloudFront key-value store
  - **Alternative:** CloudFront Functions (1/6th the cost, lighter weight)

**DNS Propagation:**
- DNS changes take 24-48 hours to fully propagate globally
- Cannot speed up - depends on TTL and recursive resolver caching
- Must communicate expected timeline to users clearly
- Verification polling must account for propagation delays

**ACM Certificate Limits:**
- ACM has limits on certificates per account (default: 2,500)
- Rate limiting on certificate requests (avoid rapid retries)
- Certificate validation can take 30 minutes to several hours
- **Mitigation:** Use single wildcard certificate + SNI (investigate if feasible)

**MongoDB Considerations:**
- Need efficient querying for domain→siteID lookup (index on `domain` field)
- Store verification attempts and error logs for debugging
- Consider TTL indexes for cleaning up failed verification records after 30 days

### Security Considerations

**Domain Hijacking Prevention:**
- DNS verification required before routing traffic
- Cannot claim domain without proving ownership
- Re-verify periodically to detect domain transfer/expiration

**SSL/TLS:**
- Enforce HTTPS for all custom domains (no HTTP)
- HSTS headers to prevent downgrade attacks
- Monitor certificate expiration (ACM should auto-renew but verify)

**Rate Limiting:**
- Prevent abuse of domain verification endpoint
- Limit verification attempts per domain (max 10 checks/hour)
- Limit total domains per user (based on plan tier)

**DDoS Protection:**
- Leverage CloudFront's built-in DDoS protection (AWS Shield Standard)
- Monitor for unusual traffic patterns on custom domains
- Consider rate limiting at Lambda@Edge if needed

### Performance Considerations

**Lambda@Edge Optimization:**
- **Primary Concern:** Per-request costs and latency
- **Optimization Strategies:**
  1. Cache domain→siteID mapping in CloudFront key-value store (reduce DB queries)
  2. Set long cache TTL (5 minutes) - acceptable staleness for domain routing
  3. Consider CloudFront Functions instead of Lambda@Edge if logic is simple
  4. Use lightweight Lambda runtime (Node.js 20 minimal bundle)

**Database Query Performance:**
- Index `domain` field for O(1) lookups
- Index `status` field for admin dashboard queries
- Consider read replicas if lookup volume is high

**CDN Caching:**
- Custom domain content should cache same as uifoundry.dev/[siteID]
- Respect cache headers from origin site
- Purge cache when user updates site content

### Operational Considerations

**Monitoring & Observability:**
- CloudWatch metrics for Lambda@Edge invocations and errors
- CloudWatch Logs for debugging domain routing issues
- Step Functions execution history for verification workflow
- Alerts for:
  - Domain verification failures after 7 days
  - SSL certificate provisioning errors
  - Lambda@Edge error rate > 1%
  - ACM certificate approaching expiration (should never happen but monitor)

**Cost Monitoring:**
- Track Lambda@Edge request count and costs per domain
- Alert if costs exceed expected thresholds
- Consider cost optimizations if Lambda@Edge becomes expensive:
  - Migrate to CloudFront Functions
  - Implement more aggressive caching

**User Support:**
- Documentation for common DNS providers (GoDaddy, Namecheap, Cloudflare)
- Step-by-step guides with screenshots
- Troubleshooting guide for common errors:
  - DNS not propagating
  - CNAME conflicts with existing records
  - Incorrect CNAME value
  - Domain already in use

## Open Questions & Research Areas

### Lambda@Edge Cost Optimization
**Question:** How to reduce Lambda@Edge per-request costs?

**Options to Research:**
1. **CloudFront Functions:**
   - Lighter weight (max 10KB code, 2MB memory)
   - 1/6th the cost of Lambda@Edge
   - Sub-millisecond execution
   - **Trade-off:** More limited runtime (no network calls, no crypto)
   - **Decision Point:** Can domain→siteID lookup be cached entirely in CloudFront?

2. **CloudFront Key-Value Store:**
   - New feature (2023) for edge data storage
   - Global key-value store replicated to all edge locations
   - Read from CloudFront Functions
   - **Approach:** Cache domain→siteID mapping with 5-minute TTL
   - **Trade-off:** Eventual consistency (5-minute staleness acceptable?)

3. **CloudFront Behavior Configuration:**
   - Configure CloudFront behaviors per custom domain
   - No Lambda needed - CloudFront routes directly
   - **Trade-off:** Requires CloudFront distribution update per domain (slower, API rate limits)
   - **Trade-off:** Less dynamic - can't easily add/remove domains

**Recommendation for Spec Writer:** Research CloudFront Functions + Key-Value Store as primary approach. Fall back to Lambda@Edge if CloudFront Functions limitations are blocking.

### Serverless Background Jobs
**Status:** Resolved - using Step Functions + EventBridge

**User Concern:** PayloadCMS jobs don't work well in serverless

**Solution:**
- Step Functions for verification workflow (state machine with retries)
- EventBridge for scheduled health checks
- Completely serverless-native (no job workers needed)

**Implementation Details Needed in Spec:**
- Step Functions state machine definition
- EventBridge rule configuration
- Error handling and retry logic
- Integration with MongoDB for status updates

### Apex Domain Support (v2 Feature)
**Challenge:** Apex domains (example.com without www) cannot use CNAME

**Options for v2:**
1. **A Records with Static IPs:**
   - Provision static IPs for CloudFront (AWS Global Accelerator)
   - User adds A records pointing to static IPs
   - **Trade-off:** Additional cost for static IPs

2. **ALIAS Records (Route 53 only):**
   - Route 53-specific record type that works like CNAME at apex
   - **Trade-off:** Only works if user uses Route 53 for DNS
   - **Trade-off:** Not portable to other DNS providers

3. **DNS Hosting Service:**
   - UIFoundry becomes authoritative nameserver for custom domains
   - User delegates DNS to UIFoundry nameservers
   - **Trade-off:** User loses control of DNS
   - **Trade-off:** More complex setup

**Recommendation for Spec Writer:** Document as v2 feature. Recommend ALIAS records for Route 53 users + A records with Global Accelerator for others.

### Domain Migration from Other Platforms
**Deferred to v2+**

**User Need:** Import site + domain from Webflow/Vercel/etc.

**Challenges:**
- Need to export site from source platform
- Import into UIFoundry format
- Update DNS atomically (minimize downtime)
- Preserve SEO (301 redirects, sitemap)

**Recommendation for Spec Writer:** Out of scope for v1. Document as future enhancement.

## Success Criteria

### User-Facing Success Metrics

**Functional Success:**
- User can connect custom domain (www.mysite.com) to their UIFoundry site
- Custom domain serves site content with valid SSL certificate
- Domain verification completes within 1 hour for 80% of users (assumes prompt DNS update)
- Clear error messages and troubleshooting when issues occur
- Both custom domain and uifoundry.dev/[siteID] work simultaneously

**User Experience:**
- Real-time status updates in admin panel (no page refresh needed)
- Step-by-step progress indication during verification
- Email confirmation when domain goes live
- Documentation is clear enough that 90% of users succeed without support tickets

**Performance:**
- Custom domain loads with same performance as uifoundry.dev/[siteID]
- No noticeable latency from Lambda@Edge routing (<50ms p99)
- SSL handshake completes successfully 99.9% of the time

### Technical Success Metrics

**Reliability:**
- Domain verification workflow succeeds 95% of the time (when user correctly adds DNS records)
- Zero domain routing errors after verification completes
- ACM certificates auto-renew 100% of the time
- Step Functions executions succeed 99% of the time

**Performance:**
- Lambda@Edge cold start <200ms (p99)
- Lambda@Edge warm execution <10ms (p99)
- Domain→siteID lookup <5ms from cache (p99)
- DNS verification check completes <30 seconds

**Cost Efficiency:**
- Lambda@Edge costs <$0.10 per 1M requests (via caching optimization)
- ACM certificates remain free (no paid certificate service needed)
- Step Functions executions <$0.01 per domain verification workflow

**Scalability:**
- Support 10,000+ custom domains without infrastructure changes
- Domain verification polling scales horizontally (EventBridge + Step Functions)
- Lambda@Edge routing handles 100K+ requests/second (CloudFront scale)

### Business Success Metrics

**Adoption:**
- 30% of active users connect custom domain within 30 days of feature launch
- Feature becomes key differentiator in competitive analysis
- Zero escalations to engineering for domain setup issues (docs/support handles)

**Revenue (if gated):**
- Custom domains drive 20% increase in premium plan conversions
- Feature unlocks enterprise customer segment

**Competitive Parity:**
- Feature parity with Webflow, Framer, Vercel on custom domain capabilities
- Comparable or better UX for domain setup vs competitors

## Areas Requiring Further Research During Spec Writing

### 1. Lambda@Edge vs CloudFront Functions Decision
- **Research needed:** Technical feasibility of CloudFront Functions + Key-Value Store
- **Decision criteria:** Cost savings vs functionality trade-offs
- **Output:** Architecture decision with cost/performance analysis

### 2. Domain→SiteID Caching Strategy
- **Research needed:** Optimal TTL for domain mapping cache
- **Decision criteria:** Balance staleness vs cost savings
- **Output:** Caching architecture with TTL recommendations

### 3. Step Functions State Machine Design
- **Research needed:** Optimal state machine flow for verification workflow
- **Decision criteria:** Error handling, retry logic, timeout handling
- **Output:** State machine JSON definition with error paths

### 4. MongoDB Schema Design
- **Research needed:** Domain model schema with all required fields
- **Decision criteria:** Query performance, audit trail, extensibility for v2
- **Output:** Complete schema definition with indexes

### 5. PayloadCMS Global UI Design
- **Research needed:** UI component structure for domain management
- **Decision criteria:** Align with PayloadCMS patterns, clear UX for status tracking
- **Output:** Component hierarchy and UI flow diagrams

### 6. Error Message Taxonomy
- **Research needed:** All possible failure modes and user-facing error messages
- **Decision criteria:** Actionable, clear, links to docs
- **Output:** Complete error code taxonomy with messages and troubleshooting steps

### 7. DNS Provider Documentation
- **Research needed:** Step-by-step guides for top 5 DNS providers (GoDaddy, Namecheap, Cloudflare, Google Domains, Route 53)
- **Decision criteria:** Cover 90% of users' DNS providers
- **Output:** Documentation templates with screenshots

### 8. Rate Limiting Strategy
- **Research needed:** Appropriate rate limits to prevent abuse without blocking legitimate users
- **Decision criteria:** Balance security vs user experience
- **Output:** Rate limiting rules per endpoint

## Implementation Complexity Assessment

**Estimated Complexity: High**

**Complex Components:**
1. Lambda@Edge routing with domain mapping (Medium-High complexity)
2. Step Functions workflow with retry logic (Medium complexity)
3. ACM certificate integration and DNS validation (High complexity)
4. Real-time status updates in PayloadCMS UI (Medium complexity)
5. EventBridge scheduling with backoff strategy (Medium complexity)

**Straightforward Components:**
1. MongoDB domain model (Low complexity)
2. PayloadCMS global UI (Low-Medium complexity)
3. Email notifications (Low complexity)
4. Error message display (Low complexity)

**External Dependencies:**
- AWS ACM API (reliable but complex)
- AWS Route 53 API for DNS checks (reliable)
- AWS Step Functions (reliable)
- AWS EventBridge (reliable)
- CloudFront/Lambda@Edge (reliable but deployment is slower)

**Development Time Estimate:**
- Backend infrastructure (Lambda@Edge, Step Functions, EventBridge): 2-3 weeks
- ACM integration and verification workflow: 2-3 weeks
- PayloadCMS UI and real-time updates: 1-2 weeks
- Testing, documentation, edge cases: 1-2 weeks
- **Total:** 6-10 weeks for complete v1 implementation

**Risk Areas:**
- Lambda@Edge costs could be higher than expected (mitigation: CloudFront Functions alternative)
- DNS propagation delays could frustrate users (mitigation: clear messaging about timelines)
- ACM API rate limits during high verification volume (mitigation: exponential backoff, queue requests)
- Step Functions complexity could make debugging difficult (mitigation: comprehensive CloudWatch logging)

## Notes for Spec Writer

**User's Implementation Approach:**
- User will be writing most of the code manually
- Wants concrete implementation plan with detailed technical steps
- Not just high-level architecture - needs specifics

**Required Spec Sections:**
1. **Architecture Diagram:** Visual showing all AWS services and data flow
2. **API Endpoints:** REST/GraphQL endpoints for domain CRUD operations
3. **Database Schema:** Complete MongoDB schema with indexes
4. **Step Functions Definition:** State machine JSON with all states and transitions
5. **Lambda@Edge Function:** Pseudocode/logic for routing function
6. **CloudFront Configuration:** Behavior rules and cache settings
7. **EventBridge Rules:** Scheduling configuration for health checks
8. **PayloadCMS Global:** Collection config and UI component structure
9. **Error Handling Matrix:** All error codes, messages, and recovery steps
10. **Testing Strategy:** Unit tests, integration tests, end-to-end scenarios
11. **Deployment Steps:** SST stack changes and deployment sequence
12. **Rollback Plan:** How to safely roll back if issues occur in production

**Visual Assets:**
- User will use Mobbin screenshots AFTER requirements phase
- Spec writer should request visuals from user during spec writing if needed
- No visual mockups available yet for this requirements phase

**Code Reusability:**
- No existing similar features to reference
- This is net-new functionality for the codebase
- Spec writer should reference existing PayloadCMS global patterns and SST stack patterns

**Standards Compliance:**
- Ensure spec follows all coding standards in `/agent-os/standards/`
- Pay special attention to:
  - Error handling patterns (global/error-handling.md)
  - API design (backend/api.md)
  - MongoDB schema design (backend/models.md)
  - Testing coverage requirements (testing/coverage.md)
