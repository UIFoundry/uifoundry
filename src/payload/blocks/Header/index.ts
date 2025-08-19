import type { Block } from "payload";
import Header_1 from "./Header_1";
import Header_2 from "./Header_2";
import Header_3 from "./Header_3";
import Header_4 from "./Header_4";
import { Header_1_Block } from "./Header_1/config";
import { Header_2_Block } from "./Header_2/config";
import { Header_3_Block } from "./Header_3/config";
import { Header_4_Block } from "./Header_4/config";
import Header_5 from "./Header_5";
import { Header_5_Block } from "./Header_5/config";
import Header_6 from "./Header_6";
import { Header_6_Block } from "./Header_6/config";
import Header_7 from "./Header_7";
import { Header_7_Block } from "./Header_7/config";
import Header_8 from "./Header_8";
import { Header_8_Block } from "./Header_8/config";
import Header_9 from "./Header_9";
import { Header_9_Block } from "./Header_9/config";
import Header_10 from "./Header_10";
import { Header_10_Block } from "./Header_10/config";
import {
  BLOCK_SLUG_HEADER_1,
  BLOCK_SLUG_HEADER_2,
  BLOCK_SLUG_HEADER_3,
  BLOCK_SLUG_HEADER_4,
  BLOCK_SLUG_HEADER_5,
  BLOCK_SLUG_HEADER_6,
  BLOCK_SLUG_HEADER_7,
  BLOCK_SLUG_HEADER_8,
  BLOCK_SLUG_HEADER_9,
  BLOCK_SLUG_HEADER_10,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
  Header_1_Block,
  Header_2_Block,
  Header_3_Block,
  Header_4_Block,
  Header_5_Block,
  Header_6_Block,
  Header_7_Block,
  Header_8_Block,
  Header_9_Block,
  Header_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_HEADER_1]: Header_1,
  [BLOCK_SLUG_HEADER_2]: Header_2,
  [BLOCK_SLUG_HEADER_3]: Header_3,
  [BLOCK_SLUG_HEADER_4]: Header_4,
  [BLOCK_SLUG_HEADER_5]: Header_5,
  [BLOCK_SLUG_HEADER_6]: Header_6,
  [BLOCK_SLUG_HEADER_7]: Header_7,
  [BLOCK_SLUG_HEADER_8]: Header_8,
  [BLOCK_SLUG_HEADER_9]: Header_9,
  [BLOCK_SLUG_HEADER_10]: Header_10,
};
