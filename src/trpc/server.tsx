import "server-only";
import {
	dehydrate,
	HydrationBoundary,
	type QueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { cache, type ComponentPropsWithRef } from "react";

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

import { createQueryClient } from "./query-client";

export const createTRPCServer = cache(async () => {
	const queryClient = createQueryClient();
	const trpc = createCaller(
		await createTRPCContext({ headers: await headers() }),
	);
	return { queryClient, trpc };
});

let cachedQueryClient: QueryClient | undefined;

export function HydrateClient({
	children,
	...divProps
}: ComponentPropsWithRef<"div">) {
	if (!Boolean(cachedQueryClient)) {
		cachedQueryClient = createQueryClient();
	}
	return (
		<HydrationBoundary state={dehydrate(cachedQueryClient!)} {...divProps}>
			{children}
		</HydrationBoundary>
	);
}
