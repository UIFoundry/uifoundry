import {
	type AccessArgs,
	type AuthStrategyResult,
	type CollectionConfig,
} from "payload";

import type { User } from "~/payload-types";

import { auth } from "~/auth";
import { hasPermission, USER_ROLES } from "~/auth/permissions";
import { COLLECTION_SLUG_USERS } from "~/payload/constants";
import selectEnumField from "~/payload/fields/selectEnum/config";
import { LIFETIME_PLANS } from "~/utils/stripe";

export const Users: CollectionConfig = {
	slug: COLLECTION_SLUG_USERS,
	access: {
		create: ({ req: { user } }: AccessArgs<User>) => {
			return hasPermission({
				action: "create",
				resource: COLLECTION_SLUG_USERS,
				user,
			});
		},
		delete: ({ data, req: { user } }: AccessArgs<User>) => {
			return hasPermission({
				action: "delete",
				data,
				resource: COLLECTION_SLUG_USERS,
				user,
			});
		},
		read: ({ data, req: { user } }: AccessArgs<User>) => {
			return hasPermission({
				action: "read",
				data,
				resource: COLLECTION_SLUG_USERS,
				user,
			});
		},
		update: ({ data, req: { user } }: AccessArgs<User>) => {
			return hasPermission({
				action: "update",
				data,
				resource: COLLECTION_SLUG_USERS,
				user,
			});
		},
	},
	admin: {
		hidden: () => false,
		defaultColumns: ["id", "name", "email", "role", "image"],
		useAsTitle: "name",
	},
	auth: {
		disableLocalStrategy: true,
		strategies: [
			{
				name: "better-auth",
				authenticate: async ({ headers, payload }) => {
					try {
						const userSession = await auth.api.getSession({ headers });

						if (!userSession?.user) {return { user: null };}

						const userData = await payload.findByID({
							id: userSession?.user?.id,
							collection: COLLECTION_SLUG_USERS,
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
		useSessions: false,
	},
	endpoints: [
		{
			handler: async (req) => {
				await auth.api.signOut({
					headers: req.headers,
				});
				return Response.json(
					{
						message: "Token revoked successfully",
					},
					{
						headers: req.headers,
						status: 200,
					},
				);
			},
			method: "post",
			path: "/logout",
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
			defaultValue: false,
			required: true,
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
			defaultValue: USER_ROLES.user,
			required: true,
		}),
		{
			name: "banned",
			type: "checkbox",
			defaultValue: false,
			label: "Banned",
			required: true,
		},
		{
			name: "banReason",
			type: "text",
			label: "Ban Reason",
		},
		{
			name: "banExpiresIn",
			type: "number",
			label: "Ban Expires In (seconds)",
		},
		selectEnumField(LIFETIME_PLANS, {
			name: "lifetimeSubscription",
			selectEnumKey: "name",
			useValueAsLabel: true,
		}),
	],
};
