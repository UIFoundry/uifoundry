# Spec Requirements Document

> Spec: GitHub Actions SST Migration
> Created: 2025-09-23

## Relevant Agent Documentation

For implementing this spec, refer to these agent docs:

- @.agent-os/instructions/core/create-spec.md
- @.agent-os/instructions/core/execute-tasks.md
- @.agent-os/standards/best-practices.md
- @.agent-os/standards/code-style.md

## Overview

Migrate deployments from AWS CodeBuild-based SST Autodeploy to GitHub Actions using AWS OIDC, centralizing CI/CD and aligning with the new AWS Organization account. This provides explicit pre-deploy checks and automated post-deploy E2E tests per stage.

## User Stories

### Centralized CI/CD with least-privilege access

As a maintainer, I want deployments to run in GitHub Actions assuming an AWS role via OIDC, so that I can remove CodeBuild and manage pipelines and permissions from GitHub.

Detailed workflow: On push to `dev` or `master`, GitHub Actions runs checks, assumes the AWS role in the new org account, deploys with `sst deploy`, and surfaces status in GitHub.

### Stage-aware deploy and automated verification

As a developer, I want pre-deploy lint/typecheck/tests and post-deploy Playwright verification to run automatically, so that regressions are caught before and after deployment.

Detailed workflow: The deploy job infers stage from branch (dev/master) or manual input, then reuses the `e2e-tests` workflow for post-deploy checks against the stage URL.

### Organization account alignment and decommissioning

As an infra admin, I want the pipeline to target the new AWS Organization account with proper IAM roles/secrets, and decommission CodeBuild usage, so that infrastructure is consolidated under the LLC account.

Detailed workflow: Create an AWS IAM role with OIDC trust for this repo/branches, store its ARN in GitHub secrets, and remove SST autodeploy/CodeBuild runner config.

## Spec Scope

1. **Deploy workflow** - GitHub Actions workflow using AWS OIDC + `sst deploy`.
2. **Pre-deploy checks** - `pnpm check` (lint+types) and `pnpm vitest run` before deploy.
3. **Post-deploy tests** - Reusable `e2e-tests` workflow invoked after deploy.
4. **Stage inference** - Map `master→production`, `dev→dev`, manual override via inputs.
5. **AWS setup** - OIDC provider + IAM role in new org; secret `AWS_ROLE_TO_ASSUME` in GitHub.
6. **Decommission CodeBuild** - Remove SST `console.autodeploy`/CodeBuild runner and GH CLI trigger code.

## Expected Deliverable

1. Push to `dev` deploys to `https://dev.uifoundry.dev` and runs post-deploy E2E tests.
2. Push to `master` deploys to `https://uifoundry.dev` and runs post-deploy E2E tests.
3. Manual dispatch supports stage override and successfully deploys and verifies with E2E.
