---
description: Common Pre-Flight Steps for Agent OS Instructions
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Pre-Flight Rules

## CRITICAL RESTRICTIONS

- **NEVER DEPLOY**: Never run deployment commands (`sst deploy`, `pnpm deploy:dev`, `pnpm deploy:prod`)
- **NEVER PUSH**: Never push changes to git repositories (`git push`, creating pull requests, merging branches)
- **NEVER COMMIT**: Never commit changes (`git commit`) unless explicitly requested by user
- **NEVER INSTALL GLOBAL PACKAGES**: Never run global package installations that could affect system
- **ASK BEFORE MAJOR CHANGES**: Always confirm before running commands that modify infrastructure or deployment state

## Workflow Rules

- IMPORTANT: For any step that specifies a subagent in the subagent="" XML attribute you MUST use the specified subagent to perform the instructions for that step.

- Process XML blocks sequentially

- Read and execute every numbered step in the process_flow EXACTLY as the instructions specify.

- If you need clarification on any details of your current task, stop and ask the user specific numbered questions and then continue once you have all of the information you need.

- Use exact templates as provided
