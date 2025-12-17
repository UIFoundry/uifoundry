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
			label: "Testimonial Content",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "quote",
					type: "textarea",
					label: "Quote",
					required: true,
					defaultValue:
						"We cut dev time in half and actually enjoyed the process. Everything feels designed for speed and clarity — it just makes sense.",
				},
			],
		},
		{
			type: "collapsible",
			label: "Author Information",
			admin: {
				initCollapsed: false,
			},
			fields: [
				{
					name: "authorName",
					type: "text",
					label: "Author Name",
					required: true,
					defaultValue: "Lena Fischer",
				},
				{
					name: "authorRole",
					type: "text",
					label: "Author Role/Title",
					required: true,
					defaultValue: "Lead Frontend Engineer at Skyloft",
				},
				{
					name: "authorImage",
					type: "text",
					label: "Author Image URL",
					required: true,
					defaultValue: "https://randomuser.me/api/portraits/women/52.jpg",
				},
			],
		},
	],
	interfaceName: "Testimonials_5_Block",
	labels: {
		plural: "Testimonials 5's",
		singular: "Testimonials 5",
	},
};
