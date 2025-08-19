import type { CTA_4_Block } from "~/payload-types";

export default function CTA_4(props: CTA_4_Block) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="h-full w-full bg-[radial-gradient(80%_80%_at_50%_0%,var(--color-chart-1)/12%,transparent)]" />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center">
        {props.kicker ? (
          <div className="text-muted-foreground text-sm">{props.kicker}</div>
        ) : null}
        <h2 className="mt-2 text-4xl font-semibold md:text-5xl">
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
            {props.secondaryCtaLabel ?? "Docs"}
          </a>
        </div>
      </div>
    </section>
  );
}
