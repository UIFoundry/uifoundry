import { socialIcons } from "@/registry/default/ui/social-icons";
import selectEnumField from "@/registry/default/lib/fields/selectEnumField/config";
import type { ArrayField } from "@/registry/default/lib/fields";
import type { Field } from "payload";

export type SocialIconKey = keyof typeof socialIcons;

export default function socialLinksField(props?: Partial<ArrayField>): Field {
	return {
		name: "socialLinks",
		type: "array",
		required: true,
		defaultValue: [],
		fields: [
			{
				name: "href",
				type: "text",
				required: true,
				defaultValue: "",
				admin: {
					placeholder: "https://x.com/1234",
					width: "50%",
				},
			},
			{
				...selectEnumField(socialIcons, {
					name: "icon",
					useKeyAsValue: true,
				}),
				required: true,
				admin: {
					width: "50%",
					components: {
						Field: "~/payload/fields/socialLinks/admin/SocialLinksField",
					},
				},
			},
		],
		...props,
	};
}
