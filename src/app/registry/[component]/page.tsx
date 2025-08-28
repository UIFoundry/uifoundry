import Link from "next/link";
import { notFound } from "next/navigation";
import { REGISTRY_ENDPOINTS } from "~/lib/registry-constants";
import type { RegistryComponent } from "~/lib/registry";
import { CodeBlock } from "../CodeBlock";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  return { title: `Registry: ${component}` };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;

  const res = await fetch(REGISTRY_ENDPOINTS.component(component), {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  const data = (await res.json()) as RegistryComponent;

  const cmd = `npx shadcn add --registry ${REGISTRY_ENDPOINTS.index.replace("/index.json", "")} ${data.name}`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/registry"
        className="text-muted-foreground text-sm underline"
      >
        ← Back to list
      </Link>
      <h1 className="mt-2 text-3xl font-semibold">{data.name}</h1>
      {(data as any).description && (
        <p className="text-muted-foreground mt-1">
          {(data as any).description}
        </p>
      )}

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="font-medium">Install</h2>
        <pre className="bg-muted mt-2 overflow-auto rounded-md p-3 text-sm">
          {cmd}
        </pre>
      </section>

      <section className="mt-6 grid gap-6">
        {data.files.map((f) => (
          <div key={f.name}>
            <h3 className="mb-2 font-medium">{f.name}</h3>
            <CodeBlock
              code={f.content}
              language={f.name.endsWith(".tsx") ? "tsx" : "ts"}
            />
          </div>
        ))}
      </section>

      {(data.dependencies?.length || data.registryDependencies?.length) && (
        <section className="mt-6 rounded-lg border p-4">
          <h2 className="font-medium">Dependencies</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {(data.dependencies ?? []).map((d) => (
              <span
                key={d}
                className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
              >
                {d}
              </span>
            ))}
            {(data.registryDependencies ?? []).map((d) => (
              <span
                key={d}
                className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
              >
                {d}
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
