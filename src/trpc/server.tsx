import "server-only";
import {
	dehydrate,
	HydrationBoundary,
} from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache, type ComponentPropsWithRef } from "react";

import { appRouter, createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

import { createQueryClient } from "./query-client";

const getQueryClientServer = cache(createQueryClient)

const trpc = createTRPCOptionsProxy({
	ctx: createTRPCContext,
	queryClient: getQueryClientServer,
	router: appRouter
})

export async function createTRPCServer() {
	const api = createCaller(await createTRPCContext({ headers: await headers() }))
	return { api, queryClient: getQueryClientServer(), trpc };
};

export function HydrateClient({
	children,
	...divProps
}: ComponentPropsWithRef<"div">) {
	const queryClient = getQueryClientServer()
	return (
		<HydrationBoundary state={dehydrate(queryClient)} {...divProps}>
			{children}
		</HydrationBoundary>
	);
}
