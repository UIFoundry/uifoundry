import type { UploadField } from "@/registry/payload/fields";
import type { PickRequired } from "@/registry/types";
import { COLLECTION_SLUG_MEDIA } from "@/registry/payload/constants";

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
