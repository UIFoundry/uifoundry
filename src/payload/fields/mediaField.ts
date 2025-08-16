import type { GroupField } from "~/payload/fields";
import uploadField from "~/payload/fields/uploadField";

export default function mediaField(props?: Partial<GroupField>): GroupField {
  return {
    name: "media",
    type: "group",
    fields: [uploadField({ name: "light" }), uploadField({ name: "dark" })],
    ...props,
  } as GroupField;
}
