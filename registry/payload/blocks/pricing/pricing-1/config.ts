import type { Block } from "payload";

import {
	BLOCK_GROUP_PRICING,
	BLOCK_SLUG_PRICING_1,
} from "@/registry/default/lib/constants/blocks";
import descriptionField from "@/registry/default/lib/fields/description/config";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";

export const Pricing_1_Block: Block = {
	slug: BLOCK_SLUG_PRICING_1,
	admin: {
		group: BLOCK_GROUP_PRICING,
	},
	fields: [
		headerField({
			defaultValue: "Choose Your Plan",
			required: false,
		}),
		subHeaderField({
			defaultValue:
				"Choose the perfect plan for your needs. Get the template for self-hosting or let us handle everything with managed hosting.",
		}),
		{
			name: "config",
			type: "group",
			fields: [
				{
					name: "focusIndex",
					type: "number",
					defaultValue: -1,
					label: "Featured Plan Index",
					required: false,
				},
				{
					name: "focusLabel",
					type: "text",
					defaultValue: "Most Popular",
					label: "Featured Plan Label",
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
					callToAction: "Purchase Template",
					description:
						"Perfect for agencies and freelancers who want to ship faster",
					features: [
						{ text: "Complete PayloadCMS template" },
						{ text: "50+ premium components" },
						{ text: "Full TypeScript source code" },
						{ text: "AWS & Vercel deployment guides" },
						{ text: "Comprehensive documentation" },
						{ text: "Community support" },
						{ text: "Free updates for 1 year" },
						{ text: "Commercial license included" },
					],
					label: "Developer",
					pricing: {
						annual: false,
						fixed: true,
						monthly: false,
						value: 299,
					},
				},
				{
					callToAction: "Start Free Trial",
					description:
						"Launch without hiring developers - managed hosting included",
					features: [
						{ text: "No-code content editing" },
						{ text: "Managed AWS hosting" },
						{ text: "Custom domain included" },
						{ text: "SSL certificates & CDN" },
						{ text: "Automatic backups" },
						{ text: "Email support (24-48h)" },
						{ text: "99.9% uptime SLA" },
						{ text: "Export data anytime" },
					],
					label: "Founder",
					pricing: {
						annual: false,
						fixed: false,
						monthly: true,
						value: 49,
					},
				},
			],
			fields: [
				{
					name: "label",
					type: "text",
					required: true,
				},
				descriptionField(),
				{
					name: "callToAction",
					type: "text",
					defaultValue: "Get Started",
					required: true,
				},
				{
					name: "pricing",
					type: "group",
					fields: [
						{
							name: "value",
							type: "number",
							required: true,
						},
						{
							name: "annual",
							type: "checkbox",
							defaultValue: false,
							required: true,
						},
						{
							name: "monthly",
							type: "checkbox",
							defaultValue: false,
							required: true,
						},
						{
							name: "fixed",
							type: "checkbox",
							defaultValue: true,
							required: true,
						},
					],
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
				},
			],
			label: {
				plural: "Payment Tiers",
				singular: "Payment Tier",
			},
		},
	],
	interfaceName: "Pricing_1_Block",
	labels: {
		plural: "Pricing 1's",
		singular: "Pricing 1",
	},
};
