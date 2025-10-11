import type { PickRequired } from "~/types";
import type { UploadField } from "~/payload/fields";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants/collections";

type RequiredFields = PickRequired<UploadField, "name">;

export default function uploadField({
	...restConfig
}: RequiredFields): UploadField {
	return {
		type: "upload",
		interfaceName: "UploadField",
		relationTo: COLLECTION_SLUG_MEDIA,
		...restConfig,
	} as UploadField;
}
