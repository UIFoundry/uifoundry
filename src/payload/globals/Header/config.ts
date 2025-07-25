import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_HEADER } from "~/payload/constants/globals";
import { blocks } from "~/payload/blocks/Headers"

export const HeaderGlobal: GlobalConfig = {
	slug: GLOBAL_SLUG_HEADER,
	fields: [
		{
			name: "header",
			type: "blocks",
			required: true,
			maxRows: 1,
			minRows: 1,
			blocks: blocks
		}
	]
}

