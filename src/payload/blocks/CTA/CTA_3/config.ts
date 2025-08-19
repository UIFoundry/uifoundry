import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_3 } from "~/payload/constants/blocks";

export const CTA_3_Block: Block = {
  slug: BLOCK_SLUG_CTA_3,
  interfaceName: "CTA_3_Block",
  labels: { singular: "CTA 3", plural: "CTA 3's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Start today" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Supercharge your workflow",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "A faster way to launch.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Get started" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "Contact sales" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
