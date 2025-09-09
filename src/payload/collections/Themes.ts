import type { CollectionConfig } from "payload";
import {
	COLLECTION_SLUG_THEMES,
	COLLECTION_SLUG_USERS,
} from "~/payload/constants";
import selectEnumField from "~/payload/fields/selectEnumField/config";
import { THEME_TYPES } from "~/payload/constants/themes";

export const Themes: CollectionConfig = {
	slug: COLLECTION_SLUG_THEMES,
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			defaultValue: "",
		},
		selectEnumField<typeof THEME_TYPES>(THEME_TYPES, {
			name: "type",
			defaultValue: THEME_TYPES.user,
		}),
		{
			name: "author",
			type: "relationship",
			relationTo: COLLECTION_SLUG_USERS,
		},
		{
			name: "styles",
			type: "json",
			required: true,
		},
	],
};
