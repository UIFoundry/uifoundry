"use client";
import { InfiniteSlider } from "~/ui/motion-primitives/infinite-slider";
import ThemeMedia from "~/ui/theme-media";
import type { Logos_6_Block, Media } from "~/payload-types";

export default function Logos_6(props: Logos_6_Block) {
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
        <div className="mt-8">
          <InfiniteSlider gap={36} speed={90} pauseOnHover>
            {list.map((item, idx) => {
              const light = item.media?.light as Media | undefined;
              const dark = item.media?.dark as Media | undefined;
              return (
                <div
                  key={idx}
                  className="text-muted-foreground/70 flex h-10 min-w-36 items-center justify-center px-3 text-sm"
                >
                  {dark?.url || light?.url ? (
                    <ThemeMedia
                      darkSrc={dark?.url ?? undefined}
                      lightSrc={light?.url ?? undefined}
                      alt={dark?.alt ?? light?.alt ?? item.label}
                      width={120}
                      height={32}
                      className="h-6 w-auto"
                    />
                  ) : (
                    <>{item.label}</>
                  )}
                </div>
              );
            })}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
