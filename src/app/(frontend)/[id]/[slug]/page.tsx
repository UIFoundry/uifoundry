import { getPayload } from "~/payload/utils";
import type {
	Page,
	Page as PageType,
	Header as HeaderType,
	Footer as FooterType,
} from "~/payload-types";
import {
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
} from "~/payload/constants";
import { notFound, redirect } from "next/navigation";
import RenderBlocks from "~/components/RenderBlocks";
import Header from "~/payload/globals/Header";
import { cn } from "~/styles/utils";
import { blockComponents } from "~/payload/blocks";
import HeaderSpacing from "~/components/HeaderSpacing";
import Footer from "~/payload/globals/Footer";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { headers } from "next/headers";
import { auth } from "~/auth";
import { api, HydrateClient } from "~/trpc/server";
import HomeComponent from "~/components/Home";
import TailwindConfig from "~/payload/collections/Sites/TailwindConfig";

interface PageParams {
	params: Promise<{
		id: string;
		slug?: string;
	}>;
	searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Page({ params: paramsPromise }: PageParams) {
	const { id, slug = "" } = await paramsPromise;
	const payload = await getPayload();
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		return redirect("/auth/sign-in");
	}

	const site = await payload.findByID({
		collection: COLLECTION_SLUG_SITES,
		id: id,
		depth: 1,
	});

	const sitePages = site.pages!.docs;
	if (!sitePages) {
		const hello = await api.post.hello({ text: "from tRPC" });

		void api.post.getLatest.prefetch();

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
					header={site.header as HeaderType}
					className={cn(!page.showHeader && "hidden")}
				/>
			)}
			<HeaderSpacing showHeader={page.showHeader}>
				<RenderBlocks blocks={page.blocks} blockComponents={blockComponents} />
			</HeaderSpacing>
			{site.footer && (
				<Footer
					footer={site.footer as FooterType}
					className={cn(!page.showFooter && "hidden")}
				/>
			)}
		</div>
	);
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
