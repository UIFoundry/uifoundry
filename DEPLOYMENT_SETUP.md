# Event-Driven E2E Testing Setup

## ✅ Implementation Complete

The codebase has been updated to trigger E2E tests immediately after successful SST deployments using GitHub repository dispatch events.

## 🔧 Required Setup Steps

### 1. GitHub Personal Access Token

Create a GitHub Personal Access Token with `repo` permissions:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scopes: `repo` (full repository access)
4. Copy the generated token

### 2. Add GitHub Token to SST Console

Add the GitHub token as an environment variable in SST Console:

1. Go to SST Console → Your App → Settings → Autodeploy
2. Add environment variable:
   - **Name**: `GH_AUTH_TOKEN`
   - **Value**: [Your GitHub token from step 1]

### 3. Verify Repository Details

Ensure the repository name in `sst.config.ts` matches your actual repo:

- Current: `ianyimi/uifoundry`
- Update if different: `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`

## 🚀 How It Works

### New Workflow:

1. **Push to dev/master** → SST Console autodeploy starts
2. **Unit tests run first** in SST Console (deployment fails if tests fail)
3. **Deployment completes** → SST triggers GitHub repository dispatch
4. **E2E tests start immediately** → No waiting, no polling, no timeouts
5. **Results available** → Fast feedback on fresh deployment

### Changes Made:

#### SST Configuration (`sst.config.ts`):

- ✅ **Repository dispatch trigger** after successful deployment
- ✅ **Increased compute**: `large` (15GB RAM) vs `medium` (7GB)
- ✅ **Increased timeout**: 30 minutes vs 20 minutes
- ✅ **Memory optimization**: Node.js `--max-old-space-size=4096`
- ✅ **Build caching**: `node_modules` and `.next/cache`
- ✅ **Error handling**: GitHub trigger failure won't fail deployment

#### GitHub Workflows:

- ✅ **New**: `e2e-tests-on-deploy.yml` (triggered by repository dispatch)
- ✅ **New**: `unit-tests.yml` (runs on push/PR for CI feedback)
- ✅ **Disabled**: `test-after-deploy.yml` (old waiting-based approach)

#### Dependencies:

- ✅ **Added**: `bun` as dev dependency (required by SST workflow)
- ✅ **Added**: `.node-version` file (specifies Node.js 22)

## 📊 Benefits

✅ **Zero waiting time** - Tests start immediately after deployment  
✅ **No wasted compute** - No polling or timeout logic  
✅ **Guaranteed fresh deployment** - Event-driven, not time-based  
✅ **Better memory handling** - Larger compute + optimized Node.js memory  
✅ **Comprehensive CI** - Unit tests on every push/PR + E2E on deploy  
✅ **Clear separation** - Deploy failures vs test failures are distinct

## 🧪 Testing the Setup

### Test Repository Dispatch Manually:

```bash
curl -X POST \
  -H "Authorization: token YOUR_GH_AUTH_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/ianyimi/uifoundry/dispatches \
  -d '{"event_type":"deployment_complete","client_payload":{"stage":"dev","commit":"test","branch":"dev"}}'
```

This should trigger the E2E workflow immediately.

### Monitor Deployment:

1. Push to `dev` branch
2. Check SST Console logs for "✅ E2E tests triggered successfully!"
3. Check GitHub Actions for the triggered E2E workflow
4. E2E tests should start within seconds of deployment completion

## 🔍 Troubleshooting

- **Repository dispatch fails**: Check GitHub token permissions and repo name
- **Memory issues**: Monitor SST Console logs, may need `xlarge` compute
- **Unit tests fail**: Check SST Console deployment logs
- **E2E tests don't start**: Verify GH_AUTH_TOKEN environment variable in SST Console

The setup is now fully event-driven and eliminates all timing-related issues!
