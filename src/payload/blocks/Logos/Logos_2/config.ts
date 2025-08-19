import type { Block } from "payload";
import {
  BLOCK_GROUP_LOGOS,
  BLOCK_SLUG_LOGOS_2,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField";

export const Logos_2_Block: Block = {
  slug: BLOCK_SLUG_LOGOS_2,
  interfaceName: "Logos_2_Block",
  labels: { singular: "Logos 2", plural: "Logos 2's" },
  admin: { group: BLOCK_GROUP_LOGOS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Trusted by leading teams",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "A scrolling carousel of brand logos.",
    },
    {
      name: "logosScrollDirection",
      label: "Logo Scroll Direction",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
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
