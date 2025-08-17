import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_5,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Features_5_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_5,
  interfaceName: "Features_5_Block",
  labels: { singular: "Features 5", plural: "Features 5's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      label: "Header",
      required: true,
      defaultValue: "How it works",
    },
    {
      name: "subheader",
      type: "text",
      label: "SubHeader",
      defaultValue: "From zero to shipped in four steps",
    },
    {
      name: "steps",
      type: "array",
      labels: { singular: "Step", plural: "Steps" },
      required: true,
      minRows: 3,
      fields: [
        { name: "title", type: "text", required: true, defaultValue: "Step" },
        { name: "description", type: "text", required: false },
        iconField(),
      ],
      defaultValue: [
        { title: "Connect", description: "Link your data", icon: "Plug" },
        {
          title: "Configure",
          description: "Adjust settings",
          icon: "Settings",
        },
        { title: "Automate", description: "Add workflows", icon: "Bot" },
        { title: "Ship", description: "Go live", icon: "Rocket" },
      ],
    },
  ],
};
