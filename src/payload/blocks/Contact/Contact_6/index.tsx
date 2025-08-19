import { Icon } from "~/ui/icon";
import type { Contact_6_Block } from "~/payload-types";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_6(props: Contact_6_Block) {
  const list = Array.isArray(props.methods) ? props.methods : [];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-3">{props.subheading}</p>
          ) : null}
        </div>
        <div className="ring-border/50 mt-8 divide-y rounded-xl border ring-1">
          {list.map((m, i) => (
            <div key={i} className="flex items-center gap-3 p-5">
              {m.icon ? (
                <div className="bg-muted/50 text-muted-foreground flex size-9 items-center justify-center rounded-md">
                  {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */}
                  <Icon icon={(m.icon ?? "Mail") as IconName} />
                </div>
              ) : null}
              <div className="text-muted-foreground text-sm">{m.label}</div>
              <div className="ml-auto">
                {m.href ? (
                  <a href={m.href} className="text-foreground hover:underline">
                    {m.value ?? m.href}
                  </a>
                ) : (
                  <span className="text-foreground">{m.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
