import type { GroupField } from "@/registry/fields";
import uploadField from "@/registry/fields/upload/config";

export default function mediaField(props?: Partial<GroupField>): GroupField {
	return {
		name: "media",
		type: "group",
		interfaceName: "MediaField",
		fields: [uploadField({ name: "light" }), uploadField({ name: "dark" })],
		...props,
	} as GroupField;
}
