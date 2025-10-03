import type { Block } from "payload";
import { GLOBAL_SLUG_SITE_CONFIG } from "~/payload/constants/globals";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";

export const SiteConfig_Block: Block = {
	slug: GLOBAL_SLUG_SITE_CONFIG,
	fields: [
		{
			name: "activeTheme",
			label: "Active Site Theme",
			type: "relationship",
			relationTo: COLLECTION_SLUG_THEMES,
			required: true,
		},
		{
			name: "importTheme",
			type: "ui",
			admin: {
				components: {
					Field: "~/payload/blocks/SiteConfig/admin/ImportThemeTrigger",
				},
			},
		},
	],
};
