import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { ok, err, DAL_ERROR_TYPES } from "~/server/dal";

export const subscriptionsRouter = createTRPCRouter({
	getActiveSubscription: privateProcedure.query(({ ctx }) => {
		if (!ctx.activeSubscription) {
			return err({
				type: DAL_ERROR_TYPES.unknown,
				message: "No Active Subscription Found",
			});
		}
		return ok(ctx.activeSubscription);
	}),
});
