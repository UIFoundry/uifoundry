import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_9,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Features_9_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_9,
  interfaceName: "Features_9_Block",
  labels: { singular: "Features 9", plural: "Features 9's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Everything explained",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Expand items to learn more",
    },
    {
      name: "items",
      type: "array",
      labels: { singular: "Item", plural: "Items" },
      required: true,
      minRows: 3,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Feature",
        },
        { name: "content", type: "textarea", required: false },
        iconField(),
      ],
      defaultValue: [
        {
          title: "Performance",
          content: "Blazing fast by design",
          icon: "Zap",
        },
        {
          title: "Developer-first",
          content: "Great DX and tooling",
          icon: "CodeXml",
        },
        { title: "Scalable", content: "Grows with your team", icon: "Layers" },
      ],
    },
  ],
};
