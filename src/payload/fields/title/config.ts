import type { TextField } from "~/payload/fields";

export default function titleField(props?: Partial<TextField>): TextField {
	return {
		name: props?.name ?? "title",
		defaultValue: props?.defaultValue ?? "",
		label: props?.label ?? "Title",
		required: props?.required ?? true,
		...props,
		type: "text",
	} as TextField;
}
