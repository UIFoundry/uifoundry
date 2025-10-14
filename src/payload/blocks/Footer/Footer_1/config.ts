import type { Block } from "payload";
import {
	BLOCK_GROUP_FOOTERS,
	BLOCK_SLUG_FOOTER_1,
} from "~/payload/constants/blocks";
import socialLinksField from "~/payload/fields/socialLinks/config";
import mediaField from "~/payload/fields/media/config";

export const Footer_1_Block: Block = {
	slug: BLOCK_SLUG_FOOTER_1,
	interfaceName: "Footer_1_Block",
	labels: {
		singular: "Footer 1",
		plural: "Footer 1's",
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
};
