import type { Block } from "payload";

import {
	BLOCK_GROUP_TESTIMONIALS,
	BLOCK_SLUG_TESTIMONIALS_1,
} from "@/registry/default/lib/constants/blocks";
import headerField from "@/registry/default/lib/fields/header/config";
import subheaderField from "@/registry/default/lib/fields/subheader/config";

export const Testimonials_1_Block: Block = {
	slug: BLOCK_SLUG_TESTIMONIALS_1,
	admin: {
		group: BLOCK_GROUP_TESTIMONIALS,
	},
	fields: [
		{
			type: "collapsible",
			label: "Content",
			admin: {
				initCollapsed: false,
			},
			fields: [
				headerField({
					defaultValue: "What our customers say",
				}),
				subheaderField({
					defaultValue:
						"Authentic testimonials from thrilled users who've unlocked game-changing results with our platform.",
				}),
			],
		},
		{
			name: "testimonials",
			type: "array",
			minRows: 0,
			maxRows: 20,
			defaultValue: [
				{
					name: "Isabelle Dupont",
					role: "Product Designer at Formly",
					avatar: "https://randomuser.me/api/portraits/women/44.jpg",
					quote:
						"Using this product has completely transformed our design workflow. It's fast, intuitive, and reliable.",
				},
				{
					name: "Lukas Hoffmann",
					role: "CTO at NovaCloud",
					avatar: "https://randomuser.me/api/portraits/men/32.jpg",
					quote:
						"We integrated it in less than a day and instantly saw results. Easily one of the best decisions we've made.",
				},
				{
					name: "Sophie Müller",
					role: "Marketing Lead at Brightbox",
					avatar: "https://randomuser.me/api/portraits/women/65.jpg",
					quote:
						"The support team is top-notch. Quick responses, friendly communication, and always willing to help.",
				},
				{
					name: "Ethan Dubois",
					role: "CEO at Kapture",
					avatar: "https://randomuser.me/api/portraits/men/27.jpg",
					quote:
						"From performance to UI, everything just works. It's a rare thing to find something this polished.",
				},
				{
					name: "Charlotte Moreau",
					role: "Engineering Manager at Octave",
					avatar: "https://randomuser.me/api/portraits/women/71.jpg",
					quote:
						"It's so refreshing to use a tool that feels like it was made by people who understand developers.",
				},
				{
					name: "Nico Weber",
					role: "DevOps Engineer at Stackunit",
					avatar: "https://randomuser.me/api/portraits/men/41.jpg",
					quote:
						"Our deployment time dropped by 60% after switching. I wish we had done this earlier.",
				},
				{
					name: "Mila Schmidt",
					role: "UI Engineer at Pixelwave",
					avatar: "https://randomuser.me/api/portraits/women/36.jpg",
					quote:
						"The attention to detail in the design system is incredible. It made building interfaces so much easier.",
				},
				{
					name: "Jonas Richter",
					role: "Founder at Clarity",
					avatar: "https://randomuser.me/api/portraits/men/54.jpg",
					quote:
						"Our entire team swears by it now. It's become a key part of our daily operations.",
				},
				{
					name: "Camille Laurent",
					role: "Head of Growth at Nimbus",
					avatar: "https://randomuser.me/api/portraits/women/24.jpg",
					quote:
						"Great UX, powerful features, and smooth performance. What more could you ask for?",
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
				{
					name: "avatar",
					type: "text",
					label: "Avatar URL",
					required: false,
				},
				{
					name: "quote",
					type: "textarea",
					label: "Quote",
					required: true,
				},
			],
			labels: {
				plural: "Testimonials",
				singular: "Testimonial",
			},
		},
	],
	interfaceName: "Testimonials_1_Block",
	labels: {
		plural: "Testimonials 1's",
		singular: "Testimonials 1",
	},
};
