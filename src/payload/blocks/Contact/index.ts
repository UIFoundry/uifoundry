import type { Block } from "payload";
import {
  BLOCK_SLUG_CONTACT_1,
  BLOCK_SLUG_CONTACT_2,
  BLOCK_SLUG_CONTACT_3,
  BLOCK_SLUG_CONTACT_4,
  BLOCK_SLUG_CONTACT_5,
  BLOCK_SLUG_CONTACT_6,
  BLOCK_SLUG_CONTACT_7,
  BLOCK_SLUG_CONTACT_8,
  BLOCK_SLUG_CONTACT_9,
  BLOCK_SLUG_CONTACT_10,
} from "~/payload/constants/blocks";
import Contact_1 from "./Contact_1";
import { Contact_1_Block } from "./Contact_1/config";
import Contact_2 from "./Contact_2";
import { Contact_2_Block } from "./Contact_2/config";
import Contact_3 from "./Contact_3";
import { Contact_3_Block } from "./Contact_3/config";
import Contact_4 from "./Contact_4";
import { Contact_4_Block } from "./Contact_4/config";
import Contact_5 from "./Contact_5";
import { Contact_5_Block } from "./Contact_5/config";
import Contact_6 from "./Contact_6";
import { Contact_6_Block } from "./Contact_6/config";
import Contact_7 from "./Contact_7";
import { Contact_7_Block } from "./Contact_7/config";
import Contact_8 from "./Contact_8";
import { Contact_8_Block } from "./Contact_8/config";
import Contact_9 from "./Contact_9";
import { Contact_9_Block } from "./Contact_9/config";
import Contact_10 from "./Contact_10";
import { Contact_10_Block } from "./Contact_10/config";

export const blocks: Block[] = [
  Contact_1_Block,
  Contact_2_Block,
  Contact_3_Block,
  Contact_4_Block,
  Contact_5_Block,
  Contact_6_Block,
  Contact_7_Block,
  Contact_8_Block,
  Contact_9_Block,
  Contact_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_CONTACT_1]: Contact_1,
  [BLOCK_SLUG_CONTACT_2]: Contact_2,
  [BLOCK_SLUG_CONTACT_3]: Contact_3,
  [BLOCK_SLUG_CONTACT_4]: Contact_4,
  [BLOCK_SLUG_CONTACT_5]: Contact_5,
  [BLOCK_SLUG_CONTACT_6]: Contact_6,
  [BLOCK_SLUG_CONTACT_7]: Contact_7,
  [BLOCK_SLUG_CONTACT_8]: Contact_8,
  [BLOCK_SLUG_CONTACT_9]: Contact_9,
  [BLOCK_SLUG_CONTACT_10]: Contact_10,
};
