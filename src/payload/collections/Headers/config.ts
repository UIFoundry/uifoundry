import type { AccessArgs, CollectionConfig } from "payload";
import { hasPermission } from "~/auth/permissions";
import type { Header } from "~/payload-types";
import { blocks } from "~/payload/blocks/Header/config";
import { COLLECTION_SLUG_HEADERS } from "~/payload/constants";
import titleField from "~/payload/fields/titleField/config";
import userRelationship from "~/payload/fields/userRelationship/config";

export const Headers: CollectionConfig = {
	slug: COLLECTION_SLUG_HEADERS,
	admin: {
		useAsTitle: "title",
	},
	access: {
		create: ({ req: { user } }: AccessArgs<Header>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_HEADERS,
				action: "create",
			});
		},
		read: ({ req: { user }, data }: AccessArgs<Header>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_HEADERS,
				action: "read",
				data,
			});
		},
		update: ({ req: { user }, data }: AccessArgs<Header>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_HEADERS,
				action: "update",
				data,
			});
		},
		delete: ({ req: { user }, data }: AccessArgs<Header>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_HEADERS,
				action: "delete",
				data,
			});
		},
	},
	fields: [
		{
			name: "global",
			type: "checkbox",
			defaultValue: true,
			access: {
				create: () => false,
				read: () => true,
				update: () => false,
			},
		},
		titleField(),
		userRelationship({
			name: "owner",
			label: "Owner",
			required: true,
			defaultValue: ({ user }) => user,
		}),
		{
			name: "header",
			type: "blocks",
			required: true,
			maxRows: 1,
			minRows: 1,
			blocks: blocks,
		},
	],
};
