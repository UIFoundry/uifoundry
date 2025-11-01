import type { Block } from "payload";

import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_3 } from "~/payload/constants/blocks";
import callToActionPair from "~/payload/fields/callToActionPair/config";
import headerField from "~/payload/fields/header/config";
import subheaderField from "~/payload/fields/subheader/config";

export const CTA_3_Block: Block = {
	slug: BLOCK_SLUG_CTA_3,
	admin: {
		group: BLOCK_GROUP_CTA,
	},
	fields: [
		headerField({
			defaultValue: "Transform Your Workflow Today",
		}),
		subheaderField({
			defaultValue:
				"Join thousands of teams already using our platform to build better products faster.",
		}),
		callToActionPair({
			maxRows: 2,
			minRows: 0,
		}),
	],
	interfaceName: "CTA_3_Block",
	labels: {
		plural: "CTA 3's",
		singular: "CTA 3",
	},
};
