import { COLLECTION_SLUG_USERS } from "~/payload/constants";
import { DAL_ERRORS, err, ok } from "~/server/dal";
import { LIFETIME_PLANS } from "~/utils/stripe";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { withCache } from "~/payload/plugins/redis-cache";

export const usersRouter = createTRPCRouter({
	getLifetimeUserCount: privateProcedure.query(async ({ ctx }) => {
		try {
			const queryRes = await withCache({ ttl: 300 }, async () => {
				return await ctx.payload.find({
					collection: COLLECTION_SLUG_USERS,
					where: {
						lifetimeSubscription: {
							in: Object.values(LIFETIME_PLANS).map((p) => p.name),
						},
					},
				});
			});
			return ok(queryRes.totalDocs);
		} catch {
			return err({ type: DAL_ERRORS.payload.type });
		}
	}),
});
