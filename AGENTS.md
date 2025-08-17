# Agent Guidelines for UIFoundry

## Build/Lint/Test Commands

- `pnpm build` - Build the app (runs payload generate:types then next build)
- `pnpm run dev` - Start dev server on port 3001 with turbo
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix linting issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run both lint and typecheck
- `pnpm format:check` - Check prettier formatting
- `pnpm format:write` - Fix prettier formatting
- No test framework configured

## Project & Purpose

UIFoundry is a custom, opionated and professionally put together payload cms template that features everything needed to build a fullstack marketing application with no code. The goal is to first offer a premium PayloadCMS kit developers can purchase and self host, but also turn this into a Web hosting SaaS similar to Wordpress that allows users to login and build sites, that are then hosted on aws via sst, users will be able to control everything about their sites through the payload cms admin panel. This project is starting out as a clone of the [shadcn payload blocks](https://www.shadcnblocks.com/payload-cms) setup but with bigger expansion plans for non tech users as well

## Core Project Dependencies

- [PayloadCMS](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
- [sst](https://sst.dev/docs/)
- [React](https://react.dev/learn)
- [TRPC](https://trpc.io/docs/quickstart)
- [Better Auth](https://www.better-auth.com/docs/introduction)
- [Shadcn](https://ui.shadcn.com/docs)
- [mongodb](https://www.mongodb.com/products/platform/atlas-database)

## Code Style & Conventions

- Use TypeScript with strict mode enabled
- Import paths: Use `~/` alias for src/ directory, `@payload-config` for payload config
- Prefer type imports with inline syntax: `import { type AuthStrategyResult } from "payload"`
- Use double quotes for strings, tabs for indentation
- Function components: Use default exports with function declarations
- Interface naming: Use PascalCase (e.g., `interface Post`)
- Constants: Use SCREAMING_SNAKE_CASE for collection slugs and enums
- Error handling: Use try/catch with payload.logger.error() for Payload contexts
- File naming: Use kebab-case for directories, PascalCase for React components
- Always run `pnpm run check` before committing changes

## Project Structure

- src: frontend source code
  - app: next.js routes (app router)
  - auth: better-auth user auth functionality
  - components: all react components that are not payload components in any way.
  - payload: PayloadCMS related code & react components
    - blocks: all payload cms blocks & blockComponents. Each Block has its own folder with its block config and react component. eg: ~/payload/blocks/Hero/Hero_1/config.ts & ~/payload/blocks/Hero/Hero_1/index.tsx
    - collections/: all payload collection config files
    - components/: payload specific react components.
    - constants/: contains all slugs as text constants for all payload data types (collections, globals, blocks, etc)
    - fields/: payload field configs that are used enough across various blocks to be abstracted to their own functions
    - globals/: all payload global configs. works in a similar way to the blocks folder
    - styles.css: all payload cms admin panel global tailwind styles
    - utils.ts: payload cms getPayload function
  - server/: TRPC api routes
    styles/: global tailwind styles and utils
    trpc/: trpc clients
    ui/: shadcn ui code for custom registry components
    utils/: sst utils

## Planned Features

1. - [ ] Interactive Docs that explain each block, how they work, the props, and what not [Fumadocs](https://fumadocs.dev/docs/ui)
2. - [ ] Role Based Access Control (I have built this feature before for a different project, will be transferring it over)
3. - [ ] LLM agent site builders (once the payload ui blocks are built and several sites can be created. LLM agents can be setup and offered as a paid feature for the SaaS business)
4. - [ ] users can have multiple sites
5. - [ ] form builder plugin complete with many various types of form components
6. - [ ] Custom domains for individual sites,

---

## LLM notes: blocks, rendering, and motion

- Block anatomy (server + client):
  - Config (server): `src/payload/blocks/<Group>/<BlockName>/config.ts` exports a Payload `Block` (fields, labels, slug).
  - View (client): `src/payload/blocks/<Group>/<BlockName>/index.tsx` renders the block, often with animations.
  - Do NOT re-export the config from a client component (no `export * from "./config"` in client). Instead, in the group index import configs directly from `./X/config`.
- Registration:
  - Group index (e.g., `src/payload/blocks/Hero/index.ts`) must:
    - Export `blocks: Block[]` array accumulating the group’s Block configs.
    - Export `blockComponents` mapping `{ [slug]: Component }`.
  - Global aggregator: `src/payload/blocks/index.tsx` merges all groups’ blocks/components and is consumed by:
    - `src/payload/collections/Pages.ts` to allow the blocks in the `blocks` field.
    - Render-time contexts (`src/app/(frontend)/[slug]/page.tsx`, preview) via `<RenderBlocks />`.
- Render pipeline:
  - `RenderBlocks` (`src/components/RenderBlocks/index.tsx`) iterates `blocks` (payload JSON) and looks up components by `blockType`. It spreads the block’s fields as props into the React component.
  - To add extra inputs to a block, define them in the block’s `config.ts`. The component will receive them via props automatically.
- Slugs and groups:
  - Slugs/constants live in `src/payload/constants/blocks.ts` (e.g., `BLOCK_SLUG_HERO_1`, `BLOCK_GROUP_HERO`). Add new slugs here before referencing them in configs/components.
- Media fields:
  - `mediaField()` (`src/payload/fields/mediaField.ts`) returns a group with two uploads `{ light, dark }` tied to the `Media` collection.
  - Upload defaultValues aren’t practical—leave empty by default and guard in the component (`props?.media?.light?.url`, etc.).
- Motion primitives (client-only):
  - Located at `src/ui/motion-primitives/`:
    - `text-effect.tsx` – per word/char/line animated headings.
    - `animated-group.tsx` – staggered group entrance.
    - `infinite-slider.tsx` – marquee/slider (good for logo clouds).
    - `progressive-blur.tsx` – layered blur masks over media.
  - Any component using `motion/react` must start with `"use client"`.

## LLM checklist: adding a new block

1. Add the slug in `src/payload/constants/blocks.ts` (and group constant if new).
2. Create `config.ts` with `slug`, `labels`, `admin.group`, `interfaceName`, and fields (provide good `defaultValue`s for text/select/checkbox).
3. Create `index.tsx` client component (put `"use client"` at top). Use motion primitives where helpful.
4. Register in the group index (e.g., `src/payload/blocks/Hero/index.ts`):
   - `import { Hero_X_Block } from "./Hero_X/config";`
   - `import Hero_X from "./Hero_X";`
   - Add to `blocks` array and `blockComponents` map.
5. Run `pnpm check` then `pnpm build` (generates Payload types and builds Next). Fix any client/server boundary issues.

## Field patterns for hero variety

- Common hero fields (mix-and-match):
  - `kicker`/`eyebrow` (short label above headline)
  - `header`, `subheader`
  - Primary/secondary CTA labels + hrefs
  - `media` (light/dark screenshot or illustration)
  - `logos` (array: name, url/href, optional media) for logo clouds
  - `stats` (array: label, value, delta)
  - `featureList` (array: icon, title, desc)
  - `codeSample` (textarea) or `videoUrl` + poster media
  - `backgroundStyle` (select: "spotlight", "blobs", "grid", etc.) to toggle backgrounds

## Common pitfalls

- Don’t import a client file from server contexts. Group `index.ts` should import configs directly from `config.ts`, not through the client `index.tsx`.
- When using `motion/react`, ensure the file is marked `"use client"`.
- Provide safe defaults: text fields can have illustrative copy; upload fields should be optional and null-checked in components.
- After adding a block, verify both admin (fields render) and frontend (component renders) and run `pnpm check`/`pnpm build`.
