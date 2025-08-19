import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_3,
} from "~/payload/constants/blocks";

export const Stats_3_Block: Block = {
  slug: BLOCK_SLUG_STATS_3,
  interfaceName: "Stats_3_Block",
  labels: { singular: "Stats 3", plural: "Stats 3's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Performance",
    },
    { name: "subheading", type: "text", defaultValue: "Key metrics" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "TTFB", value: "38ms", delta: "-5ms" },
        { label: "Edge regions", value: "14" },
        { label: "CDN hits", value: "98%" },
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
