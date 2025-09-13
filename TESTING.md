# Testing with Playwright + SST Deployments

This project uses Playwright for end-to-end testing against live SST deployments.

## How It Works

1. **SST Console Autodeploy** handles deployment (configured in `sst.config.ts`)
2. **GitHub Actions** waits for deployment completion and runs tests
3. **Playwright tests** run against the live deployment URL

## Deployment URLs

Based on your SST configuration:

- **Production** (master branch): `https://uifoundry.dev`
- **Dev** (dev branch): `https://dev.uifoundry.dev`
- **PR environments**: Not yet configured (coming soon)
- **Personal stages**: `https://{branch-name}.uifoundry.dev`

## Workflows

### Unit Tests (`unit-tests.yml`)

Triggers on:

- Push to `master` or `dev` branches
- Pull requests to `master` or `dev`

**Process:**

1. Runs Vitest unit tests
2. Uploads test results and coverage
3. Provides fast feedback on code changes

### Automatic E2E Testing (`e2e-tests-on-deploy.yml`)

Triggers via repository dispatch:

- **After successful SST Console deployment completes**

**Process:**

1. **SST Console** runs unit tests and deploys
2. **SST Console** triggers GitHub Action via repository dispatch
3. **GitHub Action** runs immediately (no waiting needed!)
4. Runs Playwright E2E tests against confirmed fresh deployment
5. Uploads test artifacts

### Manual Testing (`manual-test.yml`)

For debugging and ad-hoc testing:

1. Go to **Actions** tab in GitHub
2. Select **Manual Playwright Test**
3. Click **Run workflow**
4. Enter deployment URL and browser choice
5. Run tests on-demand

## Local Testing

### Unit Tests

```bash
# Run unit tests
pnpm vitest

# Run unit tests in watch mode
pnpm vitest --watch

# Run unit tests once
pnpm vitest run
```

### E2E Tests

```bash
# Test against local dev server
pnpm dev
pnpm exec playwright test

# Test against specific deployment
NEXT_PUBLIC_BETTER_AUTH_URL=https://dev.uifoundry.dev pnpm exec playwright test

# Test specific browser
pnpm exec playwright test --project=chromium
```

### Documentation Tests

Tests all documentation pages automatically:

```bash
# Run docs tests specifically (recommended)
pnpm test:docs

# Run docs tests with automatic retries (for CI)
pnpm test:docs:retry

# Test docs against local server (ensure pnpm dev is running)
pnpm dev
pnpm test:docs
```

**What the docs tests verify:**

- All MDX files in `content/docs/` are discoverable
- Each docs page loads without 404 errors
- Pages have proper HTML structure (h1, main content)
- No server errors or redirect loops

**If docs tests fail:**

1. Ensure dev server is running: `pnpm dev`
2. Check server logs for errors
3. Verify no redirect loops on homepage
4. Test individual pages manually in browser

## SST Autodeploy Integration

The SST Console autodeploy workflow now includes:

1. **Unit tests run first** - deployment fails if tests fail
2. **Commit SHA injection** - enables deployment verification
3. **E2E tests after deployment** - comprehensive testing pipeline

## Test Configuration

### Unit Tests

- **Config**: `vitest.config.ts`
- **Setup**: `src/test/setup.ts`
- **Tests**: `src/**/*.{test,spec}.ts`

### E2E Tests

- **Config**: `playwright.config.ts`
- **Test environment**: `tests/test-env.ts`
- **Tests**: `tests/*.spec.ts`

## Artifacts

Test runs generate:

- **HTML Report**: `playwright-report/`
- **Screenshots**: `test-results/` (on failure)
- **Videos**: `test-results/` (on failure)
- **Traces**: Available for debugging

## Deployment Verification

The workflow uses **event-driven testing** to ensure tests run against the fresh deployment:

1. **SST Console** autodeploys the app and runs unit tests
2. **After successful deployment**, SST triggers GitHub repository dispatch
3. **GitHub Action** starts immediately with deployment metadata
4. **Tests run** against the confirmed fresh deployment (no waiting needed!)

## Troubleshooting

### E2E tests not triggering after deployment

- Check if `GITHUB_TOKEN` environment variable is set in SST Console
- Verify the GitHub token has `repo` permissions
- Check SST Console deployment logs for repository dispatch call
- Ensure the repository name is correct in SST config: `ianyimi/uifoundry`

### Tests fail immediately

- Check deployment URL accessibility manually
- Verify SSL certificates are working
- Check if the deployed application is functioning correctly

### Tests fail on specific environment

- Use manual workflow to test specific URLs
- Check browser compatibility
- Review test artifacts for debugging

### GitHub Actions permissions

- Ensure repo has Actions enabled
- Check that PR comments work (needs write permissions)

## Adding New Tests

1. Create test files in `tests/` directory
2. Use relative URLs: `await page.goto('/')`
3. Tests automatically run against deployed environments
4. Use `page.waitForLoadState("networkidle")` for SSR apps
