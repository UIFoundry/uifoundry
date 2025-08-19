import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_2,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const Hero_2_Block: Block = {
  slug: BLOCK_SLUG_HERO_2,
  labels: {
    singular: "Hero 2 - Video Background",
    plural: "Hero 2's",
  },
  admin: {
    group: BLOCK_GROUP_HERO,
  },
  interfaceName: "Hero_2_Block",
  fields: [
    {
      name: "eyebrow",
      label: "Eyebrow Text",
      type: "text",
      defaultValue: "New Release",
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Revolutionary AI-Powered Platform",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      defaultValue:
        "Transform your business with cutting-edge artificial intelligence technology that delivers real results.",
      type: "text",
    },
    {
      name: "primaryCtaLabel",
      label: "Primary CTA Label",
      type: "text",
      required: true,
      defaultValue: "Get Started Free",
    },
    {
      name: "primaryCtaHref",
      label: "Primary CTA Link",
      type: "text",
      required: true,
      defaultValue: "/signup",
    },
    {
      name: "secondaryCtaLabel",
      label: "Secondary CTA Label",
      type: "text",
      defaultValue: "Watch Demo",
    },
    {
      name: "secondaryCtaHref",
      label: "Secondary CTA Link",
      type: "text",
      defaultValue: "/demo",
    },
    {
      name: "videoUrl",
      label: "Background Video URL",
      type: "text",
      defaultValue: "https://example.com/hero-video.mp4",
    },
    mediaField({
      name: "fallbackImage",
      label: "Fallback Image",
    }),
    {
      name: "enableOverlay",
      label: "Enable Dark Overlay",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
