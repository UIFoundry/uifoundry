import {
	BLOCK_GROUP_COMING_SOON,
	BLOCK_SLUG_COMING_SOON_1,
} from "@/registry/default/lib/constants/blocks";
import type { Block } from "payload";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";
import socialLinksField from "@/registry/default/lib/fields/socialLinks/config";

export const ComingSoon_1_Block: Block = {
	slug: BLOCK_SLUG_COMING_SOON_1,
	labels: {
		singular: "Coming Soon 1",
		plural: "Coming Soon 1's",
	},
	admin: {
		group: BLOCK_GROUP_COMING_SOON,
	},
	interfaceName: "ComingSoon_1_Block",
	fields: [
		headerField(),
		subHeaderField(),
		{
			type: "collapsible",
			label: "Launch Date",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "launchDate",
					label: "Launch Date",
					type: "date",
					required: true,
					admin: {
						description: "The date when your project will launch",
					},
				},
			],
		},
		{
			type: "collapsible",
			label: "Email Signup",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "showEmailSignup",
					label: "Show Email Signup",
					type: "checkbox",
					defaultValue: true,
				},
				{
					name: "emailPlaceholder",
					label: "Email Input Placeholder",
					type: "text",
					defaultValue: "Enter your email",
				},
				{
					name: "emailButtonText",
					label: "Email Button Text",
					type: "text",
					defaultValue: "Notify me",
				},
			],
		},
		{
			type: "collapsible",
			label: "Social Links",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "showSocialLinks",
					label: "Show Social Links",
					type: "checkbox",
					defaultValue: false,
				},
				socialLinksField({
					name: "socialLinks",
				}),
			],
		},
	],
};
