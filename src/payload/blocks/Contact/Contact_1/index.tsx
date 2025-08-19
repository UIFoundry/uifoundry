import { Icon } from "~/ui/icon";
import type { Contact_1_Block } from "~/payload-types";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_1(props: Contact_1_Block) {
  const list = Array.isArray(props.methods) ? props.methods : [];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-3 text-lg">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {list.map((m, i) => (
            <div
              key={i}
              className="bg-background ring-border/50 flex items-start gap-3 rounded-xl border p-6 ring-1"
            >
              {m.icon ? (
                <div className="bg-muted/50 text-muted-foreground flex size-9 items-center justify-center rounded-md">
                  {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion */}
                  <Icon icon={(m.icon ?? "Mail") as IconName} />
                </div>
              ) : null}
              <div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
