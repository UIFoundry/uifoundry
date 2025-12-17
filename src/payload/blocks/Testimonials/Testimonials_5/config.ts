import type { Block } from "payload";

import {
	BLOCK_GROUP_TESTIMONIALS,
	BLOCK_SLUG_TESTIMONIALS_5,
} from "~/payload/constants/blocks";

export const Testimonials_5_Block: Block = {
	slug: BLOCK_SLUG_TESTIMONIALS_5,
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
				{
					name: "quote",
					type: "textarea",
					defaultValue:
						"We cut dev time in half and actually enjoyed the process. Everything feels designed for speed and clarity — it just makes sense.",
					label: "Quote",
					required: true,
				},
			],
			label: "Testimonial Content",
		},
		{
			type: "collapsible",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "authorName",
					type: "text",
					defaultValue: "Lena Fischer",
					label: "Author Name",
					required: true,
				},
				{
					name: "authorRole",
					type: "text",
					defaultValue: "Lead Frontend Engineer at Skyloft",
					label: "Author Role/Title",
					required: true,
				},
				{
					name: "authorImage",
					type: "text",
					defaultValue: "https://randomuser.me/api/portraits/women/52.jpg",
					label: "Author Image URL",
					required: true,
				},
			],
			label: "Author Information",
		},
	],
	interfaceName: "Testimonials_5_Block",
	labels: {
		plural: "Testimonials 5's",
		singular: "Testimonials 5",
	},
};
