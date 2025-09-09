import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_SITE_CONFIG } from "~/payload/constants/globals";
import { AUTOSAVE_INTERVAL, COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { env } from "~/env.mjs";

export const SiteConfigGlobal: GlobalConfig = {
	slug: GLOBAL_SLUG_SITE_CONFIG,
	label: "Site Config",
	admin: {
		livePreview: {
			url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/home?draft=true`,
		},
	},
	versions: {
		drafts: {
			autosave: {
				interval: AUTOSAVE_INTERVAL,
			},
		},
	},
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
					Field: "~/payload/globals/SiteConfig/admin/ImportThemeTrigger",
				},
			},
		},
	],
};
