import type { Block } from "payload";

import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_1,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import mediaField from "~/payload/fields/media/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Hero_1_Block: Block = {
	slug: BLOCK_SLUG_HERO_1,
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	fields: [
		{
			type: "collapsible",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "alertLabel",
					type: "text",
					defaultValue: "Introducing Support for AI Models",
					label: "Alert Label",
				},
				{
					name: "alertLink",
					type: "text",
					defaultValue: "/new-models",
					label: "Alert Link (href)",
				},
			],
			label: "New Update Alert",
		},
		headerField(),
		subHeaderField(),
		{
			type: "collapsible",
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
					defaultValue: "/getting-started",
					label: "Primary Call To Action: Link (href)",
					required: true,
				},
			],
			label: "Primary Call To Action",
		},
		{
			type: "collapsible",
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
					defaultValue: "/request-demo",
					label: "Secondary Call To Action: Link (href)",
					required: true,
				},
			],
			label: "Secondary Call To Action",
		},
		mediaField(),
	],
	interfaceName: "Hero_1_Block",
	labels: {
		plural: "Hero 1's",
		singular: "Hero 1",
	},
};
