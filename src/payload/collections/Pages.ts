import { type CollectionConfig } from "payload";
import { AUTOSAVE_INTERVAL, COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { env } from "~/env.mjs";
import { blocks } from "~/payload/blocks"

export const Pages: CollectionConfig = {
	slug: COLLECTION_SLUG_PAGES,
	lockDocuments: false,
	access: {
		read: ({ req }) => {
			// If there is a user logged in,
			// let them retrieve all documents
			if (req.user) return true

			// If there is no user,
			// restrict the documents that are returned
			// to only those where `_status` is equal to `published`
			return {
				_status: {
					equals: 'published',
				},
			}
		},
	},
	admin: {
		useAsTitle: "title",
		livePreview: {
			url: ({ data }) => {
				if ((data.slug as string).toLowerCase() === 'home') {
					return env.NEXT_PUBLIC_BETTER_AUTH_URL
				}
				return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/${data.slug}`
			}
		}
	},
	versions: {
		drafts: {
			autosave: {
				interval: AUTOSAVE_INTERVAL,
			},
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

