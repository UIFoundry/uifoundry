import type { Block } from "payload";
import Footer_1 from "./footer-1";
import Footer_2 from "./footer-2";
import { Footer_1_Block } from "./footer-1/config";
import { Footer_2_Block } from "./footer-2/config";
import {
	BLOCK_SLUG_FOOTER_1,
	BLOCK_SLUG_FOOTER_2,
} from "@/registry/default/lib/constants/blocks";

export const blocks: Block[] = [Footer_1_Block, Footer_2_Block];

export const blockComponents = {
	[BLOCK_SLUG_FOOTER_1]: Footer_1,
	[BLOCK_SLUG_FOOTER_2]: Footer_2,
};
