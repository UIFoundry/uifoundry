import { Icon } from "~/ui/icon";
import type { Contact_5_Block } from "~/payload-types";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_5(props: Contact_5_Block) {
  const list = Array.isArray(props.methods) ? props.methods : [];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-3 text-lg">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {list.map((m, i) => (
            <div
              key={i}
              className="ring-border/50 rounded-xl border p-5 ring-1"
            >
              <div className="flex items-center gap-3">
                {m.icon ? (
                  <div className="bg-muted/50 text-muted-foreground flex size-9 items-center justify-center rounded-md">
                    {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */}
                    <Icon icon={(m.icon ?? "Mail") as IconName} />
                  </div>
                ) : null}
                <div className="text-muted-foreground text-sm">{m.label}</div>
              </div>
              <div className="mt-2">
                {m.href ? (
                  <a href={m.href} className="text-foreground hover:underline">
                    {m.value ?? m.href}
                  </a>
                ) : (
                  <div className="text-foreground">{m.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
