import type { CollectionBeforeChangeHook } from "payload";
import type { Site } from "~/payload-types";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { THEME_TYPES } from "~/payload/constants/themes";
import { getPayload } from "~/payload/utils";
import { auth } from "~/auth";

export const beforeChange: CollectionBeforeChangeHook<Site> = async ({
	data,
	operation,
	req,
}): Promise<Partial<Site>> => {
	try {
		if (operation === "create") {
			const session = await auth.api.getSession({ headers: req.headers });
			if (!session?.user) return data;
			const payload = await getPayload();

			const res = await payload.find({
				collection: COLLECTION_SLUG_THEMES,
				limit: 1,
				where: {
					owner: {
						equals: session.user.id,
					},
				},
			});
			if (res.docs.length > 0) {
				const newUserTheme = await payload.duplicate({
					collection: COLLECTION_SLUG_THEMES,
					id: res.docs[0]!.id,
					data: {
						type: THEME_TYPES.user,
					},
				});
				return {
					...data,
					activeTheme: newUserTheme.id,
				};
			}

			const templateThemesRes = await payload.find({
				collection: COLLECTION_SLUG_THEMES,
				limit: 1,
				where: {
					type: {
						equals: THEME_TYPES.template,
					},
				},
			});
			if (templateThemesRes && templateThemesRes.docs.length > 0) {
				const newUserTheme = await payload.duplicate({
					collection: COLLECTION_SLUG_THEMES,
					id: templateThemesRes.docs[0]!.id,
					data: {
						type: THEME_TYPES.user,
						owner: session.user.id,
					},
				});
				return {
					...data,
					activeTheme: newUserTheme.id,
				};
			}
		}
		return data;
	} catch (e) {
		console.error(e);
		return data;
	}
};
