import type { TextField } from "~/payload/fields";

export default function descriptionField(
	props?: Partial<TextField>,
): TextField {
	return {
		name: props?.name ?? "description",
		label: props?.label ?? "Description",
		...props,
		type: "text",
	} as TextField;
}
