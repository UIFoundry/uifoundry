import type { BasePayload } from "payload";
import { COLLECTION_SLUG_SITES } from "~/payload/constants";

async function seedSites(payload: BasePayload) {
	console.log("seeding sites...");
}

export async function seedDatabase(payload: BasePayload) {
	console.log("seeding database...");
	const sitesRes = await payload.find({
		collection: COLLECTION_SLUG_SITES,
	});
	if (sitesRes.totalDocs < 1) {
		await seedSites(payload);
	}
}
