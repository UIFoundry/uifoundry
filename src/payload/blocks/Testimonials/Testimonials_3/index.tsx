import type { Testimonials_3_Block } from "~/payload-types";

export default function Testimonials_3(props: Testimonials_3_Block) {
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
        <div className="mt-10 grid grid-cols-1 gap-8">
          {(props.testimonials ?? []).map((t, i) => (
            <figure key={i} className="mx-auto max-w-3xl">
              <blockquote className="text-center text-2xl leading-9">
                “{t.quote}”
              </blockquote>
              <figcaption className="text-muted-foreground mt-4 text-center text-sm">
                <span className="text-foreground font-medium">{t.author}</span>
                {t.role ? <span> — {t.role}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
