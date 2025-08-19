import { Icon } from "~/ui/icon";
type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Contact_10({
  heading,
  subheading,
  methods,
}: {
  heading: string;
  subheading?: string | null;
  methods?: {
    label: string;
    value?: string | null;
    href?: string | null;
    icon?: string | null;
  }[];
}) {
  const list = Array.isArray(methods) ? methods : [];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
          {subheading ? (
            <p className="text-muted-foreground mt-3">{subheading}</p>
          ) : null}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {list.map((m, i) => (
            <div key={i} className="rounded-xl border p-6 text-center">
              {m.icon ? (
                <div className="bg-muted/50 text-muted-foreground mx-auto mb-2 flex size-9 items-center justify-center rounded-md">
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
