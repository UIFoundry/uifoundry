import { BLOCK_SLUG_FAQ_1 } from "~/payload/constants/blocks";
import FAQ_1, { FAQ_1_Block } from "./FAQ_1";

export const blocks = [FAQ_1_Block];

export const blockComponents = {
	[BLOCK_SLUG_FAQ_1]: FAQ_1,
};
