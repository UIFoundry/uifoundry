import { BLOCK_SLUG_CTA_1, BLOCK_SLUG_CTA_2, BLOCK_SLUG_CTA_3 } from "~/payload/constants/blocks";

import CTA_1, { CTA_1_Block } from "./CTA_1";
import CTA_2 from "./CTA_2";
import { CTA_2_Block } from "./CTA_2/config";
import CTA_3 from "./CTA_3";
import { CTA_3_Block } from "./CTA_3/config";

export const blocks = [CTA_1_Block, CTA_2_Block, CTA_3_Block];

export const blockComponents = {
	[BLOCK_SLUG_CTA_1]: CTA_1,
	[BLOCK_SLUG_CTA_2]: CTA_2,
	[BLOCK_SLUG_CTA_3]: CTA_3,
};
