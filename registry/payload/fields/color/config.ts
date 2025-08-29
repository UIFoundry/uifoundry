import type { TextField } from "@/registry/default/lib/fields";

type ColorFieldProps = Omit<
	Partial<TextField>,
	"hasMany" | "type" | "maxRows" | "minRows"
> & { description: string };

export default function colorField(props?: ColorFieldProps): TextField {
	return {
		name: "color",
		type: "text" as const,
		interfaceName: "ColorField",
		admin: {
			components: {
				Field: "~/payload/fields/color",
			},
		},
		...props,
	} as TextField;
}
