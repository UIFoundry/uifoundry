"use client";
import ThemeMedia from "~/ui/theme-media";
import type { Logos_8_Block, Media } from "~/payload-types";

export default function Logos_8(props: Logos_8_Block) {
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
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-foreground/80 text-sm font-medium tracking-wider">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-2 text-base">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <div className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((item, idx) => {
            const light = item.media?.light as Media | undefined;
            const dark = item.media?.dark as Media | undefined;
            const el =
              dark?.url || light?.url ? (
                <ThemeMedia
                  darkSrc={dark?.url ?? undefined}
                  lightSrc={light?.url ?? undefined}
                  alt={dark?.alt ?? light?.alt ?? item.label}
                  width={160}
                  height={48}
                  className="h-8 w-auto opacity-80"
                />
              ) : (
                <span className="text-muted-foreground/70 text-sm">
                  {item.label}
                </span>
              );
            return item.href ? (
              <a key={idx} href={item.href} className="flex items-center gap-4">
                {el}
              </a>
            ) : (
              <div key={idx} className="flex items-center gap-4">
                {el}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
