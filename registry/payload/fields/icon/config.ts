import { icons } from "lucide-react";
import type { SelectField } from "@/registry/default/lib/fields";
import selectEnumField from "@/registry/default/lib/fields/selectEnum/config";

export default function iconField(props?: Partial<SelectField>): SelectField {
	return selectEnumField<typeof icons>(icons, {
		name: "icon",
		interfaceName: "IconField",
		useKeyAsValue: true,
		admin: {
			components: {
				Field: "@/registry/default/lib/fields/icon",
			},
		},
		...props,
	});
}
