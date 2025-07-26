import { getPayload } from "~/payload/utils";
import type { Page as PageType } from "~/payload-types"
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { notFound } from "next/navigation";
import RenderBlocks from "~/components/RenderBlocks"
import Header from "~/payload/globals/Header"
import { GLOBAL_SLUG_HEADER } from "~/payload/constants/globals";
import { cn } from "~/styles/utils";
import { blockComponents } from "~/payload/blocks";
import HeaderSpacing from "~/components/HeaderSpacing";

interface PageParams {
	params: Promise<{
		slug?: string
	}>
}

export default async function Page({ params: paramsPromise }: PageParams) {
	const { slug = '' } = await paramsPromise
	const payload = await getPayload()

	const header = await payload.findGlobal({
		slug: GLOBAL_SLUG_HEADER
	})
	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		draft: false,
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
		<div className="p-8">
			<Header header={header} className={cn(!page.showHeader && "hidden")} />
			<HeaderSpacing showHeader={page.showHeader}>
				<h1 className="text-center pt-4 w-full font-bold">{page.title}</h1>
				<RenderBlocks blocks={page.blocks} blockComponents={blockComponents} />
			</HeaderSpacing>
		</div>
	)
}

export async function generateStaticParams() {
	const payload = await getPayload()
	const pageRes = await payload.find({
		collection: COLLECTION_SLUG_PAGES,
		draft: false,
		limit: 100,
	})

	const pages = pageRes?.docs

	return pages.map(({ slug }) => {
		if (slug === 'home') {
			return {}
		}
		return { slug }
	})
}
