import { Icon } from "~/ui/icon";
import type { Contact_7_Block } from "~/payload-types";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_7(props: Contact_7_Block) {
  const list = Array.isArray(props.methods) ? props.methods : [];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              {props.heading}
            </h2>
            {props.subheading ? (
              <p className="text-muted-foreground mt-3">{props.subheading}</p>
            ) : null}
          </div>
          <ul className="space-y-4">
            {list.map((m, i) => (
              <li key={i} className="flex items-center gap-3">
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
                      className="text-foreground hover:underline"
                    >
                      {m.value ?? m.href}
                    </a>
                  ) : (
                    <span className="text-foreground">{m.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
