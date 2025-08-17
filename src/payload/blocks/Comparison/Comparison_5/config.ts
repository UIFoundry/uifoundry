import type { Block } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_5,
} from "~/payload/constants/blocks";

export const Comparison_5_Block: Block = {
  slug: BLOCK_SLUG_COMPARISON_5,
  interfaceName: "Comparison_5_Block",
  labels: { singular: "Comparison 5", plural: "Comparison 5's" },
  admin: { group: BLOCK_GROUP_COMPARISON },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Side-by-side",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Compare everything easily",
    },
    {
      name: "columns",
      type: "array",
      minRows: 2,
      maxRows: 4,
      defaultValue: [
        { name: "Basic", accessorKey: "basic" },
        { name: "Pro", accessorKey: "pro" },
      ],
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "accessorKey",
          label: "Accessor Key",
          type: "text",
          required: true,
          admin: { placeholder: "e.g. basic | pro" },
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
    },
    {
      name: "data",
      label: "Table Data (JSON)",
      type: "json",
      admin: {
        description:
          "Provide an array of row objects. Include 'feature' and keys matching each column accessorKey. Boolean values render colored dots.",
      },
      defaultValue: [{ feature: "API Access", basic: true, pro: true }],
    },
  ],
};
