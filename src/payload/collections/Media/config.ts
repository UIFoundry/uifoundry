import {
	type AccessArgs,
	addDataAndFileToRequest,
	type CollectionConfig,
} from "payload";

import type { Media as MediaType } from "~/payload-types";

import { hasPermission } from "~/auth/permissions";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import userRelationship from "~/payload/fields/userRelationship/config";

import { afterRead } from "./hooks/mediaCollectionHooks";

export const Media: CollectionConfig = {
	slug: COLLECTION_SLUG_MEDIA,
	access: {
		create: ({ req: { user } }: AccessArgs<MediaType>) => {
			return hasPermission({
				action: "create",
				resource: COLLECTION_SLUG_MEDIA,
				user,
			});
		},
		delete: ({ data, req: { user } }: AccessArgs<MediaType>) => {
			return hasPermission({
				action: "delete",
				data,
				resource: COLLECTION_SLUG_MEDIA,
				user,
			});
		},
		read: ({ data, req: { user } }: AccessArgs<MediaType>) => {
			return hasPermission({
				action: "read",
				data,
				resource: COLLECTION_SLUG_MEDIA,
				user,
			});
		},
		update: ({ data, req: { user } }: AccessArgs<MediaType>) => {
			return hasPermission({
				action: "update",
				data,
				resource: COLLECTION_SLUG_MEDIA,
				user,
			});
		},
	},
	admin: {
		useAsTitle: "alt",
	},
	endpoints: [
		{
			handler: async (req) => {
				try {
					if (!req.user) {
						return Response.json(
							{
								error: "You must be logged in to perform this action",
							},
							{ status: 400 },
						);
					}

					await addDataAndFileToRequest(req);

					if (!req.file) {
						return Response.json(
							{ error: "No file provided" },
							{ status: 400 },
						);
					}

					const user = req.user;
					if (!user) {
						return Response.json(
							{ error: "User not authenticated" },
							{ status: 401 },
						);
					}

					const result = await req.payload.create({
						collection: COLLECTION_SLUG_MEDIA,
						data: {
							alt: req.file.name,
							owner: req.user,
						},
						file: req.file,
					});

					return Response.json(result);
				} catch (error) {
					console.error("Error details:", error);
					return Response.json(
						{
							details: error instanceof Error ? error.message : "Unknown error",
							error: "Error uploading file",
						},
						{ status: 500 },
					);
				}
			},
			method: "post",
			path: "/upload",
		},
	],
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
		userRelationship({
			name: "owner",
			defaultValue: ({ user }) => {
				if (!user) {return undefined;}
				return user;
			},
		}),
	],
	hooks: {
		afterRead: [afterRead],
	},
	upload: true,
};
