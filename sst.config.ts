// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		const isProd = input.stage === "production";
		return {
			name: "UIFoundry",
			removal: isProd ? "retain" : "remove",
			protect: ["production"].includes(input?.stage),
			home: "aws",
			providers: {
				aws: {
					region: "us-west-1",
					profile: process.env.GITHUB_ACTIONS
						? undefined
						: isProd
							? "uifoundry-production"
							: "uifoundry-dev",
				},
			},
		};
	},

	async run() {
		// Only import env in production to avoid NODE_ENV validation issues in dev
		const isProd = $app.stage === "production";

		// Skip env validation during SST builds
		process.env.SKIP_ENV_VALIDATION = "1";

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
		const DOMAIN_CERT_ARN = new sst.Secret("DOMAIN_CERT_ARN");
		const STRIPE_SECRET_KEY = new sst.Secret("STRIPE_SECRET_KEY");
		const STRIPE_WEBHOOK_SECRET = new sst.Secret("STRIPE_WEBHOOK_SECRET");

		const router = new sst.aws.Router("GlobalRouter", {
			domain: {
				name: domain,
				redirects: isProd ? [`www.${domain}`] : [],
				dns: false,
				cert: DOMAIN_CERT_ARN.value,
			},
		});

		const bucket = new sst.aws.Bucket("bucket-uifoundry-media", {
			access: "cloudfront",
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
				STRIPE_SECRET_KEY,
				STRIPE_WEBHOOK_SECRET,
			],
			router: {
				instance: router,
			},
			server: {
				install: ["sharp"],
				runtime: "nodejs22.x",
				timeout: "60 seconds",
			},
			warm: isProd ? 1 : 0,
			permissions: [
				{
					actions: ["cloudfront:ListConnectionFunctions"],
					resources: ["*"],
				},
				{
					actions: ["lambda:GetLayerVersion"],
					resources: ["*"],
				},
				{
					actions: [
						"s3:GetObject",
						"s3:PutObject",
						"s3:DeleteObject",
						"s3:ListBucket",
					],
					resources: [bucket.arn, $interpolate`${bucket.arn}/*`],
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
				STRIPE_SECRET_KEY: STRIPE_SECRET_KEY.value,
				STRIPE_WEBHOOK_SECRET: STRIPE_WEBHOOK_SECRET.value,
				// Build time for deployment verification
				BUILD_TIME: new Date().toISOString(),
			},
		});

		return {
			bucketName: bucket.name,
		};
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

						console.log("✅ Unit tests passed! Deploying...");
						await $`pnpm sst deploy`;
					}
				} catch (error) {
					console.error("❌ Workflow failed:", error);
					throw error; // Let SST handle the exit
				}
			},
		},
	},
});
