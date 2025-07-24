import { type AuthStrategyResult, type CollectionConfig } from "payload";
import { COLLECTION_SLUG_USERS } from "~/payload/constants";
import selectEnumField from "~/payload/fields/selectEnumField";
import { USER_ROLES } from "~/auth/config";
import { auth } from "~/auth";
import { serializeMongoDocIDs } from "~/payload/utils";

export const Users: CollectionConfig = {
	slug: COLLECTION_SLUG_USERS,
	admin: {
		hidden: () => false,
		useAsTitle: 'name',
		defaultColumns: ['id', 'name', 'email', 'role', 'image'],
	},
	auth: {
		disableLocalStrategy: true,
		strategies: [
			{
				name: 'better-auth',
				authenticate: async ({ headers, payload }) => {
					try {
						const userSession = await auth.api.getSession({ headers })

						if (!userSession?.user) return { user: null }

						const userData = await payload.findByID({
							collection: COLLECTION_SLUG_USERS,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
							id: userSession?.user?.id,
						})

						const serializedUserData = serializeMongoDocIDs(userData) as Record<string, unknown>

						return {
							user: {
								...serializedUserData,
								collection: COLLECTION_SLUG_USERS,
							},
						} as AuthStrategyResult
					} catch (err) {
						payload.logger.error(err)
						return { user: null }
					}
				},
			},
		],
	},
	endpoints: [
		{
			path: '/logout',
			method: 'post',
			handler: async (req) => {
				await auth.api.signOut({
					headers: req.headers,
				})
				return Response.json(
					{
						message: 'Token revoked successfully',
					},
					{
						status: 200,
						headers: req.headers,
					},
				)
			},
		},
	],
	fields: [
		{
			name: 'email',
			type: 'email',
			required: true,
			unique: true,
		},
		{
			name: 'emailVerified',
			type: 'checkbox',
			required: true,
			defaultValue: false,
		},
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'image',
			type: 'text',
		},
		selectEnumField({
			name: "role",
			object: USER_ROLES,
			required: true,
			defaultValue: USER_ROLES.user
		}),
	]
}
