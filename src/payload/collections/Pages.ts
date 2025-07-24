import { type CollectionConfig } from "payload";
import { COLLECTION_SLUG_PAGES } from "../constants";

export const Pages: CollectionConfig = {
	slug: COLLECTION_SLUG_PAGES,
	admin: {
		useAsTitle: "title"
	},
	fields: [
		{
			name: "slug",
			type: "text",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
			defaultValue: "New Page"
		},
	]
}

