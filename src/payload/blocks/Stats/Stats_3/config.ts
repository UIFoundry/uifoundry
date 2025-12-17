import type { Block } from "payload";

import {
	BLOCK_GROUP_STATS,
	BLOCK_SLUG_STATS_3,
} from "~/payload/constants/blocks";

export const Stats_3_Block: Block = {
	slug: BLOCK_SLUG_STATS_3,
	admin: {
		group: BLOCK_GROUP_STATS,
	},
	fields: [
		{
			type: "collapsible",
			label: "Content",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "value",
					type: "number",
					label: "Statistic Value",
					required: true,
					defaultValue: 77421,
				},
				{
					name: "description",
					type: "textarea",
					label: "Description",
					required: true,
					defaultValue:
						"Real time telemetry tracking active installations across live environments.",
				},
				{
					name: "highlightedText",
					type: "text",
					label: "Highlighted Text",
					admin: {
						description: "Text to highlight/bold in the description",
					},
					defaultValue: "active installations",
				},
			],
		},
		{
			type: "collapsible",
			label: "Animation Settings",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "enableAnimation",
					type: "checkbox",
					label: "Enable Auto-Increment Animation",
					defaultValue: true,
					admin: {
						description: "Automatically increment the number over time",
					},
				},
				{
					name: "animationInterval",
					type: "number",
					label: "Animation Interval (ms)",
					defaultValue: 3000,
					admin: {
						description: "How often to increment (in milliseconds)",
						condition: (data) => data.enableAnimation === true,
					},
				},
			],
		},
	],
	interfaceName: "Stats_3_Block",
	labels: {
		plural: "Stats 3's",
		singular: "Stats 3",
	},
};
