import type { Block, FieldHook } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_7,
} from "~/payload/constants/blocks";

type ColDef = { accessorKey?: string; name?: string };

const validateComparisonData: FieldHook<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown,
  { columns?: ColDef[] }
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
  return value as unknown;
};

export const Comparison_7_Block: Block = {
  slug: BLOCK_SLUG_COMPARISON_7,
  interfaceName: "Comparison_7_Block",
  labels: { singular: "Comparison 7", plural: "Comparison 7's" },
  admin: { group: BLOCK_GROUP_COMPARISON },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Compare features",
    },
    { name: "subheading", type: "text", defaultValue: "Matrix view" },
    {
      name: "columns",
      type: "array",
      minRows: 2,
      maxRows: 4,
      defaultValue: [
        { name: "Feature", accessorKey: "feature" },
        { name: "Free", accessorKey: "free" },
        { name: "Pro", accessorKey: "pro" },
      ],
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "accessorKey",
          label: "Accessor Key",
          type: "text",
          required: true,
          admin: { placeholder: "e.g. free | pro" },
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
      defaultValue: [{ feature: "Users", free: true, pro: true }],
      hooks: {
        beforeChange: [validateComparisonData],
      },
    },
  ],
};
