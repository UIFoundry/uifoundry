import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_3,
} from "@/registry/default/lib/constants/blocks";
import type { Block } from "payload";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";
import mediaField from "@/registry/default/lib/fields/media/config";

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
		headerField({
			defaultValue: "Build 10x Faster with NS",
		}),
		subHeaderField({
			defaultValue:
				"Highly customizable components for building modern websites and applications",
		}),
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
		mediaField({
			label: "Background Video",
			admin: {
				description:
					"Upload background video (light/dark variants). Falls back to Video URL if not provided.",
			},
		}),
		{
			name: "videoUrl",
			label: "Video URL (Fallback)",
			type: "text",
			admin: {
				description:
					"Fallback video URL if media upload not provided (MP4 format recommended)",
			},
			defaultValue: "https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4",
		},
	],
};
