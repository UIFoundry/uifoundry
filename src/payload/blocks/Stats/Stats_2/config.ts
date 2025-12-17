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
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "eyebrow",
					type: "text",
					admin: {
						description: "Small label above the main heading (optional)",
					},
					defaultValue: "Results",
					label: "Eyebrow Text",
				},
				headerField({
					defaultValue: "Built for scale, proven in production",
				}),
				subHeaderField({
					defaultValue:
						"Faster onboarding, higher reliability, and happier teams backed by real usage and measurable outcomes.",
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
						{
							description: "switched from spreadsheets to automated workflows.",
							emphasis: "Teams onboarded",
							stat: "14K+",
						},
						{
							description: "served across five global regions.",
							emphasis: "Monthly API calls",
							stat: "180M+",
						},
						{
							description: "with multi region failover in production.",
							emphasis: "Uptime this year",
							stat: "99.95%",
						},
					],
					fields: [
						{
							name: "stat",
							type: "text",
							admin: {
								description: "Large numeric value (e.g., '14K+', '99.95%')",
							},
							label: "Statistic Value",
							required: true,
						},
						{
							name: "emphasis",
							type: "text",
							admin: {
								description: "Bold descriptive text",
							},
							label: "Emphasized Text",
							required: true,
						},
						{
							name: "description",
							type: "text",
							admin: {
								description: "Additional context text",
							},
							label: "Description",
							required: true,
						},
					],
					label: "Statistics",
					maxRows: 6,
					minRows: 1,
					required: true,
				},
			],
			label: "Statistics",
		},
	],
	interfaceName: "Stats_2_Block",
	labels: {
		plural: "Stats 2's",
		singular: "Stats 2",
	},
};
