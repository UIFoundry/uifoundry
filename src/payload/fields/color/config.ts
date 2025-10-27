import type { TextField } from "~/payload/fields";

type ColorFieldProps = Omit<
	Partial<TextField>,
	"hasMany" | "maxRows" | "minRows" | "type"
> & { description: string };

export default function colorField(props?: ColorFieldProps): TextField {
	return {
		name: "color",
		type: "text" as const,
		admin: {
			components: {
				Field: "~/payload/fields/colorField",
			},
		},
		interfaceName: "ColorField",
		...props,
	} as TextField;
}
