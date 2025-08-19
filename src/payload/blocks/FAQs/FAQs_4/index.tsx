import type { FAQs_4_Block } from "~/payload-types";

export default function FAQs_4(props: FAQs_4_Block) {
  const items = props.items ?? [];
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-4 text-lg">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {[left, right].map((col, idx) => (
            <div key={idx} className="divide-y rounded-lg border">
              {col.map((it, i) => (
                <details key={i} className="group open:bg-muted/30 p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-left text-base font-medium">
                    <span>{it.question}</span>
                    <span className="text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="text-muted-foreground mt-2 text-sm leading-6">
                    {it.answer}
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
