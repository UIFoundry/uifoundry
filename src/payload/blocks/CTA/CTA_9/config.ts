import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_9 } from "~/payload/constants/blocks";

export const CTA_9_Block: Block = {
  slug: BLOCK_SLUG_CTA_9,
  interfaceName: "CTA_9_Block",
  labels: { singular: "CTA 9", plural: "CTA 9's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Take action" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Start building today",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Try UIFoundry for free.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Try free" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "See pricing" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
