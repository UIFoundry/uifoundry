import type { PickRequired } from "~/types";
import type { UploadField } from "@/registry/default/lib/fields";
import { COLLECTION_SLUG_MEDIA } from "@/registry/default/lib/constants/collections";

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
