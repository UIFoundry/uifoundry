import { createTRPCServer, HydrateClient } from "~/trpc/server";

import PageClient from "./PageClient";

export default async function SubscriptionsPage() {
	const { queryClient, trpc } = await createTRPCServer()
	await Promise.all([
		queryClient.prefetchQuery(trpc.users.getLifetimeUserCount.queryOptions()),
		queryClient.prefetchQuery(trpc.stripe.getSubscriptionStatus.queryOptions())
	]);

	return (
		<HydrateClient>
			<PageClient />
		</HydrateClient>
	);
}
