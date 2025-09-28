import type { BasePayload } from "payload";
import type { Page } from "~/payload-types";
import { COLLECTION_SLUG_SITES } from "~/payload/constants";
import home from "./data/sites/uifoundry/pages/home";

async function seedSites(payload: BasePayload) {
	console.log("homepage: ", home);
	console.log("seeding sites...");
	const newPage: Page = {
		title: home.title,
		slug: home.slug,
		blocks: [...home.blocks],
	};
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
