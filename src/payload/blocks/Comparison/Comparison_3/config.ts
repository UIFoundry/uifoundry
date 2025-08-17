import type { Block } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_3,
} from "~/payload/constants/blocks";

export const Comparison_3_Block: Block = {
  slug: BLOCK_SLUG_COMPARISON_3,
  interfaceName: "Comparison_3_Block",
  labels: { singular: "Comparison 3", plural: "Comparison 3's" },
  admin: { group: BLOCK_GROUP_COMPARISON },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Platform comparison",
    },
    { name: "subheading", type: "text", defaultValue: "How we stack up" },
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
      defaultValue: [
        { feature: "Uptime SLA", us: true, them: false },
        { feature: "Custom domains", us: true, them: true },
        { feature: "Audit logs", us: true, them: false },
      ],
    },
  ],
};
