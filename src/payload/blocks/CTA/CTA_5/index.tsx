import type { CTA_5_Block } from "~/payload-types";

export default function CTA_5(props: CTA_5_Block) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="bg-background/60 ring-border rounded-xl p-8 shadow-sm ring-1 md:p-12">
          {props.kicker ? (
            <div className="text-muted-foreground text-sm">{props.kicker}</div>
          ) : null}
          <div className="mt-1 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                {props.header}
              </h2>
              {props.subheader ? (
                <p className="text-muted-foreground mt-2 text-base">
                  {props.subheader}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
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
                {props.secondaryCtaLabel ?? "Learn more"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
