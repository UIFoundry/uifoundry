import type { CTA_1_Block } from "~/payload-types";

export default function CTA_1(props: CTA_1_Block) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {props.kicker ? (
            <div className="text-muted-foreground text-sm">{props.kicker}</div>
          ) : null}
          <h2 className="mt-2 text-4xl font-semibold md:text-5xl">
            {props.header}
          </h2>
          {props.subheader ? (
            <p className="text-muted-foreground mt-3 text-lg">
              {props.subheader}
            </p>
          ) : null}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={props.primaryCtaHref ?? "#"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-md px-4 py-2 text-sm transition-colors"
            >
              {props.primaryCtaLabel ?? "Start free"}
            </a>
            <a
              href={props.secondaryCtaHref ?? "#"}
              className="hover:text-foreground text-muted-foreground inline-flex rounded-md px-4 py-2 text-sm transition-colors"
            >
              {props.secondaryCtaLabel ?? "Book a demo"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
