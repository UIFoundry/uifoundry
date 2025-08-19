import { Icon } from "~/ui/icon";
import type { Contact_4_Block } from "~/payload-types";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_4(props: Contact_4_Block) {
  const list = Array.isArray(props.methods) ? props.methods : [];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="ring-border/50 rounded-2xl border p-8 ring-1">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              {props.heading}
            </h2>
            {props.subheading ? (
              <p className="text-muted-foreground mt-3">{props.subheading}</p>
            ) : null}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {list.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                {m.icon ? (
                  <div className="bg-muted/50 text-muted-foreground flex size-9 items-center justify-center rounded-md">
                    {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */}
                    <Icon icon={(m.icon ?? "Mail") as IconName} />
                  </div>
                ) : null}
                <div className="text-muted-foreground text-sm">{m.label}</div>
                {m.href ? (
                  <a
                    href={m.href}
                    className="text-foreground font-medium hover:underline"
                  >
                    {m.value ?? m.href}
                  </a>
                ) : (
                  <div className="text-foreground font-medium">{m.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
