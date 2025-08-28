// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "UIFoundry",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-west-1",
        },
      },
    };
  },

  async run() {
    // Only import env in production to avoid NODE_ENV validation issues in dev
    const isProd = $app.stage === "production";

    // Skip env validation during SST builds
    process.env.SKIP_ENV_VALIDATION = "1";

    const bucket = new sst.aws.Bucket("uifoundry");

    const rootDomain = "uifoundry.dev";
    const domain = isProd ? rootDomain : `${$app.stage}.${rootDomain}`;

    const DATABASE_URI = new sst.Secret("DATABASE_URI");
    const NEXT_PUBLIC_BETTER_AUTH_URL = new sst.Secret(
      "NEXT_PUBLIC_BETTER_AUTH_URL",
    );
    const BETTER_AUTH_SECRET = new sst.Secret("BETTER_AUTH_SECRET");
    const GOOGLE_CLIENT_ID = new sst.Secret("GOOGLE_CLIENT_ID");
    const GOOGLE_CLIENT_SECRET = new sst.Secret("GOOGLE_CLIENT_SECRET");
    const PAYLOAD_SECRET = new sst.Secret("PAYLOAD_SECRET");
    const S3_BUCKET = new sst.Secret("S3_BUCKET");
    const S3_REGION = new sst.Secret("S3_REGION");
    const S3_ACCESS_KEY_ID = new sst.Secret("S3_ACCESS_KEY_ID");
    const S3_SECRET_ACCESS_KEY = new sst.Secret("S3_SECRET_ACCESS_KEY");

    const routerName = isProd ? "GlobalRouter" : "DevRouter";
    const router = new sst.aws.Router(routerName, {
      domain: {
        name: domain,
        redirects: isProd ? [`www.${domain}`] : [],
        dns: false,
        cert: "arn:aws:acm:us-east-1:194955053583:certificate/a8e84921-17e7-4568-8d6b-1f43a7d1e6af",
      },
    });

    new sst.aws.Nextjs("Frontend", {
      link: [
        bucket,
        DATABASE_URI,
        NEXT_PUBLIC_BETTER_AUTH_URL,
        BETTER_AUTH_SECRET,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        PAYLOAD_SECRET,
        S3_BUCKET,
        S3_REGION,
        S3_ACCESS_KEY_ID,
        S3_SECRET_ACCESS_KEY,
      ],
      router: {
        instance: router,
      },
      server: {
        install: ["sharp"],
        runtime: "nodejs22.x",
        timeout: "60 seconds",
      },
      permissions: [
        {
          actions: ["cloudfront:ListConnectionFunctions"],
          resources: ["*"],
        },
        {
          actions: ["lambda:GetLayerVersion"],
          resources: ["*"],
        },
      ],
      environment: {
        // NODE_ENV: process.env.NODE_ENV,
        DATABASE_URI: DATABASE_URI.value,
        NEXT_PUBLIC_BETTER_AUTH_URL: NEXT_PUBLIC_BETTER_AUTH_URL.value,
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID.value,
        GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET.value,
        PAYLOAD_SECRET: PAYLOAD_SECRET.value,
        S3_BUCKET: S3_BUCKET.value,
        S3_REGION: S3_REGION.value,
        S3_ACCESS_KEY_ID: S3_ACCESS_KEY_ID.value,
        S3_SECRET_ACCESS_KEY: S3_SECRET_ACCESS_KEY.value,
        // Build time for deployment verification
        BUILD_TIME: new Date().toISOString(),
      },
    });
  },

  console: {
    autodeploy: {
      target(event) {
        if (event.type === "branch" && event.action === "pushed") {
          if (event.branch === "master") {
            return { stage: "production" };
          }
          if (event.branch === "dev") {
            return { stage: "dev" };
          }
        }
      },
      runner: {
        engine: "codebuild",
        compute: "large", // Increased from medium for more memory (15GB)
        timeout: "30 minutes", // Increased timeout
        cache: {
          paths: ["node_modules", ".next/cache"],
        },
      },
      async workflow({ $, event }) {
        try {
          console.log("🚀 Starting SST deployment workflow...");

          // Install global dependencies including Bun (required for SST workflow execution)
          console.log("📦 Installing global dependencies...");
          await $`npm i -g pnpm`;

          // Install project dependencies
          console.log("📦 Installing project dependencies...");
          await $`pnpm i`;

          // Set build time environment variable for deployment verification
          process.env.BUILD_TIME = new Date().toISOString();

          // Increase Node.js memory for build process to handle Next.js 15 + PayloadCMS
          process.env.NODE_OPTIONS = "--max-old-space-size=4096";

          if (event.action === "removed") {
            console.log("🗑️ Removing deployment...");
            await $`pnpm sst remove`;
          } else {
            // Run unit tests before deployment
            console.log("🧪 Running unit tests...");
            await $`pnpm vitest run`;

            console.log("✅ Tests passed! Deploying...");
            await $`pnpm sst deploy`;

            console.log("🎉 Deployment complete! Triggering E2E tests...");

            // Trigger GitHub Action via GitHub CLI after successful deployment
            try {
              let stage = "local";
              if (event.type === "branch") {
                switch (event.branch) {
                  case "master":
                    stage = "production";
                    break;
                  case "dev":
                    stage = "dev";
                    break;
                  default:
                    stage = event.branch;
                }
              }
              const branchRef =
                event.type === "branch"
                  ? event.branch
                  : event.type === "pull_request"
                    ? event.head
                    : "dev";
              const owner = "ianyimi";
              const repo = "uifoundry";

              // Ensure gh CLI is available (Amazon Linux via yum)
              await $`yum install -y yum-utils`;
              await $`yum-config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo`;
              await $`yum install -y gh`;
              // Resolve workflow id from default branch to avoid 404s
              const wfIdText =
                await $`env GH_TOKEN=${process.env.GITHUB_TOKEN ?? ""} gh api repos/${owner}/${repo}/actions/workflows --jq '.workflows[] | select(.path == ".github/workflows/e2e-tests-on-deploy.yml") | .id'`.text();
              const workflowId = wfIdText.trim();
              if (!workflowId) {
                console.warn(
                  "⚠️  Workflow not found on default branch: .github/workflows/e2e-tests-on-deploy.yml. Ensure it is committed to the default branch.",
                );
              } else {
                // Trigger workflow_dispatch with inputs via GH API
                await $`env GH_TOKEN=${process.env.GITHUB_TOKEN ?? ""} gh api --method POST repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches -f ref=${branchRef} -f inputs[stage]=${stage} -f inputs[commit]=${event.commit?.id ?? "unknown"} -f inputs[branch]=${branchRef}`;
                // Fetch the latest workflow_dispatch run id for this branch
                const runsJson =
                  await $`env GH_TOKEN=${process.env.GITHUB_TOKEN ?? ""} gh run list --branch ${branchRef} --event workflow_dispatch --limit 1 --json databaseId`.text();
                let runId = "";
                try {
                  runId =
                    JSON.parse(runsJson)?.[0]?.databaseId?.toString() ?? "";
                } catch {}
                if (runId) {
                  console.log(
                    `✅ E2E tests triggered: https://github.com/${owner}/${repo}/actions/runs/${runId}`,
                  );
                } else {
                  console.log(
                    `✅ E2E tests triggered. View runs: https://github.com/${owner}/${repo}/actions/workflows/e2e-tests-on-deploy.yml`,
                  );
                }
              }
            } catch (triggerError) {
              console.warn("⚠️  Failed to trigger E2E tests:", triggerError);
              // Don't fail the deployment if GitHub trigger fails
            }
          }
        } catch (error) {
          console.error("❌ Workflow failed:", error);
          throw error; // Let SST handle the exit
        }
      },
    },
  },
});
