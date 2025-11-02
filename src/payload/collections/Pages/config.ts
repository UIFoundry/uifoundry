import { type CollectionConfig } from "payload";

import type { Site } from "~/payload-types";

import { env } from "~/env.mjs";
import { blocks } from "~/payload/blocks";
import {
	AUTOSAVE_INTERVAL,
	COLLECTION_SLUG_PAGES,
} from "~/payload/constants";
import userRelationship from "~/payload/fields/userRelationship/config";

export const Pages: CollectionConfig = {
	slug: COLLECTION_SLUG_PAGES,
	access: {
		read: ({ req }) => {
			// If there is a user logged in,
			// let them retrieve all documents
			if (req.user) {
				return true;
			}

			// If there is no user,
			// restrict the documents that are returned
			// to only those where `_status` is equal to `published`
			return {
				_status: {
					equals: "published",
				},
			};
		},
	},
	admin: {
		components: {
			edit: {
				beforeDocumentControls: ["~/payload/components/RefreshPreview"],
			},
		},
		defaultColumns: ["name", "_status", "blocks", "updatedAt"],
		livePreview: {
			url: ({ data }) => {
				return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/page/${data.id}`;
			},
		},
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			defaultValue: "New Page",
			label: "Name",
			required: true,
		},
		{
			name: "blocks",
			type: "blocks",
			blocks,
			defaultValue: [],
			labels: {
				plural: "Content",
				singular: "Content",
			},
			required: true,
		},
		userRelationship({
			name: "owner",
			label: "Owner"
		})
	],
	lockDocuments: false,
	versions: {
		drafts: {
			autosave: {
				interval: AUTOSAVE_INTERVAL,
			},
		},
	},
};
