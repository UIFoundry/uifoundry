import Link from "next/link";
import {
  REGISTRY_ENDPOINTS,
  REGISTRY_CATEGORIES,
} from "~/lib/registry-constants";
import type { RegistryComponentsResponse } from "~/lib/registry";

export const dynamic = "force-dynamic";
export const metadata = { title: "UIFoundry Registry" };

async function getComponents(params: { q?: string; category?: string }) {
  const url = new URL(REGISTRY_ENDPOINTS.components, "http://localhost");
  if (params.category) url.searchParams.set("category", params.category);
  const res = await fetch(url.toString().replace("http://localhost", ""), {
    next: { revalidate: 60 },
  });
  if (!res.ok)
    return { components: [], total: 0 } as RegistryComponentsResponse;
  return (await res.json()) as RegistryComponentsResponse;
}

export default async function RegistryPage({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  const q = searchParams?.q?.toLowerCase().trim() ?? "";
  const category = searchParams?.category ?? "";
  const data = await getComponents({ category });
  const filtered = data.components.filter((c) =>
    q
      ? c.name.toLowerCase().includes(q) ||
        (c.tags ?? []).some((t) => t.toLowerCase().includes(q))
      : true,
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold">UIFoundry Registry</h1>
      <p className="text-muted-foreground mt-2">
        Browse and preview available components.
      </p>

      <form
        className="mt-6 flex flex-wrap items-center gap-3"
        action="/registry"
        method="get"
      >
        <input
          type="text"
          name="q"
          placeholder="Search components..."
          defaultValue={q}
          className="w-64 rounded-md border px-3 py-2 text-sm"
        />

        <select
          name="category"
          defaultValue={category}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          {REGISTRY_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit" className="rounded-md border px-3 py-2 text-sm">
          Filter
        </button>
      </form>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <li key={c.name} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{c.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {(c as any).description ?? ""}
                </p>
              </div>
              <Link
                href={`/registry/${c.name}`}
                className="text-primary text-sm underline"
              >
                View
              </Link>
            </div>
            {c.tags && c.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
