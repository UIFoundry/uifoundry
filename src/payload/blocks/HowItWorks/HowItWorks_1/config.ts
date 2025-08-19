import {
  BLOCK_GROUP_HOW_IT_WORKS,
  BLOCK_SLUG_HOW_IT_WORKS_1,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import iconField from "~/payload/fields/iconField";

export const HowItWorks_1_Block: Block = {
  slug: BLOCK_SLUG_HOW_IT_WORKS_1,
  labels: {
    singular: "How It Works 1 - Step Process",
    plural: "How It Works 1's",
  },
  admin: {
    group: BLOCK_GROUP_HOW_IT_WORKS,
  },
  interfaceName: "HowItWorks_1_Block",
  fields: [
    {
      name: "eyebrow",
      label: "Eyebrow Text",
      type: "text",
      defaultValue: "How It Works",
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Get started in 3 simple steps",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      defaultValue:
        "Our streamlined process makes it easy to get up and running quickly with maximum efficiency.",
      type: "text",
    },
    {
      name: "steps",
      label: "Steps",
      type: "array",
      required: true,
      defaultValue: [
        {
          number: "01",
          title: "Sign Up",
          description:
            "Create your account in just 30 seconds with your email or social login.",
          icon: "UserPlus",
        },
        {
          number: "02",
          title: "Configure",
          description:
            "Customize your settings and preferences to match your workflow needs.",
          icon: "Settings",
        },
        {
          number: "03",
          title: "Launch",
          description:
            "Start using our platform immediately and see results within minutes.",
          icon: "Rocket",
        },
      ],
      fields: [
        {
          name: "number",
          label: "Step Number",
          type: "text",
          required: true,
        },
        iconField({
          name: "icon",
          label: "Icon",
          required: true,
        }),
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ctaLabel",
      label: "CTA Button Label",
      type: "text",
      defaultValue: "Start Your Journey",
    },
    {
      name: "ctaHref",
      label: "CTA Button Link",
      type: "text",
      defaultValue: "/signup",
    },
  ],
};
