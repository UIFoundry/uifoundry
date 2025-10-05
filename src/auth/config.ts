import { admin, apiKey } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { USER_ROLES } from "./permissions";
// import { env } from "~/env.mjs";
// import { stripe } from "@better-auth/stripe";
// import Stripe from "stripe";
//
// let stripeClient: Stripe | null = null;
//
// function getStripeClient() {
// 	stripeClient ??= new Stripe(env.STRIPE_SECRET_KEY, {
// 		apiVersion: "2025-09-30.clover",
// 	});
// 	return stripeClient;
// }

export const betterAuthPlugins = [
	admin({
		defaultRole: USER_ROLES.user,
		adminRoles: [USER_ROLES.admin],
	}),
	// stripe({
	// 	stripeClient: getStripeClient(),
	// 	stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
	// 	createCustomerOnSignUp: true,
	// 	onCustomerCreate: async ({ stripeCustomer, user }, request) => {
	// 		console.log(
	// 			`[${request.path}] - customer ${stripeCustomer.id} created for user ${user.id}`,
	// 		);
	// 	},
	// }),
	apiKey(),
	nextCookies(),
];
export type BetterAuthPlugins = typeof betterAuthPlugins;
