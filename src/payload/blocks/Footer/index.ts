import type { Block } from "payload";
import Footer_1 from "./Footer_1";
import { Footer_1_Block } from "./Footer_1/config";
import Footer_2 from "./Footer_2";
import { Footer_2_Block } from "./Footer_2/config";
import Footer_3 from "./Footer_3";
import { Footer_3_Block } from "./Footer_3/config";
import Footer_4 from "./Footer_4";
import { Footer_4_Block } from "./Footer_4/config";
import Footer_5 from "./Footer_5";
import { Footer_5_Block } from "./Footer_5/config";
import Footer_6 from "./Footer_6";
import { Footer_6_Block } from "./Footer_6/config";
import Footer_7 from "./Footer_7";
import { Footer_7_Block } from "./Footer_7/config";
import Footer_8 from "./Footer_8";
import { Footer_8_Block } from "./Footer_8/config";
import Footer_9 from "./Footer_9";
import { Footer_9_Block } from "./Footer_9/config";
import Footer_10 from "./Footer_10";
import { Footer_10_Block } from "./Footer_10/config";
import {
  BLOCK_SLUG_FOOTER_1,
  BLOCK_SLUG_FOOTER_2,
} from "~/payload/constants/blocks";
import {
  BLOCK_SLUG_FOOTER_3,
  BLOCK_SLUG_FOOTER_4,
  BLOCK_SLUG_FOOTER_5,
  BLOCK_SLUG_FOOTER_6,
  BLOCK_SLUG_FOOTER_7,
  BLOCK_SLUG_FOOTER_8,
  BLOCK_SLUG_FOOTER_9,
  BLOCK_SLUG_FOOTER_10,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
  Footer_1_Block,
  Footer_2_Block,
  Footer_3_Block,
  Footer_4_Block,
  Footer_5_Block,
  Footer_6_Block,
  Footer_7_Block,
  Footer_8_Block,
  Footer_9_Block,
  Footer_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_FOOTER_1]: Footer_1,
  [BLOCK_SLUG_FOOTER_2]: Footer_2,
  [BLOCK_SLUG_FOOTER_3]: Footer_3,
  [BLOCK_SLUG_FOOTER_4]: Footer_4,
  [BLOCK_SLUG_FOOTER_5]: Footer_5,
  [BLOCK_SLUG_FOOTER_6]: Footer_6,
  [BLOCK_SLUG_FOOTER_7]: Footer_7,
  [BLOCK_SLUG_FOOTER_8]: Footer_8,
  [BLOCK_SLUG_FOOTER_9]: Footer_9,
  [BLOCK_SLUG_FOOTER_10]: Footer_10,
};
