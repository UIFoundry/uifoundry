import type { CTA_3_Block } from "~/payload-types";

export default function CTA_3(props: CTA_3_Block) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="bg-muted/50 rounded-2xl border p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
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
            <div className="flex flex-col items-stretch justify-center gap-3 md:items-end">
              <a
                href={props.primaryCtaHref ?? "#"}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex justify-center rounded-md px-4 py-2 text-sm transition-colors"
              >
                {props.primaryCtaLabel ?? "Get started"}
              </a>
              <a
                href={props.secondaryCtaHref ?? "#"}
                className="hover:text-foreground text-muted-foreground inline-flex justify-center rounded-md px-4 py-2 text-sm transition-colors"
              >
                {props.secondaryCtaLabel ?? "Contact sales"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
