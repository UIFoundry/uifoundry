import {
	BLOCK_GROUP_TESTIMONIALS,
	BLOCK_SLUG_TESTIMONIALS_4,
} from "@/registry/default/lib/constants/blocks";
import type { Block } from "payload";
import headerField from "@/registry/default/lib/fields/header/config";
import subheaderField from "@/registry/default/lib/fields/subheader/config";
import uploadField from "@/registry/default/lib/fields/upload/config";

export const Testimonials_4_Block: Block = {
	slug: BLOCK_SLUG_TESTIMONIALS_4,
	labels: {
		singular: "Testimonials 4",
		plural: "Testimonials 4's",
	},
	admin: {
		group: BLOCK_GROUP_TESTIMONIALS,
	},
	interfaceName: "Testimonials_4_Block",
	fields: [
		{
			type: "collapsible",
			label: "Section Content",
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
		},
		{
			type: "collapsible",
			label: "Testimonials",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "testimonials",
					label: "Testimonials",
					type: "array",
					minRows: 0,
					maxRows: 20,
					defaultValue: [
						{
							name: "Isabelle Dupont",
							role: "Product Designer at Formly",
							quote:
								"Using this product has completely transformed our design workflow. It's fast, intuitive, and reliable. We've tried dozens of tools before, but nothing felt this smooth and intentional.",
						},
						{
							name: "Lukas Hoffmann",
							role: "CTO at NovaCloud",
							quote:
								"We integrated it in less than a day and instantly saw results. Easily one of the best decisions we've made.",
						},
						{
							name: "Sophie Müller",
							role: "Marketing Lead at Brightbox",
							quote:
								"The support team is top-notch. Quick responses, friendly communication, and always willing to help. We had some edge cases, and they handled them with care and speed.",
						},
						{
							name: "Ethan Dubois",
							role: "CEO at Kapture",
							quote:
								"From performance to UI, everything just works. It's a rare thing to find something this polished. I no longer worry about stability during product launches.",
						},
						{
							name: "Charlotte Moreau",
							role: "Engineering Manager at Octave",
							quote:
								"It's so refreshing to use a tool that feels like it was made by people who understand developers.",
						},
						{
							name: "Nico Weber",
							role: "DevOps Engineer at Stackunit",
							quote:
								"Our deployment time dropped by 60% after switching. I wish we had done this earlier. The CI/CD integration is so effortless and stable.",
						},
					],
					fields: [
						{
							name: "name",
							label: "Name",
							type: "text",
							required: true,
						},
						{
							name: "role",
							label: "Role",
							type: "text",
							required: true,
						},
						uploadField({
							name: "avatar",
							label: "Avatar",
							required: false,
						}),
						{
							name: "quote",
							label: "Quote",
							type: "textarea",
							required: true,
						},
					],
				},
			],
		},
	],
};
