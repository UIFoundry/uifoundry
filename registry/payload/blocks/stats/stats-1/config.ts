import type { Block } from "payload";

import {
	BLOCK_GROUP_STATS,
	BLOCK_SLUG_STATS_1,
} from "@/registry/default/lib/constants/blocks";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";

export const Stats_1_Block: Block = {
	slug: BLOCK_SLUG_STATS_1,
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
				headerField({
					defaultValue: "Performance by the numbers",
				}),
				subHeaderField({
					defaultValue:
						"Real metrics that reflect adoption, speed, satisfaction, and shipping cadence.",
				}),
			],
		},
		{
			type: "collapsible",
			label: "Statistics",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "stats",
					type: "array",
					label: "Statistics",
					required: true,
					minRows: 1,
					maxRows: 8,
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
					defaultValue: [
						{ name: "Active subscriptions", value: "18,200" },
						{ name: "Average response time", value: "120ms" },
						{ name: "Net promoter score", value: "72" },
						{ name: "Monthly deployments", value: "3.2k" },
					],
				},
			],
		},
	],
	interfaceName: "Stats_1_Block",
	labels: {
		plural: "Stats 1's",
		singular: "Stats 1",
	},
};
