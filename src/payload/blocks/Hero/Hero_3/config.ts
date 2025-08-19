import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_3,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const Hero_3_Block: Block = {
  slug: BLOCK_SLUG_HERO_3,
  labels: {
    singular: "Hero 3 - Split Layout",
    plural: "Hero 3's",
  },
  admin: {
    group: BLOCK_GROUP_HERO,
  },
  interfaceName: "Hero_3_Block",
  fields: [
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Transform Your Business Today",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      defaultValue:
        "Join thousands of companies who trust our platform to scale their operations and achieve remarkable growth.",
      type: "text",
    },
    {
      name: "primaryCtaLabel",
      label: "Primary CTA Label",
      type: "text",
      required: true,
      defaultValue: "Start Free Trial",
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
      defaultValue: "Learn More",
    },
    {
      name: "secondaryCtaHref",
      label: "Secondary CTA Link",
      type: "text",
      defaultValue: "/about",
    },
    {
      name: "features",
      label: "Key Features",
      type: "array",
      defaultValue: [
        {
          text: "✓ Enterprise-grade security",
        },
        {
          text: "✓ 99.9% uptime guarantee",
        },
        {
          text: "✓ 24/7 customer support",
        },
      ],
      fields: [
        {
          name: "text",
          label: "Feature Text",
          type: "text",
          required: true,
        },
      ],
    },
    mediaField(),
  ],
};
