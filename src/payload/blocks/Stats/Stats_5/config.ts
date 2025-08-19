import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_5,
} from "~/payload/constants/blocks";

export const Stats_5_Block: Block = {
  slug: BLOCK_SLUG_STATS_5,
  interfaceName: "Stats_5_Block",
  labels: { singular: "Stats 5", plural: "Stats 5's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Highlights",
    },
    { name: "subheading", type: "text", defaultValue: "What we’re proud of" },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "NPS", value: "+74" },
        { label: "Uptime", value: "99.99%" },
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
