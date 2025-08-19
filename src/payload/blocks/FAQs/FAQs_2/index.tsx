import type { FAQs_2_Block } from "~/payload-types";

export default function FAQs_2(props: FAQs_2_Block) {
  const items = props.items ?? [];
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
          {items.map((it, i) => (
            <div key={i} className="bg-muted/40 rounded-lg border p-6">
              <h3 className="text-base font-medium">{it.question}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {it.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
