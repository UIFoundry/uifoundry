import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_7,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";
import mediaField from "~/payload/fields/mediaField";

export const Features_7_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_7,
  interfaceName: "Features_7_Block",
  labels: { singular: "Features 7", plural: "Features 7's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      label: "Header",
      required: true,
      defaultValue: "Why teams choose us",
    },
    {
      name: "subheader",
      type: "text",
      label: "SubHeader",
      defaultValue: "A closer look at core capabilities",
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
        {
          name: "description",
          type: "text",
          required: false,
          defaultValue: "Short description",
        },
        iconField(),
        mediaField({ name: "media" }),
      ],
      defaultValue: [
        { title: "Speed", description: "Ship features faster", icon: "Zap" },
        {
          title: "Automation",
          description: "Reduce manual toil",
          icon: "Workflow",
        },
        {
          title: "Security",
          description: "Enterprise-grade by default",
          icon: "Shield",
        },
        { title: "Collaboration", description: "Stay in sync", icon: "Users" },
      ],
    },
  ],
};
