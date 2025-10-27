import type { Block } from "payload";

import { FLEX_ALIGNMENT } from "~/payload/constants";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_MENU_ITEMS,
} from "~/payload/constants/blocks";
import selectEnumField from "~/payload/fields/selectEnum/config";

export const HeaderMenuItemsBlock: Block = {
	slug: BLOCK_SLUG_HEADER_MENU_ITEMS,
	admin: {
		group: BLOCK_GROUP_HEADERS,
	},
	fields: [
		selectEnumField(FLEX_ALIGNMENT, {
			name: "alignment",
			defaultValue: FLEX_ALIGNMENT.center,
			label: "Header Alignment",
		}),
		{
			name: "menuItems",
			type: "array",
			defaultValue: [
				{
					href: "/",
					label: "Home",
				},
				{
					href: "/products",
					label: "Products",
				},
				{
					href: "/services",
					label: "Services",
				},
				{
					href: "/contact",
					label: "Contact",
				},
			],
			fields: [
				{
					name: "label",
					type: "text",
					label: "Label",
					required: true,
				},
				{
					name: "href",
					type: "text",
					admin: {
						placeholder: "/features | #features",
					},
					label: "Href",
					required: true,
				},
			],
			labels: {
				plural: "Menu Items",
				singular: "Menu Item",
			},
			required: true,
		},
	],
	interfaceName: "HeaderMenuItemsBlock",
	labels: {
		plural: "Menu Items'",
		singular: "Menu Items",
	},
};
