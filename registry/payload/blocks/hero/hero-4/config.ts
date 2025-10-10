import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_4,
} from "@/registry/default/lib/constants/blocks";
import type { Block } from "payload";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";
import mediaField from "@/registry/default/lib/fields/media/config";

export const Hero_4_Block: Block = {
	slug: BLOCK_SLUG_HERO_4,
	labels: {
		singular: "Hero 4",
		plural: "Hero 4's",
	},
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	interfaceName: "Hero_4_Block",
	fields: [
		{
			label: "Badge",
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "badgeLabel",
					label: "Badge Label",
					type: "text",
					defaultValue: "New",
				},
				{
					name: "badgeText",
					label: "Badge Text",
					type: "text",
					defaultValue: "Introduction Tailark Html",
				},
				{
					name: "badgeHref",
					label: "Badge Link",
					type: "text",
					defaultValue: "/",
				},
			],
		},
		headerField({
			defaultValue: "Production Ready Digital Marketing blocks",
		}),
		subHeaderField({
			defaultValue:
				"Error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!",
		}),
		{
			label: "Email Form",
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "emailPlaceholder",
					label: "Email Input Placeholder",
					type: "text",
					required: true,
					defaultValue: "Your mail address",
				},
				{
					name: "emailButtonText",
					label: "Submit Button Text",
					type: "text",
					required: true,
					defaultValue: "Get Started",
				},
			],
		},
		{
			name: "features",
			label: "Features List",
			type: "array",
			minRows: 0,
			maxRows: 10,
			defaultValue: [
				{ feature: "Faster" },
				{ feature: "Modern" },
				{ feature: "100% Customizable" },
			],
			fields: [
				{
					name: "feature",
					label: "Feature",
					type: "text",
					required: true,
				},
			],
		},
		mediaField({
			label: "Background Image",
			admin: {
				description:
					"Upload background image (light/dark variants). Recommended dimensions: 2796x2008",
			},
		}),
	],
};
