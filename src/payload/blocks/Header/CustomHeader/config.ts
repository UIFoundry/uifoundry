import type { Block } from "payload";
import { BLOCK_SLUG_CUSTOM_HEADER } from "~/payload/constants/blocks";
import { blocks } from "./blocks";

export const CustomHeaderBlock: Block = {
  slug: BLOCK_SLUG_CUSTOM_HEADER,
  interfaceName: "CustomHeaderBlock",
  fields: [
    {
      name: "items",
      type: "blocks",
      blocks: blocks,
    },
  ],
};
