import type { FAQs_3_Block } from "~/payload-types";

export default function FAQs_3(props: FAQs_3_Block) {
  const items = props.items ?? [];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-4 text-lg">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <div className="mx-auto mt-8 max-w-3xl divide-y rounded-lg border">
          {items.map((it, i) => (
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
      </div>
    </section>
  );
}
