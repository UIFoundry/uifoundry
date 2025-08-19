import type { Block } from "payload";
import Pricing_1 from "./Pricing_1";
import Pricing_2 from "./Pricing_2/index";
import Pricing_3 from "./Pricing_3";
import Pricing_4 from "./Pricing_4";
import Pricing_5 from "./Pricing_5";
import Pricing_6 from "./Pricing_6";
import { Pricing_1_Block } from "./Pricing_1/config";
import { Pricing_2_Block } from "./Pricing_2/config";
import { Pricing_3_Block } from "./Pricing_3/config";
import { Pricing_4_Block } from "./Pricing_4/config";
import { Pricing_5_Block } from "./Pricing_5/config";
import { Pricing_6_Block } from "./Pricing_6/config";
import {
  BLOCK_SLUG_PRICING_1,
  BLOCK_SLUG_PRICING_2,
  BLOCK_SLUG_PRICING_3,
  BLOCK_SLUG_PRICING_4,
  BLOCK_SLUG_PRICING_5,
  BLOCK_SLUG_PRICING_6,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
  Pricing_1_Block,
  Pricing_2_Block,
  Pricing_3_Block,
  Pricing_4_Block,
  Pricing_5_Block,
  Pricing_6_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_PRICING_1]: Pricing_1,
  [BLOCK_SLUG_PRICING_2]: Pricing_2,
  [BLOCK_SLUG_PRICING_3]: Pricing_3,
  [BLOCK_SLUG_PRICING_4]: Pricing_4,
  [BLOCK_SLUG_PRICING_5]: Pricing_5,
  [BLOCK_SLUG_PRICING_6]: Pricing_6,
};
