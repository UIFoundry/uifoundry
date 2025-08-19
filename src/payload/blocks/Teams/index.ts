import {
  BLOCK_SLUG_TEAMS_1,
  BLOCK_SLUG_TEAMS_2,
  BLOCK_SLUG_TEAMS_3,
  BLOCK_SLUG_TEAMS_4,
  BLOCK_SLUG_TEAMS_5,
  BLOCK_SLUG_TEAMS_6,
  BLOCK_SLUG_TEAMS_7,
  BLOCK_SLUG_TEAMS_8,
  BLOCK_SLUG_TEAMS_9,
  BLOCK_SLUG_TEAMS_10,
} from "~/payload/constants/blocks";

import Teams_1 from "./Teams_1";
import { Teams_1_Block } from "./Teams_1/config";
import Teams_2 from "./Teams_2";
import { Teams_2_Block } from "./Teams_2/config";
import Teams_3 from "./Teams_3";
import { Teams_3_Block } from "./Teams_3/config";
import Teams_4 from "./Teams_4";
import { Teams_4_Block } from "./Teams_4/config";
import Teams_5 from "./Teams_5";
import { Teams_5_Block } from "./Teams_5/config";
import Teams_6 from "./Teams_6";
import { Teams_6_Block } from "./Teams_6/config";
import Teams_7 from "./Teams_7";
import { Teams_7_Block } from "./Teams_7/config";
import Teams_8 from "./Teams_8";
import { Teams_8_Block } from "./Teams_8/config";
import Teams_9 from "./Teams_9";
import { Teams_9_Block } from "./Teams_9/config";
import Teams_10 from "./Teams_10";
import { Teams_10_Block } from "./Teams_10/config";

export const blocks = [
  Teams_1_Block,
  Teams_2_Block,
  Teams_3_Block,
  Teams_4_Block,
  Teams_5_Block,
  Teams_6_Block,
  Teams_7_Block,
  Teams_8_Block,
  Teams_9_Block,
  Teams_10_Block,
];

export const blockComponents = {
  [BLOCK_SLUG_TEAMS_1]: Teams_1,
  [BLOCK_SLUG_TEAMS_2]: Teams_2,
  [BLOCK_SLUG_TEAMS_3]: Teams_3,
  [BLOCK_SLUG_TEAMS_4]: Teams_4,
  [BLOCK_SLUG_TEAMS_5]: Teams_5,
  [BLOCK_SLUG_TEAMS_6]: Teams_6,
  [BLOCK_SLUG_TEAMS_7]: Teams_7,
  [BLOCK_SLUG_TEAMS_8]: Teams_8,
  [BLOCK_SLUG_TEAMS_9]: Teams_9,
  [BLOCK_SLUG_TEAMS_10]: Teams_10,
};
