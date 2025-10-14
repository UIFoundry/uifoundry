import { getPayload } from "~/payload/utils";
import type {
	Page as PageType,
	Header as HeaderType,
	Footer as FooterType,
} from "~/payload-types";
import { COLLECTION_SLUG_SITES } from "~/payload/constants";
import { notFound, redirect } from "next/navigation";
import RenderBlocks from "~/components/RenderBlocks";
import Header from "~/payload/globals/Header";
import { cn } from "~/styles/utils";
import { blockComponents } from "~/payload/blocks";
import HeaderSpacing from "~/components/HeaderSpacing";
import Footer from "~/payload/globals/Footer";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { api, HydrateClient } from "~/trpc/server";
import HomeComponent from "~/components/Home";
import TailwindConfig from "~/payload/collections/Sites/TailwindConfig";
import { auth } from "~/auth";
import { headers } from "next/headers";

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
		return <div>no site id found, default page in site route</div>;
	}

	const site = await payload.findByID({
		collection: COLLECTION_SLUG_SITES,
		id: id,
		depth: 2,
	});

	if (!session?.user) {
		return redirect("/auth/sign-in");
	}

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

	const page = (sitePages as PageType[])?.find(
		(p) => p.slug === "/" || p.slug === "home",
	);

	if (!page) {
		console.log("no page found, ", sitePages, site);
		return notFound();
	}

	return (
		<div>
			<RefreshRouteOnSave />
			<TailwindConfig site={site} />
			{site.header && (
				<Header
					header={site.header as HeaderType}
					className={cn(!page?.showHeader && "hidden")}
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
