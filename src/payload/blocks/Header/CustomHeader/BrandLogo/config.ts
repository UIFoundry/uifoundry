import type { Block } from "payload";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_BRAND_LOGO,
} from "~/payload/constants/blocks";
import { FLEX_ALIGNMENT } from "~/payload/constants";
import selectEnumField from "~/payload/fields/selectEnumField/config";
import uploadField from "~/payload/fields/uploadField/config";

export const HeaderBrandLogoBlock: Block = {
	slug: BLOCK_SLUG_HEADER_BRAND_LOGO,
	interfaceName: "HeaderBrandLogoBlock",
	labels: {
		singular: "Brand Logo",
		plural: "Brand Logos",
	},
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
			label: "Target Link (href)",
			type: "text",
			required: true,
			defaultValue: "/home",
		},
		uploadField({
			name: "media",
		}),
	],
};
