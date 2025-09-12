import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_HEADER } from "@/registry/default/lib/constants/globals";
import { blocks } from "@/registry/default/lib/blocks/Header";

export const HeaderGlobal: GlobalConfig = {
	slug: GLOBAL_SLUG_HEADER,
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
