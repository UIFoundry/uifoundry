import type { Stats_1_Block } from "~/payload-types";

export default function Stats_1(props: Stats_1_Block) {
  const list = Array.isArray(props.stats) ? props.stats : [];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-3 text-lg">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {list.map((s, i) => (
            <div key={i} className="rounded-xl border p-6 text-center">
              <dt className="text-muted-foreground text-sm">{s.label}</dt>
              <dd className="mt-1 text-3xl font-semibold">{s.value}</dd>
              {s.delta ? (
                <div className="text-primary mt-1 text-xs">{s.delta}</div>
              ) : null}
              {s.description ? (
                <div className="text-muted-foreground mt-2 text-xs">
                  {s.description}
                </div>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
