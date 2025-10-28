import type { AccessArgs, CollectionConfig } from "payload";

import type { Footer } from "~/payload-types";

import { hasPermission } from "~/auth/permissions";
import { blocks } from "~/payload/blocks/Footer";
import { COLLECTION_SLUG_FOOTERS } from "~/payload/constants";
import titleField from "~/payload/fields/title/config";
import userRelationship from "~/payload/fields/userRelationship/config";

export const Footers: CollectionConfig = {
	slug: COLLECTION_SLUG_FOOTERS,
	access: {
		create: ({ req: { user } }: AccessArgs<Footer>) => {
			return hasPermission({
				action: "create",
				resource: COLLECTION_SLUG_FOOTERS,
				user,
			});
		},
		delete: ({ data, req: { user } }: AccessArgs<Footer>) => {
			return hasPermission({
				action: "delete",
				data,
				resource: COLLECTION_SLUG_FOOTERS,
				user,
			});
		},
		read: ({ data, req: { user } }: AccessArgs<Footer>) => {
			return hasPermission({
				action: "read",
				data,
				resource: COLLECTION_SLUG_FOOTERS,
				user,
			});
		},
		update: ({ data, req: { user } }: AccessArgs<Footer>) => {
			return hasPermission({
				action: "update",
				data,
				resource: COLLECTION_SLUG_FOOTERS,
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
			name: "footer",
			type: "blocks",
			blocks,
			maxRows: 1,
			minRows: 1,
			required: true,
		},
	],
};
