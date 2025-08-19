import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";
import iconField from "~/payload/fields/iconField";
import {
  BLOCK_SLUG_VALUE_PROPOSITION_2,
  BLOCK_GROUP_VALUE_PROPOSITION,
} from "~/payload/constants/blocks";

export const ValueProposition_2_Block: Block = {
  slug: BLOCK_SLUG_VALUE_PROPOSITION_2,
  labels: {
    singular: "Value Proposition 2",
    plural: "Value Proposition 2",
  },
  interfaceName: "ValueProposition_2_Block",
  admin: {
    group: BLOCK_GROUP_VALUE_PROPOSITION,
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Why Choose Us",
    },
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Built for modern teams",
    },
    {
      name: "subheader",
      type: "textarea",
      defaultValue:
        "Everything you need to build and scale your business, all in one place.",
    },
    {
      name: "benefits",
      type: "array",
      minRows: 3,
      maxRows: 6,
      defaultValue: [
        {
          icon: "Shield",
          title: "Enterprise Security",
          description:
            "Bank-level security with SOC 2 compliance and end-to-end encryption.",
        },
        {
          icon: "Zap",
          title: "Lightning Fast",
          description:
            "Optimized performance with global CDN and edge computing.",
        },
        {
          icon: "Users",
          title: "Team Collaboration",
          description: "Real-time collaboration tools for distributed teams.",
        },
        {
          icon: "BarChart3",
          title: "Advanced Analytics",
          description: "Deep insights with custom dashboards and reporting.",
        },
        {
          icon: "Smartphone",
          title: "Mobile Ready",
          description:
            "Native mobile apps for iOS and Android with offline support.",
        },
        {
          icon: "Headphones",
          title: "24/7 Support",
          description: "Round-the-clock support from our expert team.",
        },
      ],
      fields: [
        iconField({
          name: "icon",
          required: true,
        }),
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      defaultValue: "Get Started Free",
    },
    {
      name: "ctaHref",
      type: "text",
      defaultValue: "/signup",
    },
    {
      name: "secondaryCtaLabel",
      type: "text",
      defaultValue: "View Demo",
    },
    {
      name: "secondaryCtaHref",
      type: "text",
      defaultValue: "/demo",
    },
    mediaField({
      name: "backgroundImage",
    }),
  ],
};
