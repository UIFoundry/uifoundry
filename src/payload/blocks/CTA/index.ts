import type { Block } from "payload";
import CTA_1 from "./CTA_1";
import CTA_2 from "./CTA_2";
import CTA_3 from "./CTA_3";
import CTA_4 from "./CTA_4";
import CTA_5 from "./CTA_5";
import CTA_6 from "./CTA_6";
import CTA_7 from "./CTA_7";
import CTA_8 from "./CTA_8";
import CTA_9 from "./CTA_9";
import CTA_10 from "./CTA_10";
import { CTA_1_Block } from "./CTA_1/config";
import { CTA_2_Block } from "./CTA_2/config";
import { CTA_3_Block } from "./CTA_3/config";
import { CTA_4_Block } from "./CTA_4/config";
import { CTA_5_Block } from "./CTA_5/config";
import { CTA_6_Block } from "./CTA_6/config";
import { CTA_7_Block } from "./CTA_7/config";
import { CTA_8_Block } from "./CTA_8/config";
import { CTA_9_Block } from "./CTA_9/config";
import { CTA_10_Block } from "./CTA_10/config";
import {
  BLOCK_SLUG_CTA_1,
  BLOCK_SLUG_CTA_2,
  BLOCK_SLUG_CTA_3,
  BLOCK_SLUG_CTA_4,
  BLOCK_SLUG_CTA_5,
  BLOCK_SLUG_CTA_6,
  BLOCK_SLUG_CTA_7,
  BLOCK_SLUG_CTA_8,
  BLOCK_SLUG_CTA_9,
  BLOCK_SLUG_CTA_10,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
  CTA_1_Block,
  CTA_2_Block,
  CTA_3_Block,
  CTA_4_Block,
  CTA_5_Block,
  CTA_6_Block,
  CTA_7_Block,
  CTA_8_Block,
  CTA_9_Block,
  CTA_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_CTA_1]: CTA_1,
  [BLOCK_SLUG_CTA_2]: CTA_2,
  [BLOCK_SLUG_CTA_3]: CTA_3,
  [BLOCK_SLUG_CTA_4]: CTA_4,
  [BLOCK_SLUG_CTA_5]: CTA_5,
  [BLOCK_SLUG_CTA_6]: CTA_6,
  [BLOCK_SLUG_CTA_7]: CTA_7,
  [BLOCK_SLUG_CTA_8]: CTA_8,
  [BLOCK_SLUG_CTA_9]: CTA_9,
  [BLOCK_SLUG_CTA_10]: CTA_10,
};
