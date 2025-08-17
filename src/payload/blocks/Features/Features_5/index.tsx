"use client";
import React from "react";
import { Icon } from "~/ui/icon";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Features_5({
  header,
  subheader,
  steps,
}: {
  header: string;
  subheader?: string;
  steps?: { title?: string; description?: string; icon?: string }[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{subheader}</p>
        </div>
        <ol className="relative mt-10 space-y-8 border-l pl-6">
          {steps?.map((s, i) => (
            <li key={i} className="relative">
              <span className="bg-foreground text-background absolute top-1 -left-[11px] inline-flex size-5 items-center justify-center rounded-full">
                {i + 1}
              </span>
              {s.icon ? (
                <div className="bg-muted/60 mb-2 inline-flex size-9 items-center justify-center rounded-lg">
                  <Icon icon={(s.icon ?? "Activity") as IconName} />
                </div>
              ) : null}
              <div className="text-lg font-medium">{s.title}</div>
              {s.description ? (
                <div className="text-muted-foreground text-sm">
                  {s.description}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
