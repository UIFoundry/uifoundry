import type { Block } from "payload"
import { BLOCK_SLUG_HEADER_2 } from "~/payload/constants/blocks"

export const Header_2_Block: Block = {
	slug: BLOCK_SLUG_HEADER_2,
	interfaceName: "Header_2_Block",
	labels: {
		singular: "Header 2",
		plural: "Header 2's"
	},
	fields: [
		{
			name: "menuItems",
			labels: {
				singular: "Menu Item",
				plural: "Menu Items"
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
						placeholder: "/features | #features"
					},
				}
			]
		}
	]

}
