import { env } from "~/env.mjs";

export const LIFETIME_PLANS = {
	founder: {
		name: "Founder",
		price: 197,
		priceId: env.NEXT_PUBLIC_STRIPE_FOUNDER_PRICE_ID,
		features: [],
		description: "Lifetime Access Plan",
	},
	pioneer: {
		name: "Pioneer",
		price: 297,
		priceId: env.NEXT_PUBLIC_STRIPE_PIONEER_PRICE_ID,
		features: [],
		description: "Lifetime Access Plan",
	},
	earlyAdopter: {
		name: "Early Adopter",
		price: 397,
		priceId: env.NEXT_PUBLIC_STRIPE_EARLY_ADOPTER_PRICE_ID,
		features: [],
		description: "Lifetime Access Plan",
	},
} as const;
export type LifetimePlan = (typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS];
export type LifetimePlanName =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["name"];
export type LifetimePlanPriceID =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["priceId"];
