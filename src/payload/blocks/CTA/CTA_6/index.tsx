import type { CTA_6_Block } from "~/payload-types";

export default function CTA_6(props: CTA_6_Block) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              {props.kicker ? (
                <div className="text-muted-foreground text-sm">
                  {props.kicker}
                </div>
              ) : null}
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
                {props.header}
              </h2>
              {props.subheader ? (
                <p className="text-muted-foreground mt-3 text-base md:text-lg">
                  {props.subheader}
                </p>
              ) : null}
            </div>
            <div className="justify-self-end">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={props.primaryCtaHref ?? "#"}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-md px-4 py-2 text-sm transition-colors"
                >
                  {props.primaryCtaLabel ?? "Start now"}
                </a>
                <a
                  href={props.secondaryCtaHref ?? "#"}
                  className="hover:text-foreground text-muted-foreground inline-flex rounded-md px-4 py-2 text-sm transition-colors"
                >
                  {props.secondaryCtaLabel ?? "Read docs"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
