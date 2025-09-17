import type { CollectionConfig } from "payload";
import {
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
} from "~/payload/constants/collections";
import titleField from "~/payload/fields/titleField/config";
import userField from "~/payload/fields/user/config";

export const Sites: CollectionConfig = {
	slug: COLLECTION_SLUG_SITES,
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
