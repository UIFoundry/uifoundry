import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_HEADER } from "~/payload/constants/globals";
import { blocks } from "~/payload/blocks/Header/config";
import { env } from "~/env.mjs";

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
			required: true,
			maxRows: 1,
			minRows: 1,
			blocks: blocks,
		},
	],
};
