# UIFoundry

Opinionated Payload CMS + Next.js template for building and hosting marketing sites. It ships with Shadcn UI components, Better Auth, tRPC, MongoDB, and SST. The end‑goal is a self‑hostable kit and, later, a hosted SaaS with a UIFoundry component/block registry.

## Quickstart

### Prerequisites

- Node.js 18+ (20+ recommended)
- pnpm
- MongoDB (Atlas or local)

### 1) Install

```bash
pnpm install
```

### 2) Configure environment

```bash
cp .env.example .env.local
# generate secrets
openssl rand -hex 32
```

Set the following (see .env.example for full list):

- DATABASE_URI
- BETTER_AUTH_SECRET
- NEXT_PUBLIC_BETTER_AUTH_URL (e.g. http://localhost:3001)
- PAYLOAD_SECRET
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET (if using Google sign‑in)

### 3) Run

```bash
pnpm dev
```

- App: http://localhost:3001
- Payload Admin: http://localhost:3001/admin

## Scripts

- pnpm dev — Start dev server on port 3001
- pnpm build — Build (generates Payload types, then Next build)
- pnpm check — Lint + TypeScript typecheck
- pnpm lint, pnpm lint:fix — ESLint
- pnpm typecheck — TypeScript only

## Tech stack

- Next.js (App Router)
- Payload CMS
- Better Auth (with email/password and Google provider)
- tRPC
- MongoDB
- SST (infrastructure)
- Shadcn UI + Tailwind CSS

## Project structure (high‑level)

- src/app — Next.js routes (frontend + payload admin app)
- src/payload — Payload config: blocks, collections, globals, components, styles
- src/components — Non‑payload React components
- src/auth — Better Auth config and client
- src/server, src/trpc — tRPC routers and clients
- src/ui — Shadcn UI registry components

## Roadmap

A living, stage‑based plan (no version numbers). Focus: Ship AI-powered site builder with essential marketing blocks.

Legend: [x] done · [ ] planned · (MVP) minimum viable for the stage

> **Note:** Original comprehensive roadmap archived at `agent-os/archive/README-original-roadmap-2025-10-30.md`

### Completed (summary)

Stage 0 — Initial Setup (completed items so far)

- [x] Next.js App Router + PayloadCMS integration (SSR/ISR friendly)
- [x] Shadcn UI registry and base components (`src/ui/*`)
- [x] Better Auth sign‑in/out + session wiring (`src/auth/*`)
- [x] TRPC server/client scaffolding (`src/server/*`, `src/trpc/*`)
- [x] SST config scaffold + local deploy story (`sst.config.ts`)
- [x] Styled Payload Admin (`src/payload/styles.css`)
- [x] Example site pages + preview flow (`src/app/(frontend)/*`)

### Stage 0 — MVP Marketing Blocks (Essential Blocks Only)

Goal: Build minimal set of marketing blocks needed to enable AI site generation.

**Scope (MVP)**

- [x] Next.js App Router + PayloadCMS integration (SSR/ISR friendly)
- [x] Shadcn UI registry and base components (`src/ui/*`)
- [x] Better Auth sign‑in/out + session wiring (`src/auth/*`)
- [x] TRPC server/client scaffolding (`src/server/*`, `src/trpc/*`)
- [x] SST config scaffold + local deploy story (`sst.config.ts`)
- [x] Styled Payload Admin (`src/payload/styles.css`)
- [x] Example site pages + preview flow (`src/app/(frontend)/*`)
- [x] UIFoundry Registry scaffold (structure + add/update generator)
- [x] Fumadocs scaffold inside repo
- [x] "Import Theme" UI in Payload Tailwind Config global (`src/payload/globals/TailwindConfig/*`): paste JSON and file upload → preview → Apply
- [x] One‑click apply writes to Tailwind Config global fields and injects `<style>` via existing component
- [ ] Marketing blocks: 3 variants each (sufficient for AI to generate varied sites)
- [ ] Block metadata: tags (array of strings) and default-content templates for AI site builder
- [ ] Basic documentation for blocks (reference, not comprehensive)
- [ ] Quickstart docs in README (install, dev, build, deploy)

**Marketing blocks checklist (MVP - target 3 variants each)**

- [x] Hero (5/3) ✅ *exceeds target*
- [x] Header (5/3) ✅ *exceeds target*
- [x] Footer (5/3) ✅ *exceeds target*
- [ ] Features (2/3) - need 1 more
- [ ] Pricing (0/3) - need 3
- [ ] CTA (0/3) - need 3
- [ ] Testimonials (0/3) - optional for MVP
- [ ] FAQ (0/3) - optional for MVP
- [ ] Contact (0/3) - optional for MVP

**Exit criteria**

- `pnpm build` passes and generates Payload types
- 9-12 total marketing blocks across essential types (Hero, Header, Footer, Features, Pricing, CTA)
- Each block has metadata (tags, default content) for AI site builder
- Basic block documentation exists
- Blocks have good defaults and work with AI-generated content

### Stage 1 — AI Site Builder (Priority)

Goal: Enable AI-powered full site generation from user prompts. This is the core differentiator.

**Scope (MVP)**

- [ ] **AI chat interface** for collecting site requirements (Next.js App Router + Vercel AI SDK)
- [ ] **SQS + Lambda job queue** for async site generation (avoid timeouts)
- [ ] **Site structure analyzer agent**: Parse user prompt → determine site structure (business type, sections needed, tone, colors)
- [ ] **Block selector agent**: Choose appropriate blocks based on site structure + block tags/metadata
- [ ] **Content generator agent**: Generate content for each block using block schemas (Zod validation)
- [ ] **Database population**: Create Site + Pages with fully populated blocks in MongoDB
- [ ] **Real-time progress updates**: Show user site generation progress (WebSocket or polling)
- [ ] **Theme generation**: AI generates color scheme + typography based on user input
- [ ] **Preview before publish**: User can review generated site before going live
- [ ] **Block metadata system**: Tags, default content templates, and AI prompts for each block type

**Exit criteria**

- User provides prompt → AI generates complete site (3-5 pages, 10-15 blocks)
- Generated sites have good content quality (not generic placeholders)
- Site generation completes in 30-90 seconds
- User can preview and edit before publishing
- AI reliably selects appropriate blocks for each section

### Stage 2 — Custom Domains (CNAME Support)

Goal: Enable users to connect custom domains to their AI-generated sites. Essential for paid hosting.

**Scope (MVP)**

- [ ] **Domains global** in PayloadCMS (manage custom domains per site)
- [ ] **CNAME-only support**: Users connect www.example.com (apex domains deferred to v2)
- [ ] **DNS instructions UI**: Clear step-by-step guide for adding CNAME records
- [ ] **SSL certificate provisioning**: AWS ACM + Let's Encrypt integration (automatic)
- [ ] **DNS validation**: Check if CNAME points correctly (manual verification for MVP)
- [ ] **CloudFront configuration**: Add custom domain as alias to distribution
- [ ] **Domain status tracking**: Pending → Verifying → Active → Error states
- [ ] **Basic error handling**: Show helpful messages when DNS misconfigured
- [ ] **One domain per site**: Limit to single custom domain in MVP (multiple domains in v2)

**Exit criteria**

- User can add www.example.com to their site
- DNS instructions are clear and accurate
- SSL certificate provisions automatically
- Site accessible via custom domain with HTTPS
- Errors are surfaced with actionable guidance

### Stage 3 — Subscription & Payments

Goal: Enable paid hosting tiers and monetize the platform.

**Scope (MVP)**

- [ ] **Stripe integration**: Subscription management with Stripe Checkout
- [ ] **Pricing tiers**: Free (1 site, uifoundry.dev subdomain), Starter ($15/mo, custom domain), Pro ($30/mo, 3 sites)
- [ ] **Subscription enforcement**: Check user tier before allowing site creation or domain addition
- [ ] **Billing portal**: Users can manage subscription, update payment method, view invoices
- [ ] **Usage tracking**: Track sites per user, enforce limits
- [ ] **Cancellation flow**: Graceful downgrade, site archival (not deletion)

**Exit criteria**

- Users can subscribe to paid tiers via Stripe
- Subscription status controls feature access (domains, site count)
- Billing portal works for managing subscription
- Revenue tracking works correctly

### Stage 4 — Polish & Growth

Goal: Improve quality, add more blocks, optimize for conversions.

**Scope**

- [ ] Additional marketing blocks (Testimonials, FAQ, Contact - 3 variants each)
- [ ] Improved AI content quality (better prompts, examples, validation)
- [ ] Site editing after generation (AI can regenerate individual blocks)
- [ ] More theme options (dark mode, brand presets)
- [ ] SEO optimization (meta tags, structured data, sitemap)
- [ ] Performance optimization (image optimization, lazy loading)
- [ ] Analytics integration (privacy-friendly by default)
- [ ] Email notifications (site published, domain verified, payment failed)

### Backlog / Future Ideas (not scheduled)

**Multi-site & RBAC (Deferred)**

- Multi-site architecture: Data model + guards to isolate content by Site
- RBAC system: Link users↔sites, roles (Owner, Admin, Editor, Viewer)
- Role-based permissions: Enforced in Payload access rules
- Role-aware UI: Admin interface affordances

**Apex Domain Support (v2)**

- Support for example.com (not just www.example.com)
- ALIAS records for Route 53 users
- Redirect service for other DNS providers
- Automatic www ↔ apex redirects

**Template Export (Developer Self-Hosting)**

- Template repository generator (creates blank single-site repo)
- Site configuration transformation (multi-site → single-site)
- GitHub integration for automated template repo creation
- MIT-licensed single-site templates for developers

**Form Builder Plugin**

- Form schema builder (fields, validation, layout) and renderer block
- Submissions stored; basic spam protection; optional email/webhook

**Other Ideas**

- Import/export site JSON
- Webhooks and integrations library
- Performance budget + Lighthouse CI
- White label option for agencies

### Release strategy for the UIFoundry registry

Semantic Versioning is recommended once the registry stabilizes. Use Conventional Commits and semantic‑release to automate GitHub releases and changelogs. Defer npm publishing until the registry becomes a package or keep it repo‑driven.

## Docs

Docs are added as components/blocks ship (docs‑first). See the roadmap for the current docs stage and links once Fumadocs is scaffolded.

## License

This project uses [PolyForm Perimeter License 1.0.0](https://polyformproject.org/licenses/perimeter/1.0.0).

**You CAN use this for:**

- Your business's marketing website
- Client websites (agencies/freelancers)
- Your SaaS product site
- Internal company websites

**You CANNOT:**

- Resell this template
- Create competing CMS templates
- Offer competing website hosting services

MIT-licensed templates for individual sites use will be available separately.

## Contributing

- Use Conventional Commits (feat, fix, chore, docs). This helps future release automation.
- Run pnpm run check before pushing.
- Update the roadmap section in this README as features are completed or plans change.
