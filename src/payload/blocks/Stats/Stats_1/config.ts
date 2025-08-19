import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_1,
} from "~/payload/constants/blocks";

export const Stats_1_Block: Block = {
  slug: BLOCK_SLUG_STATS_1,
  interfaceName: "Stats_1_Block",
  labels: { singular: "Stats 1", plural: "Stats 1's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "By the numbers",
    },
    { name: "subheading", type: "text", defaultValue: "Impact and scale" },
    {
      name: "stats",
      type: "array",
      labels: { singular: "Stat", plural: "Stats" },
      defaultValue: [
        { label: "Uptime", value: "99.99%", delta: "+0.01%" },
        { label: "Requests/day", value: "2.5B" },
        { label: "Customers", value: "12k+" },
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
