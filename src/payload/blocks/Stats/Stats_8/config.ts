import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_8,
} from "~/payload/constants/blocks";

export const Stats_8_Block: Block = {
  slug: BLOCK_SLUG_STATS_8,
  interfaceName: "Stats_8_Block",
  labels: { singular: "Stats 8", plural: "Stats 8's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Numbers" },
    { name: "subheading", type: "text", defaultValue: "Quick stats" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "Requests", value: "2.5B" },
        { label: "Regions", value: "14" },
        { label: "Latency", value: "38ms" },
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
