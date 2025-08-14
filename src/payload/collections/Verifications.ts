import { type CollectionConfig } from "payload";
import { COLLECTION_SLUG_VERIFICATIONS } from "../constants";

export const Verifications: CollectionConfig = {
	slug: COLLECTION_SLUG_VERIFICATIONS,
	fields: [
		{
			name: "identifier",
			type: "text",
			required: true,
			defaultValue: ""
		},
		{
			name: "value",
			type: "text",
			required: true,
			defaultValue: ""
		},
		{
			name: "expiresAt",
			type: "date",
			required: true,
			defaultValue: new Date()
		},
	]
}
