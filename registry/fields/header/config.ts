import type { TextField } from "@/registry/fields";

export default function headerField(props?: Partial<TextField>): TextField {
	return {
		name: props?.name ?? "header",
		label: props?.label ?? "Header",
		defaultValue:
			props?.defaultValue ?? "Modern Solutions for Customer Engagement",
		required: props?.required ?? true,
		...props,
		type: "text",
	} as TextField;
}
