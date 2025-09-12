/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Block, type Field } from "payload";
import { type CollapsibleField } from "~/payload/fields";

/**
 * Recursively extracts default values from PayloadCMS block field configurations
 * @param block - PayloadCMS block configuration
 * @returns Object containing field names as keys and their default values
 */
export function extractBlockDefaults(block: Block): Record<string, any> {
	const defaults: Record<string, any> = {};

	if (!block.fields || !Array.isArray(block.fields)) {
		return defaults;
	}

	function processField(field: Field) {
		// Handle named fields with default values
		if (
			"name" in field &&
			field.name &&
			"defaultValue" in field &&
			field.defaultValue !== undefined
		) {
			defaults[field.name] = field.defaultValue;
		}

		// Handle collapsible fields with nested fields
		if ("fields" in field && Array.isArray(field.fields)) {
			field.fields.forEach(processField);
		}

		// Handle other field types that might contain nested fields
		if ("field" in field && field.field) {
			processField(field.field as Field);
		}

		// Handle conditional fields
		if ("conditions" in field && Array.isArray(field.conditions)) {
			field.conditions.forEach((condition: CollapsibleField) => {
				if (condition.fields) {
					condition.fields.forEach(processField);
				}
			});
		}
	}

	block.fields.forEach(processField);

	return defaults;
}
