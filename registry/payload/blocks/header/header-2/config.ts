import type { Block } from "payload";
import {
	BLOCK_GROUP_HEADERS,
	BLOCK_SLUG_HEADER_2,
} from "@/registry/default/lib/constants/blocks";
import mediaField from "@/registry/default/lib/fields/media/config";

export const Header_2_Block: Block = {
	slug: BLOCK_SLUG_HEADER_2,
	interfaceName: "Header_2_Block",
	labels: {
		singular: "Header 2",
		plural: "Header 2's",
	},
	admin: {
		group: BLOCK_GROUP_HEADERS,
	},
	fields: [
		{
			type: "collapsible",
			label: "Brand Logo",
			fields: [
				mediaField({
					name: "brandLogo",
					label: "Logo Image",
				}),
				{
					name: "logoHref",
					label: "Logo Link (href)",
					type: "text",
					required: true,
					defaultValue: "/",
				},
			],
		},
		{
			type: "collapsible",
			label: "Menu Items",
			fields: [
				{
					name: "menuItems",
					labels: {
						singular: "Menu Item",
						plural: "Menu Items",
					},
					type: "array",
					required: true,
					minRows: 0,
					maxRows: 10,
					defaultValue: [
						{
							label: "Home",
							href: "/",
						},
						{
							label: "Products",
							href: "/products",
						},
						{
							label: "Services",
							href: "/services",
						},
						{
							label: "Contact",
							href: "/contact",
						},
					],
					fields: [
						{
							name: "label",
							label: "Label",
							type: "text",
							required: true,
						},
						{
							name: "href",
							label: "Href",
							type: "text",
							required: true,
							admin: {
								placeholder: "/features | #features",
							},
						},
					],
				},
			],
		},
		{
			type: "collapsible",
			label: "Action Buttons",
			fields: [
				{
					name: "actionButtons",
					labels: {
						singular: "Action Button",
						plural: "Action Buttons",
					},
					type: "array",
					minRows: 0,
					maxRows: 3,
					defaultValue: [
						{
							label: "Login",
							href: "/auth/sign-in",
							variant: "outline",
						},
						{
							label: "Sign Up",
							href: "/auth/sign-up",
							variant: "default",
						},
					],
					fields: [
						{
							name: "label",
							label: "Button Label",
							type: "text",
							required: true,
						},
						{
							name: "href",
							label: "Button Link (href)",
							type: "text",
							required: true,
						},
						{
							name: "variant",
							label: "Button Variant",
							type: "select",
							required: true,
							defaultValue: "default",
							options: [
								{ label: "Default", value: "default" },
								{ label: "Outline", value: "outline" },
								{ label: "Ghost", value: "ghost" },
							],
						},
					],
				},
			],
		},
	],
};
