import type { Block } from "payload";

import {
	BLOCK_GROUP_FEATURES,
	BLOCK_SLUG_FEATURES_3,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/icon/config";

export const Features_3_Block: Block = {
	slug: BLOCK_SLUG_FEATURES_3,
	admin: {
		group: BLOCK_GROUP_FEATURES,
	},
	fields: [
		{
			name: "header",
			type: "text",
			defaultValue: "Powerful Features",
			label: "Header",
			required: true,
		},
		{
			name: "subheader",
			type: "text",
			defaultValue:
				"Everything you need to build modern web applications with confidence",
			label: "SubHeader",
			required: true,
		},
		{
			name: "features",
			type: "array",
			defaultValue: [
				{
					description: "Optimized for speed and performance",
					icon: "Zap",
					title: "Lightning Fast",
				},
				{
					description: "Built with security best practices",
					icon: "Shield",
					title: "Secure by Default",
				},
				{
					description: "Clean APIs and excellent documentation",
					icon: "Code",
					title: "Developer Friendly",
				},
			],
			fields: [
				{
					name: "title",
					type: "text",
					admin: {
						placeholder: "New Feature",
					},
					defaultValue: "New Feature",
					label: "Title",
					required: true,
				},
				{
					name: "description",
					type: "text",
					defaultValue: "",
					label: "Description",
					required: true,
				},
				iconField(),
			],
			minRows: 1,
			required: true,
		},
	],
	interfaceName: "Features_3_Block",
	labels: {
		plural: "Features 3's",
		singular: "Features 3",
	},
};
