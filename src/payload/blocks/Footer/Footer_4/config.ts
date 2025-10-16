import type { Block } from "payload";
import {
	BLOCK_GROUP_FOOTERS,
	BLOCK_SLUG_FOOTER_4,
} from "~/payload/constants/blocks";

export const Footer_4_Block: Block = {
	slug: BLOCK_SLUG_FOOTER_4,
	interfaceName: "Footer_4_Block",
	labels: {
		singular: "Footer 4",
		plural: "Footer 4's",
	},
	admin: {
		group: BLOCK_GROUP_FOOTERS,
	},
	fields: [
		{
			name: "copyright",
			type: "text",
			label: "Copyright",
			defaultValue: "UIFoundry, All rights reserved",
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
			defaultValue: [
				{
					label: "Features",
					href: "/",
				},
				{
					label: "Solution",
					href: "/",
				},
				{
					label: "Customer",
					href: "/",
				},
				{
					label: "Pricing",
					href: "/",
				},
				{
					label: "Help",
					href: "/",
				},
				{
					label: "About",
					href: "/",
				},
			],
		},
	],
};
