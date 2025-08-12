import type { TextField } from "~/payload/fields"

export default function colorField(props?: Partial<TextField>): TextField {
	return {
		name: "color",
		interfaceName: "ColorField",
		useKeyAsValue: true,
		admin: {
			components: {
				Field: "~/payload/fields/colorField/ColorField"
			},
		},
		...props
	}

}

