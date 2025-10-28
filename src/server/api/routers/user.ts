import { COLLECTION_SLUG_USERS } from "~/payload/constants";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { DAL_ERRORS, err, ok } from "~/server/dal";
import { LIFETIME_PLANS } from "~/utils/stripe";

export const usersRouter = createTRPCRouter({
	getLifetimeUserCount: privateProcedure.query(async ({ ctx }) => {
		try {
			const queryRes = await ctx.payload.find({
				collection: COLLECTION_SLUG_USERS,
				context: {
					cache: {
						ttl: 300,
					},
				},
				where: {
					lifetimeSubscription: {
						in: Object.values(LIFETIME_PLANS).map((p) => p.name),
					},
				},
			});
			return ok(queryRes.totalDocs);
		} catch {
			return err({ type: DAL_ERRORS.payload.type });
		}
	}),
});
