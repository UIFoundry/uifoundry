import { env } from "~/env.mjs";

export const LIFETIME_PLANS = {
	founder: {
		name: "Founder",
		priceId: env.STRIPE_FOUNDER_PRICE_ID,
	},
	pioneer: {
		name: "Pioneer",
		priceId: env.STRIPE_PIONEER_PRICE_ID,
	},
	earlyAdopter: {
		name: "Early Adopter",
		priceId: env.STRIPE_EARLY_ADOPTER_PRICE_ID,
	},
} as const;
export type LifetimePlan = (typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS];
export type LifetimePlanName =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["name"];
export type LifetimePlanPriceID =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["priceId"];
