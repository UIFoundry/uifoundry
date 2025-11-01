import type { Block } from "payload";

import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_2 } from "@/registry/default/lib/constants/blocks";
import callToActionPair from "@/registry/default/lib/fields/callToActionPair/config";
import headerField from "@/registry/default/lib/fields/header/config";

export const CTA_2_Block: Block = {
	slug: BLOCK_SLUG_CTA_2,
	admin: {
		group: BLOCK_GROUP_CTA,
	},
	fields: [
		headerField({
			defaultValue: "Action-driving headline that creates urgency",
		}),
		callToActionPair({
			admin: {
				initCollapsed: true,
			},
			defaultValue: [
				{
					href: "",
					label: "Get started",
				},
				{
					href: "",
					label: "Learn more",
				},
			],
		}),
	],
	interfaceName: "CTA_2_Block",
	labels: {
		plural: "CTA 2's",
		singular: "CTA 2",
	},
};
