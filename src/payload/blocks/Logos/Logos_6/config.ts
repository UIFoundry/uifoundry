import type { Block } from "payload";
import {
  BLOCK_GROUP_LOGOS,
  BLOCK_SLUG_LOGOS_6,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField";

export const Logos_6_Block: Block = {
  slug: BLOCK_SLUG_LOGOS_6,
  interfaceName: "Logos_6_Block",
  labels: { singular: "Logos 6", plural: "Logos 6's" },
  admin: { group: BLOCK_GROUP_LOGOS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "You’re in good company",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Autoscrolling marquee with pause on hover.",
    },
    {
      name: "logos",
      label: "Logos",
      labels: { singular: "Logo", plural: "Logos" },
      type: "array",
      admin: { initCollapsed: true },
      defaultValue: [
        { label: "Nvidia", href: "#" },
        { label: "Column", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "Nike", href: "#" },
        { label: "Lemon Squeezy", href: "#" },
        { label: "Laravel", href: "#" },
        { label: "Lilly", href: "#" },
        { label: "OpenAI", href: "#" },
      ],
      fields: [
        { name: "label", label: "Label", type: "text", required: true },
        { name: "href", label: "Link (href)", type: "text" },
        mediaField({ name: "media" }),
      ],
    },
  ],
};
