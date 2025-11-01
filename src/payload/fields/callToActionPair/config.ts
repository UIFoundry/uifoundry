import type { ArrayField } from "~/payload/fields";

export default function callToActionPair(
	props?: Partial<ArrayField> & { defaultHref?: string; defaultLabel?: string; },
): ArrayField {
	return {
		...props,
		name: props?.name ?? "actions",
		type: "array",
		fields: [
			{
				name: "label",
				type: "text",
				required: true,
			},
			{
				name: "href",
				type: "text",
				required: true,
			},
		],
		maxRows: 2,
		minRows: 0,
	};
}
