import { BLOCK_SLUG_FAQ_1, BLOCK_SLUG_FAQ_2, BLOCK_SLUG_FAQ_3, BLOCK_SLUG_FAQ_4, BLOCK_SLUG_FAQ_5 } from "~/payload/constants/blocks";

import FAQ_1, { FAQ_1_Block } from "./FAQ_1";
import FAQ_2, { FAQ_2_Block } from "./FAQ_2";
import FAQ_3, { FAQ_3_Block } from "./FAQ_3";
import FAQ_4, { FAQ_4_Block } from "./FAQ_4";
import FAQ_5, { FAQ_5_Block } from "./FAQ_5";

export const blocks = [FAQ_1_Block, FAQ_2_Block, FAQ_3_Block, FAQ_4_Block, FAQ_5_Block];

export const blockComponents = {
	[BLOCK_SLUG_FAQ_1]: FAQ_1,
	[BLOCK_SLUG_FAQ_2]: FAQ_2,
	[BLOCK_SLUG_FAQ_3]: FAQ_3,
	[BLOCK_SLUG_FAQ_4]: FAQ_4,
	[BLOCK_SLUG_FAQ_5]: FAQ_5,
};
