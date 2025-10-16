import type { Block } from "payload";
import Footer_1 from "./footer-1";
import Footer_2 from "./footer-2";
import Footer_3 from "./footer-3";
import Footer_4 from "./footer-4";
import Footer_5 from "./footer-5";
import { Footer_1_Block } from "./footer-1/config";
import { Footer_2_Block } from "./footer-2/config";
import { Footer_3_Block } from "./footer-3/config";
import { Footer_4_Block } from "./footer-4/config";
import { Footer_5_Block } from "./footer-5/config";
import {
	BLOCK_SLUG_FOOTER_1,
	BLOCK_SLUG_FOOTER_2,
	BLOCK_SLUG_FOOTER_3,
	BLOCK_SLUG_FOOTER_4,
	BLOCK_SLUG_FOOTER_5,
} from "@/registry/default/lib/constants/blocks";

export const blocks: Block[] = [
	Footer_1_Block,
	Footer_2_Block,
	Footer_3_Block,
	Footer_4_Block,
	Footer_5_Block,
];

export const blockComponents = {
	[BLOCK_SLUG_FOOTER_1]: Footer_1,
	[BLOCK_SLUG_FOOTER_2]: Footer_2,
	[BLOCK_SLUG_FOOTER_3]: Footer_3,
	[BLOCK_SLUG_FOOTER_4]: Footer_4,
	[BLOCK_SLUG_FOOTER_5]: Footer_5,
};
