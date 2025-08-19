import type { Testimonials_1_Block } from "~/payload-types";

export default function Testimonials_1(props: Testimonials_1_Block) {
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
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {(props.testimonials ?? []).map((t, i) => (
            <figure
              key={i}
              className="bg-background ring-border/50 rounded-xl border p-6 ring-1"
            >
              <blockquote className="text-sm leading-6">“{t.quote}”</blockquote>
              <figcaption className="text-muted-foreground mt-4 text-xs">
                <span className="text-foreground font-medium">{t.author}</span>
                {t.role ? <span> • {t.role}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
