import type { Block } from "payload";
import { BLOCK_SLUG_TEAMS_1_HEADING } from "~/payload/constants/blocks";

export const Teams_1_Heading_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_1_HEADING,
  interfaceName: "Teams_1_Heading_Block",
  labels: {
    singular: "Teams 1 - Heading",
    plural: "Teams 1 - Headings",
  },
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
      defaultValue: "",
    },
  ],
};
