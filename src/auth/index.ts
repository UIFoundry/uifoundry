import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { customSession } from "better-auth/plugins";
import { MongoClient } from "mongodb";

import { env } from "~/env.mjs";
import {
	allowedOrigins,
	COLLECTION_SLUG_ACCOUNTS,
	COLLECTION_SLUG_SESSIONS,
	COLLECTION_SLUG_USERS, COLLECTION_SLUG_VERIFICATIONS 
} from "~/payload/constants";
import { getPayload } from "~/payload/utils";

import { betterAuthPlugins } from "./config";
import { USER_ROLES } from "./permissions";

const client = new MongoClient(env.DATABASE_URI);
const db = client.db();

export const auth = betterAuth({
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			enabled: true,
		},
	},
	account: {
		modelName: COLLECTION_SLUG_ACCOUNTS,
	},
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	database: mongodbAdapter(db),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		...(betterAuthPlugins ?? []),
		customSession(async ({ session, user }) => {
			const payload = await getPayload();
			const existingUser = await payload.findByID({
				id: user.id,
				collection: COLLECTION_SLUG_USERS,
			});

			let userRole = existingUser.role ?? USER_ROLES.user;
			if (
				user.email.endsWith("@uifoundry.dev") &&
				(!existingUser || existingUser.role === USER_ROLES.user)
			) {
				userRole = USER_ROLES.admin;
			}

			return {
				session,
				user: {
					...user,
					banExpiresIn: existingUser.banExpiresIn ?? undefined,
					banned: existingUser.banned,
					banReason: existingUser.banReason ?? undefined,
					role: userRole,
				},
			};
		}),
	],
	secret: env.BETTER_AUTH_SECRET,
	session: {
		modelName: COLLECTION_SLUG_SESSIONS,
	},
	trustedOrigins: allowedOrigins,
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: USER_ROLES.user,
				input: false,
				required: true,
			},
		},
		modelName: COLLECTION_SLUG_USERS,
	},
	verification: {
		modelName: COLLECTION_SLUG_VERIFICATIONS,
	},
});
