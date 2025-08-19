import type { Block } from "payload";
import {
  BLOCK_GROUP_STATS,
  BLOCK_SLUG_STATS_7,
} from "~/payload/constants/blocks";

export const Stats_7_Block: Block = {
  slug: BLOCK_SLUG_STATS_7,
  interfaceName: "Stats_7_Block",
  labels: { singular: "Stats 7", plural: "Stats 7's" },
  admin: { group: BLOCK_GROUP_STATS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Trusted metrics",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Transparency by default",
    },
    {
      name: "stats",
      type: "array",
      defaultValue: [
        { label: "Deploys", value: "30k/day" },
        { label: "Datacenters", value: "32" },
        { label: "Incidents", value: "0 this month" },
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
