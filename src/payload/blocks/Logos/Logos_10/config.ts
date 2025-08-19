import type { Block } from "payload";
import {
  BLOCK_GROUP_LOGOS,
  BLOCK_SLUG_LOGOS_10,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField";

export const Logos_10_Block: Block = {
  slug: BLOCK_SLUG_LOGOS_10,
  interfaceName: "Logos_10_Block",
  labels: { singular: "Logos 10", plural: "Logos 10's" },
  admin: { group: BLOCK_GROUP_LOGOS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Integrations",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Popular tools we work with.",
    },
    {
      name: "logos",
      label: "Integrations",
      labels: { singular: "Integration", plural: "Integrations" },
      type: "array",
      admin: { initCollapsed: true },
      defaultValue: [
        { label: "GitHub", href: "#" },
        { label: "OpenAI", href: "#" },
        { label: "Stripe", href: "#" },
        { label: "Vercel", href: "#" },
      ],
      fields: [
        { name: "label", label: "Label", type: "text", required: true },
        { name: "href", label: "Link (href)", type: "text" },
        mediaField({ name: "media" }),
      ],
    },
  ],
};
