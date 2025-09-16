import type { Block } from "payload";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_MENU_BUTTON,
} from "@/registry/default/lib/constants/blocks";
import {
	FLEX_ALIGNMENT,
	AUTH_PROVIDERS,
} from "@/registry/default/lib/constants";
import selectEnumField from "@/registry/default/lib/fields/selectEnumField/config";

export const HeaderMenuButtonBlock: Block = {
	slug: BLOCK_SLUG_HEADER_MENU_BUTTON,
	interfaceName: "HeaderMenuButtonBlock",
	labels: {
		singular: "Menu Button",
		plural: "Menu Buttons",
	},
	admin: {
		group: BLOCK_GROUP_HEADERS,
	},
	fields: [
		selectEnumField(FLEX_ALIGNMENT, {
			name: "alignment",
			label: "Header Alignment",
			defaultValue: FLEX_ALIGNMENT.left,
		}),
		{
			name: "label",
			label: "Label",
			type: "text",
			required: true,
			defaultValue: "Sign In",
		},
		{
			name: "href",
			label: "Target Link (href)",
			type: "text",
		},
		{
			name: "targetBlank",
			label: "Open Link in new Tab",
			type: "checkbox",
			required: true,
			defaultValue: false,
		},
		{
			name: "auth",
			label: "Auth",
			type: "group",
			fields: [
				selectEnumField(AUTH_PROVIDERS, {
					name: "provider",
					defaultValue: AUTH_PROVIDERS.google,
				}),
			],
		},
	],
};
