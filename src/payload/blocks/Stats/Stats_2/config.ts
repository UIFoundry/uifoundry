import type { Block } from "payload";

import {
	BLOCK_GROUP_STATS,
	BLOCK_SLUG_STATS_2,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Stats_2_Block: Block = {
	slug: BLOCK_SLUG_STATS_2,
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
					name: "eyebrow",
					type: "text",
					label: "Eyebrow Text",
					admin: {
						description: "Small label above the main heading (optional)",
					},
					defaultValue: "Results",
				},
				headerField({
					defaultValue: "Built for scale, proven in production",
				}),
				subHeaderField({
					defaultValue:
						"Faster onboarding, higher reliability, and happier teams backed by real usage and measurable outcomes.",
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
					maxRows: 6,
					fields: [
						{
							name: "stat",
							type: "text",
							label: "Statistic Value",
							required: true,
							admin: {
								description: "Large numeric value (e.g., '14K+', '99.95%')",
							},
						},
						{
							name: "emphasis",
							type: "text",
							label: "Emphasized Text",
							required: true,
							admin: {
								description: "Bold descriptive text",
							},
						},
						{
							name: "description",
							type: "text",
							label: "Description",
							required: true,
							admin: {
								description: "Additional context text",
							},
						},
					],
					defaultValue: [
						{
							stat: "14K+",
							emphasis: "Teams onboarded",
							description: "switched from spreadsheets to automated workflows.",
						},
						{
							stat: "180M+",
							emphasis: "Monthly API calls",
							description: "served across five global regions.",
						},
						{
							stat: "99.95%",
							emphasis: "Uptime this year",
							description: "with multi region failover in production.",
						},
					],
				},
			],
		},
	],
	interfaceName: "Stats_2_Block",
	labels: {
		plural: "Stats 2's",
		singular: "Stats 2",
	},
};
