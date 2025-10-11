import type { Block } from "payload";
import Header_1 from "./Header_1";
import Header_2 from "./Header_2";
import Header_3 from "./Header_3";
import Header_4 from "./Header_4";
import Header_5 from "./Header_5";
import { Header_1_Block } from "./Header_1/config";
import { Header_2_Block } from "./Header_2/config";
import { Header_3_Block } from "./Header_3/config";
import { Header_4_Block } from "./Header_4/config";
import { Header_5_Block } from "./Header_5/config";
import { CustomHeaderBlock } from "./CustomHeader/config";
import CustomHeader from "./CustomHeader";

import {
	BLOCK_SLUG_CUSTOM_HEADER,
	BLOCK_SLUG_HEADER_1,
	BLOCK_SLUG_HEADER_2,
	BLOCK_SLUG_HEADER_3,
	BLOCK_SLUG_HEADER_4,
	BLOCK_SLUG_HEADER_5,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
	Header_1_Block,
	Header_2_Block,
	Header_3_Block,
	Header_4_Block,
	Header_5_Block,
	CustomHeaderBlock,
];

export const blockComponents = {
	[BLOCK_SLUG_HEADER_1]: Header_1,
	[BLOCK_SLUG_HEADER_2]: Header_2,
	[BLOCK_SLUG_HEADER_3]: Header_3,
	[BLOCK_SLUG_HEADER_4]: Header_4,
	[BLOCK_SLUG_HEADER_5]: Header_5,
	[BLOCK_SLUG_CUSTOM_HEADER]: CustomHeader,
};
