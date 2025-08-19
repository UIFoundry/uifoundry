import { Icon } from "~/ui/icon";
import type { Contact_8_Block } from "~/payload-types";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_8(props: Contact_8_Block) {
  const list = Array.isArray(props.methods) ? props.methods : [];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-3">{props.subheading}</p>
          ) : null}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {list.map((m, i) => (
            <div key={i} className="bg-muted/30 rounded-xl p-6">
              {m.icon ? (
                <div className="text-muted-foreground mb-2">
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
    </section>
  );
}
