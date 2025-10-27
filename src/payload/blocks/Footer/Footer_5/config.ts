import type { Block } from "payload";

import {
	BLOCK_GROUP_FOOTERS,
	BLOCK_SLUG_FOOTER_5,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/media/config";
import socialLinksField from "~/payload/fields/socialLinks/config";

export const Footer_5_Block: Block = {
	slug: BLOCK_SLUG_FOOTER_5,
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
			type: "group",
			fields: [
				{
					name: "copyright",
					type: "text",
					defaultValue: "UIFoundry, All rights reserved",
				},
				{
					name: "actions",
					type: "array",
					fields: [
						{
							name: "label",
							type: "text",
							defaultValue: "License",
						},
						{
							name: "href",
							type: "text",
							defaultValue: "/",
						},
					],
				},
			],
			label: "Copyright",
		},
		{
			name: "links",
			type: "array",
			defaultValue: [
				{
					group: "Product",
					items: [
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
							label: "Customers",
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
				},
				{
					group: "Solution",
					items: [
						{
							href: "/",
							label: "Startup",
						},
						{
							href: "/",
							label: "Freelancers",
						},
						{
							href: "/",
							label: "Organizations",
						},
						{
							href: "/",
							label: "Students",
						},
						{
							href: "/",
							label: "Collaboration",
						},
						{
							href: "/",
							label: "Design",
						},
						{
							href: "/",
							label: "Management",
						},
					],
				},
				{
					group: "Company",
					items: [
						{
							href: "/",
							label: "About",
						},
						{
							href: "/",
							label: "Careers",
						},
						{
							href: "/",
							label: "Blog",
						},
						{
							href: "/",
							label: "Press",
						},
						{
							href: "/",
							label: "Contact",
						},
						{
							href: "/",
							label: "Help",
						},
					],
				},
				{
					group: "Legal",
					items: [
						{
							href: "/",
							label: "License",
						},
						{
							href: "/",
							label: "Privacy",
						},
						{
							href: "/",
							label: "Cookies",
						},
						{
							href: "/",
							label: "Security",
						},
					],
				},
			],
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
	interfaceName: "Footer_5_Block",
	labels: {
		plural: "Footer 5's",
		singular: "Footer 5",
	},
};
