import type { Block } from "payload";
import Testimonials_1 from "./Testimonials_1";
import Testimonials_2 from "./Testimonials_2/index";
import Testimonials_3 from "./Testimonials_3";
import Testimonials_4 from "./Testimonials_4";
import Testimonials_5 from "./Testimonials_5";
import Testimonials_6 from "./Testimonials_6";
import Testimonials_7 from "./Testimonials_7";
import Testimonials_8 from "./Testimonials_8";
import Testimonials_9 from "./Testimonials_9";
import Testimonials_10 from "./Testimonials_10";

import { Testimonials_1_Block } from "./Testimonials_1/config";
import { Testimonials_2_Block } from "./Testimonials_2/config";
import { Testimonials_3_Block } from "./Testimonials_3/config";
import { Testimonials_4_Block } from "./Testimonials_4/config";
import { Testimonials_5_Block } from "./Testimonials_5/config";
import { Testimonials_6_Block } from "./Testimonials_6/config";
import { Testimonials_7_Block } from "./Testimonials_7/config";
import { Testimonials_8_Block } from "./Testimonials_8/config";
import { Testimonials_9_Block } from "./Testimonials_9/config";
import { Testimonials_10_Block } from "./Testimonials_10/config";

import {
  BLOCK_SLUG_TESTIMONIALS_1,
  BLOCK_SLUG_TESTIMONIALS_2,
  BLOCK_SLUG_TESTIMONIALS_3,
  BLOCK_SLUG_TESTIMONIALS_4,
  BLOCK_SLUG_TESTIMONIALS_5,
  BLOCK_SLUG_TESTIMONIALS_6,
  BLOCK_SLUG_TESTIMONIALS_7,
  BLOCK_SLUG_TESTIMONIALS_8,
  BLOCK_SLUG_TESTIMONIALS_9,
  BLOCK_SLUG_TESTIMONIALS_10,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
  Testimonials_1_Block,
  Testimonials_2_Block,
  Testimonials_3_Block,
  Testimonials_4_Block,
  Testimonials_5_Block,
  Testimonials_6_Block,
  Testimonials_7_Block,
  Testimonials_8_Block,
  Testimonials_9_Block,
  Testimonials_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_TESTIMONIALS_1]: Testimonials_1,
  [BLOCK_SLUG_TESTIMONIALS_2]: Testimonials_2,
  [BLOCK_SLUG_TESTIMONIALS_3]: Testimonials_3,
  [BLOCK_SLUG_TESTIMONIALS_4]: Testimonials_4,
  [BLOCK_SLUG_TESTIMONIALS_5]: Testimonials_5,
  [BLOCK_SLUG_TESTIMONIALS_6]: Testimonials_6,
  [BLOCK_SLUG_TESTIMONIALS_7]: Testimonials_7,
  [BLOCK_SLUG_TESTIMONIALS_8]: Testimonials_8,
  [BLOCK_SLUG_TESTIMONIALS_9]: Testimonials_9,
  [BLOCK_SLUG_TESTIMONIALS_10]: Testimonials_10,
};
