import { Icon } from "~/ui/icon";
import type { Contact_2_Block } from "~/payload-types";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_2(props: Contact_2_Block) {
  const list = Array.isArray(props.methods) ? props.methods : [];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold md:text-5xl">
              {props.heading}
            </h2>
            {props.subheading ? (
              <p className="text-muted-foreground mt-3 text-lg">
                {props.subheading}
              </p>
            ) : null}
          </div>
          <div className="space-y-4">
            {list.map((m, i) => (
              <div
                key={i}
                className="bg-background ring-border/50 flex items-center gap-3 rounded-xl border p-5 ring-1"
              >
                {m.icon ? (
                  <div className="bg-muted/50 text-muted-foreground flex size-9 items-center justify-center rounded-md">
                    {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */}
                    <Icon icon={(m.icon ?? "Mail") as IconName} />
                  </div>
                ) : null}
                <div className="flex-1">
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
                {m.href ? (
                  <a
                    className="text-muted-foreground text-sm hover:underline"
                    href={m.href}
                  >
                    Open
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
