import { icons } from "lucide-react"
import type { SelectField } from "~/payload/fields"
import selectEnumField from "./selectEnumField"

export default function iconField(props?: Partial<SelectField>): SelectField {
	return selectEnumField<typeof icons>({
		object: icons,
		name: "icon",
		useKeyAsValue: true,
		...props
	})

}
