import type { Block } from "payload";
import {
	BLOCK_GROUP_FEATURES,
	BLOCK_SLUG_FEATURES_2,
} from "~/payload/constants/blocks";
import descriptionField from "~/payload/fields/descriptionField/config";
import headerField from "~/payload/fields/header/config";
import iconField from "~/payload/fields/iconField/config";
import subHeaderField from "~/payload/fields/subheader/config";

export const Features_2_Block: Block = {
	slug: BLOCK_SLUG_FEATURES_2,
	interfaceName: "Features_2_Block",
	labels: {
		singular: "Features 2",
		plural: "Features 2's",
	},
	admin: {
		group: BLOCK_GROUP_FEATURES,
	},
	fields: [
		headerField({
			required: false,
			defaultValue: "Everything You Need to Ship Fast",
		}),
		subHeaderField({
			required: false,
			defaultValue:
				"Professional blocks, templates, and hosting solutions. Build stunning marketing sites with no-code ease, or customize everything with full developer control.",
		}),
		{
			name: "features",
			type: "array",
			fields: [
				iconField({
					required: true,
				}),
				headerField(),
				descriptionField({ required: true }),
			],
			defaultValue: [
				{
					icon: "Blocks",
					header: "50+ PayloadCMS Blocks",
					description: "Production-ready components for any marketing site",
				},
				{
					icon: "Zap",
					header: "One-Click Deploy",
					description: "Deploy to AWS with SST in minutes, not hours",
				},
				{
					icon: "Palette",
					header: "Full Customization",
					description: "Tailwind + shadcn/ui with your design system",
				},
				{
					icon: "Smartphone",
					header: "Mobile-First Design",
					description: "Responsive blocks that work perfectly on all devices",
				},
				{
					icon: "Shield",
					header: "Enterprise Auth",
					description: "Better-auth integration with role-based access",
				},
				{
					icon: "Rocket",
					header: "Managed Hosting",
					description: "Zero-config hosting for non-technical founders",
				},
			],
		},
	],
};
