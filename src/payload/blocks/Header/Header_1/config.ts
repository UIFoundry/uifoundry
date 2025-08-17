import type { Block } from "payload";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_1,
} from "~/payload/constants/blocks";

export const Header_1_Block: Block = {
	slug: BLOCK_SLUG_HEADER_1,
	interfaceName: "Header_1_Block",
	labels: {
		singular: "Header 1",
		plural: "Header 1's",
	},
	admin: {
		group: BLOCK_GROUP_HEADERS,
	},
	fields: [
		{
			name: "menuItems",
			labels: {
				singular: "Menu Item",
				plural: "Menu Items",
			},
			type: "array",
			required: true,
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
