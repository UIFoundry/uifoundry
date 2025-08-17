import type { Block } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_2,
} from "~/payload/constants/blocks";

export const Comparison_2_Block: Block = {
  slug: BLOCK_SLUG_COMPARISON_2,
  interfaceName: "Comparison_2_Block",
  labels: { singular: "Comparison 2", plural: "Comparison 2's" },
  admin: { group: BLOCK_GROUP_COMPARISON },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Feature matrix",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Side-by-side comparison",
    },
    {
      name: "columns",
      type: "array",
      required: true,
      minRows: 2,
      maxRows: 4,
      defaultValue: [
        { name: "Starter", accessorKey: "starter" },
        { name: "Business", accessorKey: "business" },
      ],
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "accessorKey",
          label: "Accessor Key",
          type: "text",
          required: true,
          admin: { placeholder: "e.g. starter | business" },
        },
        {
          label: "Column Options",
          type: "collapsible",
          admin: { initCollapsed: true },
          fields: [
            {
              name: "enableHiding",
              type: "checkbox",
              required: true,
              defaultValue: false,
            },
            {
              name: "enableGrouping",
              type: "checkbox",
              required: true,
              defaultValue: false,
            },
            {
              name: "enableSorting",
              type: "checkbox",
              required: true,
              defaultValue: false,
            },
            {
              name: "enablePinning",
              type: "checkbox",
              required: true,
              defaultValue: false,
            },
            {
              name: "enableResizing",
              type: "checkbox",
              required: true,
              defaultValue: false,
            },
          ],
        },
      ],
      labels: { singular: "Column", plural: "Columns" },
    },
    {
      name: "data",
      label: "Table Data (JSON)",
      type: "json",
      required: true,
      admin: {
        description:
          "Provide an array of row objects. Include 'feature' and keys matching each column accessorKey. Boolean values render colored dots.",
      },
      defaultValue: [
        { feature: "Seats", starter: true, business: true },
        { feature: "Custom roles", starter: false, business: true },
        { feature: "Audit logs", starter: false, business: true },
      ],
    },
  ],
};
