// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "dev",
			removal: "remove",
			// removal: input?.stage === "production" ? "retain" : "remove",
			protect: ["production"].includes(input?.stage),
			home: "aws",
		};
	},
	async run() {
		const { env } = await import("./src/env.mjs")
		const bucket = new sst.aws.Bucket("markitect")

		const domain = $app.stage === "production" ? "markitect.us" : `${$app.stage}.markitect.us`

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

		new sst.aws.Nextjs("MarkitectFrontend", {
			link: [
				bucket,
			],
			server: {
				runtime: "nodejs22.x",
				// layers: ["arn:aws:lambda:us-west-1:634166935893:layer:sharp:1"]
			},
			// permissions: [
			// 	{
			// 		actions: ["lambda:GetLayerVersion"],
			// 		resources: ["*"]
			// 	}
			// ],
			environment: {
				BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
				NEXT_PUBLIC_BETTER_AUTH_URL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
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
