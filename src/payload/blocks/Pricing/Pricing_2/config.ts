import type { Block } from "payload";

import {
	BLOCK_GROUP_PRICING,
	BLOCK_SLUG_PRICING_2,
} from "~/payload/constants/blocks";
import descriptionField from "~/payload/fields/description/config";
import headerField from "~/payload/fields/header/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Pricing_2_Block: Block = {
	slug: BLOCK_SLUG_PRICING_2,
	admin: {
		group: BLOCK_GROUP_PRICING,
	},
	fields: [
		headerField({
			defaultValue: "Pricing that Scales with You",
			required: false,
		}),
		subHeaderField({
			defaultValue: "Choose the perfect plan for your needs",
			required: false,
		}),
		{
			name: "tiers",
			type: "array",
			defaultValue: [
				{
					name: "Starter",
					buttonHref: "/signup",
					buttonText: "Get Started",
					description: "Perfect for small teams getting started",
					features: [
						{ text: "Up to 5 team members" },
						{ text: "10GB storage" },
						{ text: "Basic analytics" },
						{ text: "Email support" },
						{ text: "Core features" },
					],
					isPopular: false,
					period: "mo",
					price: 29,
				},
				{
					name: "Professional",
					buttonHref: "/signup",
					buttonText: "Get Started",
					description: "For growing teams with advanced needs",
					features: [
						{ text: "Up to 20 team members" },
						{ text: "100GB storage" },
						{ text: "Advanced analytics" },
						{ text: "Priority support" },
						{ text: "All features included" },
						{ text: "Custom integrations" },
					],
					isPopular: true,
					period: "mo",
					price: 79,
				},
				{
					name: "Enterprise",
					buttonHref: "/contact",
					buttonText: "Contact Sales",
					description: "For large organizations with custom requirements",
					features: [
						{ text: "Unlimited team members" },
						{ text: "Unlimited storage" },
						{ text: "Custom analytics" },
						{ text: "24/7 dedicated support" },
						{ text: "All features included" },
						{ text: "Custom integrations" },
						{ text: "SLA guarantee" },
						{ text: "Dedicated account manager" },
					],
					isPopular: false,
					period: "mo",
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
				descriptionField({
					defaultValue: "Per editor",
					required: false,
				}),
				{
					name: "isPopular",
					type: "checkbox",
					defaultValue: false,
					label: "Mark as Popular",
				},
				{
					name: "price",
					type: "number",
					defaultValue: 0,
					label: "Price",
					required: true,
				},
				{
					name: "period",
					type: "text",
					defaultValue: "mo",
					label: "Billing Period",
				},
				{
					name: "buttonText",
					type: "text",
					defaultValue: "Get Started",
					label: "Button Text",
					required: true,
				},
				{
					name: "buttonHref",
					type: "text",
					defaultValue: "",
					label: "Button Link",
					required: true,
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
					maxRows: 15,
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
	interfaceName: "Pricing_2_Block",
	labels: {
		plural: "Pricing 2's",
		singular: "Pricing 2",
	},
};
