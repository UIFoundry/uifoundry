import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_2,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Features_2_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_2,
  interfaceName: "Features_2_Block",
  labels: { singular: "Features 2", plural: "Features 2's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      label: "Header",
      required: true,
      defaultValue: "Everything you need",
    },
    {
      name: "subheader",
      type: "text",
      label: "SubHeader",
      defaultValue: "A clear overview of what you ship.",
    },
    {
      name: "features",
      type: "array",
      labels: { singular: "Feature", plural: "Features" },
      required: true,
      minRows: 3,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Feature title",
        },
        {
          name: "description",
          type: "text",
          required: false,
          defaultValue: "Short description",
        },
        iconField(),
        { name: "linkLabel", type: "text", required: false },
        { name: "linkHref", type: "text", required: false },
      ],
      defaultValue: [
        { title: "Fast", description: "Optimized out of the box", icon: "Zap" },
        {
          title: "Reliable",
          description: "99.99% uptime",
          icon: "ShieldCheck",
        },
        {
          title: "Secure",
          description: "Best-in-class security",
          icon: "Lock",
        },
        {
          title: "Customizable",
          description: "Your brand, your way",
          icon: "Cog",
        },
        {
          title: "Accessible",
          description: "AA compliant",
          icon: "Accessibility",
        },
        { title: "Global", description: "Edge-ready", icon: "Globe" },
      ],
    },
  ],
};
