import type { Block } from "payload";

import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_1 } from "~/payload/constants/blocks";
import callToActionPair from "~/payload/fields/callToActionPair/config";
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";

export const CTA_1_Block: Block = {
	slug: BLOCK_SLUG_CTA_1,
	admin: {
		group: BLOCK_GROUP_CTA,
	},
	fields: [
		headerField({
			defaultValue: "Ready to Ship Your Next Project?",
		}),
		subheaderField({
			defaultValue:
				"Join the developers and founders building faster with UIFoundry. Choose your path and start building today.",
		}),
		callToActionPair({
			defaultValue: [
				{
					href: "/purchase",
					label: "Get Developer Template",
				},
				{
					href: "/signup",
					label: "Start Hosted Trial",
				},
			],
			maxRows: 2,
			minRows: 0,
		}),
	],
	interfaceName: "CTA_1_Block",
	labels: {
		plural: "CTA 1's",
		singular: "CTA 1",
	},
};
