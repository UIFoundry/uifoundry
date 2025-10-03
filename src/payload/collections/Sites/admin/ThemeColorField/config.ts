import type { TextField } from "~/payload/fields";

type ColorFieldProps = Omit<
	Partial<TextField>,
	"hasMany" | "type" | "maxRows" | "minRows"
> & { description: string; mode: "light" | "dark" };

export default function themeColorField(props?: ColorFieldProps): TextField {
	return {
		name: "color",
		type: "text" as const,
		interfaceName: "ColorField",
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
		...props,
	} as TextField;
}
