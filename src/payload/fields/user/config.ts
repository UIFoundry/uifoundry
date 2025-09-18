import { COLLECTION_SLUG_USERS } from "~/payload/constants";
import type { RelationshipField } from "~/payload/fields";

export default function userField(
	props?: Partial<RelationshipField>,
): RelationshipField {
	return {
		name: props?.name ?? "user",
		label: props?.label ?? "User",
		defaultValue: props?.defaultValue ?? "",
		required: props?.required ?? true,
		...props,
		type: "relationship",
		relationTo: COLLECTION_SLUG_USERS,
	} as RelationshipField;
}
