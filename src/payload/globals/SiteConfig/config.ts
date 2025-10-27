import type { GlobalConfig } from "payload";

import { env } from "~/env.mjs";
import { AUTOSAVE_INTERVAL, COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { GLOBAL_SLUG_SITE_CONFIG } from "~/payload/constants/globals";

export const SiteConfigGlobal: GlobalConfig = {
	slug: GLOBAL_SLUG_SITE_CONFIG,
	admin: {
		livePreview: {
			url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/home?draft=true`,
		},
	},
	fields: [
		{
			name: "activeTheme",
			type: "relationship",
			label: "Active Site Theme",
			relationTo: COLLECTION_SLUG_THEMES,
			required: true,
		},
		{
			name: "importTheme",
			type: "ui",
			admin: {
				components: {
					Field: "~/payload/globals/SiteConfig/admin/ImportThemeTrigger",
				},
			},
		},
	],
	label: "Site Config",
	versions: {
		drafts: {
			autosave: {
				interval: AUTOSAVE_INTERVAL,
			},
		},
	},
};
