import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_5 } from "~/payload/constants/blocks";

export const CTA_5_Block: Block = {
  slug: BLOCK_SLUG_CTA_5,
  interfaceName: "CTA_5_Block",
  labels: { singular: "CTA 5", plural: "CTA 5's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Next step" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Join thousands of teams",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Move faster with UIFoundry.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Start free" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "Learn more" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
