# UIFoundry Roadmap (single file)

A living, stage‑based plan (no version numbers). Docs‑first: document every block as it’s built with Fumadocs.

Legend: [x] done · [ ] planned · (MVP) minimum viable for the stage

---

## Completed (summary)

Stage 0 — Initial Release (completed items so far)

- [x] Next.js App Router + PayloadCMS integration (SSR/ISR friendly)
- [x] Shadcn UI registry and base components (`src/ui/*`)
- [x] Better Auth sign‑in/out + session wiring (`src/auth/*`)
- [x] TRPC server/client scaffolding (`src/server/*`, `src/trpc/*`)
- [x] SST config scaffold + local deploy story (`sst.config.ts`)
- [x] Styled Payload Admin (`src/payload/styles.css`)
- [x] Example site pages + preview flow (`src/app/(frontend)/*`)

---

## Stage 0 — Initial Release (Docs + Registry + Blocks)

Goal: a working, self‑hostable Next.js + Payload starter with a UIFoundry registry and docs added as components/blocks ship.

Scope (MVP)

- [x] Next.js App Router + PayloadCMS integration (SSR/ISR friendly)
- [x] Shadcn UI registry and base components (`src/ui/*`)
- [x] Better Auth sign‑in/out + session wiring (`src/auth/*`)
- [x] TRPC server/client scaffolding (`src/server/*`, `src/trpc/*`)
- [x] SST config scaffold + local deploy story (`sst.config.ts`)
- [x] Styled Payload Admin (`src/payload/styles.css`)
- [x] Example site pages + preview flow (`src/app/(frontend)/*`)
- [ ] UIFoundry Registry scaffold (structure + add/update generator)
- [ ] Marketing blocks initial set (target 5 per type; stretch 7)
- [ ] Fumadocs scaffold inside repo and docs for each shipped block/component
- [ ] Block metadata: tags (array of strings) and optional default-content templates (for Stage 2 agents)
- [ ] Quickstart docs in README (install, dev, build, deploy)

Marketing blocks checklist (target 5 of each)

- [ ] Hero (0/5)
- [ ] Header (0/5)
- [ ] Footer (0/5)
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

Docs requirements (per block)

- [ ] Overview & intent
- [ ] Props/fields table
- [ ] Usage snippet
- [ ] Live preview (or screenshot) + theming notes
- [ ] “Add via UIFoundry registry” instructions
- [ ] Metadata: tags and optional default-content example

Exit criteria

- `pnpm build` passes and generates Payload types
- New project boots locally; admin loads; content edits render on the sample site
- UIFoundry Registry can add/update blocks; each shipped block has a doc page
- README quickstart lets a new user go 0→1 without external help

---

## Stage 1 — Theming + Multi‑site + RBAC (combined)

Goal: unify theme import, multi‑tenancy, and access control. (Multi‑site appears before RBAC.)

Scope (MVP)

- [ ] “Import Theme” UI in Payload Tailwind Config global (`src/payload/globals/TailwindConfig/*`): paste JSON and file upload → preview → Apply
- [ ] JSON schema adapter: map external theme JSON → `--token` CSS variables used by UIFoundry
- [ ] One‑click apply writes to Tailwind Config global fields and injects `<style>` via existing component
- [ ] Export current theme as JSON
- [ ] (Optional) CLI: `uifoundry theme import theme.json`
- [ ] Data model + guards to isolate content by `Site` (`src/payload/collections/Sites.ts`, related collections)
- [ ] Link users↔sites, choose active site context in admin
- [ ] Roles & permissions (Owner, Admin, Editor, Viewer) enforced in Payload access rules
- [ ] Role‑aware UI affordances in admin where applicable

---

## Stage 2 — Custom domains + LLM site builders (combined)

Goal: production‑ready hosting and AI‑assisted full‑site creation.

Custom domains

- [ ] Domain mapping model (domain↔site)
- [ ] SST infrastructure for DNS/SSL (CloudFront/ALB + Route53 or documented alternative)
- [ ] Domain verification and status surfaced in admin

LLM site builders (full sites)

- [ ] Accept brief → plan sitemap (home, features, pricing, about, contact, etc.)
- [ ] Select blocks by tags; map sitemap sections to compatible blocks
- [ ] Populate Payload DB: create Site + Pages with block arrays and reasonable field inputs based on each block’s config/defaults
- [ ] One‑off generation: allow generating a single page/section using tags
- [ ] Guardrails: dry‑run preview, diff, and approval before writing; rollback path

Exit criteria

- From a brief, generate a full site (sitemap → pages → blocks) and review/publish it
- Custom domain attached with valid SSL; misconfigurations are detectable

---

## Stage 3 — Form builder plugin (MVP)

- [ ] Form schema builder (fields, validation, layout) and renderer block
- [ ] Submissions stored; basic spam protection; optional email/webhook

---

## Backlog / Ideas (not scheduled)

- Theme marketplace / presets
- Analytics integration (privacy‑friendly by default)
- Import/export starters
- Webhooks and integrations library
- Performance budget + Lighthouse CI

---

## Release strategy for the UIFoundry registry

Semantic Versioning is recommended once the registry stabilizes. Use Conventional Commits and semantic‑release to automate GitHub releases and changelogs. Defer npm publishing until the registry becomes a package or keep it repo‑driven.
