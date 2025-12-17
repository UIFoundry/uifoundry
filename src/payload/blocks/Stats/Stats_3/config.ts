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
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "value",
					type: "number",
					defaultValue: 77421,
					label: "Statistic Value",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
					defaultValue:
						"Real time telemetry tracking active installations across live environments.",
					label: "Description",
					required: true,
				},
				{
					name: "highlightedText",
					type: "text",
					admin: {
						description: "Text to highlight/bold in the description",
					},
					defaultValue: "active installations",
					label: "Highlighted Text",
				},
			],
			label: "Content",
		},
		{
			type: "collapsible",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "enableAnimation",
					type: "checkbox",
					admin: {
						description: "Automatically increment the number over time",
					},
					defaultValue: true,
					label: "Enable Auto-Increment Animation",
				},
				{
					name: "animationInterval",
					type: "number",
					admin: {
						condition: (data) => data.enableAnimation === true,
						description: "How often to increment (in milliseconds)",
					},
					defaultValue: 3000,
					label: "Animation Interval (ms)",
				},
			],
			label: "Animation Settings",
		},
	],
	interfaceName: "Stats_3_Block",
	labels: {
		plural: "Stats 3's",
		singular: "Stats 3",
	},
};
