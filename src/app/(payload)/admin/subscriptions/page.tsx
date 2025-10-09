import { redirect } from "next/navigation";
import { auth } from "~/auth";
import SubscriptionsPageComponent from "~/components/Subscriptions/Page";
import { headers } from "next/headers";

export default async function SubscriptionsPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) return redirect("/auth/sign-in");
	return <SubscriptionsPageComponent />;
}
