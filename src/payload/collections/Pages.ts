import { type CollectionConfig } from "payload";
import { COLLECTION_SLUG_PAGES } from "../constants";
import { env } from "~/env.mjs";
import { blocks } from "~/payload/blocks"

export const Pages: CollectionConfig = {
	slug: COLLECTION_SLUG_PAGES,
	lockDocuments: false,
	admin: {
		useAsTitle: "title",
		livePreview: {
			url: ({ data }) => {
				if ((data.slug as string).toLowerCase() === 'home') {
					return env.NEXT_PUBLIC_BETTER_AUTH_URL
				}
				return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/${data.slug}`
			}
		}
	},
	fields: [
		{
			name: "slug",
			type: "text",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
			defaultValue: "New Page"
		},
		{
			name: "showHeader",
			type: "checkbox",
			required: true,
			defaultValue: false
		},
		{
			name: "showFooter",
			type: "checkbox",
			required: true,
			defaultValue: false
		},
		{
			name: "blocks",
			type: "blocks",
			labels: {
				singular: "Page Content Block",
				plural: "Page Content Blocks",
			},
			required: true,
			defaultValue: [],
			blocks: blocks
		}
	]
}

