# Agent Guidelines for UIFoundry

## Build/Lint/Test Commands

- `pnpm run build` - Build the app (runs payload generate:types then next build)
- `pnpm run dev` - Start dev server on port 3001 with turbo
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix linting issues
- `pnpm run typecheck` - Run TypeScript type checking
- `pnpm run check` - Run both lint and typecheck
- `pnpm run format:check` - Check prettier formatting
- `pnpm run format:write` - Fix prettier formatting
- No test framework configured

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
