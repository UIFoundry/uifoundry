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

## LLM Protocol

- To achieve the best context when bug finding, use git to find the latest changed files, then narrow your initial search to those files to see what may be the root cause
