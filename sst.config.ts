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
      async workflow({ event }) {
        // Use Node.js child_process instead of Bun Shell to avoid dependency issues
        const { execSync } = await import("child_process");

        try {
          console.log("🚀 Starting SST deployment workflow...");

          // Install dependencies
          console.log("📦 Installing dependencies...");
          execSync("npm i -g pnpm", { stdio: "inherit" });
          execSync("pnpm i", { stdio: "inherit" });

          // Set build time environment variable for deployment verification
          process.env.BUILD_TIME = new Date().toISOString();

          if (event.action === "removed") {
            console.log("🗑️ Removing deployment...");
            execSync("pnpm sst remove", { stdio: "inherit" });
          } else {
            // Run unit tests before deployment
            console.log("🧪 Running unit tests...");
            execSync("pnpm vitest run", { stdio: "inherit" });

            console.log("✅ Tests passed! Deploying...");
            execSync("pnpm sst deploy", { stdio: "inherit" });

            console.log("🎉 Deployment complete!");
          }
        } catch (error) {
          console.error("❌ Workflow failed:", error);
          process.exit(1);
        }
      },
    },
  },
});
