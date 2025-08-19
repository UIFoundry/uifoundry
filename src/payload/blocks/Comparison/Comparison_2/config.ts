import type { Block, FieldHook } from "payload";
import {
  BLOCK_GROUP_COMPARISON,
  BLOCK_SLUG_COMPARISON_2,
} from "~/payload/constants/blocks";
import type { Comparison_2_Block as Comparison2Block } from "~/payload-types";

type ColDef = { accessorKey?: string; name?: string };

type WithID<T> = T & { id: string | number };

type Comparison2SiblingData = { columns?: Comparison2Block["columns"] };

const validateComparisonData: FieldHook<
  WithID<Comparison2Block>,
  Comparison2Block["data"],
  Comparison2SiblingData
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
  for (let i = 0; i < value.length; i++) {
    const row = value[i];
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
  }
  return value;
};

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
        { name: "Feature", accessorKey: "feature" },
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
      hooks: {
        beforeChange: [validateComparisonData],
      },
    },
  ],
};
