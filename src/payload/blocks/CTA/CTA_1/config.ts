import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_1 } from "~/payload/constants/blocks";
import headerField from "~/payload/fields/headerField/config";
import subheaderField from "~/payload/fields/subheaderField/config";
import callToActionPair from "~/payload/fields/callToActionPairField/config";

export const CTA_1_Block: Block = {
	slug: BLOCK_SLUG_CTA_1,
	labels: {
		singular: "CTA 1",
		plural: "CTA 1's",
	},
	admin: {
		group: BLOCK_GROUP_CTA,
	},
	interfaceName: "CTA_1_Block",
	fields: [
		headerField({
			defaultValue: "Ready to Ship Your Next Project?",
		}),
		subheaderField({
			defaultValue:
				"Join the developers and founders building faster with UIFoundry. Choose your path and start building today.",
		}),
		callToActionPair({
			admin: {
				initCollapsed: true,
			},
			defaultValue: [
				{
					label: "Get Developer Template",
					href: "/purchase",
				},
				{
					label: "Start Hosted Trial",
					href: "/signup",
				},
			],
		}),
	],
};
