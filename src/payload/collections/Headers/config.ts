import type { AccessArgs, CollectionConfig } from "payload";

import type { Header } from "~/payload-types";

import { hasPermission } from "~/auth/permissions";
import { blocks } from "~/payload/blocks/Header/config";
import { COLLECTION_SLUG_HEADERS } from "~/payload/constants";
import titleField from "~/payload/fields/title/config";
import userRelationship from "~/payload/fields/userRelationship/config";

export const Headers: CollectionConfig = {
	slug: COLLECTION_SLUG_HEADERS,
	access: {
		create: ({ req: { user } }: AccessArgs<Header>) => {
			return hasPermission({
				action: "create",
				resource: COLLECTION_SLUG_HEADERS,
				user,
			});
		},
		delete: ({ data, req: { user } }: AccessArgs<Header>) => {
			return hasPermission({
				action: "delete",
				data,
				resource: COLLECTION_SLUG_HEADERS,
				user,
			});
		},
		read: ({ data, req: { user } }: AccessArgs<Header>) => {
			return hasPermission({
				action: "read",
				data,
				resource: COLLECTION_SLUG_HEADERS,
				user,
			});
		},
		update: ({ data, req: { user } }: AccessArgs<Header>) => {
			return hasPermission({
				action: "update",
				data,
				resource: COLLECTION_SLUG_HEADERS,
				user,
			});
		},
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "global",
			type: "checkbox",
			access: {
				create: () => false,
				read: () => true,
				update: () => false,
			},
			defaultValue: true,
		},
		titleField(),
		userRelationship({
			name: "owner",
			defaultValue: ({ user }) => user,
			label: "Owner",
			required: true,
		}),
		{
			name: "header",
			type: "blocks",
			blocks,
			maxRows: 1,
			minRows: 1,
			required: true,
		},
	],
};
