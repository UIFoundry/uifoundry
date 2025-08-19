import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_6,
} from "~/payload/constants/blocks";

export const Stats_6_Block: Block = {
  slug: BLOCK_SLUG_STATS_6,
  interfaceName: "Stats_6_Block",
  labels: { singular: "Stats 6", plural: "Stats 6's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Outcomes" },
    { name: "subheading", type: "text", defaultValue: "Measurable results" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "ROI", value: "3.2x" },
        { label: "Setup time", value: "< 10m" },
        { label: "CSAT", value: "4.8/5" },
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
