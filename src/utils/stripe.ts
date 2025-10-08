import { env } from "~/env.mjs";

export const LIFETIME_PLANS = {
	founder: {
		name: "Founder",
		price: 197,
		priceId: env.NEXT_PUBLIC_STRIPE_FOUNDER_PRICE_ID as string,
		features: [
			"Lifetime access to UIFoundry",
			"All current and future blocks",
			"All current and future fields",
			"Priority support",
			"Early access to new features",
		] as string[],
		limits: {},
		description: "Lifetime Access Plan",
		totalSeats: 100,
		popular: false,
		exclusive: true,
		actionLabel: "Upgrade",
	},
	pioneer: {
		name: "Pioneer",
		price: 297,
		priceId: env.NEXT_PUBLIC_STRIPE_PIONEER_PRICE_ID as string,
		features: [
			"Lifetime access to UIFoundry",
			"All current and future blocks",
			"All current and future fields",
			"Priority support",
			"Early access to new features",
		] as string[],
		limits: {},
		description: "Lifetime Access Plan",
		totalSeats: 150,
		popular: false,
		exclusive: true,
		actionLabel: "Upgrade",
	},
	earlyAdopter: {
		name: "Early Adopter",
		price: 397,
		priceId: env.NEXT_PUBLIC_STRIPE_EARLY_ADOPTER_PRICE_ID as string,
		features: [
			"Lifetime access to UIFoundry",
			"All current and future blocks",
			"All current and future fields",
			"Priority support",
			"Early access to new features",
		] as string[],
		limits: {},
		description: "Lifetime Access Plan",
		totalSeats: 250,
		popular: false,
		exclusive: true,
		actionLabel: "Upgrade",
	},
} as const;
export type LifetimePlan = (typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS];
export type LifetimePlanKey = keyof typeof LIFETIME_PLANS;
export type LifetimePlanName =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["name"];
export type LifetimePlanPriceID =
	(typeof LIFETIME_PLANS)[keyof typeof LIFETIME_PLANS]["priceId"];
