import type { Block } from "payload";
import {
  BLOCK_SLUG_LOGOS_1,
  BLOCK_SLUG_LOGOS_2,
  BLOCK_SLUG_LOGOS_3,
  BLOCK_SLUG_LOGOS_4,
  BLOCK_SLUG_LOGOS_5,
  BLOCK_SLUG_LOGOS_6,
  BLOCK_SLUG_LOGOS_7,
  BLOCK_SLUG_LOGOS_8,
  BLOCK_SLUG_LOGOS_9,
  BLOCK_SLUG_LOGOS_10,
} from "~/payload/constants/blocks";
import Logos_1 from "./Logos_1";
import { Logos_1_Block } from "./Logos_1/config";
import Logos_2 from "./Logos_2";
import { Logos_2_Block } from "./Logos_2/config";
import Logos_3 from "./Logos_3";
import { Logos_3_Block } from "./Logos_3/config";
import Logos_4 from "./Logos_4";
import { Logos_4_Block } from "./Logos_4/config";
import Logos_5 from "./Logos_5";
import { Logos_5_Block } from "./Logos_5/config";
import Logos_6 from "./Logos_6";
import { Logos_6_Block } from "./Logos_6/config";
import Logos_7 from "./Logos_7";
import { Logos_7_Block } from "./Logos_7/config";
import Logos_8 from "./Logos_8";
import { Logos_8_Block } from "./Logos_8/config";
import Logos_9 from "./Logos_9";
import { Logos_9_Block } from "./Logos_9/config";
import Logos_10 from "./Logos_10";
import { Logos_10_Block } from "./Logos_10/config";

export const blocks: Block[] = [
  Logos_1_Block,
  Logos_2_Block,
  Logos_3_Block,
  Logos_4_Block,
  Logos_5_Block,
  Logos_6_Block,
  Logos_7_Block,
  Logos_8_Block,
  Logos_9_Block,
  Logos_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_LOGOS_1]: Logos_1,
  [BLOCK_SLUG_LOGOS_2]: Logos_2,
  [BLOCK_SLUG_LOGOS_3]: Logos_3,
  [BLOCK_SLUG_LOGOS_4]: Logos_4,
  [BLOCK_SLUG_LOGOS_5]: Logos_5,
  [BLOCK_SLUG_LOGOS_6]: Logos_6,
  [BLOCK_SLUG_LOGOS_7]: Logos_7,
  [BLOCK_SLUG_LOGOS_8]: Logos_8,
  [BLOCK_SLUG_LOGOS_9]: Logos_9,
  [BLOCK_SLUG_LOGOS_10]: Logos_10,
};
