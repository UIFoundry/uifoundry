import {
  BLOCK_GROUP_VALUE_PROPOSITION,
  BLOCK_SLUG_VALUE_PROPOSITION_1,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";
import iconField from "~/payload/fields/iconField";

export const ValueProposition_1_Block: Block = {
  slug: BLOCK_SLUG_VALUE_PROPOSITION_1,
  labels: {
    singular: "Value Proposition 1 - Feature Grid",
    plural: "Value Proposition 1's",
  },
  admin: {
    group: BLOCK_GROUP_VALUE_PROPOSITION,
  },
  interfaceName: "ValueProposition_1_Block",
  fields: [
    {
      name: "eyebrow",
      label: "Eyebrow Text",
      type: "text",
      defaultValue: "Why Choose Us",
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Everything you need to succeed",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      defaultValue:
        "Our comprehensive platform provides all the tools and features you need to take your business to the next level.",
      type: "text",
    },
    {
      name: "features",
      label: "Features",
      type: "array",
      required: true,
      defaultValue: [
        {
          title: "Advanced Analytics",
          description:
            "Get deep insights into your performance with our comprehensive analytics dashboard.",
          icon: "BarChart",
        },
        {
          title: "24/7 Support",
          description:
            "Our dedicated support team is available around the clock to help you succeed.",
          icon: "Headphones",
        },
        {
          title: "Enterprise Security",
          description:
            "Bank-level security with end-to-end encryption to keep your data safe.",
          icon: "Shield",
        },
        {
          title: "Easy Integration",
          description:
            "Seamlessly integrate with your existing tools and workflows in minutes.",
          icon: "Plug",
        },
      ],
      fields: [
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
      name: "primaryCtaLabel",
      label: "Primary CTA Label",
      type: "text",
      defaultValue: "Get Started Today",
    },
    {
      name: "primaryCtaHref",
      label: "Primary CTA Link",
      type: "text",
      defaultValue: "/signup",
    },
    mediaField({
      name: "backgroundImage",
      label: "Background Image (Optional)",
    }),
  ],
};
