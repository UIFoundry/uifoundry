import type { Block } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_4,
} from "~/payload/constants/blocks";

export const Comparison_4_Block: Block = {
  slug: BLOCK_SLUG_COMPARISON_4,
  interfaceName: "Comparison_4_Block",
  labels: { singular: "Comparison 4", plural: "Comparison 4's" },
  admin: { group: BLOCK_GROUP_COMPARISON },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Why choose us",
    },
    { name: "subheading", type: "text", defaultValue: "Features at a glance" },
    {
      name: "columns",
      type: "array",
      minRows: 2,
      maxRows: 4,
      defaultValue: [
        { name: "Us", accessorKey: "us" },
        { name: "Them", accessorKey: "them" },
      ],
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "accessorKey",
          label: "Accessor Key",
          type: "text",
          required: true,
          admin: { placeholder: "e.g. us | them" },
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
      defaultValue: [{ feature: "SLA", us: true, them: false }],
    },
  ],
};
