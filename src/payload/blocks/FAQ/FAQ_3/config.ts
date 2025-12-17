import type { Block } from "payload";

import { BLOCK_GROUP_FAQ, BLOCK_SLUG_FAQ_3 } from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";

export const FAQ_3_Block: Block = {
	slug: BLOCK_SLUG_FAQ_3,
	admin: {
		group: BLOCK_GROUP_FAQ,
	},
	fields: [
		headerField({
			defaultValue: "Frequently Asked Questions",
			required: false,
		}),
		{
			type: "collapsible",
			label: "Support Link",
			admin: {
				initCollapsed: true,
			},
			fields: [
				subheaderField({
					label: "Support Text",
					defaultValue: "Still have questions?",
				}),
				{
					name: "supportLinkText",
					type: "text",
					label: "Support Link Text",
					defaultValue: "Check out our documentation",
				},
				{
					name: "supportLinkHref",
					type: "text",
					label: "Support Link URL",
					defaultValue: "",
				},
			],
		},
		{
			name: "faq",
			type: "array",
			minRows: 0,
			maxRows: 20,
			defaultValue: [
				{
					question: "Can I host frontend and backend apps together?",
					answer:
						"Yes, the platform supports full-stack applications out of the box. You can deploy static frontend files alongside serverless functions, APIs, or containerized backends in a single project, making development and maintenance much simpler.",
				},
				{
					question: "Can I manage staging and production easily?",
					answer:
						"Yes, you can create separate environments for development, staging, and production. Each environment can have its own settings, secrets, and deployments, which helps prevent bugs and makes testing safer and more reliable.",
				},
				{
					question: "Will my app scale when traffic increases?",
					answer:
						"Yes, apps scale automatically based on real-time demand. You don't need to configure anything manually, the system handles load balancing and resource allocation to keep your app fast and responsive during traffic spikes.",
				},
				{
					question: "Can I use my own domain with HTTPS?",
					answer:
						"Yes, you can connect any custom domain and get free HTTPS certificates that are automatically issued and renewed. You don't need to worry about manual certificate setup or security compliance.",
				},
				{
					question: "Are preview URLs generated on changes?",
					answer:
						"Yes, every push to your repository or open pull request will trigger a unique preview deployment. These preview URLs are perfect for testing, QA reviews, and stakeholder feedback before merging to production.",
				},
				{
					question: "Can I run background jobs or cron tasks?",
					answer:
						"Yes, you can run background processes and scheduled tasks using serverless functions or containers. These can handle things like email dispatch, database cleanup, or integrations that run on intervals you define.",
				},
				{
					question: "Do I get logs and error tracking built in?",
					answer:
						"Yes, the platform provides built-in access to logs, request traces, and error details. You can inspect serverless function output, diagnose failed deployments, and monitor usage metrics directly from the dashboard.",
				},
				{
					question: "Are serverless functions fast and global?",
					answer:
						"Yes, serverless functions run on a global edge network and are optimized for minimal cold start latency. They automatically spin up near your users, ensuring fast and consistent performance across regions.",
				},
				{
					question: "Can I invite my team and manage roles?",
					answer:
						"Yes, team collaboration is built in. You can invite developers, assign roles like admin or viewer, and restrict access to specific projects, environments, or features with fine-grained permission controls.",
				},
				{
					question: "Can I integrate external APIs or databases?",
					answer:
						"Yes, you can connect to any third-party API or database using secure environment variables and backend logic. Whether it's a REST API, GraphQL endpoint, or a hosted SQL database, integration is seamless and secure.",
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
					type: "textarea",
					required: true,
				},
			],
		},
	],
	interfaceName: "FAQ_3_Block",
	labels: {
		plural: "FAQ 3's",
		singular: "FAQ 3",
	},
};
