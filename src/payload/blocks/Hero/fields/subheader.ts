import type { TextField } from "~/payload/fields";

export default function subHeaderField(props?: Partial<TextField>): TextField {
	return {
		name: props?.name ?? "subheader",
		label: props?.label ?? "SubHeader",
		defaultValue:
			props?.defaultValue ??
			"Highly customizable components for building modern websites and applications that look and feel the way you mean it.",
		required: props?.required ?? false,
		...props,
		type: "text",
	} as TextField;
}
