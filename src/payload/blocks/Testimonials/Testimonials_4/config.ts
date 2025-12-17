import type { Block } from "payload";

import {
	BLOCK_GROUP_TESTIMONIALS,
	BLOCK_SLUG_TESTIMONIALS_4,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";
import uploadField from "~/payload/fields/upload/config";

export const Testimonials_4_Block: Block = {
	slug: BLOCK_SLUG_TESTIMONIALS_4,
	admin: {
		group: BLOCK_GROUP_TESTIMONIALS,
	},
	fields: [
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				headerField({
					defaultValue: "What our customers are saying",
				}),
				subheaderField({
					defaultValue:
						"Real stories from teams who build faster, launch smoother, and never look back.",
				}),
			],
			label: "Section Content",
		},
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "testimonials",
					type: "array",
					defaultValue: [
						{
							name: "Isabelle Dupont",
							quote:
								"Using this product has completely transformed our design workflow. It's fast, intuitive, and reliable. We've tried dozens of tools before, but nothing felt this smooth and intentional.",
							role: "Product Designer at Formly",
						},
						{
							name: "Lukas Hoffmann",
							quote:
								"We integrated it in less than a day and instantly saw results. Easily one of the best decisions we've made.",
							role: "CTO at NovaCloud",
						},
						{
							name: "Sophie Müller",
							quote:
								"The support team is top-notch. Quick responses, friendly communication, and always willing to help. We had some edge cases, and they handled them with care and speed.",
							role: "Marketing Lead at Brightbox",
						},
						{
							name: "Ethan Dubois",
							quote:
								"From performance to UI, everything just works. It's a rare thing to find something this polished. I no longer worry about stability during product launches.",
							role: "CEO at Kapture",
						},
						{
							name: "Charlotte Moreau",
							quote:
								"It's so refreshing to use a tool that feels like it was made by people who understand developers.",
							role: "Engineering Manager at Octave",
						},
						{
							name: "Nico Weber",
							quote:
								"Our deployment time dropped by 60% after switching. I wish we had done this earlier. The CI/CD integration is so effortless and stable.",
							role: "DevOps Engineer at Stackunit",
						},
					],
					fields: [
						{
							name: "name",
							type: "text",
							label: "Name",
							required: true,
						},
						{
							name: "role",
							type: "text",
							label: "Role",
							required: true,
						},
						uploadField({
							name: "avatar",
							label: "Avatar",
							required: false,
						}),
						{
							name: "quote",
							type: "textarea",
							label: "Quote",
							required: true,
						},
					],
					label: "Testimonials",
					maxRows: 20,
					minRows: 0,
				},
			],
			label: "Testimonials",
		},
	],
	interfaceName: "Testimonials_4_Block",
	labels: {
		plural: "Testimonials 4's",
		singular: "Testimonials 4",
	},
};
