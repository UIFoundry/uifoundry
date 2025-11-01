import type { Block } from "payload";

import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_1 } from "@/registry/default/lib/constants/blocks";
import callToActionPair from "@/registry/default/lib/fields/callToActionPair/config";
import headerField from "@/registry/default/lib/fields/header/config";
import subheaderField from "@/registry/default/lib/fields/subheader/config";

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
			minRows: 0,
			maxRows: 2,
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
		}),
	],
	interfaceName: "CTA_1_Block",
	labels: {
		plural: "CTA 1's",
		singular: "CTA 1",
	},
};
