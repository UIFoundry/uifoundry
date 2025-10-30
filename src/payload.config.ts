import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { redisCache } from "payloadcms-redis-plugin";
import { fileURLToPath } from "url";

import { env } from "~/env.mjs";
import { seedDatabase } from "~/payload/seed";

import { collections } from "./payload/collections";
import {
	allowedOrigins,
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
	COLLECTION_SLUG_THEMES,
	COLLECTION_SLUG_USERS,
	GLOBAL_SLUG_FOOTER,
	GLOBAL_SLUG_HEADER,
} from "./payload/constants";
import { globals } from "./payload/globals";
// import sharp from "sharp"

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	telemetry: false,
	// If you'd like to use Rich Text, pass your editor here
	admin: {
		components: {
			actions: ["~/payload/components/VisitSite"],
		},
		importMap: {
			baseDir: path.resolve(dirname),
		},
		livePreview: {
			collections: [COLLECTION_SLUG_PAGES],
			url: env.NEXT_PUBLIC_BETTER_AUTH_URL,
		},
		user: COLLECTION_SLUG_USERS,
	},
	editor: lexicalEditor(),
	onInit: seedDatabase,

	// Define and configure your collections in this array
	collections,
	globals,

	cors: allowedOrigins,
	csrf: allowedOrigins,
	serverURL: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}`,

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: env.PAYLOAD_SECRET ?? "",
	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		allowIDOnCreate: true,
		transactionOptions: false,
		url: env.DATABASE_URI ?? "",
	}),

	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!
	// sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},

	plugins: [
		s3Storage({
			bucket: env.S3_BUCKET,
			collections: {
				media: true,
			},
			config: {
				credentials: {
					accessKeyId: env.S3_ACCESS_KEY_ID,
					secretAccessKey: env.S3_SECRET_ACCESS_KEY,
				},
				region: env.S3_REGION,
			},
		}),

		redisCache({
			collections: {
				[COLLECTION_SLUG_PAGES]: true,
				[COLLECTION_SLUG_SITES]: {
					versions: true,
				},
				[COLLECTION_SLUG_THEMES]: {
					versions: true,
				},
				[COLLECTION_SLUG_USERS]: true,
			},
			debug: env.NODE_ENV !== "production", // Set to true when debugging cache issues
			defaultCacheOptions: {
				keyPrefix: "uifoundry",
				ttl: 300,
			},
			globals: {
				[GLOBAL_SLUG_FOOTER]: true,
				[GLOBAL_SLUG_HEADER]: true,
			},
			redis: {
				url: env.REDIS_URL,
			},
		}),
	],
});
