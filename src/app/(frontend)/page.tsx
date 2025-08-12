import { api, HydrateClient } from "~/trpc/server";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import HomeComponent from "~/components/Home";

export default async function Home() {
	const hello = await api.post.hello({ text: "from tRPC" });

	void api.post.getLatest.prefetch();

	return (
		<HydrateClient>
			<RefreshRouteOnSave />
			<HomeComponent greeting={hello ? hello.greeting : "Loading Query..."} />
		</HydrateClient>
	);
}
