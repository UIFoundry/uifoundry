import type { Block } from "payload";
import Footer_1 from "./Footer_1";
import { Footer_1_Block } from "./Footer_1/config";
import Footer_2 from "./Footer_2";
import { Footer_2_Block } from "./Footer_2/config";
import Footer_3 from "./Footer_3";
import { Footer_3_Block } from "./Footer_3/config";
import Footer_4, { Footer_4_Block } from "./Footer_4";
import {
	BLOCK_SLUG_FOOTER_1,
	BLOCK_SLUG_FOOTER_2,
	BLOCK_SLUG_FOOTER_3,
	BLOCK_SLUG_FOOTER_4,
	BLOCK_SLUG_FOOTER_5,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
	Footer_1_Block,
	Footer_2_Block,
	Footer_3_Block,
	Footer_4_Block,
];

export const blockComponents = {
	[BLOCK_SLUG_FOOTER_1]: Footer_1,
	[BLOCK_SLUG_FOOTER_2]: Footer_2,
	[BLOCK_SLUG_FOOTER_3]: Footer_3,
	[BLOCK_SLUG_FOOTER_4]: Footer_4,
	[BLOCK_SLUG_FOOTER_5]: Footer_4,
};
