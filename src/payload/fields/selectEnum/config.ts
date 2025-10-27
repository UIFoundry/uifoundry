import type { Option, OptionObject } from "payload";

import type { SelectField } from "~/payload/fields";
import type { PickRequired } from "~/types";

type RequiredFields = PickRequired<SelectField, "name">;
interface SelectEnumFieldProps extends RequiredFields {
	selectEnumKey?: string;
	useKeyAsValue?: boolean;
	useValueAsLabel?: boolean;
}

export default function selectEnumField<T extends Record<string, unknown>>(
	object: T,
	{
		selectEnumKey,
		useKeyAsValue = false,
		useValueAsLabel = false,
		...restConfig
	}: SelectEnumFieldProps,
): SelectField {
	// @ts-expect-error mismatched hasMany type for some reason, unsure why. select field specific error here
	return {
		type: "select",
		hasMany: false,
		options: Object.entries(object).map(
			([key, value]) =>
				({
					label: useValueAsLabel
						? selectEnumKey
							? (value as Record<string, unknown>)[selectEnumKey]
							: value
						: key,
					value: useKeyAsValue
						? key
						: selectEnumKey
							? (value as Record<string, unknown>)[selectEnumKey]
							: value,
				}) as OptionObject,
		) as Option[],
		...restConfig,
	};
}
