import type { RelationshipField } from "~/payload/fields";

import { COLLECTION_SLUG_USERS } from "~/payload/constants";

export default function userRelationship(
	props?: Partial<RelationshipField>,
): RelationshipField {
	return {
		name: props?.name ?? "user",
		label: props?.label ?? "User",
		// Default to the authenticated user when available
		defaultValue:
			props?.defaultValue ??
			(({ req }: { req?: { user?: null | { id?: string } } }) =>
				req?.user?.id ?? undefined),
		required: props?.required ?? true,
		...props,
		type: "relationship",
		relationTo: COLLECTION_SLUG_USERS,
	} as RelationshipField;
}
