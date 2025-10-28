import { env } from "~/env.mjs";

export const LIFETIME_PLANS = {
	earlyAdopter: {
		name: "Early Adopter",
		actionLabel: "Upgrade",
		description: "Lifetime Access Plan",
		exclusive: true,
		features: [
			"Lifetime access to UIFoundry",
			"All current and future blocks",
			"All current and future fields",
			"Priority support",
			"Early access to new features",
		],
		limits: {},
		maxSeats: 250,
		minSeats: 250,
		popular: false,
		price: 397,
		priceId: env.NEXT_PUBLIC_STRIPE_EARLY_ADOPTER_PRICE_ID,
	},
	founder: {
		name: "Founder",
		actionLabel: "Upgrade",
		description: "Lifetime Access Plan",
		exclusive: true,
		features: [
			"Lifetime access to UIFoundry",
			"All current and future blocks",
			"All current and future fields",
			"Priority support",
			"Early access to new features",
		],
		limits: {},
		maxSeats: 100,
		minSeats: 0,
		popular: false,
		price: 197,
		priceId: env.NEXT_PUBLIC_STRIPE_FOUNDER_PRICE_ID,
	},
	pioneer: {
		name: "Pioneer",
		actionLabel: "Upgrade",
		description: "Lifetime Access Plan",
		exclusive: true,
		features: [
			"Lifetime access to UIFoundry",
			"All current and future blocks",
			"All current and future fields",
			"Priority support",
			"Early access to new features",
		],
		limits: {},
		maxSeats: 150,
		minSeats: 100,
		popular: false,
		price: 297,
		priceId: env.NEXT_PUBLIC_STRIPE_PIONEER_PRICE_ID,
	},
} as const;

export type LifetimePlan = (typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS];
export type LifetimePlanKey = keyof typeof LIFETIME_PLANS;
export type LifetimePlanName =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["name"];
export type LifetimePlanPriceID =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["priceId"];
