// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "UIFoundry",
			removal: "remove",
			// removal: input?.stage === "production" ? "retain" : "remove",
			protect: ["production"].includes(input?.stage),
			home: "aws",
		};
	},
	async run() {
		const { env } = await import("./src/env.mjs")
		const bucket = new sst.aws.Bucket("uifoundry")

		const domain = $app.stage === "production" ? "uifoundry.dev" : `${$app.stage}.uifoundry.dev`

		// const DATABASE_URI = new sst.Secret("DATABASE_URI")
		// const NEXT_PUBLIC_BETTER_AUTH_URL = new sst.Secret("NEXT_PUBLIC_BETTER_AUTH_URL")
		// const BETTER_AUTH_SECRET = new sst.Secret("BETTER_AUTH_SECRET")
		// const GOOGLE_CLIENT_ID = new sst.Secret("GOOGLE_CLIENT_ID")
		// const GOOGLE_CLIENT_SECRET = new sst.Secret("GOOGLE_CLIENT_SECRET")
		// const PAYLOAD_SECRET = new sst.Secret("PAYLOAD_SECRET")
		// const S3_BUCKET = new sst.Secret("S3_BUCKET")
		// const S3_REGION = new sst.Secret("S3_REGION")
		// const S3_ACCESS_KEY_ID = new sst.Secret("S3_ACCESS_KEY_ID")
		// const S3_SECRET_ACCESS_KEY = new sst.Secret("S3_SECRET_ACCESS_KEY")
		const router = new sst.aws.Router("Router", {
			domain: {
				name: domain,
				redirects: [`www.${domain}`],
				cert: "arn:aws:acm:us-east-1:194955053583:certificate/a8e84921-17e7-4568-8d6b-1f43a7d1e6af"
			}
		})

		new sst.aws.Nextjs("Frontend", {
			link: [
				bucket,
			],
			router: {
				instance: router
			},
			server: {
				runtime: "nodejs22.x",
				layers: ["arn:aws:lambda:us-west-1:194955053583:layer:sharp:1"],
			},
			permissions: [
				{
					actions: ["lambda:GetLayerVersion"],
					resources: ["*"]
				}
			],
			environment: {
				BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
				NEXT_PUBLIC_BETTER_AUTH_URL: `https://${domain}`,
				GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
				GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
				PAYLOAD_SECRET: env.PAYLOAD_SECRET,
				S3_BUCKET: env.S3_BUCKET,
				S3_REGION: env.S3_REGION,
				S3_ACCESS_KEY_ID: env.S3_ACCESS_KEY_ID,
				S3_SECRET_ACCESS_KEY: env.S3_SECRET_ACCESS_KEY,
			}
		});
	},
});
