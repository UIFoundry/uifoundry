"use client";
import ThemeMedia from "~/ui/theme-media";
import type { Logos_9_Block, Media } from "~/payload-types";

export default function Logos_9(props: Logos_9_Block) {
  const list = Array.isArray(props.logos)
    ? props.logos
    : [
        { label: "Nvidia", href: "#" },
        { label: "Column", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "Nike", href: "#" },
        { label: "Lemon Squeezy", href: "#" },
        { label: "Laravel", href: "#" },
        { label: "Lilly", href: "#" },
        { label: "OpenAI", href: "#" },
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {list.map((item, idx) => {
            const light = item.media?.light as Media | undefined;
            const dark = item.media?.dark as Media | undefined;
            const pill = (
              <div className="text-muted-foreground/70 bg-background/60 ring-border inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm ring-1">
                {dark?.url || light?.url ? (
                  <ThemeMedia
                    darkSrc={dark?.url ?? undefined}
                    lightSrc={light?.url ?? undefined}
                    alt={dark?.alt ?? light?.alt ?? item.label}
                    width={96}
                    height={32}
                    className="h-6 w-auto"
                  />
                ) : null}
                <span>{item.label}</span>
              </div>
            );
            return item.href ? (
              <a key={idx} href={item.href} className="block">
                {pill}
              </a>
            ) : (
              <div key={idx}>{pill}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
