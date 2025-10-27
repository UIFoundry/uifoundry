import { postRouter } from "~/server/api/routers/post";
import { stripeRouter } from "~/server/api/routers/stripe";
import { themesRouter } from "~/server/api/routers/themes";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

import { usersRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	post: postRouter,
	stripe: stripeRouter,
	themes: themesRouter,
	users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
