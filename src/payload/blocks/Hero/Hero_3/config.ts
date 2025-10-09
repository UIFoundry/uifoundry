import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_3,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField/config";
import headerField from "~/payload/fields/header/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Hero_3_Block: Block = {
	slug: BLOCK_SLUG_HERO_3,
	labels: {
		singular: "Hero 3",
		plural: "Hero 3's",
	},
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	interfaceName: "Hero_3_Block",
	fields: [
		headerField(),
		subHeaderField(),
		{
			label: "Primary Call To Action",
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "primaryCtaLabel",
					label: "Primary Call To Action: Label",
					type: "text",
					required: true,
					defaultValue: "Get Started",
				},
				{
					name: "primaryCtaHref",
					label: "Primary Call To Action: Link (href)",
					type: "text",
					required: true,
					defaultValue: "/get-started",
				},
			],
		},
		{
			label: "Secondary Call To Action",
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "secondaryCtaLabel",
					label: "Secondary Call To Action: Label",
					type: "text",
					required: true,
					defaultValue: "View Demo",
				},
				{
					name: "secondaryCtaHref",
					label: "Secondary Call To Action: Link (href)",
					type: "text",
					required: true,
					defaultValue: "/demo",
				},
			],
		},
		{
			label: "Background Video",
			type: "collapsible",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "videoUrl",
					label: "Video URL",
					type: "text",
					admin: {
						description: "URL to background video (MP4 format recommended)",
					},
					defaultValue: "https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4",
				},
			],
		},
	],
};
