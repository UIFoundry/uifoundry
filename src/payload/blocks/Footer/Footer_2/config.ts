import type { Block } from "payload";
import {
	BLOCK_GROUP_FOOTERS,
	BLOCK_SLUG_FOOTER_2,
} from "~/payload/constants/blocks";
import socialLinksField from "~/payload/fields/socialLinks/config";
import mediaField from "~/payload/fields/media/config";

export const Footer_2_Block: Block = {
	slug: BLOCK_SLUG_FOOTER_2,
	interfaceName: "Footer_2_Block",
	labels: {
		singular: "Footer 2",
		plural: "Footer 2's",
	},
	admin: {
		group: BLOCK_GROUP_FOOTERS,
	},
	fields: [
		mediaField({
			name: "brandLogo",
			label: "Brand Logo",
		}),
		{
			name: "copyright",
			type: "text",
			label: "Copyright",
		},
		{
			name: "links",
			type: "array",
			labels: {
				singular: "Link",
				plural: "Links",
			},
			fields: [
				{
					name: "group",
					type: "text",
				},
				{
					name: "items",
					type: "array",
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
							label: "Link (Href)",
							required: true,
						},
					],
				},
			],
		},
		socialLinksField(),
	],
};
