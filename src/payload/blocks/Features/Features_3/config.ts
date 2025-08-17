import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_3,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/mediaField";

export const Features_3_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_3,
  interfaceName: "Features_3_Block",
  labels: { singular: "Features 3", plural: "Features 3's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      label: "Header",
      required: true,
      defaultValue: "Built to cover your needs",
    },
    {
      name: "subheader",
      type: "text",
      label: "SubHeader",
      defaultValue: "A concise list of value props",
    },
    {
      name: "bullets",
      type: "array",
      labels: { singular: "Bullet", plural: "Bullets" },
      required: true,
      minRows: 3,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Customizable",
        },
        {
          name: "description",
          type: "text",
          required: false,
          defaultValue: "Extensive customization options",
        },
      ],
      defaultValue: [
        { title: "Customizable", description: "Tailor everything" },
        { title: "AI-powered", description: "Smart defaults" },
        { title: "Full control", description: "You own the stack" },
      ],
    },
    mediaField(),
  ],
};
