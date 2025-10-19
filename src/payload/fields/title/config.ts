import type { TextField } from "~/payload/fields";

export default function titleField(props?: Partial<TextField>): TextField {
	return {
		name: props?.name ?? "title",
		label: props?.label ?? "Title",
		defaultValue: props?.defaultValue ?? "",
		required: props?.required ?? true,
		...props,
		type: "text",
	} as TextField;
}
