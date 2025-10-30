import { notFound } from "next/navigation";

import type {
	Footer as FooterType,
	Header as HeaderType,
	Page as PageType,
} from "~/payload-types";

import HeaderSpacing from "~/components/HeaderSpacing";
import HomeComponent from "~/components/Home";
import RenderBlocks from "~/components/RenderBlocks";
import { blockComponents } from "~/payload/blocks";
import Footer from "~/payload/collections/Footers";
import Header from "~/payload/collections/Headers";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import {
	GLOBAL_SLUG_FOOTER,
	GLOBAL_SLUG_HEADER,
} from "~/payload/constants/globals";
import TailwindConfig from "~/payload/globals/SiteConfig";
import { getPayload } from "~/payload/utils";
import { cn } from "~/styles/utils";
import { createTRPCServer, HydrateClient } from "~/trpc/server";

interface PageParams {
	searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Page({
	searchParams: searchParamsPromise,
}: PageParams) {
	const draft = (await searchParamsPromise).draft ?? "false";
	const payload = await getPayload();

	const header = await payload.findGlobal({
		overrideAccess: true,
		slug: GLOBAL_SLUG_HEADER,
	});
	const footer = await payload.findGlobal({
		overrideAccess: true,
		slug: GLOBAL_SLUG_FOOTER,
	});
	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		limit: 1,
		where: {
			slug: {
				equals: "home",
			},
		},
	});

	const page = pageRes?.docs?.[0] as null | PageType;

	if (!page) {
		const { api, queryClient, trpc } = await createTRPCServer();
		const hello = await api.post.hello({ text: "from tRPC" });

		await queryClient.prefetchQuery(trpc.post.hello.queryOptions({ text: "from tRPC" }));

		return (
			<HydrateClient>
				<RefreshRouteOnSave />
				<TailwindConfig draft={draft as "false" | "true"} />
				<HomeComponent
					greeting={hello.success ? hello.data.greeting : "Loading Query..."}
				/>
			</HydrateClient>
		);
	}

	if (page === null) {
		return notFound();
	}

	return (
		<div>
			<RefreshRouteOnSave />
			<TailwindConfig draft={draft as "false" | "true"} />
			{header && (
				<Header
					className={cn(!page?.showHeader && "hidden")}
					header={header as HeaderType}
				/>
			)}
			<HeaderSpacing showHeader={page.showHeader}>
				<RenderBlocks blockComponents={blockComponents} blocks={page.blocks} />
			</HeaderSpacing>
			{footer && (
				<Footer
					className={cn(!page.showFooter && "hidden")}
					footer={footer as FooterType}
				/>
			)}
		</div>
	);
}
