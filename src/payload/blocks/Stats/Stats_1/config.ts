import type { Block } from "payload";

import {
	BLOCK_GROUP_STATS,
	BLOCK_SLUG_STATS_1,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Stats_1_Block: Block = {
	slug: BLOCK_SLUG_STATS_1,
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
				headerField({
					defaultValue: "Performance by the numbers",
				}),
				subHeaderField({
					defaultValue:
						"Real metrics that reflect adoption, speed, satisfaction, and shipping cadence.",
				}),
			],
			label: "Content",
		},
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "stats",
					type: "array",
					defaultValue: [
						{ name: "Active subscriptions", value: "18,200" },
						{ name: "Average response time", value: "120ms" },
						{ name: "Net promoter score", value: "72" },
						{ name: "Monthly deployments", value: "3.2k" },
					],
					fields: [
						{
							name: "name",
							type: "text",
							label: "Statistic Name",
							required: true,
						},
						{
							name: "value",
							type: "text",
							label: "Statistic Value",
							required: true,
						},
					],
					label: "Statistics",
					maxRows: 8,
					minRows: 1,
					required: true,
				},
			],
			label: "Statistics",
		},
	],
	interfaceName: "Stats_1_Block",
	labels: {
		plural: "Stats 1's",
		singular: "Stats 1",
	},
};
