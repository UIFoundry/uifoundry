import type { Block } from "payload";
import {
	BLOCK_GROUP_FEATURES,
	BLOCK_SLUG_FEATURES_1,
} from "@/registry/default/lib/constants/blocks";
import iconField from "@/registry/default/lib/fields/icon/config";

export const Features_1_Block: Block = {
	slug: BLOCK_SLUG_FEATURES_1,
	interfaceName: "Features_1_Block",
	labels: {
		singular: "Features 1",
		plural: "Features 1's",
	},
	admin: {
		group: BLOCK_GROUP_FEATURES,
	},
	fields: [
		{
			name: "header",
			type: "text",
			label: "Header",
			required: true,
			defaultValue: "Powerful Features",
		},
		{
			name: "subheader",
			type: "text",
			label: "SubHeader",
			required: true,
			defaultValue:
				"Everything you need to build modern web applications with confidence",
		},
		{
			name: "features",
			type: "array",
			required: true,
			minRows: 1,
			fields: [
				{
					name: "title",
					type: "text",
					label: "Title",
					required: true,
					defaultValue: "New Feature",
					admin: {
						placeholder: "New Feature",
					},
				},
				{
					name: "description",
					type: "text",
					label: "Description",
					required: true,
					defaultValue: "",
				},
				iconField(),
			],
			defaultValue: [
				{
					icon: "Zap",
					title: "Lightning Fast",
					description: "Optimized for speed and performance",
				},
				{
					icon: "Shield",
					title: "Secure by Default",
					description: "Built with security best practices",
				},
				{
					icon: "Code",
					title: "Developer Friendly",
					description: "Clean APIs and excellent documentation",
				},
			],
		},
	],
};
