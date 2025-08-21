import type { ArrayField } from "~/payload/fields";

export default function callToActionPair(
	props?: { defaultLabel?: string; defaultHref?: string } & Partial<ArrayField>,
): ArrayField {
	return {
		name: props?.name ?? "actions",
		type: "array",
		minRows: 1,
		maxRows: 2,
		fields: [
			{
				name: "label",
				type: "text",
				required: true,
				defaultValue: props?.defaultLabel ?? "Start Building",
			},
			{
				name: "href",
				type: "text",
				required: true,
				defaultValue: props?.defaultHref ?? "",
			},
		],
		...props,
	};
}
