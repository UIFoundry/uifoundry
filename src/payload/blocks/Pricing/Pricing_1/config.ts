import type { Block } from "payload";
import {
	BLOCK_GROUP_PRICING,
	BLOCK_SLUG_PRICING_1,
} from "~/payload/constants/blocks";
import descriptionField from "~/payload/fields/descriptionField/config";
import headerField from "~/payload/fields/headerField/config";
import subHeaderField from "~/payload/fields/subheaderField/config";

export const Pricing_1_Block: Block = {
	slug: BLOCK_SLUG_PRICING_1,
	labels: {
		singular: "Pricing 1",
		plural: "Pricing 1's",
	},
	interfaceName: "Pricing_1_Block",
	admin: {
		group: BLOCK_GROUP_PRICING,
	},
	fields: [
		headerField({
			required: false,
			defaultValue: "Choose Your Plan",
		}),
		subHeaderField({
			defaultValue:
				"Choose the perfect plan for your needs. Get the template for self-hosting or let us handle everything with managed hosting.",
		}),
		{
			label: "Config",
			type: "group",
			fields: [
				{
					name: "focusIndex",
					label: "Featured Plan Index",
					type: "number",
					required: false,
					defaultValue: -1,
				},
				{
					name: "focusLabel",
					label: "Featured Plan Label",
					type: "text",
					required: true,
					defaultValue: "Most Popular",
				},
			],
		},
		{
			name: "tiers",
			label: {
				singular: "Payment Tier",
				plural: "Payment Tiers",
			},
			type: "array",
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
					required: true,
					defaultValue: "Get Started",
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
							required: true,
							defaultValue: false,
						},
						{
							name: "monthly",
							type: "checkbox",
							required: true,
							defaultValue: false,
						},
						{
							name: "fixed",
							type: "checkbox",
							required: true,
							defaultValue: true,
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
			defaultValue: [
				{
					label: "Developer",
					description:
						"Perfect for agencies and freelancers who want to ship faster",
					callToAction: "Purchase Template",
					pricing: {
						value: 299,
						annual: false,
						monthly: false,
						fixed: true,
					},
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
				},
				{
					label: "Founder",
					description:
						"Launch without hiring developers - managed hosting included",
					callToAction: "Start Free Trial",
					pricing: {
						value: 49,
						annual: false,
						monthly: true,
						fixed: false,
					},
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
				},
			],
		},
	],
};
