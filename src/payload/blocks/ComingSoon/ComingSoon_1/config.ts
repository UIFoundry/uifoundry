import type { Block } from "payload";

import {
	BLOCK_GROUP_COMING_SOON,
	BLOCK_SLUG_COMING_SOON_1,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import socialLinksField from "~/payload/fields/socialLinks/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const ComingSoon_1_Block: Block = {
	slug: BLOCK_SLUG_COMING_SOON_1,
	admin: {
		group: BLOCK_GROUP_COMING_SOON,
	},
	fields: [
		headerField(),
		subHeaderField(),
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "launchDate",
					type: "date",
					admin: {
						description: "The date when your project will launch",
					},
					label: "Launch Date",
					required: true,
				},
			],
			label: "Launch Date",
		},
		{
			type: "collapsible",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "showEmailSignup",
					type: "checkbox",
					defaultValue: true,
					label: "Show Email Signup",
				},
				{
					name: "emailPlaceholder",
					type: "text",
					defaultValue: "Enter your email",
					label: "Email Input Placeholder",
				},
				{
					name: "emailButtonText",
					type: "text",
					defaultValue: "Notify me",
					label: "Email Button Text",
				},
			],
			label: "Email Signup",
		},
		{
			type: "collapsible",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "showSocialLinks",
					type: "checkbox",
					defaultValue: false,
					label: "Show Social Links",
				},
				socialLinksField({
					name: "socialLinks",
				}),
			],
			label: "Social Links",
		},
	],
	interfaceName: "ComingSoon_1_Block",
	labels: {
		plural: "Coming Soon 1's",
		singular: "Coming Soon 1",
	},
};
