import type { Block } from "payload";

import { BLOCK_GROUP_FAQ, BLOCK_SLUG_FAQ_1 } from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";

export const FAQ_1_Block: Block = {
	slug: BLOCK_SLUG_FAQ_1,
	admin: {
		group: BLOCK_GROUP_FAQ,
	},
	fields: [
		headerField({
			defaultValue: "Frequently Asked Questions",
			required: false,
		}),
		subheaderField({
			defaultValue:
				"Everything you need to know about UIFoundry's developer templates and hosted solutions",
		}),
		{
			name: "supportLink",
			type: "text",
			defaultValue: "/contact",
			label: "Support Link",
		},
		{
			name: "faq",
			type: "array",
			defaultValue: [
				{
					answer:
						"You get the complete PayloadCMS template with 50+ premium components, full TypeScript source code, deployment guides for AWS/Vercel, and comprehensive documentation. Perfect for agencies and freelancers who want to ship faster.",
					question: "What's included in the developer template?",
				},
				{
					answer:
						"While other libraries only provide components, UIFoundry includes a complete PayloadCMS backend, no-code content management, and optional managed hosting. It's a full-stack solution, not just UI components.",
					question:
						"How is UIFoundry different from component libraries like Tailark?",
				},
				{
					answer:
						"Yes! The hosted plan includes full access to PayloadCMS admin panel for content editing, custom domains, and theme customization. For code-level changes, you can always upgrade to the developer template.",
					question: "Can I customize the hosted solution?",
				},
				{
					answer:
						"You can export your content and upgrade to the developer template at any time. We provide migration guides and support to help you transition to self-hosting when you're ready to scale.",
					question: "What if I outgrow the hosted plan?",
				},
				{
					answer:
						"Developer template includes documentation and community support. Hosted plans include email support with 24-48 hour response times. We also offer paid consultation for custom implementations.",
					question: "Do you provide technical support?",
				},
				{
					answer:
						"We offer a 30-day money-back guarantee on the developer template. Hosted plans can be cancelled anytime with no long-term commitments required.",
					question: "What's your refund policy?",
				},
			],
			fields: [
				{
					name: "question",
					type: "text",
					required: true,
				},
				{
					name: "answer",
					type: "text",
					required: true,
				},
			],
		},
	],
	interfaceName: "FAQ_1_Block",
	labels: {
		plural: "FAQ 1's",
		singular: "FAQ 1",
	},
};
