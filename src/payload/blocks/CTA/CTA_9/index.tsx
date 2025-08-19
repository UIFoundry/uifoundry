import type { CTA_9_Block } from "~/payload-types";

export default function CTA_9(props: CTA_9_Block) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="h-full w-full bg-[radial-gradient(60%_60%_at_10%_0%,var(--color-chart-2)/12%,transparent)]" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="bg-background/70 rounded-2xl border p-10 backdrop-blur">
          <div className="text-center">
            {props.kicker ? (
              <div className="text-muted-foreground text-sm">
                {props.kicker}
              </div>
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
                {props.primaryCtaLabel ?? "Try free"}
              </a>
              <a
                href={props.secondaryCtaHref ?? "#"}
                className="hover:text-foreground text-muted-foreground inline-flex rounded-md px-4 py-2 text-sm transition-colors"
              >
                {props.secondaryCtaLabel ?? "See pricing"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
