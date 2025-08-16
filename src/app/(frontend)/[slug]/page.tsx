import { getPayload } from "~/payload/utils";
import type { Page, Page as PageType } from "~/payload-types";
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

interface PageParams {
  params: Promise<{
    slug?: string;
  }>;
}

export default async function Page({ params: paramsPromise }: PageParams) {
  const { slug = "" } = await paramsPromise;
  const payload = await getPayload();

  const header = await payload.findGlobal({
    slug: GLOBAL_SLUG_HEADER,
  });
  const footer = await payload.findGlobal({
    slug: GLOBAL_SLUG_FOOTER,
  });
  const pageRes = await payload.find({
    collection: COLLECTION_SLUG_PAGES,
    draft: false,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const page = pageRes?.docs?.[0] as null | PageType;

  if (!page || page === null) {
    return notFound();
  }

  return (
    <div className="px-8 pt-8">
      <RefreshRouteOnSave />
      <Header header={header} className={cn(!page.showHeader && "hidden")} />
      <HeaderSpacing showHeader={page.showHeader}>
        <RenderBlocks blocks={page.blocks} blockComponents={blockComponents} />
      </HeaderSpacing>
      <Footer footer={footer} className={cn(!page.showFooter && "hidden")} />
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
