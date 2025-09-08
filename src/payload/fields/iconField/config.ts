import { icons } from "lucide-react";
import type { SelectField } from "~/payload/fields";
import selectEnumField from "../selectEnumField/config";

export default function iconField(props?: Partial<SelectField>): SelectField {
	return selectEnumField<typeof icons>(icons, {
		name: "icon",
		interfaceName: "IconField",
		useKeyAsValue: true,
		admin: {
			components: {
				Field: "~/payload/fields/iconField",
			},
		},
		...props,
	});
}
