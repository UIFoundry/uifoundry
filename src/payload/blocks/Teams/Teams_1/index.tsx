import type { Teams_1_Block } from "~/payload-types";
import Teams_1_Heading from "./Heading";
import Teams_1_Members from "./Members";
import RenderBlocks from "~/components/RenderBlocks/index";
import {
  BLOCK_SLUG_TEAMS_1_HEADING,
  BLOCK_SLUG_TEAMS_1_MEMBERS,
} from "~/payload/constants/blocks";

export * from "./config";

const blockComponents = {
  [BLOCK_SLUG_TEAMS_1_HEADING]: Teams_1_Heading,
  [BLOCK_SLUG_TEAMS_1_MEMBERS]: Teams_1_Members,
};

export default function Teams_1({ blocks }: Teams_1_Block) {
  return <RenderBlocks blocks={blocks} blockComponents={blockComponents} />;
}
