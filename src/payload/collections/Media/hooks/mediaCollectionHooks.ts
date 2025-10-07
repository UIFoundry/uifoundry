import type { CollectionAfterReadHook } from "payload";
import type { Media } from "~/payload-types";
import { env } from "~/env.mjs";

export const afterRead: CollectionAfterReadHook<Media> = ({ doc }) => {
	// Override the URL to serve directly from S3 instead of proxying through PayloadCMS
	if (doc.filename) {
		// Generate direct S3 URL. TODO: remove s3 bucket public access and allow only access from the site domain explicitly
		doc.url = `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com/${doc.filename}`;
	}
	return doc;
};
