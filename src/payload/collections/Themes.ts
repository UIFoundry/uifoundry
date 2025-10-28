import type { AccessArgs, CollectionConfig } from "payload";

import type { Theme } from "~/payload-types";

import { hasPermission } from "~/auth/permissions";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { THEME_TYPES } from "~/payload/constants/themes";
import selectEnumField from "~/payload/fields/selectEnum/config";

import userRelationship from "../fields/userRelationship/config";

export const Themes: CollectionConfig = {
	slug: COLLECTION_SLUG_THEMES,
	access: {
		create: ({ req: { user } }: AccessArgs<Theme>) => {
			return hasPermission({
				action: "create",
				resource: COLLECTION_SLUG_THEMES,
				user,
			});
		},
		delete: ({ data, req: { user } }: AccessArgs<Theme>) => {
			return hasPermission({
				action: "delete",
				data,
				resource: COLLECTION_SLUG_THEMES,
				user,
			});
		},
		read: ({ data, req: { user } }: AccessArgs<Theme>) => {
			return hasPermission({
				action: "read",
				data,
				resource: COLLECTION_SLUG_THEMES,
				user,
			});
		},
		update: ({ data, req: { user } }: AccessArgs<Theme>) => {
			return hasPermission({
				action: "update",
				data,
				resource: COLLECTION_SLUG_THEMES,
				user,
			});
		},
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			defaultValue: "",
			required: true,
		},
		selectEnumField<typeof THEME_TYPES>(THEME_TYPES, {
			name: "type",
			defaultValue: THEME_TYPES.user,
		}),
		userRelationship({
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
			type: "checkbox",
			defaultValue: false,
			label: "Private",
			required: true,
		},
	],
};
