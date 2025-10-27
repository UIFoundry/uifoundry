import type { ArrayField } from "~/payload/fields";

export default function callToActionPair(
	props?: Partial<ArrayField> & { defaultHref?: string; defaultLabel?: string; },
): ArrayField {
	return {
		name: props?.name ?? "actions",
		type: "array",
		fields: [
			{
				name: "label",
				type: "text",
				defaultValue: props?.defaultLabel ?? "Start Building",
				required: true,
			},
			{
				name: "href",
				type: "text",
				defaultValue: props?.defaultHref ?? "",
				required: true,
			},
		],
		maxRows: 2,
		...props,
	};
}
