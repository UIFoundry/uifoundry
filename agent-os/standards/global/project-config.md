# UIFoundry Project Configuration

> **CRITICAL**: All agents MUST read and follow these project-specific configurations

## Development Server

### Port Configuration

**Dev Server Port**: `3005` (NOT 3001, NOT 3000)

- **Application URL**: `http://localhost:3005`
- **Payload Admin URL**: `http://localhost:3005/admin`
- **Registry URL**: `http://localhost:3005/r/[component-name]`
- **Documentation URL**: `http://localhost:3005/docs`

### Server Management Rules

**CRITICAL RULES FOR ALL AGENTS**:

1. ❌ **NEVER start the dev server** - It should already be running
2. ❌ **NEVER stop the dev server** - User manages it
3. ❌ **NEVER restart the dev server** - User manages it
4. ❌ **NEVER run `pnpm dev`** - Server is already running
5. ✅ **ALWAYS assume server is running on port 3005**
6. ✅ **If server is not running, ASK THE USER to start it**

**Why**: The user keeps the dev server running continuously during development sessions. Agents interfering with the server causes disruption and wastes time.

### Testing URLs

When testing components, always use port 3005:

- Frontend pages: `http://localhost:3005/[page-slug]`
- Admin panel: `http://localhost:3005/admin`
- Registry components: `http://localhost:3005/r/[component-name]`
- Documentation: `http://localhost:3005/docs/[path]`

### CLI Testing

When testing shadcn CLI installations, always use port 3005:

```bash
npx shadcn@latest add http://localhost:3005/r/[component-name]
```

**NOT** `localhost:3001` or any other port.

### Browser Testing Protocol

When using Playwright or other browser automation:

```typescript
// ✅ CORRECT
await playwright_browser_navigate("http://localhost:3005");

// ❌ INCORRECT
await playwright_browser_navigate("http://localhost:3001");
```

### If Server is Down

If you detect the server is not running (connection refused, etc.):

1. **STOP what you're doing**
2. **Report to user**: "The dev server at localhost:3005 is not running. Please start it with `pnpm dev` so I can continue testing."
3. **WAIT for user** to start the server
4. **DO NOT run `pnpm dev` yourself**

### Server Check Example

```typescript
// If you need to verify the server is running:
try {
  const response = await fetch("http://localhost:3005");
  // Server is running
} catch (error) {
  // Server is NOT running - ask user to start it
  console.log("Please start the dev server: pnpm dev");
}
```

## Registry Configuration

### Registry Base URL

- **Local**: `http://localhost:3005/r/`
- **Production** (future): `https://uifoundry.com/r/`

### Registry Build Command

```bash
pnpm registry:build
```

This generates JSON files in `public/r/` directory.

## Build Commands

### Type Generation

```bash
pnpm payload:types
```

Generates PayloadCMS types in `src/payload-types.ts`.

### Type Checking

```bash
pnpm typecheck
```

Runs TypeScript type checking without building.

### Full Build

```bash
pnpm build
```

Generates types and builds the Next.js application.

## Common Ports Reference

| Service | Port | URL |
|---------|------|-----|
| Dev Server | 3005 | http://localhost:3005 |
| Payload Admin | 3005 | http://localhost:3005/admin |
| Registry | 3005 | http://localhost:3005/r/ |
| Documentation | 3005 | http://localhost:3005/docs |

## Project Scripts

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `pnpm dev` | Start dev server | **NEVER** - User manages this |
| `pnpm build` | Full build | After code changes, before commits |
| `pnpm typecheck` | Type check only | Quick validation |
| `pnpm payload:types` | Generate Payload types | After config changes |
| `pnpm registry:build` | Build registry | After registry changes |
| `pnpm lint` | Lint code | Before commits |
| `pnpm lint:fix` | Auto-fix lint issues | Fixing code style |

## Agent-Specific Notes

### @source-helper

- Test components at `localhost:3005` (not 3001)
- Assume server is running
- If server down, ask user to start it

### @registry-porter

- Use `localhost:3005/r/` for CLI testing
- Always build registry after changes: `pnpm registry:build`
- Assume server is running for testing

### @docs-writer

- Documentation site runs on `localhost:3005/docs`
- Preview components at `localhost:3005/docs/[path]`
- Assume server is running

### @frontend-verifier

- All browser tests use `localhost:3005`
- DO NOT start/stop server
- If server down, report to user immediately

### @implementation-verifier

- Verify at `localhost:3005`
- DO NOT manage server
- Report server issues to user

## Summary

**The Golden Rule**: Port 3005, always running, never touch it.

If you find yourself about to run `pnpm dev` or any server management command, **STOP** and ask the user instead.
