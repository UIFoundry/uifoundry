import type { GlobalConfig } from "payload";

import { env } from "~/env.mjs";
import { blocks } from "~/payload/blocks/Header/config";
import { GLOBAL_SLUG_HEADER } from "~/payload/constants/globals";

export const HeaderGlobal: GlobalConfig = {
	slug: GLOBAL_SLUG_HEADER,
	admin: {
		livePreview: {
			url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview`,
		},
	},
	fields: [
		{
			name: "header",
			type: "blocks",
			blocks,
			maxRows: 1,
			minRows: 1,
			required: true,
		},
	],
};
