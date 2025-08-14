import { getPayload } from "~/payload/utils";
import type { Page as PageType } from "~/payload-types"
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { notFound } from "next/navigation";
import RenderBlocks from "~/components/RenderBlocks"
import Header from "~/payload/globals/Header"
import { GLOBAL_SLUG_FOOTER, GLOBAL_SLUG_HEADER } from "~/payload/constants/globals";
import { cn } from "~/styles/utils";
import { blockComponents } from "~/payload/blocks";
import HeaderSpacing from "~/components/HeaderSpacing";
import Footer from "~/payload/globals/Footer";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { headers } from "next/headers";
import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import HomeComponent from "~/components/Home";
import TailwindConfig from "~/payload/components/TailwindConfig"


interface PageParams {
	params: Promise<{
		slug?: string
	}>,
	searchParams: Promise<Record<string, string | string[]>>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: PageParams) {
	const draft = (await searchParamsPromise).draft ?? false
	const { slug = '' } = await paramsPromise
	const payload = await getPayload()
	const session = await auth.api.getSession({ headers: await headers() })

	if (!session?.user) {
		return redirect("/")
	}

	const header = await payload.findGlobal({
		slug: GLOBAL_SLUG_HEADER,
		draft: true,
		overrideAccess: true,
	})
	const footer = await payload.findGlobal({
		slug: GLOBAL_SLUG_FOOTER,
		draft: true,
		overrideAccess: true,
	})
	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		draft: true,
		overrideAccess: true,
		limit: 1,
		where: {
			slug: {
				equals: slug
			}
		}
	})

	const page = pageRes?.docs?.[0] as null | PageType

	if (!page) {
		const hello = await api.post.hello({ text: "from tRPC" });

		void api.post.getLatest.prefetch();

		return (
			<HydrateClient>
				<RefreshRouteOnSave />
				<TailwindConfig draft={draft} />
				<HomeComponent greeting={hello ? hello.greeting : "Loading Query..."} />
			</HydrateClient>
		);
	}

	if (page === null) {
		return notFound()
	}

	return (
		<div className="pt-8 px-8">
			<RefreshRouteOnSave />
			<TailwindConfig draft={draft} />
			<Header header={header} className={cn(!(page?.showHeader) && "hidden")} />
			<HeaderSpacing showHeader={page.showHeader}>
				<h1 className="text-center pt-4 w-full font-bold">{page.title}</h1>
				<RenderBlocks blocks={page.blocks} blockComponents={blockComponents} />
			</HeaderSpacing>
			<Footer footer={footer} className={cn(!page.showFooter && "hidden")} />
		</div>
	)
}
