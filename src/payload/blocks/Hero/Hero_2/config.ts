import type { Block } from "payload";

import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_2,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import mediaField from "~/payload/fields/media/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Hero_2_Block: Block = {
	slug: BLOCK_SLUG_HERO_2,
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	fields: [
		headerField({
			defaultValue: "Ship 10x Faster with NS",
		}),
		subHeaderField({
			defaultValue:
				"Highly customizable components for building modern websites and applications that look and feel the way you mean it.",
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
					defaultValue: "Start Building",
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
					defaultValue: "Request a demo",
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
					"Upload background image (light/dark variants). Displays as a floating image on the right side.",
			},
			label: "Background Image",
		}),
	],
	interfaceName: "Hero_2_Block",
	labels: {
		plural: "Hero 2's",
		singular: "Hero 2",
	},
};
