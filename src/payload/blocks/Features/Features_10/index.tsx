"use client";
import React from "react";
import { InfiniteSlider } from "~/ui/motion-primitives/infinite-slider";
import { Icon } from "~/ui/icon";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Features_10({
  header,
  subheader,
  items,
  scrollDirection,
}: {
  header: string;
  subheader?: string;
  items?: { title?: string; description?: string; icon?: string }[];
  scrollDirection?: "left" | "right";
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{subheader}</p>
        </div>
        <div className="mt-8">
          <InfiniteSlider
            pauseOnHover
            speed={100}
            className="py-2"
            reverse={scrollDirection === "right"}
          >
            {(items ?? []).map((it, i) => (
              <div
                key={i}
                className="ring-border/50 bg-background/60 mx-2 w-72 shrink-0 rounded-2xl border p-5 ring-1 backdrop-blur"
              >
                {it.icon ? (
                  <div className="bg-muted/60 mb-3 inline-flex size-9 items-center justify-center rounded-lg">
                    <Icon icon={(it.icon ?? "Activity") as IconName} />
                  </div>
                ) : null}
                <div className="text-base font-medium">{it.title}</div>
                {it.description ? (
                  <div className="text-muted-foreground mt-1 text-sm">
                    {it.description}
                  </div>
                ) : null}
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
