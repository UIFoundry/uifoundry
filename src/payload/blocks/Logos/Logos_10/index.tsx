"use client";
import ThemeMedia from "~/ui/theme-media";
import type { Logos_10_Block, Media } from "~/payload-types";

export default function Logos_10(props: Logos_10_Block) {
  const list = Array.isArray(props.logos)
    ? props.logos
    : [
        { label: "GitHub", href: "#" },
        { label: "OpenAI", href: "#" },
        { label: "Stripe", href: "#" },
        { label: "Vercel", href: "#" },
      ];
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
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
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {list.map((item, idx) => {
            const light = item.media?.light as Media | undefined;
            const dark = item.media?.dark as Media | undefined;
            const card = (
              <div className="bg-background ring-border/50 flex h-28 items-center justify-center rounded-xl border ring-1">
                {dark?.url || light?.url ? (
                  <ThemeMedia
                    darkSrc={dark?.url ?? undefined}
                    lightSrc={light?.url ?? undefined}
                    alt={dark?.alt ?? light?.alt ?? item.label}
                    width={160}
                    height={64}
                    className="h-10 w-auto"
                  />
                ) : (
                  <span className="text-muted-foreground/70 text-sm">
                    {item.label}
                  </span>
                )}
              </div>
            );
            return item.href ? (
              <a key={idx} href={item.href} className="block">
                {card}
              </a>
            ) : (
              <div key={idx}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
