import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { env } from "~/env.mjs";
import { collections } from "./payload/collections";
import { COLLECTION_SLUG_USERS } from "./payload/constants";
import path from "path";
import { fileURLToPath } from "url";
import { COLLECTION_SLUG_PAGES } from "./payload/constants";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [env.NEXT_PUBLIC_BETTER_AUTH_URL].filter(Boolean)

export default buildConfig({
	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),
	admin: {
		user: COLLECTION_SLUG_USERS,
		importMap: {
			baseDir: path.resolve(dirname)
		},
		livePreview: {
			url: env.NEXT_PUBLIC_BETTER_AUTH_URL,
			collections: [COLLECTION_SLUG_PAGES]
		}
	},

	// Define and configure your collections in this array
	collections: collections,

	cors: allowedOrigins,
	csrf: allowedOrigins,
	serverURL: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}`,

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: env.PAYLOAD_SECRET || "",
	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		url: env.DATABASE_URI || "",
	}),

	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts')
	},

	plugins: [],
});
