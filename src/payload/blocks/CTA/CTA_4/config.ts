import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_4 } from "~/payload/constants/blocks";

export const CTA_4_Block: Block = {
  slug: BLOCK_SLUG_CTA_4,
  interfaceName: "CTA_4_Block",
  labels: { singular: "CTA 4", plural: "CTA 4's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Ready?" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Launch with confidence",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Everything you need to ship.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Start" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "Docs" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
