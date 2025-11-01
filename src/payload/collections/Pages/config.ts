import { type CollectionConfig } from "payload";

import type { Site } from "~/payload-types";

import { env } from "~/env.mjs";
import { blocks } from "~/payload/blocks";
import {
	AUTOSAVE_INTERVAL,
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
} from "~/payload/constants";
import userRelationship from "~/payload/fields/userRelationship/config";

function extractSiteIdFromReferer(
	req: undefined | { headers?: Headers | Record<string, unknown> },
): string | undefined {
	const headers = req?.headers;
	let referer: string | undefined;

	if (headers && typeof (headers as Headers).get === "function") {
		const value = (headers as Headers).get("referer");
		referer = typeof value === "string" ? value : undefined;
	} else if (
		headers &&
		typeof (headers as Record<string, unknown>).referer === "string"
	) {
		referer = (headers as Record<string, unknown>).referer as string;
	}

	if (!referer) {
		return undefined;
	}
	// eslint-disable-next-line no-useless-escape
	const match = /\/admin\/collections\/sites\/([^\/\?]+)/.exec(referer);
	return match?.[1];
}

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
		defaultColumns: ["title", "slug", "_status", "blocks", "updatedAt"],
		livePreview: {
			url: ({ data }) => {
				if (!data.site) { return }
				if (typeof data.slug === "string") {
					if ((data.slug) === "home") {
						return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/${data.site}`;
					}
					return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/${data.site}/${data.slug}`;
				}
				if ((data.slug) === "home") {
					return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/${(data.site as Site).id}`;
				}
				return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/${(data.site as Site).id}/${data.slug}`;
			},
		},
		useAsTitle: "title",
	},
	fields: [
		{
			name: "site",
			type: "relationship",
			defaultValue: ({ req }) => extractSiteIdFromReferer(req),
			relationTo: COLLECTION_SLUG_SITES,
			required: true,
		},
		{
			name: "slug",
			type: "text",
			required: true,
		},
		{
			name: "title",
			type: "text",
			defaultValue: "New Page",
			required: true,
		},
		{
			type: "collapsible",
			fields: [
				userRelationship({
					name: "owner",
					label: "Owner",
				}),
				{
					name: "showHeader",
					type: "checkbox",
					defaultValue: false,
					required: true,
				},
				{
					name: "showFooter",
					type: "checkbox",
					defaultValue: false,
					required: true,
				},
			],
			label: "Page Details",
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
