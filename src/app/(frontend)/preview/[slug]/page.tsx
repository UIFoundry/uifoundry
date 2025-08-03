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

interface PageParams {
	params: Promise<{
		slug?: string
	}>
}

export default async function Page({ params: paramsPromise }: PageParams) {
	const { slug = '' } = await paramsPromise
	const payload = await getPayload()
	const session = await auth.api.getSession({ headers: await headers() })

	if (!session?.user) {
		return redirect("/")
	}

	const header = await payload.findGlobal({
		slug: GLOBAL_SLUG_HEADER
	})
	const footer = await payload.findGlobal({
		slug: GLOBAL_SLUG_FOOTER
	})
	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		draft: true,
		limit: 1,
		where: {
			slug: {
				equals: slug
			}
		}
	})

	const page = pageRes?.docs?.[0] as null | PageType

	if (page === null) {
		return notFound()
	}

	return (
		<div className="pt-8 px-8">
			<RefreshRouteOnSave />
			<Header header={header} className={cn(!page.showHeader && "hidden")} />
			<HeaderSpacing showHeader={page.showHeader}>
				<h1 className="text-center pt-4 w-full font-bold">{page.title}</h1>
				<RenderBlocks blocks={page.blocks} blockComponents={blockComponents} />
			</HeaderSpacing>
			<Footer footer={footer} className={cn(!page.showFooter && "hidden")} />
		</div>
	)
}
