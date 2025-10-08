import {
	type AccessArgs,
	type AuthStrategyResult,
	type CollectionConfig,
} from "payload";
import { COLLECTION_SLUG_USERS } from "~/payload/constants";
import selectEnumField from "~/payload/fields/selectEnumField/config";
import { auth } from "~/auth";
import { USER_ROLES, hasPermission } from "~/auth/permissions";
import type { User } from "~/payload-types";
import { LIFETIME_PLANS } from "~/utils/stripe";

export const Users: CollectionConfig = {
	slug: COLLECTION_SLUG_USERS,
	admin: {
		hidden: () => false,
		useAsTitle: "name",
		defaultColumns: ["id", "name", "email", "role", "image"],
	},
	access: {
		create: ({ req: { user } }: AccessArgs<User>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_USERS,
				action: "create",
			});
		},
		read: ({ req: { user }, data }: AccessArgs<User>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_USERS,
				action: "read",
				data,
			});
		},
		update: ({ req: { user }, data }: AccessArgs<User>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_USERS,
				action: "update",
				data,
			});
		},
		delete: ({ req: { user }, data }: AccessArgs<User>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_USERS,
				action: "delete",
				data,
			});
		},
	},
	auth: {
		disableLocalStrategy: true,
		useSessions: false,
		strategies: [
			{
				name: "better-auth",
				authenticate: async ({ headers, payload }) => {
					try {
						const userSession = await auth.api.getSession({ headers });

						if (!userSession?.user) return { user: null };

						const userData = await payload.findByID({
							collection: COLLECTION_SLUG_USERS,
							id: userSession?.user?.id,
						});

						return {
							user: {
								...userData,
								collection: COLLECTION_SLUG_USERS,
							},
						} as AuthStrategyResult;
					} catch (err) {
						payload.logger.error(err);
						return { user: null };
					}
				},
			},
		],
	},
	endpoints: [
		{
			path: "/logout",
			method: "post",
			handler: async (req) => {
				await auth.api.signOut({
					headers: req.headers,
				});
				return Response.json(
					{
						message: "Token revoked successfully",
					},
					{
						status: 200,
						headers: req.headers,
					},
				);
			},
		},
	],
	fields: [
		{
			name: "email",
			type: "email",
			required: true,
			unique: true,
		},
		{
			name: "emailVerified",
			type: "checkbox",
			required: true,
			defaultValue: false,
		},
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "image",
			type: "text",
		},
		selectEnumField(USER_ROLES, {
			name: "role",
			required: true,
			defaultValue: USER_ROLES.user,
		}),
		{
			name: "banned",
			label: "Banned",
			type: "checkbox",
			required: true,
			defaultValue: false,
		},
		{
			name: "banReason",
			label: "Ban Reason",
			type: "text",
		},
		{
			name: "banExpiresIn",
			label: "Ban Expires In (seconds)",
			type: "number",
		},
		selectEnumField(LIFETIME_PLANS, {
			name: "lifetimeSubscription",
			selectEnumKey: "name",
			useValueAsLabel: true,
		}),
	],
};
