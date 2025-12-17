import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "~/auth";
import HomeComponent from "~/components/Home";
import RenderBlocks from "~/components/RenderBlocks";
import { blockComponents } from "~/payload/blocks";
import RefreshRouteOnSave from "~/payload/components/RefreshRouteOnSave";
import { COLLECTION_SLUG_PAGES } from "~/payload/constants";
import { getPayload } from "~/payload/utils";
import { createTRPCServer, HydrateClient } from "~/trpc/server";

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
    return <div>no page id given, default page</div>;
  }

  const page = await payload.findByID({
    id,
    collection: COLLECTION_SLUG_PAGES,
    depth: 2,
    draft: true,
  });

  if (!session?.user) {
    return redirect("/auth/sign-in");
  }

  const sitePages = page.blocks;
  if (!sitePages) {
    const { api, queryClient, trpc } = await createTRPCServer();
    const hello = await api.post.hello({ text: "from tRPC" });

    await queryClient.prefetchQuery(trpc.post.hello.queryOptions({ text: "from tRPC" }));

    return (
      <HydrateClient>
        <RefreshRouteOnSave />
        <HomeComponent
          greeting={hello.success ? hello.data.greeting : "Loading Query..."}
        />
      </HydrateClient>
    );
  }

  if (!page) {
    return notFound();
  }

  return (
    <div>
      <RefreshRouteOnSave />
      <RenderBlocks
        blockComponents={blockComponents}
        blocks={page.blocks}
        meta={page}
      />
    </div>
  );
}

