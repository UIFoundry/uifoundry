import type { Block } from "payload";

import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_4,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import mediaField from "~/payload/fields/media/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Hero_4_Block: Block = {
	slug: BLOCK_SLUG_HERO_4,
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	fields: [
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "badgeLabel",
					type: "text",
					defaultValue: "New",
					label: "Badge Label",
				},
				{
					name: "badgeText",
					type: "text",
					defaultValue: "Introduction Tailark Html",
					label: "Badge Text",
				},
				{
					name: "badgeHref",
					type: "text",
					defaultValue: "/",
					label: "Badge Link",
				},
			],
			label: "Badge",
		},
		headerField({
			defaultValue: "Production Ready Digital Marketing blocks",
		}),
		subHeaderField({
			defaultValue:
				"Error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!",
		}),
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "emailPlaceholder",
					type: "text",
					defaultValue: "Your mail address",
					label: "Email Input Placeholder",
					required: true,
				},
				{
					name: "emailButtonText",
					type: "text",
					defaultValue: "Get Started",
					label: "Submit Button Text",
					required: true,
				},
			],
			label: "Email Form",
		},
		{
			name: "features",
			type: "array",
			defaultValue: [
				{ feature: "Faster" },
				{ feature: "Modern" },
				{ feature: "100% Customizable" },
			],
			fields: [
				{
					name: "feature",
					type: "text",
					label: "Feature",
					required: true,
				},
			],
			label: "Features List",
			maxRows: 10,
			minRows: 0,
		},
		mediaField({
			admin: {
				description:
					"Upload background image (light/dark variants). Recommended dimensions: 2796x2008",
			},
			label: "Background Image",
		}),
	],
	interfaceName: "Hero_4_Block",
	labels: {
		plural: "Hero 4's",
		singular: "Hero 4",
	},
};
