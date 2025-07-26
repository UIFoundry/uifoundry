import type { Option, OptionObject } from "payload"
import type { SelectField } from "~/payload/fields"
import type { PickRequired } from "~/types"

type RequiredFields = PickRequired<SelectField, "name">
interface SelectEnumFieldProps<T extends Record<string, unknown>> extends RequiredFields {
	object: T,
	useKeyAsValue?: boolean
}

export default function selectEnumField<T extends Record<string, unknown>>(
	{ object, useKeyAsValue = false, ...restConfig }: SelectEnumFieldProps<T>
): SelectField {
	// @ts-expect-error mismatched hasMany type for some reason, unsure why. select field specific error here
	return {
		type: "select",
		options: Object.entries(object).map(([key, value]) => ({ value: useKeyAsValue ? key : value, label: key } as OptionObject)) as Option[],
		hasMany: false,
		...restConfig
	}
}
