import type { Block } from "payload";
import FAQs_1 from "./FAQs_1";
import FAQs_2 from "./FAQs_2";
import FAQs_3 from "./FAQs_3";
import FAQs_4 from "./FAQs_4";
import FAQs_5 from "./FAQs_5";
import FAQs_6 from "./FAQs_6";
import FAQs_7 from "./FAQs_7";
import FAQs_8 from "./FAQs_8";
import FAQs_9 from "./FAQs_9";
import FAQs_10 from "./FAQs_10";
import { FAQs_1_Block } from "./FAQs_1/config";
import { FAQs_2_Block } from "./FAQs_2/config";
import { FAQs_3_Block } from "./FAQs_3/config";
import { FAQs_4_Block } from "./FAQs_4/config";
import { FAQs_5_Block } from "./FAQs_5/config";
import { FAQs_6_Block } from "./FAQs_6/config";
import { FAQs_7_Block } from "./FAQs_7/config";
import { FAQs_8_Block } from "./FAQs_8/config";
import { FAQs_9_Block } from "./FAQs_9/config";
import { FAQs_10_Block } from "./FAQs_10/config";
import {
  BLOCK_SLUG_FAQS_1,
  BLOCK_SLUG_FAQS_2,
  BLOCK_SLUG_FAQS_3,
  BLOCK_SLUG_FAQS_4,
  BLOCK_SLUG_FAQS_5,
  BLOCK_SLUG_FAQS_6,
  BLOCK_SLUG_FAQS_7,
  BLOCK_SLUG_FAQS_8,
  BLOCK_SLUG_FAQS_9,
  BLOCK_SLUG_FAQS_10,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
  FAQs_1_Block,
  FAQs_2_Block,
  FAQs_3_Block,
  FAQs_4_Block,
  FAQs_5_Block,
  FAQs_6_Block,
  FAQs_7_Block,
  FAQs_8_Block,
  FAQs_9_Block,
  FAQs_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_FAQS_1]: FAQs_1,
  [BLOCK_SLUG_FAQS_2]: FAQs_2,
  [BLOCK_SLUG_FAQS_3]: FAQs_3,
  [BLOCK_SLUG_FAQS_4]: FAQs_4,
  [BLOCK_SLUG_FAQS_5]: FAQs_5,
  [BLOCK_SLUG_FAQS_6]: FAQs_6,
  [BLOCK_SLUG_FAQS_7]: FAQs_7,
  [BLOCK_SLUG_FAQS_8]: FAQs_8,
  [BLOCK_SLUG_FAQS_9]: FAQs_9,
  [BLOCK_SLUG_FAQS_10]: FAQs_10,
};
