import { socialIcons } from "~/ui/icons/social-icons"
import type { SelectField } from "~/payload/fields"
import selectEnumField from "./selectEnumField"
import type { Field } from "payload"

export default function socialIconFields(props?: Partial<SelectField>): Field[] {
	return [
		{
			name: "href",
			type: "text",
			required: true,
			defaultValue: "",
			admin: {
				placeholder: "https://x.com/1234",
				width: "50%"
			}
		},
		selectEnumField<typeof socialIcons>({
			object: socialIcons,
			name: "icon",
			required: true,
			useKeyAsValue: true,
			admin: {
				width: "50%"
			},
			...props
		})
	]
}
