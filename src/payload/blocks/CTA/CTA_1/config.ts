import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_1 } from "~/payload/constants/blocks";

export const CTA_1_Block: Block = {
  slug: BLOCK_SLUG_CTA_1,
  interfaceName: "CTA_1_Block",
  labels: { singular: "CTA 1", plural: "CTA 1's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Get started" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Build your next site faster",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue:
        "UIFoundry helps you ship modern marketing sites with ease.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Start free" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "Book a demo" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
