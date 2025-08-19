import type { Block } from "payload";
import {
  BLOCK_GROUP_LOGOS,
  BLOCK_SLUG_LOGOS_1,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField";

export const Logos_1_Block: Block = {
  slug: BLOCK_SLUG_LOGOS_1,
  interfaceName: "Logos_1_Block",
  labels: { singular: "Logos 1", plural: "Logos 1's" },
  admin: { group: BLOCK_GROUP_LOGOS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Trusted by teams at",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Join companies using our product.",
    },
    {
      name: "grayscale",
      type: "checkbox",
      label: "Render logos in grayscale",
      defaultValue: true,
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
