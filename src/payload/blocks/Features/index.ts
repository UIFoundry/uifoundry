import type { Block } from "payload";
import {
	BLOCK_SLUG_FEATURES_1,
	BLOCK_SLUG_FEATURES_2,
} from "~/payload/constants/blocks";
import Features_1, { Features_1_Block } from "./Features_1";
import Features_2, { Features_2_Block } from "./Features_2";

export const blocks: Block[] = [Features_1_Block, Features_2_Block];

export const blockComponents = {
	[BLOCK_SLUG_FEATURES_1]: Features_1,
	[BLOCK_SLUG_FEATURES_2]: Features_2,
};
