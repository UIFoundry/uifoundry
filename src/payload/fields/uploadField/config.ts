import type { UploadField } from "~/payload/fields";
import type { PickRequired } from "~/types";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";

type RequiredFields = PickRequired<UploadField, "name">;

export default function uploadField({
	...restConfig
}: RequiredFields): UploadField {
	return {
		type: "upload",
		relationTo: COLLECTION_SLUG_MEDIA,
		...restConfig,
	} as UploadField;
}
