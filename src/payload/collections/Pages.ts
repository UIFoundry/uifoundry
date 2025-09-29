import { type CollectionConfig } from "payload";
import {
	AUTOSAVE_INTERVAL,
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
} from "~/payload/constants";
import { env } from "~/env.mjs";
import { blocks } from "~/payload/blocks";
import userRelationship from "~/payload/fields/userRelationship/config";

function extractSiteIdFromReferer(
	req: { headers?: Headers | Record<string, unknown> } | undefined,
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

	if (!referer) return undefined;
	const match = /\/admin\/collections\/sites\/([^\/\?]+)/.exec(referer);
	return match?.[1];
}

export const Pages: CollectionConfig = {
	slug: COLLECTION_SLUG_PAGES,
	lockDocuments: false,
	access: {
		read: ({ req }) => {
			// If there is a user logged in,
			// let them retrieve all documents
			if (req.user) return true;

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
		useAsTitle: "title",
		livePreview: {
			url: ({ data }) => {
				if ((data.slug as string) === "home") {
					return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview`;
				}
				return `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/${data.slug}`;
			},
		},
		defaultColumns: ["title", "slug", "_status", "blocks", "updatedAt"],
		components: {
			edit: {
				beforeDocumentControls: ["~/payload/components/RefreshPreview"],
			},
		},
	},
	versions: {
		drafts: {
			autosave: {
				interval: AUTOSAVE_INTERVAL,
			},
		},
	},
	fields: [
		{
			name: "site",
			type: "relationship",
			relationTo: COLLECTION_SLUG_SITES,
			required: true,
			defaultValue: ({ req }) => extractSiteIdFromReferer(req),
		},
		{
			name: "slug",
			type: "text",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
			defaultValue: "New Page",
		},
		{
			label: "Page Details",
			type: "collapsible",
			fields: [
				userRelationship({
					name: "owner",
					label: "Owner",
				}),
				{
					name: "showHeader",
					type: "checkbox",
					required: true,
					defaultValue: false,
				},
				{
					name: "showFooter",
					type: "checkbox",
					required: true,
					defaultValue: false,
				},
			],
		},
		{
			name: "blocks",
			type: "blocks",
			labels: {
				singular: "Content",
				plural: "Content",
			},
			required: true,
			defaultValue: [],
			blocks: blocks,
		},
	],
};
