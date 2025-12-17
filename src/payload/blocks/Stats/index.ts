import { BLOCK_SLUG_STATS_1, BLOCK_SLUG_STATS_2, BLOCK_SLUG_STATS_3 } from "~/payload/constants/blocks";
import { Stats_1_Block } from "./Stats_1/config";
import { Stats_2_Block } from "./Stats_2/config";
import { Stats_3_Block } from "./Stats_3/config";
import Stats1 from "./Stats_1";
import Stats2 from "./Stats_2";
import Stats3 from "./Stats_3";

export const blocks = [Stats_1_Block, Stats_2_Block, Stats_3_Block];

export const blockComponents = {
	[BLOCK_SLUG_STATS_1]: Stats1,
	[BLOCK_SLUG_STATS_2]: Stats2,
	[BLOCK_SLUG_STATS_3]: Stats3,
};
