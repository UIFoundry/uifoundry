import type { CTA_7_Block } from "~/payload-types";

export default function CTA_7(props: CTA_7_Block) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="bg-muted/40 rounded-xl border px-6 py-5">
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              {props.kicker ? (
                <div className="text-muted-foreground text-xs">
                  {props.kicker}
                </div>
              ) : null}
              <h3 className="text-xl font-semibold md:text-2xl">
                {props.header}
              </h3>
              {props.subheader ? (
                <p className="text-muted-foreground text-sm">
                  {props.subheader}
                </p>
              ) : null}
            </div>
            <div className="flex gap-3 self-stretch md:self-auto">
              <a
                href={props.primaryCtaHref ?? "#"}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex flex-1 justify-center rounded-md px-3 py-2 text-sm transition-colors md:flex-none"
              >
                {props.primaryCtaLabel ?? "Get started"}
              </a>
              <a
                href={props.secondaryCtaHref ?? "#"}
                className="hover:text-foreground text-muted-foreground inline-flex flex-1 justify-center rounded-md px-3 py-2 text-sm transition-colors md:flex-none"
              >
                {props.secondaryCtaLabel ?? "Talk to us"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
