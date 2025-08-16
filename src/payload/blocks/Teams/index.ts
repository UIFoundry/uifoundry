import { BLOCK_SLUG_TEAMS_1 } from "~/payload/constants/blocks";
import Teams_1, { Teams_1_Block } from "./Teams_1";

export const blocks = [Teams_1_Block];

export const blockComponents = {
  [BLOCK_SLUG_TEAMS_1]: Teams_1,
};
