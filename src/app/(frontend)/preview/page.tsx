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
import { env } from "~/env.mjs";
import { blockComponents } from "~/payload/blocks";
import Footer from "~/payload/collections/Footers";
import Header from "~/payload/collections/Headers";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { COLLECTION_SLUG_SITES } from "~/payload/constants";
import {
  GLOBAL_SLUG_FOOTER,
  GLOBAL_SLUG_HEADER,
} from "~/payload/constants/globals";
import TailwindConfig from "~/payload/globals/SiteConfig";
import { getPayload } from "~/payload/utils";
import { cn } from "~/styles/utils";
import { createTRPCServer, HydrateClient } from "~/trpc/server";

interface PageParams {
  params: Promise<{
    slug?: string;
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Page({
  searchParams: searchParamsPromise,
}: PageParams) {
  const useTailwindDraftConfig = (await searchParamsPromise).draft ?? "false";
  const payload = await getPayload();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return redirect("/");
  }

  const header = await payload.findGlobal({
    overrideAccess: true,
    slug: GLOBAL_SLUG_HEADER,
    draft: true,
  });
  const footer = await payload.findGlobal({
    overrideAccess: true,
    slug: GLOBAL_SLUG_FOOTER,
    draft: true,
  });
  const mainSite = await payload.find({
    collection: COLLECTION_SLUG_SITES,
    depth: 1,
    draft: true,
    limit: 1,
    where: {
      domainUrl: {
        equals: env.NODE_ENV === "production" ? env.NEXT_PUBLIC_BETTER_AUTH_URL : "https://dev.uifoundry.dev"
      }
    }
  })

  const page = mainSite.docs.at(0)?.pages?.find(p => p.slug === "home")

  if (!page) {
    const { api, queryClient, trpc } = await createTRPCServer()
    const hello = await api.post.hello({ text: "from tRPC" });

    await queryClient.prefetchQuery(trpc.post.hello.queryOptions({ text: "from tRPC" }));

    return (
      <HydrateClient>
        <RefreshRouteOnSave />
        <TailwindConfig draft={useTailwindDraftConfig as "false" | "true"} />
        <HomeComponent
          greeting={hello.success ? hello.data.greeting : "Loading Query..."}
        />
      </HydrateClient>
    );
  }

  if (page === null) {
    console.log("page is null: ", mainSite);
    return notFound();
  }

  return (
    <div>
      <RefreshRouteOnSave />
      <TailwindConfig draft={useTailwindDraftConfig as "false" | "true"} />
      {header && (
        <Header
          className={cn(!page?.showHeader && "hidden")}
          header={header as HeaderType}
        />
      )}
      <HeaderSpacing showHeader={page.showHeader}>
        <RenderBlocks blockComponents={blockComponents} blocks={(page.content as PageType).blocks} />
      </HeaderSpacing>
      {footer && (
        <Footer
          className={cn(!page.showFooter && "hidden")}
          footer={footer as FooterType}
        />
      )}
    </div>
  );
}
