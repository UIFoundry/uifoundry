import type { Block } from "payload";
import Header_1 from "./Header_1";
import Header_2 from "./Header_2";
import { Header_1_Block } from "./Header_1/config";
import { Header_2_Block } from "./Header_2/config";
import {
	BLOCK_SLUG_HEADER_1,
	BLOCK_SLUG_HEADER_2,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [Header_1_Block, Header_2_Block];

export const blockComponents = {
	[BLOCK_SLUG_HEADER_1]: Header_1,
	[BLOCK_SLUG_HEADER_2]: Header_2,
};
