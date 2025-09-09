import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_SITE_CONFIG } from "~/payload/constants/globals";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { env } from "~/env.mjs";

export const SiteConfigGlobal: GlobalConfig = {
	slug: GLOBAL_SLUG_SITE_CONFIG,
	label: "Site Config",
	admin: {
		livePreview: {
			url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/home?draft=true`,
		},
	},
	fields: [
		{
			name: "activeTheme",
			type: "relationship",
			relationTo: COLLECTION_SLUG_THEMES,
			label: "Active Site Theme",
			required: true,
			admin: {
				description: "Select the theme to apply across your entire site",
				components: {
					Field: "~/payload/globals/SiteConfig/admin/ActiveThemeField",
				},
			},
		},
	],
};
