import {
  BLOCK_SLUG_HERO_1,
  BLOCK_SLUG_HERO_2,
  BLOCK_SLUG_HERO_3,
  BLOCK_SLUG_HERO_4,
  BLOCK_SLUG_HERO_5,
  BLOCK_SLUG_HERO_6,
  BLOCK_SLUG_HERO_7,
  BLOCK_SLUG_HERO_8,
  BLOCK_SLUG_HERO_9,
  BLOCK_SLUG_HERO_10,
} from "~/payload/constants/blocks";
import Hero_1 from "./Hero_1";
import { Hero_1_Block } from "./Hero_1/config";
import Hero_2 from "./Hero_2";
import { Hero_2_Block } from "./Hero_2/config";
import Hero_3 from "./Hero_3";
import { Hero_3_Block } from "./Hero_3/config";
import Hero_4 from "./Hero_4";
import { Hero_4_Block } from "./Hero_4/config";
import Hero_5 from "./Hero_5";
import { Hero_5_Block } from "./Hero_5/config";
import Hero_6 from "./Hero_6";
import { Hero_6_Block } from "./Hero_6/config";
import Hero_7 from "./Hero_7";
import { Hero_7_Block } from "./Hero_7/config";
import Hero_8 from "./Hero_8";
import { Hero_8_Block } from "./Hero_8/config";
import Hero_9 from "./Hero_9";
import { Hero_9_Block } from "./Hero_9/config";
import Hero_10 from "./Hero_10";
import { Hero_10_Block } from "./Hero_10/config";

export const blocks = [
  Hero_1_Block,
  Hero_2_Block,
  Hero_3_Block,
  Hero_4_Block,
  Hero_5_Block,
  Hero_6_Block,
  Hero_7_Block,
  Hero_8_Block,
  Hero_9_Block,
  Hero_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_HERO_1]: Hero_1,
  [BLOCK_SLUG_HERO_2]: Hero_2,
  [BLOCK_SLUG_HERO_3]: Hero_3,
  [BLOCK_SLUG_HERO_4]: Hero_4,
  [BLOCK_SLUG_HERO_5]: Hero_5,
  [BLOCK_SLUG_HERO_6]: Hero_6,
  [BLOCK_SLUG_HERO_7]: Hero_7,
  [BLOCK_SLUG_HERO_8]: Hero_8,
  [BLOCK_SLUG_HERO_9]: Hero_9,
  [BLOCK_SLUG_HERO_10]: Hero_10,
};
