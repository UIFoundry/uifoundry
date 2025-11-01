import type { Block } from "payload";

import {
	BLOCK_SLUG_FEATURES_1,
	BLOCK_SLUG_FEATURES_2,
	BLOCK_SLUG_FEATURES_3,
} from "~/payload/constants/blocks";

import Features_1, { Features_1_Block } from "./Features_1";
import Features_2, { Features_2_Block } from "./Features_2";
import Features_3, { Features_3_Block } from "./Features_3";

export const blocks: Block[] = [Features_1_Block, Features_2_Block, Features_3_Block];

export const blockComponents = {
	[BLOCK_SLUG_FEATURES_1]: Features_1,
	[BLOCK_SLUG_FEATURES_2]: Features_2,
	[BLOCK_SLUG_FEATURES_3]: Features_3,
};
