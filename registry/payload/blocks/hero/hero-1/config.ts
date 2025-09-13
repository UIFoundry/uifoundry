import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_1,
} from "@/registry/default/lib/constants/blocks";
import type { Block } from "payload";
import mediaField from "@/registry/default/lib/fields/media/config";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";

export const Hero_1_Block: Block = {
	slug: BLOCK_SLUG_HERO_1,
	labels: {
		singular: "Hero 1",
		plural: "Hero 1's",
	},
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	interfaceName: "Hero_1_Block",
	fields: [
		{
			type: "collapsible",
			label: "New Update Alert",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "alertLabel",
					label: "Alert Label",
					defaultValue: "Introducing Support for AI Models",
					type: "text",
				},
				{
					name: "alertLink",
					label: "Alert Link (href)",
					defaultValue: "/new-models",
					type: "text",
				},
			],
		},
		headerField(),
		subHeaderField(),
		{
			label: "Primary Call To Action",
			type: "collapsible",
			fields: [
				{
					name: "primaryCtaLabel",
					label: "Primary Call To Action: Label",
					type: "text",
					required: true,
					defaultValue: "Start Building",
				},
				{
					name: "primaryCtaHref",
					label: "Primary Call To Action: Link (href)",
					type: "text",
					required: true,
					defaultValue: "/getting-started",
				},
			],
		},
		{
			label: "Secondary Call To Action",
			type: "collapsible",
			fields: [
				{
					name: "secondaryCtaLabel",
					label: "Secondary Call To Action: Label",
					type: "text",
					required: true,
					defaultValue: "Request a demo",
				},
				{
					name: "secondaryCtaHref",
					label: "Secondary Call To Action: Link (href)",
					type: "text",
					required: true,
					defaultValue: "/request-demo",
				},
			],
		},
		mediaField(),
	],
};
