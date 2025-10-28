import type { TextField } from "~/payload/fields";

export default function headerField(props?: Partial<TextField>): TextField {
	return {
		name: props?.name ?? "header",
		defaultValue:
			props?.defaultValue ?? "Modern Solutions for Customer Engagement",
		label: props?.label ?? "Header",
		required: props?.required ?? true,
		...props,
		type: "text",
	} as TextField;
}
