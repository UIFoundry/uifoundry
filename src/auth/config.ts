import { stripe } from "@better-auth/stripe";
import { nextCookies } from "better-auth/next-js";
import { admin, apiKey } from "better-auth/plugins";
import Stripe from "stripe";

import { env } from "~/env.mjs";
import { LIFETIME_PLANS, type LifetimePlan } from "~/utils/stripe";

import { USER_ROLES } from "./permissions";

let stripeClient: null | Stripe = null;

function getStripeClient() {
	stripeClient ??= new Stripe(env.STRIPE_SECRET_KEY, {
		apiVersion: "2025-09-30.clover",
	});
	return stripeClient;
}

export const betterAuthPlugins = [
	admin({
		adminRoles: [USER_ROLES.admin],
		defaultRole: USER_ROLES.user,
	}),
	stripe({
		createCustomerOnSignUp: true,
		onEvent: async (event) => {
			if (event.type === "payment_intent.succeeded") {
				const paymentIntent = event.data.object;
				const lifetime = paymentIntent.metadata?.lifetime;
				const planName = paymentIntent.metadata?.planName;
				const userId = paymentIntent.metadata?.userId;

				if (
					lifetime === "yes" &&
					planName &&
					userId &&
					(planName === "Founder" ||
						planName === "Pioneer" ||
						planName === "Early Adopter")
				) {
					try {
						const plan: LifetimePlan | undefined = Object.values(
							LIFETIME_PLANS,
						).find((p) => p.name === planName);
						if (!plan) {return;}

						const { getPayload } = await import("~/payload/utils");
						const payload = await getPayload();
						await payload.update({
							id: userId,
							collection: "users",
							data: {
								// @ts-expect-error types corect, readonly object is screwing up types here
								lifetimeSubscription: plan,
							},
						});
					} catch (error) {
						console.error(`Error updating user ${userId}:`, error);
					}
				}
			}
		},
		stripeClient: getStripeClient(),
		stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
		subscription: {
			enabled: true,
			plans: [],
		},
	}),
	apiKey(),
	nextCookies(),
];
export type BetterAuthPlugins = typeof betterAuthPlugins;
