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

### Automatic E2E Testing (`test-after-deploy.yml`)

Triggers automatically on:

- Push to `master` or `dev` branches

**Process:**

1. Runs unit tests first
2. Detects deployment URL based on branch
3. Waits up to 20 minutes for correct deployment version (using commit SHA verification)
4. Runs Playwright E2E tests against live deployment with verified version
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

The workflow uses **commit SHA verification** to ensure tests run against the correct deployment:

1. **SST deployment** injects `COMMIT_SHA` environment variable
2. **API endpoint** `/api/version` exposes deployment info
3. **GitHub Action** polls this endpoint until commit SHAs match
4. **Tests run** only after correct version is confirmed deployed

## Troubleshooting

### Tests timeout waiting for deployment

- Check SST Console for deployment status
- Verify `/api/version` endpoint is accessible
- Check if commit SHA is being injected correctly
- Verify domain SSL certificates are valid
- Increase timeout in workflow if needed (currently 20 minutes)

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
