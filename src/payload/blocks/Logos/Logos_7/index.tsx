import type { Logos_7_Block } from "~/payload-types";

export default function Logos_7(props: Logos_7_Block) {
  const list = Array.isArray(props.logos)
    ? props.logos
    : [
        { label: "Nvidia", href: "#" },
        { label: "Column", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "Nike", href: "#" },
        { label: "Lemon Squeezy", href: "#" },
        { label: "Laravel", href: "#" },
      ];
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-foreground/80 text-sm font-medium tracking-wider">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-2 text-base">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <div className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((item, idx) =>
            item.href ? (
              <a
                key={idx}
                href={item.href}
                className="text-muted-foreground/70 text-sm"
              >
                {item.label}
              </a>
            ) : (
              <div key={idx} className="text-muted-foreground/70 text-sm">
                {item.label}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
