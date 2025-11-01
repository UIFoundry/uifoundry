import type { Block } from "payload";

import {
	BLOCK_GROUP_PRICING,
	BLOCK_SLUG_PRICING_3,
} from "@/registry/default/lib/constants/blocks";
import descriptionField from "@/registry/default/lib/fields/description/config";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";

export const Pricing_3_Block: Block = {
	slug: BLOCK_SLUG_PRICING_3,
	admin: {
		group: BLOCK_GROUP_PRICING,
	},
	fields: [
		headerField({
			defaultValue: "Pricing that Scales with You",
			required: false,
		}),
		subHeaderField({
			defaultValue: "Choose the plan that best fits your needs",
			required: false,
		}),
		{
			name: "config",
			type: "group",
			fields: [
				{
					name: "popularIndex",
					type: "number",
					admin: {
						description: "Which tier should show the 'Popular' badge? (0 = first, 1 = second, 2 = third, -1 = none)",
					},
					defaultValue: 1,
					label: "Popular Plan Index (0-based)",
					required: false,
				},
				{
					name: "popularLabel",
					type: "text",
					defaultValue: "Popular",
					label: "Popular Plan Badge Label",
					required: true,
				},
			],
			label: "Config",
		},
		{
			name: "tiers",
			type: "array",
			defaultValue: [
				{
					name: "Starter",
					ctaHref: "/signup",
					ctaLabel: "Get Started",
					description: "Perfect for small teams getting started",
					features: [
						{ text: "Up to 5 editors" },
						{ text: "10GB storage" },
						{ text: "Basic analytics" },
						{ text: "Email support" },
						{ text: "Core features" },
					],
					perEditor: true,
					period: "month",
					price: 29,
				},
				{
					name: "Professional",
					ctaHref: "/signup",
					ctaLabel: "Get Started",
					description: "For growing teams with advanced needs",
					features: [
						{ text: "Up to 20 editors" },
						{ text: "100GB storage" },
						{ text: "Advanced analytics" },
						{ text: "Priority support" },
						{ text: "All features included" },
						{ text: "Custom integrations" },
					],
					perEditor: true,
					period: "month",
					price: 79,
				},
				{
					name: "Enterprise",
					ctaHref: "/contact",
					ctaLabel: "Contact Sales",
					description: "For large organizations with custom requirements",
					features: [
						{ text: "Unlimited editors" },
						{ text: "Unlimited storage" },
						{ text: "Custom analytics" },
						{ text: "24/7 dedicated support" },
						{ text: "All features included" },
						{ text: "Custom integrations" },
						{ text: "SLA guarantee" },
						{ text: "Dedicated account manager" },
					],
					perEditor: false,
					period: "month",
					price: 199,
				},
			],
			fields: [
				{
					name: "name",
					type: "text",
					label: "Plan Name",
					required: true,
				},
				{
					name: "price",
					type: "number",
					label: "Price",
					required: true,
				},
				{
					name: "period",
					type: "select",
					defaultValue: "month",
					label: "Billing Period",
					options: [
						{ label: "Per Month", value: "month" },
						{ label: "Per Year", value: "year" },
						{ label: "One-time", value: "once" },
					],
					required: true,
				},
				{
					name: "perEditor",
					type: "checkbox",
					defaultValue: true,
					label: "Show 'Per Editor' Label",
					required: false,
				},
				descriptionField({
					required: false,
				}),
				{
					name: "ctaLabel",
					type: "text",
					defaultValue: "Get Started",
					label: "Button Label",
					required: true,
				},
				{
					name: "ctaHref",
					type: "text",
					defaultValue: "",
					label: "Button Link",
					required: false,
				},
				{
					name: "features",
					type: "array",
					fields: [
						{
							name: "text",
							type: "text",
							required: true,
						},
					],
					label: "Features List",
					maxRows: 10,
					minRows: 1,
				},
			],
			label: {
				plural: "Pricing Tiers",
				singular: "Pricing Tier",
			},
			maxRows: 4,
			minRows: 0,
		},
	],
	interfaceName: "Pricing_3_Block",
	labels: {
		plural: "Pricing 3's",
		singular: "Pricing 3",
	},
};
