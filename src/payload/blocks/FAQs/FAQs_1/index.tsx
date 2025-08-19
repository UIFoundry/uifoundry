import type { FAQs_1_Block } from "~/payload-types";

export default function FAQs_1(props: FAQs_1_Block) {
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
        <div className="mx-auto mt-8 max-w-3xl divide-y">
          {(props.items ?? []).map((it, i) => (
            <details key={i} className="group py-4">
              <summary className="text-left text-base font-medium marker:content-['']">
                {it.question}
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
