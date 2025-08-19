"use client";
import { InfiniteSlider } from "~/ui/motion-primitives/infinite-slider";
import ThemeMedia from "~/ui/theme-media";
import type { Logos_3_Block, Media } from "~/payload-types";

export default function Logos_3(props: Logos_3_Block) {
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
  const split = Math.ceil(list.length / 2);
  const row1 = list.slice(0, split);
  const row2 = list.slice(split);
  const pill = (item: NonNullable<Logos_3_Block["logos"]>[number]) => {
    const light = item.media?.light as Media | undefined;
    const dark = item.media?.dark as Media | undefined;
    const inner = (
      <div className="text-muted-foreground/70 bg-background/60 ring-border flex h-12 min-w-40 items-center justify-center rounded-full border px-5 text-sm ring-1 backdrop-blur">
        {dark?.url || light?.url ? (
          <ThemeMedia
            darkSrc={dark?.url ?? undefined}
            lightSrc={light?.url ?? undefined}
            alt={dark?.alt ?? light?.alt ?? item.label}
            width={96}
            height={32}
            className="h-6 w-auto"
          />
        ) : (
          <>{item.label}</>
        )}
      </div>
    );
    return item.href ? (
      <a key={item.label} href={item.href} className="contents">
        {inner}
      </a>
    ) : (
      <div key={item.label} className="contents">
        {inner}
      </div>
    );
  };
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
        <div className="mt-8 space-y-6">
          <InfiniteSlider gap={48} speed={80} pauseOnHover>
            {row1.map((it) => pill(it))}
          </InfiniteSlider>
          <InfiniteSlider gap={48} speed={60} pauseOnHover reverse>
            {row2.length
              ? row2.map((it) => pill(it))
              : row1.map((it) => pill(it))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
