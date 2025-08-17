import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_3,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const Hero_3_Block: Block = {
  slug: BLOCK_SLUG_HERO_3,
  labels: { singular: "Hero 3", plural: "Hero 3's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_3_Block",
  fields: [
    {
      type: "collapsible",
      label: "New Update Alert",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "alertLabel",
          label: "Alert Label",
          defaultValue: "Now supporting multi-tenant",
          type: "text",
        },
        {
          name: "alertLink",
          label: "Alert Link (href)",
          defaultValue: "/multi-tenant",
          type: "text",
        },
      ],
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Upgrade your product launch",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      type: "text",
      defaultValue: "Spotlight hero with animated logos carousel.",
    },
    {
      label: "Primary Call To Action",
      type: "collapsible",
      fields: [
        {
          name: "primaryCtaLabel",
          label: "Primary Call To Action: Label",
          type: "text",
          required: true,
          defaultValue: "Try it free",
        },
        {
          name: "primaryCtaHref",
          label: "Primary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/signup",
        },
      ],
    },
    {
      label: "Secondary Call To Action",
      type: "collapsible",
      fields: [
        {
          name: "secondaryCtaLabel",
          label: "Secondary Call To Action: Label",
          type: "text",
          required: true,
          defaultValue: "Docs",
        },
        {
          name: "secondaryCtaHref",
          label: "Secondary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/docs",
        },
      ],
    },
    {
      name: "logos",
      label: "Logo Cloud",
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
    mediaField(),
  ],
};
