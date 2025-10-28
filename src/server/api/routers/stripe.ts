import Stripe from "stripe";
import { z } from "zod";

import { env } from "~/env.mjs";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { DAL_ERRORS, err, ok } from "~/server/dal";
import { LIFETIME_PLANS } from "~/utils/stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

export const stripeRouter = createTRPCRouter({
  getSubscriptionStatus: privateProcedure.query(async ({ ctx }) => {
    const fullUser = await ctx.payload.findByID({
      id: ctx.user.id,
      collection: "users",
    });

    if (fullUser.lifetimeSubscription) {
      const plan = Object.values(LIFETIME_PLANS).find(
        (plan) => plan.name === fullUser.lifetimeSubscription,
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
  // Create one-time payment checkout session since 'payment' mode does not yet work with better-auth stripe plugin
  createCheckoutSession: privateProcedure
    .input(
      z.object({
        cancelUrl: z.string(),
        planName: z.enum(["Founder", "Pioneer", "Early Adopter"]),
        successUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;

      const planKey =
        input.planName === "Founder"
          ? "founder"
          : input.planName === "Pioneer"
            ? "pioneer"
            : "earlyAdopter";

      const plan = LIFETIME_PLANS[planKey];

      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });

      let customerId: string;

      if (customers.data.length > 0) {
        customerId = customers.data[0]!.id;
      } else {
        const customer = await stripe.customers.create({
          name: user.name ?? undefined,
          email: user.email,
          metadata: {
            userId: user.id,
          },
        });
        customerId = customer.id;
      }

      const metadata = {
        lifetime: "yes",
        planKey,
        planName: plan.name,
        priceId: plan.priceId,
        userId: user.id,
      };

      const session = await stripe.checkout.sessions.create({
        cancel_url: input.cancelUrl,
        customer: customerId,
        line_items: [
          {
            price: plan.priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: {
          metadata,
        },
        success_url: input.successUrl,
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    }),
});
