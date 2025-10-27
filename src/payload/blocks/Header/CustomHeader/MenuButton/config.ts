import type { Block } from "payload";

import {
	AUTH_PROVIDERS,
	FLEX_ALIGNMENT,
} from "~/payload/constants";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_MENU_BUTTON,
} from "~/payload/constants/blocks";
import selectEnumField from "~/payload/fields/selectEnum/config";

export const HeaderMenuButtonBlock: Block = {
	slug: BLOCK_SLUG_HEADER_MENU_BUTTON,
	admin: {
		group: BLOCK_GROUP_HEADERS,
	},
	fields: [
		selectEnumField(FLEX_ALIGNMENT, {
			name: "alignment",
			defaultValue: FLEX_ALIGNMENT.left,
			label: "Header Alignment",
		}),
		{
			name: "label",
			type: "text",
			defaultValue: "Sign In",
			label: "Label",
			required: true,
		},
		{
			name: "href",
			type: "text",
			label: "Target Link (href)",
		},
		{
			name: "targetBlank",
			type: "checkbox",
			defaultValue: false,
			label: "Open Link in new Tab",
			required: true,
		},
		{
			name: "auth",
			type: "group",
			fields: [
				selectEnumField(AUTH_PROVIDERS, {
					name: "provider",
					defaultValue: AUTH_PROVIDERS.google,
				}),
			],
			label: "Auth",
		},
	],
	interfaceName: "HeaderMenuButtonBlock",
	labels: {
		plural: "Menu Buttons",
		singular: "Menu Button",
	},
};
