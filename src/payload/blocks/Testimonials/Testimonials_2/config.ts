import type { Block } from "payload";

import {
	BLOCK_GROUP_TESTIMONIALS,
	BLOCK_SLUG_TESTIMONIALS_2,
} from "~/payload/constants/blocks";
import headerField from "~/payload/fields/header/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Testimonials_2_Block: Block = {
	slug: BLOCK_SLUG_TESTIMONIALS_2,
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
					defaultValue: "What our customers say",
				}),
				subHeaderField({
					defaultValue:
						"Authentic testimonials from thrilled users who've unlocked game-changing results with our platform.",
				}),
			],
			label: "Section Header",
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
							avatar: "https://randomuser.me/api/portraits/women/44.jpg",
							quote:
								"Using this product has completely transformed our design workflow. It's fast, intuitive, and reliable.",
							role: "Product Designer at Formly",
						},
						{
							name: "Lukas Hoffmann",
							avatar: "https://randomuser.me/api/portraits/men/32.jpg",
							quote:
								"We integrated it in less than a day and instantly saw results. Easily one of the best decisions we've made.",
							role: "CTO at NovaCloud",
						},
						{
							name: "Sophie Müller",
							avatar: "https://randomuser.me/api/portraits/women/65.jpg",
							quote:
								"The support team is top-notch. Quick responses, friendly communication, and always willing to help.",
							role: "Marketing Lead at Brightbox",
						},
						{
							name: "Ethan Dubois",
							avatar: "https://randomuser.me/api/portraits/men/27.jpg",
							quote:
								"From performance to UI, everything just works. It's a rare thing to find something this polished.",
							role: "CEO at Kapture",
						},
						{
							name: "Charlotte Moreau",
							avatar: "https://randomuser.me/api/portraits/women/71.jpg",
							quote:
								"It's so refreshing to use a tool that feels like it was made by people who understand developers.",
							role: "Engineering Manager at Octave",
						},
						{
							name: "Nico Weber",
							avatar: "https://randomuser.me/api/portraits/men/41.jpg",
							quote: "Our deployment time dropped by 60% after switching. I wish we had done this earlier.",
							role: "DevOps Engineer at Stackunit",
						},
						{
							name: "Mila Schmidt",
							avatar: "https://randomuser.me/api/portraits/women/36.jpg",
							quote:
								"The attention to detail in the design system is incredible. It made building interfaces so much easier.",
							role: "UI Engineer at Pixelwave",
						},
						{
							name: "Jonas Richter",
							avatar: "https://randomuser.me/api/portraits/men/54.jpg",
							quote: "Our entire team swears by it now. It's become a key part of our daily operations.",
							role: "Founder at Clarity",
						},
						{
							name: "Camille Laurent",
							avatar: "https://randomuser.me/api/portraits/women/24.jpg",
							quote: "Great UX, powerful features, and smooth performance. What more could you ask for?",
							role: "Head of Growth at Nimbus",
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
							label: "Role/Title",
							required: true,
						},
						{
							name: "avatar",
							type: "text",
							label: "Avatar Image URL",
							required: true,
						},
						{
							name: "quote",
							type: "textarea",
							label: "Quote",
							required: true,
						},
					],
					label: "Testimonials List",
					maxRows: 20,
					minRows: 0,
				},
			],
			label: "Testimonials",
		},
	],
	interfaceName: "Testimonials_2_Block",
	labels: {
		plural: "Testimonials 2's",
		singular: "Testimonials 2",
	},
};
