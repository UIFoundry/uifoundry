import type { AccessArgs, CollectionConfig } from "payload";
import { hasPermission } from "~/auth/permissions";
import type { Footer } from "~/payload-types";
import { blocks } from "~/payload/blocks/Footer";
import { COLLECTION_SLUG_FOOTERS } from "~/payload/constants";
import titleField from "~/payload/fields/titleField/config";
import userRelationship from "~/payload/fields/userRelationship/config";

export const Footers: CollectionConfig = {
	slug: COLLECTION_SLUG_FOOTERS,
	admin: {
		useAsTitle: "title",
	},
	access: {
		create: ({ req: { user } }: AccessArgs<Footer>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_FOOTERS,
				action: "create",
			});
		},
		read: ({ req: { user }, data }: AccessArgs<Footer>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_FOOTERS,
				action: "read",
				data,
			});
		},
		update: ({ req: { user }, data }: AccessArgs<Footer>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_FOOTERS,
				action: "update",
				data,
			});
		},
		delete: ({ req: { user }, data }: AccessArgs<Footer>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_FOOTERS,
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
			name: "footer",
			type: "blocks",
			required: true,
			maxRows: 1,
			minRows: 1,
			blocks: blocks,
		},
	],
};
