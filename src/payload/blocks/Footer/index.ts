import type { Block } from "payload"
import Footer_1 from "./Footer_1"
import { Footer_1_Block } from "./Footer_1/config"
import { BLOCK_SLUG_FOOTER_1 } from "~/payload/constants/blocks"

export const blocks: Block[] = [
	Footer_1_Block,
]

export const blockComponents = {
	[BLOCK_SLUG_FOOTER_1]: Footer_1,
}

