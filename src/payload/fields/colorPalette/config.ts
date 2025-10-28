import selectEnumField from "~/payload/fields/selectEnum/config";
import { THEME_COLORS } from "~/styles/utils";

import type { SelectField } from "..";

export default function colorPaletteField({
	name = "color",
	...fieldProps
}: SelectField): SelectField {
	return selectEnumField<typeof THEME_COLORS>(THEME_COLORS, {
		name,
		...fieldProps,
	});
}
