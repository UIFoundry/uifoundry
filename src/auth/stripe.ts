import type { StripePlan } from "@better-auth/stripe";
import { LIFETIME_PLANS } from "~/utils/stripe";

export const STRIPE_PLANS: StripePlan[] = [
	{
		name: LIFETIME_PLANS.founder.name,
		priceId: LIFETIME_PLANS.founder.priceId,
	},
	{
		name: LIFETIME_PLANS.pioneer.name,
		priceId: LIFETIME_PLANS.pioneer.priceId,
	},
	{
		name: LIFETIME_PLANS.earlyAdopter.name,
		priceId: LIFETIME_PLANS.earlyAdopter.priceId,
	},
];
