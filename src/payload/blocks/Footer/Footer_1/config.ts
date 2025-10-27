import type { Block } from "payload";

import {
	BLOCK_GROUP_FOOTERS,
	BLOCK_SLUG_FOOTER_1,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/media/config";
import socialLinksField from "~/payload/fields/socialLinks/config";

export const Footer_1_Block: Block = {
	slug: BLOCK_SLUG_FOOTER_1,
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
		socialLinksField({
			defaultValue: [
				{
					href: "https://x.com",
					icon: "X (formerly Twitter)",
				},
				{
					href: "https://linkedin.com",
					icon: "LinkedIn",
				},
				{
					href: "https://facebook.com",
					icon: "Facebook",
				},
				{
					href: "https://threads.com",
					icon: "Threads",
				},
				{
					href: "https://instagram.com",
					icon: "Instagram",
				},
				{
					href: "https://tiktok.com",
					icon: "TikTok",
				},
			],
		}),
	],
	interfaceName: "Footer_1_Block",
	labels: {
		plural: "Footer 1's",
		singular: "Footer 1",
	},
};
