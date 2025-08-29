import type { GroupField } from "@/registry/payload/fields";
import uploadField from "@/registry/payload/fields/upload/config";

export default function mediaField(props?: Partial<GroupField>): GroupField {
	return {
		name: "media",
		type: "group",
		interfaceName: "MediaField",
		fields: [uploadField({ name: "light" }), uploadField({ name: "dark" })],
		...props,
	} as GroupField;
}
