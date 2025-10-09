import { api, HydrateClient } from "~/trpc/server";
import PageClient from "./PageClient";

export default async function SubscriptionsPage() {
  await Promise.all([
    api.stripe.getSubscriptionStatus.prefetch(),
    api.users.getLifetimeUserCount.prefetch(),
  ]);

  return (
    <HydrateClient>
      <PageClient />
    </HydrateClient>
  );
}
