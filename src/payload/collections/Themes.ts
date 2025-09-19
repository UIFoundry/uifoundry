import type { AccessArgs, CollectionConfig } from "payload";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";
import selectEnumField from "~/payload/fields/selectEnumField/config";
import { THEME_TYPES } from "~/payload/constants/themes";
import userField from "../fields/user/config";
import type { Theme } from "~/payload-types";
import { hasPermission } from "~/auth/permissions";

export const Themes: CollectionConfig = {
	slug: COLLECTION_SLUG_THEMES,
	admin: {
		useAsTitle: "name",
	},
	access: {
		create: ({ req: { user } }: AccessArgs<Theme>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_THEMES,
				action: "create",
			});
		},
		read: ({ req: { user }, data }: AccessArgs<Theme>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_THEMES,
				action: "read",
				data,
			});
		},
		update: ({ req: { user }, data }: AccessArgs<Theme>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_THEMES,
				action: "update",
				data,
			});
		},
		delete: ({ req: { user }, data }: AccessArgs<Theme>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_THEMES,
				action: "delete",
				data,
			});
		},
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
		userField({
			name: "owner",
			label: "Owner",
		}),
		{
			name: "styles",
			type: "json",
			required: true,
		},
		{
			name: "private",
			label: "Private",
			type: "checkbox",
			required: true,
			defaultValue: false,
		},
	],
};
