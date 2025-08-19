import type { Block } from "payload";
import {
  BLOCK_SLUG_STATS_1,
  BLOCK_SLUG_STATS_2,
  BLOCK_SLUG_STATS_3,
  BLOCK_SLUG_STATS_4,
  BLOCK_SLUG_STATS_5,
  BLOCK_SLUG_STATS_6,
  BLOCK_SLUG_STATS_7,
  BLOCK_SLUG_STATS_8,
  BLOCK_SLUG_STATS_9,
  BLOCK_SLUG_STATS_10,
} from "~/payload/constants/blocks";
import Stats_1 from "./Stats_1";
import { Stats_1_Block } from "./Stats_1/config";
import Stats_2 from "./Stats_2";
import { Stats_2_Block } from "./Stats_2/config";
import Stats_3 from "./Stats_3";
import { Stats_3_Block } from "./Stats_3/config";
import Stats_4 from "./Stats_4";
import { Stats_4_Block } from "./Stats_4/config";
import Stats_5 from "./Stats_5";
import { Stats_5_Block } from "./Stats_5/config";
import Stats_6 from "./Stats_6";
import { Stats_6_Block } from "./Stats_6/config";
import Stats_7 from "./Stats_7";
import { Stats_7_Block } from "./Stats_7/config";
import Stats_8 from "./Stats_8";
import { Stats_8_Block } from "./Stats_8/config";
import Stats_9 from "./Stats_9";
import { Stats_9_Block } from "./Stats_9/config";
import Stats_10 from "./Stats_10";
import { Stats_10_Block } from "./Stats_10/config";

export const blocks: Block[] = [
  Stats_1_Block,
  Stats_2_Block,
  Stats_3_Block,
  Stats_4_Block,
  Stats_5_Block,
  Stats_6_Block,
  Stats_7_Block,
  Stats_8_Block,
  Stats_9_Block,
  Stats_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_STATS_1]: Stats_1,
  [BLOCK_SLUG_STATS_2]: Stats_2,
  [BLOCK_SLUG_STATS_3]: Stats_3,
  [BLOCK_SLUG_STATS_4]: Stats_4,
  [BLOCK_SLUG_STATS_5]: Stats_5,
  [BLOCK_SLUG_STATS_6]: Stats_6,
  [BLOCK_SLUG_STATS_7]: Stats_7,
  [BLOCK_SLUG_STATS_8]: Stats_8,
  [BLOCK_SLUG_STATS_9]: Stats_9,
  [BLOCK_SLUG_STATS_10]: Stats_10,
};
