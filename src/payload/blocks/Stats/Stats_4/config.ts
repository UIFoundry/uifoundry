import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_4,
} from "~/payload/constants/blocks";

export const Stats_4_Block: Block = {
  slug: BLOCK_SLUG_STATS_4,
  interfaceName: "Stats_4_Block",
  labels: { singular: "Stats 4", plural: "Stats 4's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Scale" },
    { name: "subheading", type: "text", defaultValue: "Numbers that matter" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "Countries", value: "120+" },
        { label: "Deploys", value: "30k/day" },
        { label: "Cache hit", value: "97%" },
      ],
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "delta", type: "text" },
        { name: "description", type: "text" },
      ],
    },
  ],
};
