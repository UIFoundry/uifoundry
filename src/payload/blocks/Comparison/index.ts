import type { Block } from "payload";
import {
  BLOCK_SLUG_COMPARISON_1,
  BLOCK_SLUG_COMPARISON_2,
  BLOCK_SLUG_COMPARISON_3,
  BLOCK_SLUG_COMPARISON_4,
  BLOCK_SLUG_COMPARISON_5,
  BLOCK_SLUG_COMPARISON_6,
  BLOCK_SLUG_COMPARISON_7,
  BLOCK_SLUG_COMPARISON_8,
  BLOCK_SLUG_COMPARISON_9,
  BLOCK_SLUG_COMPARISON_10,
} from "~/payload/constants/blocks";
import Comparison_1 from "./Comparison_1";
import { Comparison_1_Block } from "./Comparison_1/config";
import Comparison_2 from "./Comparison_2";
import { Comparison_2_Block } from "./Comparison_2/config";
import Comparison_3 from "./Comparison_3";
import { Comparison_3_Block } from "./Comparison_3/config";
import Comparison_4 from "./Comparison_4";
import { Comparison_4_Block } from "./Comparison_4/config";
import Comparison_5 from "./Comparison_5";
import { Comparison_5_Block } from "./Comparison_5/config";
import Comparison_6 from "./Comparison_6";
import { Comparison_6_Block } from "./Comparison_6/config";
import Comparison_7 from "./Comparison_7";
import { Comparison_7_Block } from "./Comparison_7/config";
import Comparison_8 from "./Comparison_8";
import { Comparison_8_Block } from "./Comparison_8/config";
import Comparison_9 from "./Comparison_9";
import { Comparison_9_Block } from "./Comparison_9/config";
import Comparison_10 from "./Comparison_10";
import { Comparison_10_Block } from "./Comparison_10/config";

export const blocks: Block[] = [
  Comparison_1_Block,
  Comparison_2_Block,
  Comparison_3_Block,
  Comparison_4_Block,
  Comparison_5_Block,
  Comparison_6_Block,
  Comparison_7_Block,
  Comparison_8_Block,
  Comparison_9_Block,
  Comparison_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_COMPARISON_1]: Comparison_1,
  [BLOCK_SLUG_COMPARISON_2]: Comparison_2,
  [BLOCK_SLUG_COMPARISON_3]: Comparison_3,
  [BLOCK_SLUG_COMPARISON_4]: Comparison_4,
  [BLOCK_SLUG_COMPARISON_5]: Comparison_5,
  [BLOCK_SLUG_COMPARISON_6]: Comparison_6,
  [BLOCK_SLUG_COMPARISON_7]: Comparison_7,
  [BLOCK_SLUG_COMPARISON_8]: Comparison_8,
  [BLOCK_SLUG_COMPARISON_9]: Comparison_9,
  [BLOCK_SLUG_COMPARISON_10]: Comparison_10,
};
