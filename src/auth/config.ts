import { admin, apiKey } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { USER_ROLES } from "./permissions";
import { env } from "~/env.mjs";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
import { LIFETIME_PLANS } from "~/utils/stripe";

let stripeClient: Stripe | null = null;

function getStripeClient() {
	stripeClient ??= new Stripe(env.STRIPE_SECRET_KEY, {
		apiVersion: "2025-09-30.clover",
	});
	return stripeClient;
}

export const betterAuthPlugins = [
	admin({
		defaultRole: USER_ROLES.user,
		adminRoles: [USER_ROLES.admin],
	}),
	stripe({
		stripeClient: getStripeClient(),
		stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
		createCustomerOnSignUp: true,
		subscription: {
			enabled: true,
			plans: [
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
			],
		},
		onCustomerCreate: async ({ stripeCustomer, user }, request) => {
			console.log(
				`[${request.path}] - customer ${stripeCustomer.id} created for user ${user.id}`,
			);
		},
		onEvent: async (event) => {
			console.log("event fired: ", event);
		},
	}),
	apiKey(),
	nextCookies(),
];
export type BetterAuthPlugins = typeof betterAuthPlugins;
