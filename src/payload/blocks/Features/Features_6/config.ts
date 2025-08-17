import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_6,
} from "~/payload/constants/blocks";

export const Features_6_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_6,
  interfaceName: "Features_6_Block",
  labels: { singular: "Features 6", plural: "Features 6's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Everything at a glance",
    },
    { name: "subheader", type: "text", defaultValue: "Switch tabs to explore" },
    {
      name: "tabs",
      type: "array",
      labels: { singular: "Tab", plural: "Tabs" },
      required: true,
      minRows: 3,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          defaultValue: "Overview",
        },
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Feature Title",
        },
        { name: "description", type: "textarea", required: false },
      ],
      defaultValue: [
        {
          label: "Overview",
          title: "Stay organized",
          description: "Manage all your items in one place.",
        },
        {
          label: "Automation",
          title: "Save time",
          description: "Automate repetitive tasks with ease.",
        },
        {
          label: "Security",
          title: "Ship safely",
          description: "Enterprise-grade security by default.",
        },
      ],
    },
  ],
};
