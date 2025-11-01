import type { Block } from "payload";

import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_2 } from "~/payload/constants/blocks";
import callToActionPair from "~/payload/fields/callToActionPair/config";
import headerField from "~/payload/fields/header/config";

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
			minRows: 0,
			maxRows: 2,
		}),
	],
	interfaceName: "CTA_2_Block",
	labels: {
		plural: "CTA 2's",
		singular: "CTA 2",
	},
};
