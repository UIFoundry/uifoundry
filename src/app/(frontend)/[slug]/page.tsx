import { getPayload } from "~/payload/utils";
import type { Page as PageType } from "~/payload-types"
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { notFound } from "next/navigation";
import RenderBlocks from "~/components/RenderBlocks"
import Teams_1 from "~/payload/blocks/Teams/Teams_1";
import { BLOCK_SLUG_TEAMS_1 } from "~/payload/constants/blocks";

interface PageParams {
	params: Promise<{
		slug?: string
	}>
}

const blockComponents = {
	[BLOCK_SLUG_TEAMS_1]: Teams_1
}

export default async function Page({ params: paramsPromise }: PageParams) {
	const { slug = '' } = await paramsPromise
	const payload = await getPayload()

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
			<h1>{page.title}</h1>
			<RenderBlocks blocks={page.blocks} blockComponents={blockComponents} />
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
