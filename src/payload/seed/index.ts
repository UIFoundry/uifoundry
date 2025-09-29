import type { BasePayload } from "payload";
import { COLLECTION_SLUG_SITES } from "~/payload/constants";
import { seedSites } from "./collections";

export async function seedDatabase(payload: BasePayload) {
	const sitesRes = await payload.find({
		collection: COLLECTION_SLUG_SITES,
	});
	if (sitesRes.totalDocs < 1) {
		await seedSites(payload);
	}
}
