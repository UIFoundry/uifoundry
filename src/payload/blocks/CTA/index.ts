import { BLOCK_SLUG_CTA_1 } from "~/payload/constants/blocks";
import CTA_1, { CTA_1_Block } from "./CTA_1";

export const blocks = [CTA_1_Block];

export const blockComponents = {
	[BLOCK_SLUG_CTA_1]: CTA_1,
};
