import type { Block, FieldHook } from "payload";
import {
	BLOCK_GROUP_COMPARISON,
	BLOCK_SLUG_COMPARISON_1,
} from "~/payload/constants/blocks";
import type { Comparison_1_Block as Comparison1Block } from "~/payload-types";
import selectEnumField from "~/payload/fields/selectEnumField";
import { TABLE_COL_ALIGNMENT } from "~/payload/constants/fields";

type ColDef = { accessorKey?: string; name?: string };
type WithID<T> = T & { id: string | number };

type Comparison1SiblingData = { columns?: Comparison1Block["columns"] };

const validateComparisonData: FieldHook<
	WithID<Comparison1Block>,
	Comparison1Block["data"],
	Comparison1SiblingData
> = ({ value, siblingData }) => {
	if (!Array.isArray(value)) {
		throw new Error(
			"Comparison data must be an array of row objects. Provided data has an incorrectly coded field.",
		);
	}

	const cols: ColDef[] = siblingData?.columns ?? [];

	// Build set of expected keys from columns (fall back to name)
	const colKeys = cols
		.map((c) =>
			typeof c?.accessorKey === "string" && c.accessorKey.trim()
				? c.accessorKey.trim()
				: typeof c?.name === "string"
					? c.name.trim()
					: "",
		)
		.filter((k) => k);

	// Basic column sanity
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

	const rows = Array.isArray(value) ? value : [];

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

		// Unexpected keys guard (helps catch typos in accessorKey)
		for (const key of Object.keys(r)) {
			if (!expectedKeys.has(key)) {
				throw new Error(
					`Comparison data row ${i + 1} contains unexpected key '${key}'. Keys must be one of: ${Array.from(expectedKeys).join(", ")}.`,
				);
			}
		}

		// Validate types for known column keys (if provided)
		for (const k of colKeys) {
			const v = r[k];
			if (v === null || v === undefined) continue; // allowed -> renders empty cell
			if (!allowedTypes.has(typeof v)) {
				throw new Error(
					`Comparison data row ${i + 1} has invalid type for '${k}'. Allowed types: boolean, string, number, null.`,
				);
			}
		}
	});

	return value;
};

export const Comparison_1_Block: Block = {
	slug: BLOCK_SLUG_COMPARISON_1,
	interfaceName: "Comparison_1_Block",
	labels: { singular: "Comparison 1", plural: "Comparison 1's" },
	admin: { group: BLOCK_GROUP_COMPARISON },
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			defaultValue: "Compare plans",
		},
		{
			name: "subheading",
			type: "text",
			defaultValue: "What’s included in each plan",
		},
		{
			name: "columns",
			type: "array",
			required: true,
			minRows: 2,
			maxRows: 4,
			defaultValue: [
				{ accessorKey: "feature", header: "Feature" },
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
						selectEnumField<typeof TABLE_COL_ALIGNMENT>({
							object: TABLE_COL_ALIGNMENT,
							name: "alignContent",
							label: "Align Content",
							required: true,
							defaultValue: TABLE_COL_ALIGNMENT.left,
						}),
						{
							type: "row",
							fields: [
								{
									name: "enableHiding",
									label: "Enable Hiding",
									type: "checkbox",
									required: true,
									defaultValue: false,
								},
								{
									name: "enableGrouping",
									label: "Enable Grouping",
									type: "checkbox",
									required: true,
									defaultValue: false,
								},
							],
						},
						{
							type: "row",
							fields: [
								{
									name: "enableSorting",
									label: "Enable Sorting",
									type: "checkbox",
									required: true,
									defaultValue: false,
								},
								{
									name: "enablePinning",
									label: "Enable Pinning",
									type: "checkbox",
									required: true,
									defaultValue: false,
								},
							],
						},
						{
							type: "row",
							fields: [
								{
									name: "enableResizing",
									label: "Enable Resizing",
									type: "checkbox",
									required: true,
									defaultValue: false,
								},
							],
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
				{ feature: "Unlimited projects", basic: true, pro: true },
				{ feature: "Priority support", basic: false, pro: true },
				{ feature: "SSO", basic: false, pro: true },
			],
			hooks: {
				beforeChange: [validateComparisonData],
			},
		},
		{ name: "footnote", type: "text" },
	],
};
