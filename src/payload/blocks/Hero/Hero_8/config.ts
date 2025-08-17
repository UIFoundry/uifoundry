import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_8,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const Hero_8_Block: Block = {
  slug: BLOCK_SLUG_HERO_8,
  labels: { singular: "Hero 8", plural: "Hero 8's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_8_Block",
  fields: [
    {
      type: "collapsible",
      label: "New Update Alert",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "alertLabel",
          label: "Alert Label",
          defaultValue: "New CLI tools",
          type: "text",
        },
        {
          name: "alertLink",
          label: "Alert Link (href)",
          defaultValue: "/cli",
          type: "text",
        },
      ],
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Developer-first, production-ready",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      type: "text",
      defaultValue: "Code-focused hero with zoom-in media.",
    },
    {
      label: "Background Video",
      type: "collapsible",
      admin: { initCollapsed: false },
      fields: [
        {
          name: "videoUrl",
          label: "Video URL",
          type: "text",
          required: false,
          defaultValue: "",
        },
        {
          name: "variant",
          label: "Variant",
          type: "select",
          options: [
            { label: "Centered", value: "center" },
            { label: "Left-aligned", value: "left" },
          ],
          defaultValue: "center",
          required: true,
        },
        {
          name: "overlayOpacity",
          label: "Overlay Opacity",
          type: "number",
          admin: { step: 0.05 },
          defaultValue: 0.4,
          required: false,
        },
      ],
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
          defaultValue: "Get CLI",
        },
        {
          name: "primaryCtaHref",
          label: "Primary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/docs/cli",
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
          defaultValue: "Read docs",
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
    mediaField(),
  ],
};
