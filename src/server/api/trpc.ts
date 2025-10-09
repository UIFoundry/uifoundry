/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { auth } from "~/auth";
import type { User } from "~/payload-types";
import { getPayload } from "~/payload/utils";
import type { LifetimePlanKey } from "~/utils/stripe";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({ headers: opts.headers });
  const user: User | null = session?.user
    ? {
        ...session.user,
        createdAt: session.user.createdAt.toISOString(),
        updatedAt: session.user.updatedAt.toISOString(),
      }
    : null;
  const payload = await getPayload();
  return {
    ...opts,
    payload,
    session: session?.session ?? null,
    user,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

const authMiddleware = t.middleware(async ({ next, ctx }) => {
  if (ctx.session === null || ctx.user === null) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: ctx.headers,
  });

  const activeSubscription = subscriptions.find(
    (sub) => sub.status === "active" || sub.status === "trialing",
  );

  // Check for lifetime membership if no active subscription
  let lifetimeMember: typeof activeSubscription | undefined = undefined;
  if (!activeSubscription && ctx.user.lifetimeSubscription) {
    const { LIFETIME_PLANS } = await import("~/utils/stripe");
    const planKey: LifetimePlanKey | undefined = Object.keys(
      LIFETIME_PLANS,
    ).find(
      // @ts-expect-error valid LIFETIME_PLANS key type
      (key: LifetimePlanKey) =>
        LIFETIME_PLANS[key].name === ctx.user?.lifetimeSubscription,
    );

    if (planKey) {
      const plan = LIFETIME_PLANS[planKey];

      lifetimeMember = {
        id: `lifetime-${ctx.user.id}`,
        plan: ctx.user.lifetimeSubscription as string,
        priceId: plan.priceId,
        limits: plan.limits,
        seats: 1,
        referenceId: ctx.user.id,
        status: "active" as const,
      };
    }
  }

  const activeSubscriptionContext: Partial<typeof activeSubscription> =
    activeSubscription
      ? {
          id: activeSubscription.id,
          plan: activeSubscription.plan,
          priceId: activeSubscription.priceId,
          limits: activeSubscription.limits,
          seats: activeSubscription.seats,
        }
      : lifetimeMember;

  return await next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.user,
      activeSubscription: activeSubscriptionContext,
    },
  });
});

export const privateProcedure = t.procedure.use(authMiddleware);
