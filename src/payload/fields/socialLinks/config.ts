import type { Field } from "payload";

import type { ArrayField } from "~/payload/fields";

import selectEnumField from "~/payload/fields/selectEnum/config";
import { socialIcons } from "~/ui/icons/social-icons";

export type SocialIconKey = keyof typeof socialIcons;

export default function socialLinksField(props?: Partial<ArrayField>): Field {
	return {
		name: "socialLinks",
		type: "array",
		defaultValue: [],
		fields: [
			{
				name: "href",
				type: "text",
				admin: {
					width: "50%",
					placeholder: "https://x.com/1234",
				},
				defaultValue: "",
				required: true,
			},
			{
				...selectEnumField(socialIcons, {
					name: "icon",
					useKeyAsValue: true,
				}),
				admin: {
					width: "50%",
					components: {
						Field: "~/payload/fields/socialLinks/admin/SocialLinksField",
					},
				},
				required: true,
			},
		],
		required: true,
		...props,
	};
}
