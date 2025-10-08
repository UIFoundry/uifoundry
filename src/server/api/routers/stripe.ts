import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { LIFETIME_PLANS } from "~/utils/stripe";
import { ok, err, DAL_ERRORS } from "~/server/dal";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: "2025-09-30.clover",
});

export const stripeRouter = createTRPCRouter({
	getSubscriptionStatus: privateProcedure.query(async ({ ctx }) => {
		if (ctx.user.lifetimeSubscription) {
			const plan = Object.values(LIFETIME_PLANS).find(
				(plan) => plan.name === ctx.user.lifetimeSubscription,
			);
			if (plan) {
				return ok(plan);
			}
		}
		if (ctx.activeSubscription) {
			return ok({
				...ctx.activeSubscription,
				name: ctx.activeSubscription.plan,
			});
		}
		return err({ type: DAL_ERRORS.notFound.type });
	}),
	// Create one-time payment checkout session
	createCheckoutSession: privateProcedure
		.input(
			z.object({
				planName: z.enum(["Founder", "Pioneer", "Early Adopter"]),
				successUrl: z.string(),
				cancelUrl: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const user = ctx.user;

			// Map plan name to key
			const planKey =
				input.planName === "Founder"
					? "founder"
					: input.planName === "Pioneer"
						? "pioneer"
						: "earlyAdopter";

			const plan = LIFETIME_PLANS[planKey];

			// Get or create Stripe customer
			const customers = await stripe.customers.list({
				email: user.email,
				limit: 1,
			});

			let customerId: string;

			if (customers.data.length > 0) {
				customerId = customers.data[0]!.id;
			} else {
				// Create new customer if doesn't exist
				const customer = await stripe.customers.create({
					email: user.email,
					name: user.name ?? undefined,
					metadata: {
						userId: user.id,
					},
				});
				customerId = customer.id;
			}

			// Create checkout session for ONE-TIME payment
			const session = await stripe.checkout.sessions.create({
				customer: customerId,
				mode: "payment", // ONE-TIME PAYMENT MODE (not subscription!)
				line_items: [
					{
						price: plan.priceId,
						quantity: 1,
					},
				],
				success_url: input.successUrl,
				cancel_url: input.cancelUrl,
				payment_intent_data: {
					metadata: {
						userId: user.id,
						planName: plan.name,
						planKey: planKey,
						priceId: plan.priceId,
						lifetime: "yes", // Mark as lifetime plan for easy identification
					},
				},
			});

			return {
				url: session.url,
				sessionId: session.id,
			};
		}),
});
