import { BLOCK_SLUG_HERO_1 } from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField"

export const Hero_1_Block: Block = {
	slug: BLOCK_SLUG_HERO_1,
	labels: {
		singular: "Hero 1",
		plural: "Hero 1's"
	},
	interfaceName: "Hero_1_Block",
	fields: [
		{
			type: "collapsible",
			label: "New Update Alert",
			fields: [
				{
					name: "alertLabel",
					label: "Alert Label",
					type: "text",
				},
				{
					name: "alertLink",
					label: "Alert Link (href)",
					type: "text",
				}
			]
		},
		{
			name: "header",
			label: "Header",
			type: "text",
			required: true,
		},
		{
			name: "subheader",
			label: "SubHeader",
			type: "text",
		},
		{
			label: "Primary Call To Action",
			type: "collapsible",
			fields: [
				{
					name: "primaryCtaLabel",
					label: "Primary Call To Action: Label",
					type: "text",
					required: true
				},
				{
					name: "primaryCtaHref",
					label: "Primary Call To Action: Link (href)",
					type: "text",
					required: true
				}
			]
		},
		{
			label: "Secondary Call To Action",
			type: "collapsible",
			fields: [
				{
					name: "secondaryCtaLabel",
					label: "Secondary Call To Action: Label",
					type: "text",
					required: true
				},
				{
					name: "secondaryCtaHref",
					label: "Secondary Call To Action: Link (href)",
					type: "text",
					required: true
				}
			]
		},
		mediaField()
	]
}

