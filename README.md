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

A living, stage‑based plan (no version numbers). Docs‑first: document every block as it's built with Fumadocs.

Legend: [x] done · [ ] planned · (MVP) minimum viable for the stage

### Completed (summary)

Stage 0 — Initial Setup (completed items so far)

- [x] Next.js App Router + PayloadCMS integration (SSR/ISR friendly)
- [x] Shadcn UI registry and base components (`src/ui/*`)
- [x] Better Auth sign‑in/out + session wiring (`src/auth/*`)
- [x] TRPC server/client scaffolding (`src/server/*`, `src/trpc/*`)
- [x] SST config scaffold + local deploy story (`sst.config.ts`)
- [x] Styled Payload Admin (`src/payload/styles.css`)
- [x] Example site pages + preview flow (`src/app/(frontend)/*`)

### Stage 0 — Initial Release (Docs + Registry + Blocks + Multi‑site + RBAC)

Goal: a working, self‑hostable Next.js + Payload starter with a UIFoundry registry, docs, multi‑tenancy, and access control.

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
- [ ] **Multi‑site architecture:** Data model + guards to isolate content by `Site` (`src/payload/collections/Sites.ts`)
- [ ] **RBAC system:** Link users↔sites, choose active site context in admin
- [ ] **Role‑based permissions:** Roles (Owner, Admin, Editor, Viewer) enforced in Payload access rules
- [ ] **Role‑aware UI:** Admin interface affordances where applicable
- [ ] **Template architecture planning:** Document single‑site vs multi‑site hosting strategy and implementation approach
- [ ] Marketing blocks initial set (target 5 per type; stretch 7)
- [ ] Documentation for each shipped block/component
- [ ] Block metadata: tags (array of strings) and optional default-content templates (for Stage 2 agents)
- [ ] Quickstart docs in README (install, dev, build, deploy)
- [ ] Export current theme as JSON

**Marketing blocks checklist (MVP - target 5 of each)**

- [x] Hero (5/5) ✅
- [x] Header (5/5) ✅
- [x] Footer (5/5) ✅
- [ ] Features (0/5)
- [ ] Pricing (0/5)
- [ ] Testimonials (0/5)
- [ ] FAQ (0/5)
- [ ] CTA (0/5)
- [ ] Gallery (0/5)
- [ ] Stats (0/5)
- [ ] Teams (0/5)
- [ ] Newsletter (0/5)
- [ ] About (0/5)
- [ ] Contact (0/5)
- [ ] Feedback (0/5)

**Exit criteria**

- `pnpm build` passes and generates Payload types
- New project boots locally; admin loads; content edits render on the sample site
- UIFoundry Registry can add/update blocks; each shipped block has a doc page
- Multi‑site isolation working: users see only their sites' content in admin
- RBAC enforced: different user roles have appropriate access levels
- Template architecture strategy documented and validated
- README quickstart lets a new user go 0→1 without external help

### Stage 1 — Template Export

Goal: optional template repository generation for developers who want self-hosted single-site solutions.

**Scope (MVP)**

- [ ] Template repository generator (creates blank single‑site repo)
- [ ] Site configuration transformation (multi‑site → single‑site payload.config.ts)
- [ ] GitHub integration for automated template repo creation
- [ ] Template includes all field hook optimizations (headerField, etc.)
- [ ] Full shadcn registry compatibility for exported templates
- [ ] Site content export as seed data or default configuration
- [ ] Template repo documentation and setup instructions

### Stage 2 — Custom domains + LLM site builders (combined)

Goal: production‑ready hosting and AI‑assisted full‑site creation.

**Custom domains**

- [ ] Domain mapping model (domain↔site)
- [ ] SST infrastructure for DNS/SSL (CloudFront/ALB + Route53 or documented alternative)
- [ ] Domain verification and status surfaced in admin

**LLM site builders (full sites)**

- [ ] Accept brief → plan sitemap (home, features, pricing, about, contact, etc.)
- [ ] Select blocks by tags; map sitemap sections to compatible blocks
- [ ] Populate Payload DB: create Site + Pages with block arrays and reasonable field inputs based on each block's config/defaults
- [ ] One‑off generation: allow generating a single page/section using tags
- [ ] Guardrails: dry‑run preview, diff, and approval before writing; rollback path

**Exit criteria**

- From a brief, generate a full site (sitemap → pages → blocks) and review/publish it
- Custom domain attached with valid SSL; misconfigurations are detectable

### Stage 3 — Form builder plugin (MVP)

- [ ] Form schema builder (fields, validation, layout) and renderer block
- [ ] Submissions stored; basic spam protection; optional email/webhook

### Backlog / Ideas (not scheduled)

**Template Export (developer self-hosting)**

- [ ] Template repository generator (creates blank single-site repo)
- [ ] Site configuration transformation (multi-site → single-site payload.config.ts)
- [ ] GitHub integration for automated template repo creation
- [ ] Template includes all field hook optimizations (headerField, etc.)
- [ ] Full shadcn registry compatibility (devs can add any payload components)
- [ ] Site content export as seed data or default configuration
- [ ] Template repo documentation and setup instructions

**Other Ideas**

- Analytics integration (privacy‑friendly by default)
- Import/export starters
- Webhooks and integrations library
- Performance budget + Lighthouse CI

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
