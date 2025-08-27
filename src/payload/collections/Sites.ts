import type { CollectionConfig } from "payload";
import { COLLECTION_SLUG_SITES } from "../constants";
import titleField from "~/payload/fields/titleField/config";

export const Sites: CollectionConfig = {
	slug: COLLECTION_SLUG_SITES,
	fields: [titleField()],
};
