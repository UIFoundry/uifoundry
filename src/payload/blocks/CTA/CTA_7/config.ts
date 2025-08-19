import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_7 } from "~/payload/constants/blocks";

export const CTA_7_Block: Block = {
  slug: BLOCK_SLUG_CTA_7,
  interfaceName: "CTA_7_Block",
  labels: { singular: "CTA 7", plural: "CTA 7's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Move faster" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Your launchpad for growth",
    },
    { name: "subheader", type: "text", defaultValue: "Try UIFoundry today." },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Get started" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "Talk to us" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
