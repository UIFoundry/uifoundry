import type { UploadField } from "@/registry/payload/fields/index.d.ts";
import type { PickRequired } from "@/registry/types.d.ts";
import { COLLECTION_SLUG_MEDIA } from "@/registry/payload/constants/collections";

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
