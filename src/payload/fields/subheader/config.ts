import type { TextField } from "~/payload/fields";

export default function subheaderField(props?: Partial<TextField>): TextField {
	return {
		name: props?.name ?? "subheader",
		defaultValue:
			props?.defaultValue ??
			"Highly customizable components for building modern websites and applications that look and feel the way you mean it.",
		label: props?.label ?? "SubHeader",
		required: props?.required ?? false,
		...props,
		type: "text",
	} as TextField;
}
