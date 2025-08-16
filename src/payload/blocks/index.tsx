import type { Block } from "payload";
import {
  blocks as teamsBlocks,
  blockComponents as teamsBlockComponents,
} from "./Teams";
import {
  blocks as featuresBlocks,
  blockComponents as featuresBlockComponents,
} from "./Features";
import {
  blocks as heroBlocks,
  blockComponents as heroBlockComponents,
} from "./Hero";

export const blocks: Block[] = teamsBlocks
  .concat(featuresBlocks)
  .concat(heroBlocks);

export const blockComponents = {
  ...teamsBlockComponents,
  ...featuresBlockComponents,
  ...heroBlockComponents,
};
