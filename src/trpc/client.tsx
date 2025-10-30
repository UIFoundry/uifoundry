"use client";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createTRPCClient,
	httpBatchStreamLink,
	loggerLink,
} from "@trpc/client";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import {
	createTRPCContext,
} from "@trpc/tanstack-react-query";
import { useState } from "react";
import SuperJSON from "superjson";

import type { AppRouter } from "~/server/api/root";

import { createQueryClient } from "./query-client";

let browserQueryClient: QueryClient;
function getBrowserQueryClient() {
	if (typeof window === "undefined") {
		return createQueryClient()
	}
	if (!browserQueryClient) {
		browserQueryClient = createQueryClient()
	}
	return browserQueryClient
}

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
	const queryClient = getBrowserQueryClient()
	const [trpcClient] = useState(() => {
		return createTRPCClient<AppRouter>({
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === "development" ||
						(op.direction === "down" && op.result instanceof Error),
				}),
				httpBatchStreamLink({
					headers: () => {
						const headers = new Headers();
						headers.set("x-trpc-source", "nextjs-react");
						return headers;
					},
					transformer: SuperJSON,
					url: getBaseUrl() + "/api/trpc",
				}),
			],
		})
	})

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
				{props.children}
			</TRPCProvider>
		</QueryClientProvider>
	);
}

function getBaseUrl() {
	if (typeof window !== "undefined") {
		return window.location.origin;
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	return `http://localhost:${process.env.PORT ?? 3000}`;
}
