import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_8 } from "~/payload/constants/blocks";

export const CTA_8_Block: Block = {
  slug: BLOCK_SLUG_CTA_8,
  interfaceName: "CTA_8_Block",
  labels: { singular: "CTA 8", plural: "CTA 8's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Build now" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Create your next site",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Beautiful, responsive, accessible.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Start" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "See features" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
