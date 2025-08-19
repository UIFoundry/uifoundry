import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_9,
} from "~/payload/constants/blocks";

export const Stats_9_Block: Block = {
  slug: BLOCK_SLUG_STATS_9,
  interfaceName: "Stats_9_Block",
  labels: { singular: "Stats 9", plural: "Stats 9's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Stats" },
    { name: "subheading", type: "text", defaultValue: "At a glance" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "API calls", value: "2.5B/day" },
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
