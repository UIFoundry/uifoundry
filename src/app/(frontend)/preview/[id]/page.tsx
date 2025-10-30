import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import type {
	Footer as FooterType,
	Header as HeaderType,
	Page as PageType,
} from "~/payload-types";

import { auth } from "~/auth";
import HeaderSpacing from "~/components/HeaderSpacing";
import HomeComponent from "~/components/Home";
import RenderBlocks from "~/components/RenderBlocks";
import { blockComponents } from "~/payload/blocks";
import Footer from "~/payload/collections/Footers";
import Header from "~/payload/collections/Headers";
import TailwindConfig from "~/payload/collections/Sites/TailwindConfig";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { COLLECTION_SLUG_SITES } from "~/payload/constants";
import { getPayload } from "~/payload/utils";
import { cn } from "~/styles/utils";
import { createTRPCServer, HydrateClient } from "~/trpc/server";

interface PageParams {
	params: Promise<{
		id?: string;
	}>;
	searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Page({ params: paramsPromise }: PageParams) {
	const { id } = await paramsPromise;
	const payload = await getPayload();
	const session = await auth.api.getSession({ headers: await headers() });

	if (!id) {
		return <div>no site id given, default page</div>;
	}

	const site = await payload.findByID({
		id,
		collection: COLLECTION_SLUG_SITES,
		depth: 2,
		draft: true,
	});

	if (!session?.user) {
		return redirect("/auth/sign-in");
	}

	const sitePages = site.pages?.docs;
	if (!sitePages) {
		const { api, queryClient, trpc } = await createTRPCServer();
		const hello = await api.post.hello({ text: "from tRPC" });

		await queryClient.prefetchQuery(trpc.post.hello.queryOptions({ text: "from tRPC" }));

		return (
			<HydrateClient>
				<RefreshRouteOnSave />
				<TailwindConfig site={site} />
				<HomeComponent
					greeting={hello.success ? hello.data.greeting : "Loading Query..."}
				/>
			</HydrateClient>
		);
	}

	const page = (sitePages as PageType[])?.find(
		(p) => p.slug === "/" || p.slug === "home",
	);

	if (!page) {
		return notFound();
	}

	return (
		<div>
			<RefreshRouteOnSave />
			<TailwindConfig site={site} />
			{site.header && (
				<Header
					className={cn(!page?.showHeader && "hidden")}
					header={site.header as HeaderType}
				/>
			)}
			<HeaderSpacing showHeader={page.showHeader}>
				<RenderBlocks
					blockComponents={blockComponents}
					blocks={page.blocks}
					meta={site}
				/>
			</HeaderSpacing>
			{site.footer && (
				<Footer
					className={cn(!page.showFooter && "hidden")}
					footer={site.footer as FooterType}
				/>
			)}
		</div>
	);
}
