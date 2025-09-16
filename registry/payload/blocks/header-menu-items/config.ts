import type { Block } from "payload";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_MENU_ITEMS,
} from "@/registry/default/lib/constants/blocks";
import { FLEX_ALIGNMENT } from "@/registry/default/lib/constants";
import selectEnumField from "@/registry/default/lib/fields/selectEnumField/config";

export const HeaderMenuItemsBlock: Block = {
	slug: BLOCK_SLUG_HEADER_MENU_ITEMS,
	interfaceName: "HeaderMenuItemsBlock",
	labels: {
		singular: "Menu Items",
		plural: "Menu Items'",
	},
	admin: {
		group: BLOCK_GROUP_HEADERS,
	},
	fields: [
		selectEnumField(FLEX_ALIGNMENT, {
			name: "alignment",
			label: "Header Alignment",
			defaultValue: FLEX_ALIGNMENT.center,
		}),
		{
			name: "menuItems",
			labels: {
				singular: "Menu Item",
				plural: "Menu Items",
			},
			type: "array",
			required: true,
			defaultValue: [
				{
					label: "Home",
					href: "/",
				},
				{
					label: "Products",
					href: "/products",
				},
				{
					label: "Services",
					href: "/services",
				},
				{
					label: "Contact",
					href: "/contact",
				},
			],
			fields: [
				{
					name: "label",
					label: "Label",
					type: "text",
					required: true,
				},
				{
					name: "href",
					label: "Href",
					type: "text",
					required: true,
					admin: {
						placeholder: "/features | #features",
					},
				},
			],
		},
	],
};
