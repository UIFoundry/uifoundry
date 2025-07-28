import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_FOOTER } from "~/payload/constants/globals";
import { blocks } from "~/payload/blocks/Footer"

export const FooterGlobal: GlobalConfig = {
	slug: GLOBAL_SLUG_FOOTER,
	fields: [
		{
			name: "footer",
			type: "blocks",
			required: true,
			maxRows: 1,
			minRows: 1,
			blocks: blocks
		}
	]
}

