import type { Block } from "payload";

import {
	BLOCK_GROUP_FEATURES,
	BLOCK_SLUG_FEATURES_2,
} from "~/payload/constants/blocks";
import descriptionField from "~/payload/fields/description/config";
import headerField from "~/payload/fields/header/config";
import iconField from "~/payload/fields/icon/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Features_2_Block: Block = {
	slug: BLOCK_SLUG_FEATURES_2,
	admin: {
		group: BLOCK_GROUP_FEATURES,
	},
	fields: [
		headerField({
			defaultValue: "Everything You Need to Ship Fast",
			required: false,
		}),
		subHeaderField({
			defaultValue:
				"Professional blocks, templates, and hosting solutions. Build stunning marketing sites with no-code ease, or customize everything with full developer control.",
			required: false,
		}),
		{
			name: "features",
			type: "array",
			defaultValue: [
				{
					description: "Production-ready components for any marketing site",
					header: "50+ PayloadCMS Blocks",
					icon: "Blocks",
				},
				{
					description: "Deploy to AWS with SST in minutes, not hours",
					header: "One-Click Deploy",
					icon: "Zap",
				},
				{
					description: "Tailwind + shadcn/ui with your design system",
					header: "Full Customization",
					icon: "Palette",
				},
				{
					description: "Responsive blocks that work perfectly on all devices",
					header: "Mobile-First Design",
					icon: "Smartphone",
				},
				{
					description: "Better-auth integration with role-based access",
					header: "Enterprise Auth",
					icon: "Shield",
				},
				{
					description: "Zero-config hosting for non-technical founders",
					header: "Managed Hosting",
					icon: "Rocket",
				},
			],
			fields: [
				iconField({
					required: true,
				}),
				headerField(),
				descriptionField({ required: true }),
			],
		},
	],
	interfaceName: "Features_2_Block",
	labels: {
		plural: "Features 2's",
		singular: "Features 2",
	},
};
