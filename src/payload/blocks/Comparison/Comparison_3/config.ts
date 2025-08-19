import type { Block, FieldHook } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_3,
} from "~/payload/constants/blocks";
import type { Comparison_3_Block as Comparison3Block } from "~/payload-types";

type ColDef = { accessorKey?: string; name?: string };

type WithID<T> = T & { id: string | number };

type Comparison3SiblingData = { columns?: Comparison3Block["columns"] };

const validateComparisonData: FieldHook<
  WithID<Comparison3Block>,
  Comparison3Block["data"],
  Comparison3SiblingData
> = ({ value, siblingData }) => {
  if (!Array.isArray(value)) {
    throw new Error(
      "Comparison data must be an array of row objects. Provided data has an incorrectly coded field.",
    );
  }

  const cols: ColDef[] = siblingData?.columns ?? [];
  const colKeys = cols
    .map((c) =>
      typeof c?.accessorKey === "string" && c.accessorKey.trim()
        ? c.accessorKey.trim()
        : typeof c?.name === "string"
          ? c.name.trim()
          : "",
    )
    .filter((k) => k);
  const dup = new Set<string>();
  for (const k of colKeys) {
    if (dup.has(k)) {
      throw new Error(
        `Comparison data validation failed: duplicate column accessorKey '${k}'. Please ensure each column has a unique accessorKey.`,
      );
    }
    dup.add(k);
  }
  const allowedTypes = new Set(["boolean", "string", "number"]);
  const expectedKeys = new Set(["feature", ...colKeys]);

  const rows: unknown[] = Array.isArray(value) ? value : [];

  rows.forEach((row, i) => {
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      throw new Error(
        `Comparison data row ${i + 1} is not an object. Provided data has an incorrectly coded field.`,
      );
    }
    const r = row as Record<string, unknown>;
    if (typeof r.feature !== "string") {
      throw new Error(
        `Comparison data row ${i + 1} is missing a string 'feature' field.`,
      );
    }
    for (const key of Object.keys(r)) {
      if (!expectedKeys.has(key)) {
        throw new Error(
          `Comparison data row ${i + 1} contains unexpected key '${key}'. Keys must be one of: ${Array.from(expectedKeys).join(", ")}.`,
        );
      }
    }
    for (const k of colKeys) {
      const v = r[k];
      if (v === null || v === undefined) continue;
      if (!allowedTypes.has(typeof v)) {
        throw new Error(
          `Comparison data row ${i + 1} has invalid type for '${k}'. Allowed types: boolean, string, number, null.`,
        );
      }
    }
  });

  return value;
};

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
        { name: "Feature", accessorKey: "feature" },
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
      hooks: {
        beforeChange: [validateComparisonData],
      },
    },
  ],
};
