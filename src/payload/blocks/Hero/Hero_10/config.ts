import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_10,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import colorField from "~/payload/fields/colorField";

export const Hero_10_Block: Block = {
  slug: BLOCK_SLUG_HERO_10,
  labels: { singular: "Hero 10", plural: "Hero 10's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_10_Block",
  fields: [
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Vibes on tap",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      type: "text",
      defaultValue:
        "Animated GIF-filled headline inspired by Cult UI's Text Gif.",
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
          defaultValue: "View Components",
        },
        {
          name: "secondaryCtaHref",
          label: "Secondary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/docs/components",
        },
      ],
    },
    {
      label: "Text GIF",
      type: "collapsible",
      admin: { initCollapsed: false },
      fields: [
        {
          name: "gifUrl",
          label: "GIF URL",
          type: "text",
          required: false,
          defaultValue:
            "https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif",
        },
        {
          name: "gifScale",
          label: "GIF Scale (%)",
          type: "number",
          admin: { step: 5 },
          defaultValue: 100,
        },
        colorField({
          name: "fallbackFrom",
          label: "Fallback From",
          description: "Start color when GIF is missing",
          defaultValue: "#7c3aed",
        }),
        colorField({
          name: "fallbackTo",
          label: "Fallback To",
          description: "End color when GIF is missing",
          defaultValue: "#06b6d4",
        }),
      ],
    },
  ],
};
