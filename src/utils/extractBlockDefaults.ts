import type { Block } from "payload";

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

  function processField(field: any) {
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
      processField(field.field);
    }

    // Handle conditional fields
    if ("conditions" in field && Array.isArray(field.conditions)) {
      field.conditions.forEach((condition: any) => {
        if (condition.fields) {
          condition.fields.forEach(processField);
        }
      });
    }
  }

  block.fields.forEach(processField);

  return defaults;
}
