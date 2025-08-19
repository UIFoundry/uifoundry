import type { Block } from "payload";
import {
  BLOCK_GROUP_LOGOS,
  BLOCK_SLUG_LOGOS_8,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField";

export const Logos_8_Block: Block = {
  slug: BLOCK_SLUG_LOGOS_8,
  interfaceName: "Logos_8_Block",
  labels: { singular: "Logos 8", plural: "Logos 8's" },
  admin: { group: BLOCK_GROUP_LOGOS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Customers and partners",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Compact left-aligned cloud.",
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
      ],
      fields: [
        { name: "label", label: "Label", type: "text", required: true },
        { name: "href", label: "Link (href)", type: "text" },
        mediaField({ name: "media" }),
      ],
    },
  ],
};
