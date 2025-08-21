import { getPayload } from "~/payload/utils";
import type { Page as PageType } from "~/payload-types";
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { notFound } from "next/navigation";
import RenderBlocks from "~/components/RenderBlocks";
import Header from "~/payload/globals/Header";
import {
	GLOBAL_SLUG_FOOTER,
	GLOBAL_SLUG_HEADER,
} from "~/payload/constants/globals";
import { cn } from "~/styles/utils";
import { blockComponents } from "~/payload/blocks";
import HeaderSpacing from "~/components/HeaderSpacing";
import Footer from "~/payload/globals/Footer";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { api, HydrateClient } from "~/trpc/server";
import HomeComponent from "~/components/Home";
import TailwindConfig from "~/payload/globals/TailwindConfig";

interface PageParams {
	searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Page({
	searchParams: searchParamsPromise,
}: PageParams) {
	const draft = (await searchParamsPromise).draft ?? "false";
	const payload = await getPayload();

	const header = await payload.findGlobal({
		slug: GLOBAL_SLUG_HEADER,
		draft: true,
		overrideAccess: true,
	});
	const footer = await payload.findGlobal({
		slug: GLOBAL_SLUG_FOOTER,
		draft: true,
		overrideAccess: true,
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
		const hello = await api.post.hello({ text: "from tRPC" });

		void api.post.getLatest.prefetch();

		return (
			<HydrateClient>
				<RefreshRouteOnSave />
				<TailwindConfig draft={draft as "true" | "false"} />
				<HomeComponent greeting={hello ? hello.greeting : "Loading Query..."} />
			</HydrateClient>
		);
	}

	if (page === null) {
		return notFound();
	}

	return (
		<div className="px-8 pt-8">
			<RefreshRouteOnSave />
			<TailwindConfig draft={draft as "true" | "false"} />
			<Header header={header} className={cn(!page?.showHeader && "hidden")} />
			<HeaderSpacing showHeader={page.showHeader}>
				<RenderBlocks blocks={page.blocks} blockComponents={blockComponents} />
			</HeaderSpacing>
			<Footer footer={footer} className={cn(!page.showFooter && "hidden")} />
		</div>
	);
}
