import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_4,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Features_4_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_4,
  interfaceName: "Features_4_Block",
  labels: { singular: "Features 4", plural: "Features 4's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      label: "Header",
      required: true,
      defaultValue: "Everything in one place",
    },
    {
      name: "subheader",
      type: "text",
      label: "SubHeader",
      defaultValue: "A playful bento grid",
    },
    {
      name: "items",
      type: "array",
      labels: { singular: "Item", plural: "Items" },
      required: true,
      minRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Feature",
        },
        { name: "description", type: "text", required: false },
        iconField(),
        { name: "href", type: "text", required: false },
        {
          name: "colSpan",
          type: "number",
          admin: { step: 1 },
          defaultValue: 1,
        },
        {
          name: "rowSpan",
          type: "number",
          admin: { step: 1 },
          defaultValue: 1,
        },
      ],
      defaultValue: [
        {
          title: "Automation",
          description: "Reduce toil",
          icon: "Workflow",
          colSpan: 2,
          rowSpan: 1,
        },
        {
          title: "Collaboration",
          description: "Stay in sync",
          icon: "Users",
          colSpan: 1,
          rowSpan: 1,
        },
        {
          title: "Insights",
          description: "Know what's next",
          icon: "ChartColumn",
          colSpan: 1,
          rowSpan: 2,
        },
        {
          title: "Security",
          description: "Ship safely",
          icon: "Shield",
          colSpan: 2,
          rowSpan: 1,
        },
      ],
    },
  ],
};
