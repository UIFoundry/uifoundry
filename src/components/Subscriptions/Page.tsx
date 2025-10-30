import { createTRPCServer, HydrateClient } from "~/trpc/server";

import PageClient from "./PageClient";

export default async function SubscriptionsPage() {
	const { queryClient, trpc } = await createTRPCServer()
	await Promise.all([
		queryClient.prefetchQuery({
			queryFn: () => trpc.users.getLifetimeUserCount(),
			queryKey: [["users", "getLifetimeUserCount"], {}, "query"]
		}),
		queryClient.prefetchQuery({
			queryFn: () => trpc.stripe.getSubscriptionStatus(),
			queryKey: [["stripe", "getSubscriptionStatus"], {}, "query"]
		})
	]);

	return (
		<HydrateClient>
			<PageClient />
		</HydrateClient>
	);
}
