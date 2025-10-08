import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { getPayload } from "~/payload/utils";
import type { LifetimePlanName } from "~/utils/stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
  console.log("\n=== [Stripe Webhook] Incoming webhook request ===");

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  console.log("[Stripe Webhook] Signature present:", !!signature);

  if (!signature) {
    console.error("[Stripe Webhook] ❌ No signature provided");
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
    console.log("[Stripe Webhook] ✅ Signature verified successfully");
    console.log("[Stripe Webhook] Event type:", event.type);
  } catch (err) {
    console.error("[Stripe Webhook] ❌ Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[Stripe Webhook] 📦 Checkout completed");
      console.log("  - Session ID:", session.id);
      console.log("  - Payment status:", session.payment_status);
      console.log("  - Customer:", session.customer);
      console.log("  - Mode:", session.mode);
      console.log("  - Metadata:", JSON.stringify(session.metadata, null, 2));
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("[Stripe Webhook] 💰 Payment intent succeeded");
      console.log("  - Payment Intent ID:", paymentIntent.id);
      console.log(
        "  - Amount:",
        paymentIntent.amount / 100,
        paymentIntent.currency,
      );
      console.log("  - Customer:", paymentIntent.customer);
      console.log(
        "  - Metadata:",
        JSON.stringify(paymentIntent.metadata, null, 2),
      );

      const planName = paymentIntent.metadata?.planName;
      const lifetime = paymentIntent.metadata?.lifetime;
      const userId = paymentIntent.metadata?.userId;

      console.log("\n[Stripe Webhook] 🔍 Checking lifetime metadata:");
      console.log("  - lifetime:", lifetime);
      console.log("  - planName:", planName);
      console.log("  - userId:", userId);

      if (lifetime === "yes" && planName && userId) {
        console.log(
          `\n[Stripe Webhook] ✅ Lifetime plan detected: ${planName} for user ${userId}`,
        );

        // Update user with lifetime subscription
        try {
          console.log(
            "[Stripe Webhook] 🔄 Attempting to update user in database...",
          );
          const payload = await getPayload();

          const result = await payload.update({
            collection: "users",
            id: userId,
            data: {
              lifetimeSubscription: planName as LifetimePlanName,
            },
          });

          console.log(
            `[Stripe Webhook] ✅ Successfully updated user ${userId} with lifetime subscription: ${planName}`,
          );
          console.log("[Stripe Webhook] Updated user data:", {
            id: result.id,
            email: result.email,
            lifetimeSubscription: result.lifetimeSubscription,
          });
        } catch (error) {
          console.error(`\n[Stripe Webhook] ❌ Error updating user ${userId}:`);
          console.error("Error details:", error);
          if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
          }
        }
      } else {
        console.log(
          "[Stripe Webhook] ⚠️  Skipping update - missing required metadata:",
        );
        if (!lifetime || lifetime !== "yes")
          console.log("  - lifetime metadata is not 'yes'");
        if (!planName) console.log("  - planName is missing");
        if (!userId) console.log("  - userId is missing");
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.error("[Stripe Webhook] ❌ Payment failed");
      console.error("  - Payment Intent ID:", paymentIntent.id);
      console.error("  - Last error:", paymentIntent.last_payment_error);
      break;
    }

    default:
      console.log(`[Stripe Webhook] ℹ️  Unhandled event type: ${event.type}`);
  }

  console.log("=== [Stripe Webhook] Request handled ===\n");
  return NextResponse.json({ received: true });
}
