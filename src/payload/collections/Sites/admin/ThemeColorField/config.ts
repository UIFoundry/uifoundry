import type { TextField } from "~/payload/fields";

type ColorFieldProps = Omit<
	Partial<TextField>,
	"hasMany" | "maxRows" | "minRows" | "type"
> & { description: string; mode: "dark" | "light" };

export default function themeColorField(props?: ColorFieldProps): TextField {
	return {
		name: "color",
		type: "text" as const,
		admin: {
			components: {
				Field: {
					path: "~/payload/collections/Sites/admin/ThemeColorField",
					serverProps: {
						mode: props?.mode ?? "light",
					},
				},
			},
		},
		interfaceName: "ColorField",
		...props,
	} as TextField;
}
