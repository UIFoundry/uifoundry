# Stripe One-Time Payment Setup Guide

## Overview

This setup allows you to accept **one-time lifetime payments** while keeping better-auth's Stripe plugin for future recurring subscriptions. **No database changes needed** - we query Stripe directly!

## 1. Create One-Time Payment Prices in Stripe Dashboard

### Create "One-time" Prices with Lifetime Metadata

1. **Go to Stripe Dashboard** → Products → Add Product

2. **For each plan (Founder, Pioneer, Early Adopter):**
   - Product name: `[Plan Name] Lifetime Plan`
   - Pricing model: `Standard pricing`
   - Price: Your price (e.g., $197, $297, $397)
   - **Billing period: One time** ← CRITICAL!
   - **Metadata**: Add key `lifetime` with value `yes` ← CRITICAL!
   - Copy the Price ID (starts with `price_`)

### Update Your .env.local

```bash
# One-time payment price IDs (NOT subscription prices)
NEXT_PUBLIC_STRIPE_FOUNDER_PRICE_ID=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PIONEER_PRICE_ID=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_EARLY_ADOPTER_PRICE_ID=price_xxxxxxxxxxxxx
```

## 2. Set Up Stripe Webhook

### Create Webhook Endpoint

1. **Go to Stripe Dashboard** → Developers → Webhooks
2. **Add endpoint:**
   - URL: `https://your-domain.com/api/stripe/webhook`
   - For local testing: Use Stripe CLI (see below)
3. **Select events to listen to:**
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
4. **Copy the webhook signing secret** and add to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### Local Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3005/api/stripe/webhook

# This will give you a webhook secret starting with whsec_
# Add it to your .env.local
```

## 3. How It Works

### User Flow:

1. **User visits** `/admin/subscriptions`
2. **Clicks "Get Started"** on a plan
3. **TRPC endpoint** creates Stripe checkout session in "payment" mode with metadata `lifetime: "yes"`
4. **User pays** via Stripe Checkout
5. **Payment stored in Stripe** with metadata
6. **On next request**, TRPC middleware queries Stripe for payments with `lifetime: "yes"` metadata
7. **User has lifetime access** - no database updates needed!

### Code Flow:

```
User clicks button
    ↓
api.stripe.createCheckoutSession.mutate()
    ↓
Creates Stripe Checkout (mode: "payment", metadata: {lifetime: "yes"})
    ↓
User completes payment
    ↓
Payment stored in Stripe with metadata
    ↓
On next request: TRPC middleware queries Stripe
    ↓
Finds payment with lifetime: "yes" metadata
    ↓
Adds to ctx.activeSubscription
    ↓
User sees active subscription in UI
```

## 4. Access Control

### Automatic via TRPC Context:

```typescript
// In any privateProcedure
privateProcedure.query(({ ctx }) => {
  if (ctx.activeSubscription) {
    // User has either:
    // 1. Active better-auth subscription (recurring), OR
    // 2. Lifetime plan (one-time payment)
    console.log(`User has ${ctx.activeSubscription.plan} plan`);
  }
});
```

### The TRPC middleware automatically:

1. Checks better-auth for active subscriptions
2. If none found, queries Stripe for payments with `lifetime: "yes"` metadata
3. Populates `ctx.activeSubscription` with whichever is found
4. Both subscription types work identically in your code!

## 5. Future: Adding Recurring Subscriptions

When you're ready to add recurring subscriptions:

1. **Keep better-auth's Stripe plugin** (already configured)
2. **Create recurring prices** in Stripe (monthly/yearly) WITHOUT `lifetime` metadata
3. **Add to STRIPE_PLANS** in `src/auth/stripe.ts`
4. **Use better-auth's** `authClient.subscription.upgrade()` for recurring plans
5. **Use custom TRPC** `api.stripe.createCheckoutSession()` for one-time plans

Both systems work side-by-side!

## 6. What Was Changed

### New Files:

- ✅ `src/server/api/routers/stripe.ts` - One-time payment TRPC endpoint (~80 lines)
- ✅ `src/app/api/stripe/webhook/route.ts` - Webhook handler for logging (~70 lines)

### Modified Files:

- ✅ `src/server/api/trpc.ts` - Added Stripe lifetime plan check to auth middleware (~50 lines added)
- ✅ `src/server/api/root.ts` - Added stripe router (1 line)
- ✅ `src/server/api/routers/subscriptions.ts` - Simplified (removed database check)
- ✅ `src/app/(payload)/admin/subscriptions/page.tsx` - Updated to use TRPC endpoint

### NOT Changed:

- ✅ **No PayloadCMS schema changes** - no new fields needed!
- ✅ **No database migrations** - Stripe is the source of truth
- ✅ **Better-auth config unchanged** - ready for future subscriptions

## 7. Testing Checklist

- [ ] Created one-time prices in Stripe Dashboard
- [ ] Added `lifetime: "yes"` metadata to each price
- [ ] Updated .env.local with price IDs
- [ ] Set up webhook endpoint in Stripe
- [ ] Added webhook secret to .env.local
- [ ] Started dev server: `pnpm dev`
- [ ] Tested checkout flow at `/admin/subscriptions`
- [ ] Verified payment appears in Stripe Dashboard with metadata
- [ ] Confirmed user sees active subscription after payment
- [ ] Tested that subscription persists across page reloads

## 8. Troubleshooting

### Webhook not receiving events?

```bash
# Use Stripe CLI for local testing:
stripe listen --forward-to localhost:3005/api/stripe/webhook
```

### User not getting lifetime access?

1. Check Stripe Dashboard → Payments → find the payment
2. Verify metadata includes `lifetime: "yes"`
3. Check server console for TRPC middleware logs
4. Verify price ID matches your .env.local

### Performance concerns?

The TRPC middleware only queries Stripe when:

- User is authenticated
- No active better-auth subscription exists
- Caches result in the request context

For production, consider adding Redis caching if needed.

## Summary

You now have:

- ✅ One-time payment checkout for lifetime plans
- ✅ **No database changes** - Stripe is the source of truth
- ✅ Automatic access control via TRPC context
- ✅ Webhook logging for monitoring
- ✅ Better-auth Stripe plugin ready for future recurring subscriptions
- ✅ ~200 lines of custom code total

**Key advantage**: No sync issues between Stripe and your database. Stripe is always the source of truth for payment status!
