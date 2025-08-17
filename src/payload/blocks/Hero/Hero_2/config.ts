import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_2,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const Hero_2_Block: Block = {
  slug: BLOCK_SLUG_HERO_2,
  labels: { singular: "Hero 2", plural: "Hero 2's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_2_Block",
  fields: [
    {
      type: "collapsible",
      label: "New Update Alert",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "alertLabel",
          label: "Alert Label",
          defaultValue: "Now with smart workflows",
          type: "text",
        },
        {
          name: "alertLink",
          label: "Alert Link (href)",
          defaultValue: "/changelog",
          type: "text",
        },
      ],
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Build beautiful experiences, faster",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      type: "text",
      defaultValue: "Animated hero with gradient blobs and split media.",
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
          defaultValue: "Get Started",
        },
        {
          name: "primaryCtaHref",
          label: "Primary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/getting-started",
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
          defaultValue: "Book a demo",
        },
        {
          name: "secondaryCtaHref",
          label: "Secondary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/contact",
        },
      ],
    },
    mediaField(),
  ],
};
