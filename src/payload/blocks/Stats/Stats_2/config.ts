import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_2,
} from "~/payload/constants/blocks";

export const Stats_2_Block: Block = {
  slug: BLOCK_SLUG_STATS_2,
  interfaceName: "Stats_2_Block",
  labels: { singular: "Stats 2", plural: "Stats 2's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Usage" },
    { name: "subheading", type: "text", defaultValue: "Scale you can trust" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "Requests", value: "2.5B" },
        { label: "Regions", value: "14" },
        { label: "Latency", value: "38ms", delta: "-5ms" },
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
