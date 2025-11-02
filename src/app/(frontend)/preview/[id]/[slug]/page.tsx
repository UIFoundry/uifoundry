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
		return redirect("/");
	}

	const site = await payload.findByID({
		id,
		collection: COLLECTION_SLUG_SITES,
		depth: 1,
		draft: true,
	});

	const sitePages = site.pages;
	if (!sitePages) {
		const { api, queryClient, trpc } = await createTRPCServer()
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

	const page = sitePages.find((p) => {
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
			<TailwindConfig site={site} />
			{site.header && (
				<Header
					className={cn(!page.showHeader && "hidden")}
					header={site.header as HeaderType}
				/>
			)}
			<HeaderSpacing showHeader={page.showHeader}>
				<RenderBlocks blockComponents={blockComponents} blocks={(page.content as unknown as PageType[]) ?? []} />
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
