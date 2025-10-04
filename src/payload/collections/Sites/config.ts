import type { AccessArgs, CollectionConfig } from "payload";
import { AUTOSAVE_INTERVAL } from "~/payload/constants";
import {
	COLLECTION_SLUG_FOOTERS,
	COLLECTION_SLUG_HEADERS,
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
	COLLECTION_SLUG_THEMES,
} from "~/payload/constants/collections";
import titleField from "~/payload/fields/titleField/config";
import userRelationship from "~/payload/fields/userRelationship/config";
import type { Site } from "~/payload-types";
import { hasPermission } from "~/auth/permissions";
import { env } from "~/env.mjs";
import themeColorField from "./admin/ThemeColorField/config";
import { beforeChange } from "./hooks/siteCollectionHooks";

export const Sites: CollectionConfig = {
	slug: COLLECTION_SLUG_SITES,
	admin: {
		useAsTitle: "title",
		livePreview: {
			url: ({ data }) =>
				`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/${data.id}?draft=true`,
		},
	},
	versions: {
		drafts: {
			autosave: {
				interval: AUTOSAVE_INTERVAL,
			},
		},
	},
	hooks: {
		beforeChange: [beforeChange],
	},
	access: {
		create: ({ req: { user } }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "create",
			});
		},
		read: ({ req: { user }, data }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "read",
				data,
			});
		},
		update: ({ req: { user }, data }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "update",
				data,
			});
		},
		delete: ({ req: { user }, data }: AccessArgs<Site>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_SITES,
				action: "delete",
				data,
			});
		},
	},
	fields: [
		titleField(),
		userRelationship({
			name: "owner",
			label: "Owner",
			defaultValue: ({ user }) => (!user ? undefined : user.id),
		}),
		{
			name: "header",
			type: "relationship",
			relationTo: COLLECTION_SLUG_HEADERS,
		},
		{
			name: "footer",
			type: "relationship",
			relationTo: COLLECTION_SLUG_FOOTERS,
		},
		{
			type: "collapsible",
			label: "Theme",
			fields: [
				{
					name: "activeTheme",
					label: "Active Site Theme",
					type: "relationship",
					relationTo: COLLECTION_SLUG_THEMES,
					required: true,
				},
				{
					name: "importTheme",
					type: "ui",
					admin: {
						components: {
							Field: "~/payload/collections/Sites/admin/ImportThemeTrigger",
						},
					},
				},
				{
					type: "tabs",
					tabs: [
						{
							name: "light",
							label: "Light",
							virtual: true,
							fields: [
								themeColorField({
									name: "background",
									description: "Background",
									mode: "light",
								}),
								themeColorField({
									name: "foreground",
									description: "Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "card",
									description: "Card",
									mode: "light",
								}),
								themeColorField({
									name: "card-foreground",
									description: "Card Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "popover",
									description: "Popover",
									mode: "light",
								}),
								themeColorField({
									name: "popover-foreground",
									description: "Popover Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "primary",
									description: "Primary",
									mode: "light",
								}),
								themeColorField({
									name: "primary-foreground",
									description: "Primary Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "secondary",
									description: "Secondary",
									mode: "light",
								}),
								themeColorField({
									name: "secondary-foreground",
									description: "Secondary Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "muted",
									description: "Muted",
									mode: "light",
								}),
								themeColorField({
									name: "muted-foreground",
									description: "Muted Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "accent",
									description: "Accent",
									mode: "light",
								}),
								themeColorField({
									name: "accent-foreground",
									description: "Accent Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "destructive",
									description: "Destructive",
									mode: "light",
								}),
								themeColorField({
									name: "destructive-foreground",
									description: "Destructive Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "border",
									description: "Border",
									mode: "light",
								}),
								themeColorField({
									name: "input",
									description: "Input",
									mode: "light",
								}),
								themeColorField({
									name: "ring",
									description: "Ring",
									mode: "light",
								}),
								themeColorField({
									name: "chart-1",
									description: "Chart 1",
									mode: "light",
								}),
								themeColorField({
									name: "chart-2",
									description: "Chart 2",
									mode: "light",
								}),
								themeColorField({
									name: "chart-3",
									description: "Chart 3",
									mode: "light",
								}),
								themeColorField({
									name: "chart-4",
									description: "Chart 4",
									mode: "light",
								}),
								themeColorField({
									name: "chart-5",
									description: "Chart 5",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar",
									description: "Sidebar",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar-foreground",
									description: "Sidebar Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar-primary",
									description: "Sidebar Primary",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar-primary-foreground",
									description: "Sidebar Primary Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar-accent",
									description: "Sidebar Accent",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar-accent-foreground",
									description: "Sidebar Accent Foreground",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar-border",
									description: "Sidebar Border",
									mode: "light",
								}),
								themeColorField({
									name: "sidebar-ring",
									description: "Sidebar Ring",
									mode: "light",
								}),
								// themeColorField({
								// 	name: "font-sans",
								// 	description: "Font Sans",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "font-serif",
								// 	description: "Font Serif",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "font-mono",
								// 	description: "Font Mono",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "radius",
								// 	description: "Radius",
								// 	mode: "light",
								// }),
								themeColorField({
									name: "shadow-color",
									description: "Shadow Color",
									mode: "light",
								}),
								// themeColorField({
								// 	name: "shadow-opacity",
								// 	description: "Shadow Opacity",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "shadow-blur",
								// 	description: "Shadow Blur",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "shadow-spread",
								// 	description: "Shadow Spread",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "shadow-offset-x",
								// 	description: "Shadow Offset X",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "shadow-offset-y",
								// 	description: "Shadow Offset Y",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "letter-spacing",
								// 	description: "Letter Spacing",
								// 	mode: "light",
								// }),
								// themeColorField({
								// 	name: "spacing",
								// 	description: "Spacing",
								// 	mode: "light",
								// }),
							],
						},
						{
							name: "dark",
							label: "Dark",
							virtual: true,
							fields: [
								themeColorField({
									name: "background",
									description: "Background",
									mode: "dark",
								}),
								themeColorField({
									name: "foreground",
									description: "Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "card",
									description: "Card",
									mode: "dark",
								}),
								themeColorField({
									name: "card-foreground",
									description: "Card Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "popover",
									description: "Popover",
									mode: "dark",
								}),
								themeColorField({
									name: "popover-foreground",
									description: "Popover Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "primary",
									description: "Primary",
									mode: "dark",
								}),
								themeColorField({
									name: "primary-foreground",
									description: "Primary Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "secondary",
									description: "Secondary",
									mode: "dark",
								}),
								themeColorField({
									name: "secondary-foreground",
									description: "Secondary Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "muted",
									description: "Muted",
									mode: "dark",
								}),
								themeColorField({
									name: "muted-foreground",
									description: "Muted Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "accent",
									description: "Accent",
									mode: "dark",
								}),
								themeColorField({
									name: "accent-foreground",
									description: "Accent Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "destructive",
									description: "Destructive",
									mode: "dark",
								}),
								themeColorField({
									name: "destructive-foreground",
									description: "Destructive Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "border",
									description: "Border",
									mode: "dark",
								}),
								themeColorField({
									name: "input",
									description: "Input",
									mode: "dark",
								}),
								themeColorField({
									name: "ring",
									description: "Ring",
									mode: "dark",
								}),
								themeColorField({
									name: "chart-1",
									description: "Chart 1",
									mode: "dark",
								}),
								themeColorField({
									name: "chart-2",
									description: "Chart 2",
									mode: "dark",
								}),
								themeColorField({
									name: "chart-3",
									description: "Chart 3",
									mode: "dark",
								}),
								themeColorField({
									name: "chart-4",
									description: "Chart 4",
									mode: "dark",
								}),
								themeColorField({
									name: "chart-5",
									description: "Chart 5",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar",
									description: "Sidebar",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar-foreground",
									description: "Sidebar Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar-primary",
									description: "Sidebar Primary",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar-primary-foreground",
									description: "Sidebar Primary Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar-accent",
									description: "Sidebar Accent",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar-accent-foreground",
									description: "Sidebar Accent Foreground",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar-border",
									description: "Sidebar Border",
									mode: "dark",
								}),
								themeColorField({
									name: "sidebar-ring",
									description: "Sidebar Ring",
									mode: "dark",
								}),
								// themeColorField({
								// 	name: "font-sans",
								// 	description: "Font Sans",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "font-serif",
								// 	description: "Font Serif",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "font-mono",
								// 	description: "Font Mono",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "radius",
								// 	description: "Radius",
								// 	mode: "dark",
								// }),
								themeColorField({
									name: "shadow-color",
									description: "Shadow Color",
									mode: "dark",
								}),
								// themeColorField({
								// 	name: "shadow-opacity",
								// 	description: "Shadow Opacity",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "shadow-blur",
								// 	description: "Shadow Blur",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "shadow-spread",
								// 	description: "Shadow Spread",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "shadow-offset-x",
								// 	description: "Shadow Offset X",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "shadow-offset-y",
								// 	description: "Shadow Offset Y",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "letter-spacing",
								// 	description: "Letter Spacing",
								// 	mode: "dark",
								// }),
								// themeColorField({
								// 	name: "spacing",
								// 	description: "Spacing",
								// 	mode: "dark",
								// }),
							],
						},
					],
				},
			],
		},
		{
			name: "pages",
			type: "join",
			collection: COLLECTION_SLUG_PAGES,
			on: "site",
		},
	],
};
