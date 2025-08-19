import type { CTA_8_Block } from "~/payload-types";

export default function CTA_8(props: CTA_8_Block) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        {props.kicker ? (
          <div className="bg-accent text-accent-foreground inline-flex rounded-full px-3 py-1 text-xs">
            {props.kicker}
          </div>
        ) : null}
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
          {props.header}
        </h2>
        {props.subheader ? (
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            {props.subheader}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={props.primaryCtaHref ?? "#"}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-md px-4 py-2 text-sm transition-colors"
          >
            {props.primaryCtaLabel ?? "Start"}
          </a>
          <a
            href={props.secondaryCtaHref ?? "#"}
            className="hover:text-foreground text-muted-foreground inline-flex rounded-md px-4 py-2 text-sm transition-colors"
          >
            {props.secondaryCtaLabel ?? "See features"}
          </a>
        </div>
      </div>
    </section>
  );
}
