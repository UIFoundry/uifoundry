---
description: Critical restrictions that MUST be followed by all agents
priority: HIGHEST
alwaysRead: true
version: 1.0
encoding: UTF-8
---

# Critical Agent Restrictions

## DEPLOYMENT RESTRICTIONS

**NEVER run deployment commands:**

- `sst deploy` (any stage)
- `pnpm deploy:dev`
- `pnpm deploy:prod`
- `pnpm sst deploy`
- Any command that triggers AWS resource changes

**Why:** Deployment affects live environments and should only be controlled by the user through their established workflow.

## GIT RESTRICTIONS

**NEVER push to remote repositories:**

- `git push` (any branch)
- Creating pull requests via GitHub CLI
- Merging branches
- Publishing releases

**NEVER commit without explicit request:**

- `git commit` (unless user explicitly asks for a commit)
- `git add` + `git commit` workflows
- Automated committing of changes

**Why:** Git operations affect the shared codebase and deployment triggers. User controls when changes go to remote.

## INSTALLATION RESTRICTIONS

**NEVER install global packages:**

- `npm install -g <package>`
- `pnpm add -g <package>`
- `yarn global add <package>`
- System-wide dependency installations

**Why:** Global installations can affect the user's system configuration and other projects.

## INFRASTRUCTURE RESTRICTIONS

**NEVER modify infrastructure:**

- Setting SST secrets (`sst secret set`)
- Modifying AWS resources directly
- Changing environment variables in deployed environments
- Running infrastructure provisioning commands

**Why:** Infrastructure changes can break production systems and affect billing.

## SAFE OPERATIONS

**These are always safe to run:**

- `pnpm dev` - Local development server
- `pnpm build` - Local builds
- `pnpm typecheck` - TypeScript checking
- `pnpm lint` - Code linting
- `pnpm vitest` - Unit tests
- `pnpm test` - E2E tests (if localhost:3001 is running)
- File operations (read, write, edit)
- Code analysis and suggestions

## CONFIRMATION REQUIRED

**Always ask user before:**

- Any command that could affect deployed environments
- Operations that modify system-wide configuration
- Installing new dependencies (even locally, if they're major additions)
- Significant architectural changes

## EMERGENCY PROTOCOL

If you accidentally run a restricted command:

1. Immediately inform the user what happened
2. Provide details about what the command did
3. Suggest how to verify/rollback if needed
4. Learn from the incident to prevent future occurrences

## COMPLIANCE

- All agents must read this file as part of pre-flight checks
- Violations of these restrictions are serious issues
- When in doubt, ask the user for permission
- Better to be overly cautious than cause deployment issues

**Remember:** The user has an established workflow for deployments and git operations. Our job is to help with development, not to interfere with their deployment pipeline.
