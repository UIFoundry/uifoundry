import type { Block } from "payload";
import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_10 } from "~/payload/constants/blocks";

export const CTA_10_Block: Block = {
  slug: BLOCK_SLUG_CTA_10,
  interfaceName: "CTA_10_Block",
  labels: { singular: "CTA 10", plural: "CTA 10's" },
  admin: { group: BLOCK_GROUP_CTA },
  fields: [
    { name: "kicker", type: "text", defaultValue: "Final step" },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Let’s build something great",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Get started in minutes.",
    },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Start" },
    { name: "primaryCtaHref", type: "text", defaultValue: "#" },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "Explore" },
    { name: "secondaryCtaHref", type: "text", defaultValue: "#" },
  ],
};
