import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_10,
} from "~/payload/constants/blocks";

export const Stats_10_Block: Block = {
  slug: BLOCK_SLUG_STATS_10,
  interfaceName: "Stats_10_Block",
  labels: { singular: "Stats 10", plural: "Stats 10's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Numbers that matter",
    },
    { name: "subheading", type: "text", defaultValue: "Proof of performance" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "Revenue", value: "$4.2M" },
        { label: "MRR", value: "$350k" },
        { label: "Growth", value: "+18%" },
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
