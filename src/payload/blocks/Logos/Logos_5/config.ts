import type { Block } from "payload";
import {
  BLOCK_GROUP_LOGOS,
  BLOCK_SLUG_LOGOS_5,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField";

export const Logos_5_Block: Block = {
  slug: BLOCK_SLUG_LOGOS_5,
  interfaceName: "Logos_5_Block",
  labels: { singular: "Logos 5", plural: "Logos 5's" },
  admin: { group: BLOCK_GROUP_LOGOS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Used by startups and enterprises",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Compact logo cloud with wrapping.",
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
