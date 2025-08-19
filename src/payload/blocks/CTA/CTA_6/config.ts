import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_6 } from "~/payload/constants/blocks";

export const CTA_6_Block: Block = {
  slug: BLOCK_SLUG_CTA_6,
  interfaceName: "CTA_6_Block",
  labels: { singular: "CTA 6", plural: "CTA 6's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Limited time" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Upgrade your stack",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Modern blocks for modern teams.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Start now" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "Read docs" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
