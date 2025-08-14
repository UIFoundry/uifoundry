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
					region: "us-west-1"
				}
			}
		};
	},
	async run() {
		// Only import env in production to avoid NODE_ENV validation issues in dev
		const isProd = $app.stage === "production"
		const isDev = $app.stage === "dev"
		const isPersonal = !isProd && !isDev
		
		// Set NODE_ENV before importing env.mjs to pass validation
		if (isProd) {
			process.env.NODE_ENV = "production"
		}
		
		const env = isProd ? (await import("./src/env.mjs")).env : null
		const bucket = new sst.aws.Bucket("uifoundry")
		const isTest = $app.stage !== env?.NODE_ENV === "test"

		const domain = isProd ? "uifoundry.dev" : `${$app.stage}.uifoundry.dev`

		const DATABASE_URI = new sst.Secret("DATABASE_URI")
		const NEXT_PUBLIC_BETTER_AUTH_URL = new sst.Secret("NEXT_PUBLIC_BETTER_AUTH_URL")
		const BETTER_AUTH_SECRET = new sst.Secret("BETTER_AUTH_SECRET")
		const GOOGLE_CLIENT_ID = new sst.Secret("GOOGLE_CLIENT_ID")
		const GOOGLE_CLIENT_SECRET = new sst.Secret("GOOGLE_CLIENT_SECRET")
		const PAYLOAD_SECRET = new sst.Secret("PAYLOAD_SECRET")
		const S3_BUCKET = new sst.Secret("S3_BUCKET")
		const S3_REGION = new sst.Secret("S3_REGION")
		const S3_ACCESS_KEY_ID = new sst.Secret("S3_ACCESS_KEY_ID")
		const S3_SECRET_ACCESS_KEY = new sst.Secret("S3_SECRET_ACCESS_KEY")

		const router = new sst.aws.Router("GlobalRouter", {
			domain: {
				name: domain,
				aliases: [`*.${domain}`],
				redirects: [`www.${domain}`],
				dns: false,
				cert: "arn:aws:acm:us-east-1:194955053583:certificate/a8e84921-17e7-4568-8d6b-1f43a7d1e6af"
			},
		})

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
				S3_SECRET_ACCESS_KEY
			],
			router: {
				instance: router
			},
			server: {
				install: ["sharp"],
				runtime: "nodejs22.x",
				timeout: "60 seconds",
				// layers: ["arn:aws:lambda:us-west-1:194955053583:layer:sharp:1"],
			},
			permissions: [
				{
					actions: ["cloudfront:ListConnectionFunctions"],
					resources: ["*"]
				},
				{
					actions: ["lambda:GetLayerVersion"],
					resources: ["*"]
				}
			],
			environment: {
				NODE_ENV: isPersonal ? "test" : $app.stage,
				DATABASE_URI: DATABASE_URI.value,
				NEXT_PUBLIC_BETTER_AUTH_URL: NEXT_PUBLIC_BETTER_AUTH_URL.value,
				BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
				GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID.value,
				GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET.value,
				PAYLOAD_SECRET: PAYLOAD_SECRET.value,
				S3_BUCKET: S3_BUCKET.value,
				S3_REGION: S3_REGION.value,
				S3_ACCESS_KEY_ID: S3_ACCESS_KEY_ID.value,
				S3_SECRET_ACCESS_KEY: S3_SECRET_ACCESS_KEY.value
			}
		});
	},
	console: {
		autodeploy: {
			target(event) {
				if (event.type === "branch" && event.action === "pushed") {
					if (event.branch === "master") {
						return { stage: "production" }
					}
					if (event.branch === "dev") {
						return { stage: "dev" }
					}
				}
			}
		}
	}
});
