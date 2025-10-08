# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-09-23-github-actions-sst-migration/spec.md

## Implementation Guidelines

Follow these agent documentation standards:

- @.agent-os/standards/code-style.md
- @.agent-os/standards/best-practices.md

## Technical Requirements

- GitHub Actions workflow `deploy.yml`
  - Triggers: push to `dev`, `master`; manual dispatch with optional stage override
  - Concurrency: per-branch group to avoid overlapping deploys
  - Node 22, pnpm@10, cache pnpm, `pnpm install --frozen-lockfile`
  - Pre-deploy checks: `pnpm check`, `pnpm vitest run`
  - Stage resolution: `master → production`, `dev → dev`, else default to `dev` unless manually overridden
  - Configure AWS OIDC via `aws-actions/configure-aws-credentials@v4`
  - Assume role from secret `AWS_ROLE_TO_ASSUME` (stored in repo/org GitHub secrets)
  - Deploy using `pnpm sst deploy --stage <stage>` with `NODE_OPTIONS=--max-old-space-size=4096`
  - On success, call reusable workflow `.github/workflows/e2e-tests.yml` with inputs (stage, commit, branch)

- Reusable E2E workflow adjustments
  - Add `workflow_call` inputs for `stage`, `commit`, `branch`
  - Determine deployment URL: `production → https://uifoundry.dev`, else `https://<stage>.uifoundry.dev`
  - Install Playwright browsers; run `pnpm test` with `NEXT_PUBLIC_BETTER_AUTH_URL` set to deployment URL
  - Upload Playwright artifacts

- SST configuration alignment
  - Stop relying on `console.autodeploy.runner.engine=codebuild`
  - Remove CodeBuild-specific install/gh trigger logic from `console.autodeploy.workflow`
  - Keep `sst.config.ts` app/resource definitions intact

- AWS account prerequisites (new Organization account)
  - Configure GitHub OIDC provider in target AWS account (once per account)
  - Create IAM role `GitHubActionsSSTDeploy` with trust policy for repo `OWNER/REPO` on branches `dev`,`master` and workflow `deploy.yml`
  - Attach minimal permissions for SST deploy (CloudFormation, IAM PassRole as needed, Lambda, S3, CloudFront, Route53 if used, Secrets Manager for `sst secret` reads if applicable)
  - Store the role ARN in GitHub secret `AWS_ROLE_TO_ASSUME`

- Secrets and environment
  - Continue to use `sst secret set` managed secrets for runtime
  - No static credentials in GitHub; only role assumption via OIDC

## External Dependencies

- GitHub-hosted runner images; no new npm dependencies required
- `aws-actions/configure-aws-credentials@v4` (official)

## Task Breakdown

- Create `.github/workflows/deploy.yml` with OIDC, stage inference, pre-checks, SST deploy, and reusable E2E call.
- Update `.github/workflows/e2e-tests.yml` to support `workflow_call` and keep repository/dispatch inputs for manual use.
- Provision AWS OIDC provider in target account and IAM role `GitHubActionsSSTDeploy` with least-privilege policy; save role ARN as `AWS_ROLE_TO_ASSUME` secret.
- Remove CodeBuild coupling from `sst.config.ts` by disabling `console.autodeploy` block or stripping runner/workflow code; document migration.
- Validate by pushing to `dev` and confirming deploy + post-deploy tests; repeat for `master`.
- Document runbook in `README.md` (deploy section) and update roadmap checkboxes.
