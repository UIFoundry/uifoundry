import type { Block } from "payload";
import {
  BLOCK_SLUG_FEATURES_1,
  BLOCK_SLUG_FEATURES_2,
  BLOCK_SLUG_FEATURES_3,
  BLOCK_SLUG_FEATURES_4,
  BLOCK_SLUG_FEATURES_5,
  BLOCK_SLUG_FEATURES_6,
  BLOCK_SLUG_FEATURES_7,
  BLOCK_SLUG_FEATURES_8,
  BLOCK_SLUG_FEATURES_9,
  BLOCK_SLUG_FEATURES_10,
} from "~/payload/constants/blocks";
import Features_1 from "./Features_1";
import { Features_1_Block } from "./Features_1/config";
import Features_2 from "./Features_2";
import { Features_2_Block } from "./Features_2/config";
import Features_3 from "./Features_3";
import { Features_3_Block } from "./Features_3/config";
import Features_4 from "./Features_4";
import { Features_4_Block } from "./Features_4/config";
import Features_5 from "./Features_5";
import { Features_5_Block } from "./Features_5/config";
import Features_6 from "./Features_6";
import { Features_6_Block } from "./Features_6/config";
import Features_7 from "./Features_7";
import { Features_7_Block } from "./Features_7/config";
import Features_8 from "./Features_8";
import { Features_8_Block } from "./Features_8/config";
import Features_9 from "./Features_9";
import { Features_9_Block } from "./Features_9/config";
import Features_10 from "./Features_10";
import { Features_10_Block } from "./Features_10/config";

export const blocks: Block[] = [
  Features_1_Block,
  Features_2_Block,
  Features_3_Block,
  Features_4_Block,
  Features_5_Block,
  Features_6_Block,
  Features_7_Block,
  Features_8_Block,
  Features_9_Block,
  Features_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_FEATURES_1]: Features_1,
  [BLOCK_SLUG_FEATURES_2]: Features_2,
  [BLOCK_SLUG_FEATURES_3]: Features_3,
  [BLOCK_SLUG_FEATURES_4]: Features_4,
  [BLOCK_SLUG_FEATURES_5]: Features_5,
  [BLOCK_SLUG_FEATURES_6]: Features_6,
  [BLOCK_SLUG_FEATURES_7]: Features_7,
  [BLOCK_SLUG_FEATURES_8]: Features_8,
  [BLOCK_SLUG_FEATURES_9]: Features_9,
  [BLOCK_SLUG_FEATURES_10]: Features_10,
};
