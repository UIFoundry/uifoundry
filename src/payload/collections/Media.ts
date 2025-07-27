import { addDataAndFileToRequest, type CollectionConfig } from "payload";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";

export const Media: CollectionConfig = {
	slug: COLLECTION_SLUG_MEDIA,
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
	upload: true,
	endpoints: [
		{
			path: "/upload",
			method: "post",
			handler: async (req) => {
				try {
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
