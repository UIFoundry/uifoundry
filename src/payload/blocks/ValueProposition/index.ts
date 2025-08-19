import type { Block } from "payload";
import {
  BLOCK_SLUG_VALUE_PROPOSITION_1,
  BLOCK_SLUG_VALUE_PROPOSITION_2,
} from "~/payload/constants/blocks";
import ValueProposition_1 from "./ValueProposition_1";
import { ValueProposition_1_Block } from "./ValueProposition_1/config";
import ValueProposition_2 from "./ValueProposition_2";
import { ValueProposition_2_Block } from "./ValueProposition_2/config";

export const blocks: Block[] = [
  ValueProposition_1_Block,
  ValueProposition_2_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_VALUE_PROPOSITION_1]: ValueProposition_1,
  [BLOCK_SLUG_VALUE_PROPOSITION_2]: ValueProposition_2,
};
