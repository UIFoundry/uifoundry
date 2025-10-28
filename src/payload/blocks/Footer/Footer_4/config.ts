import type { Block } from "payload";

import {
	BLOCK_GROUP_FOOTERS,
	BLOCK_SLUG_FOOTER_4,
} from "~/payload/constants/blocks";

export const Footer_4_Block: Block = {
	slug: BLOCK_SLUG_FOOTER_4,
	admin: {
		group: BLOCK_GROUP_FOOTERS,
	},
	fields: [
		{
			name: "copyright",
			type: "text",
			defaultValue: "UIFoundry, All rights reserved",
			label: "Copyright",
		},
		{
			name: "links",
			type: "array",
			defaultValue: [
				{
					href: "/",
					label: "Features",
				},
				{
					href: "/",
					label: "Solution",
				},
				{
					href: "/",
					label: "Customer",
				},
				{
					href: "/",
					label: "Pricing",
				},
				{
					href: "/",
					label: "Help",
				},
				{
					href: "/",
					label: "About",
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
					label: "Link (Href)",
					required: true,
				},
			],
			labels: {
				plural: "Links",
				singular: "Link",
			},
		},
	],
	interfaceName: "Footer_4_Block",
	labels: {
		plural: "Footer 4's",
		singular: "Footer 4",
	},
};
