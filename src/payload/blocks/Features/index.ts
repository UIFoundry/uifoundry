import type { Block } from "payload"
import {
	BLOCK_SLUG_FEATURES_1
} from "~/payload/constants/blocks"
import Features_1, { Features_1_Block } from "./Features_1"

export const blocks: Block[] = [
	Features_1_Block,
]

export const blockComponents = {
	[BLOCK_SLUG_FEATURES_1]: Features_1
}
