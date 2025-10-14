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
			defaultValue: [
				{
					group: "Product",
					items: [
						{
							label: "Features",
							href: "/",
						},
						{
							label: "Solution",
							href: "/",
						},
						{
							label: "Customers",
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
				{
					group: "Solution",
					items: [
						{
							label: "Startup",
							href: "/",
						},
						{
							label: "Freelancers",
							href: "/",
						},
						{
							label: "Organizations",
							href: "/",
						},
						{
							label: "Students",
							href: "/",
						},
						{
							label: "Collaboration",
							href: "/",
						},
						{
							label: "Design",
							href: "/",
						},
						{
							label: "Management",
							href: "/",
						},
					],
				},
				{
					group: "Company",
					items: [
						{
							label: "About",
							href: "/",
						},
						{
							label: "Careers",
							href: "/",
						},
						{
							label: "Blog",
							href: "/",
						},
						{
							label: "Press",
							href: "/",
						},
						{
							label: "Contact",
							href: "/",
						},
						{
							label: "Help",
							href: "/",
						},
					],
				},
				{
					group: "Legal",
					items: [
						{
							label: "License",
							href: "/",
						},
						{
							label: "Privacy",
							href: "/",
						},
						{
							label: "Cookies",
							href: "/",
						},
						{
							label: "Security",
							href: "/",
						},
					],
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
