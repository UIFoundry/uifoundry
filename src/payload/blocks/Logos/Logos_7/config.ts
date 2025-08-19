import type { Block } from "payload";
import {
  BLOCK_GROUP_LOGOS,
  BLOCK_SLUG_LOGOS_7,
} from "~/payload/constants/blocks";

export const Logos_7_Block: Block = {
  slug: BLOCK_SLUG_LOGOS_7,
  interfaceName: "Logos_7_Block",
  labels: { singular: "Logos 7", plural: "Logos 7's" },
  admin: { group: BLOCK_GROUP_LOGOS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Trusted by developers",
    },
    { name: "subheading", type: "text", defaultValue: "Text-only logo cloud." },
    {
      name: "logos",
      label: "Brands",
      labels: { singular: "Brand", plural: "Brands" },
      type: "array",
      defaultValue: [
        { label: "Nvidia", href: "#" },
        { label: "Column", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "Nike", href: "#" },
        { label: "Lemon Squeezy", href: "#" },
        { label: "Laravel", href: "#" },
      ],
      fields: [
        { name: "label", label: "Label", type: "text", required: true },
        { name: "href", label: "Link (href)", type: "text" },
      ],
    },
  ],
};
