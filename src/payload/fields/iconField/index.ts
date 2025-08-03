import { icons } from "lucide-react"
import type { SelectField } from "~/payload/fields"
import selectEnumField from "../selectEnumField"

export default function iconField(props?: Partial<SelectField>): SelectField {
	return selectEnumField<typeof icons>({
		object: icons,
		name: "icon",
		interfaceName: "IconField",
		useKeyAsValue: true,
		admin: {
			components: {
				Field: "~/payload/fields/iconField/IconField"
			},
		},
		...props
	})

}
