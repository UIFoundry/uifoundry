import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_6,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const Hero_6_Block: Block = {
  slug: BLOCK_SLUG_HERO_6,
  labels: { singular: "Hero 6", plural: "Hero 6's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_6_Block",
  fields: [
    {
      type: "collapsible",
      label: "New Update Alert",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "alertLabel",
          label: "Alert Label",
          defaultValue: "New templates",
          type: "text",
        },
        {
          name: "alertLink",
          label: "Alert Link (href)",
          defaultValue: "/templates",
          type: "text",
        },
      ],
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Make a bold first impression",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      type: "text",
      defaultValue: "Diagonal grid with animated lines and glow.",
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
          defaultValue: "Start free",
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
          defaultValue: "Learn more",
        },
        {
          name: "secondaryCtaHref",
          label: "Secondary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/pricing",
        },
      ],
    },
    mediaField(),
  ],
};
