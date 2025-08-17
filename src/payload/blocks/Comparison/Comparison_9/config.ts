import type { Block } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_9,
} from "~/payload/constants/blocks";

export const Comparison_9_Block: Block = {
  slug: BLOCK_SLUG_COMPARISON_9,
  interfaceName: "Comparison_9_Block",
  labels: { singular: "Comparison 9", plural: "Comparison 9's" },
  admin: { group: BLOCK_GROUP_COMPARISON },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Comparison",
    },
    { name: "subheading", type: "text", defaultValue: "Quick overview" },
    {
      name: "columns",
      type: "array",
      minRows: 2,
      maxRows: 4,
      defaultValue: [
        { name: "Option A", accessorKey: "optionA" },
        { name: "Option B", accessorKey: "optionB" },
      ],
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "accessorKey",
          label: "Accessor Key",
          type: "text",
          required: true,
          admin: { placeholder: "e.g. optionA | optionB" },
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
      defaultValue: [{ feature: "Auth", optionA: true, optionB: true }],
    },
  ],
};
