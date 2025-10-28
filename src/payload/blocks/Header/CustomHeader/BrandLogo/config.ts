import type { Block } from "payload";

import { FLEX_ALIGNMENT } from "~/payload/constants";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_BRAND_LOGO,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/media/config";
import selectEnumField from "~/payload/fields/selectEnum/config";

export const HeaderBrandLogoBlock: Block = {
	slug: BLOCK_SLUG_HEADER_BRAND_LOGO,
	admin: {
		group: BLOCK_GROUP_HEADERS,
	},
	fields: [
		selectEnumField(FLEX_ALIGNMENT, {
			name: "alignment",
			defaultValue: FLEX_ALIGNMENT.left,
		}),
		{
			name: "href",
			type: "text",
			defaultValue: "/home",
			label: "Target Link (href)",
			required: true,
		},
		mediaField({
			name: "media",
		}),
	],
	interfaceName: "HeaderBrandLogoBlock",
	labels: {
		plural: "Brand Logos",
		singular: "Brand Logo",
	},
};
