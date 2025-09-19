import type { AccessArgs, CollectionConfig } from "payload";
import {
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
} from "~/payload/constants/collections";
import titleField from "~/payload/fields/titleField/config";
import userField from "~/payload/fields/user/config";
import type { Site } from "~/payload-types";
import { hasPermission } from "~/auth/permissions";

export const Sites: CollectionConfig = {
	slug: COLLECTION_SLUG_SITES,
	access: {
		create: ({ req: { user } }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "create",
			});
		},
		read: ({ req: { user }, data }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "read",
				data,
			});
		},
		update: ({ req: { user }, data }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "update",
				data,
			});
		},
		delete: ({ req: { user }, data }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "delete",
				data,
			});
		},
	},
	fields: [
		titleField(),
		userField({
			name: "owner",
			label: "Owner",
		}),
		{
			name: "pages",
			type: "relationship",
			relationTo: COLLECTION_SLUG_PAGES,
			hasMany: true,
			defaultValue: [],
		},
	],
};
