import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import type {
	Footer as FooterType,
	Header as HeaderType,
	Page,
	Page as PageType,
} from "~/payload-types";

import { auth } from "~/auth";
import HeaderSpacing from "~/components/HeaderSpacing";
import HomeComponent from "~/components/Home";
import RenderBlocks from "~/components/RenderBlocks";
import { blockComponents } from "~/payload/blocks";
import TailwindConfig from "~/payload/collections/Sites/TailwindConfig";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import {
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
} from "~/payload/constants";
import Footer from "~/payload/globals/Footer";
import Header from "~/payload/globals/Header";
import { getPayload } from "~/payload/utils";
import { cn } from "~/styles/utils";
import { createTRPCServer, HydrateClient } from "~/trpc/server";

interface PageParams {
	params: Promise<{
		id: string;
		slug?: string;
	}>;
	searchParams: Promise<Record<string, string | string[]>>;
}

export async function generateStaticParams() {
	const payload = await getPayload();
	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		draft: false,
		limit: 100,
	});

	const pages: Page[] = pageRes?.docs;

	return pages.map(({ slug, _status }) => {
		if (_status !== "published" || slug === "home") {
			return {};
		}
		return { slug };
	});
}

export default async function Page({ params: paramsPromise }: PageParams) {
	const { id, slug = "" } = await paramsPromise;
	const payload = await getPayload();
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		return redirect("/auth/sign-in");
	}

	const site = await payload.findByID({
		id,
		collection: COLLECTION_SLUG_SITES,
		depth: 1,
	});

	const sitePages = site.pages!.docs;
	if (!sitePages) {
		const { api, queryClient, trpc } = await createTRPCServer();
		const hello = await api.post.hello({ text: "from tRPC" });

		void queryClient.prefetchQuery(trpc.post.hello.queryOptions({ text: "from tRPC" }));

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

	const page = (sitePages as PageType[])?.find((p) => {
		if (!slug || slug.length < 1) {
			return p.slug === "/" || p.slug === "home";
		}
		return p.slug === slug;
	});

	if (!page) {
		return notFound();
	}

	return (
		<div>
			<RefreshRouteOnSave />
			{site.header && (
				<Header
					className={cn(!page.showHeader && "hidden")}
					header={site.header as HeaderType}
				/>
			)}
			<HeaderSpacing showHeader={page.showHeader}>
				<RenderBlocks blockComponents={blockComponents} blocks={page.blocks} />
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
