import {
	addDataAndFileToRequest,
	type AccessArgs,
	type CollectionConfig,
} from "payload";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import type { Media as MediaType } from "~/payload-types";
import { hasPermission } from "~/auth/permissions";
import userRelationship from "../fields/userRelationship/config";

export const Media: CollectionConfig = {
	slug: COLLECTION_SLUG_MEDIA,
	admin: {
		useAsTitle: "alt",
	},
	access: {
		create: ({ req: { user } }: AccessArgs<MediaType>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_MEDIA,
				action: "create",
			});
		},
		read: ({ req: { user }, data }: AccessArgs<MediaType>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_MEDIA,
				action: "read",
				data,
			});
		},
		update: ({ req: { user }, data }: AccessArgs<MediaType>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_MEDIA,
				action: "update",
				data,
			});
		},
		delete: ({ req: { user }, data }: AccessArgs<MediaType>) => {
			return hasPermission({
				user,
				resource: COLLECTION_SLUG_MEDIA,
				action: "delete",
				data,
			});
		},
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
		userRelationship({
			name: "owner",
			defaultValue: ({ user }) => {
				if (!user) return undefined;
				return user;
			},
		}),
	],
	upload: true,
	endpoints: [
		{
			path: "/upload",
			method: "post",
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
							error: "Error uploading file",
							details: error instanceof Error ? error.message : "Unknown error",
						},
						{ status: 500 },
					);
				}
			},
		},
	],
};
