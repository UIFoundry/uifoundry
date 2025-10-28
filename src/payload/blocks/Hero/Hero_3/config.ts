import type { Block } from "payload";

import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_3,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import mediaField from "~/payload/fields/media/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Hero_3_Block: Block = {
	slug: BLOCK_SLUG_HERO_3,
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	fields: [
		headerField({
			defaultValue: "Build 10x Faster with NS",
		}),
		subHeaderField({
			defaultValue:
				"Highly customizable components for building modern websites and applications",
		}),
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "primaryCtaLabel",
					type: "text",
					defaultValue: "Get Started",
					label: "Primary Call To Action: Label",
					required: true,
				},
				{
					name: "primaryCtaHref",
					type: "text",
					defaultValue: "/get-started",
					label: "Primary Call To Action: Link (href)",
					required: true,
				},
			],
			label: "Primary Call To Action",
		},
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "secondaryCtaLabel",
					type: "text",
					defaultValue: "View Demo",
					label: "Secondary Call To Action: Label",
					required: true,
				},
				{
					name: "secondaryCtaHref",
					type: "text",
					defaultValue: "/demo",
					label: "Secondary Call To Action: Link (href)",
					required: true,
				},
			],
			label: "Secondary Call To Action",
		},
		mediaField({
			admin: {
				description:
					"Upload background video (light/dark variants). Falls back to Video URL if not provided.",
			},
			label: "Background Video",
		}),
		{
			name: "videoUrl",
			type: "text",
			admin: {
				description:
					"Fallback video URL if media upload not provided (MP4 format recommended)",
			},
			defaultValue: "https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4",
			label: "Video URL (Fallback)",
		},
	],
	interfaceName: "Hero_3_Block",
	labels: {
		plural: "Hero 3's",
		singular: "Hero 3",
	},
};
