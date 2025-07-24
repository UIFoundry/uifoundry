import { getPayload } from "~/payload/utils";
import type { Page as PageType } from "~/payload-types"
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { notFound } from "next/navigation";

interface PageParams {
	params: Promise<{
		slug?: string
	}>
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
		<div>page found: {slug}</div>
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
