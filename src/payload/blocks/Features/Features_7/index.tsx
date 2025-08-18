"use client";
import React from "react";
import ThemeMedia from "~/ui/theme-media";
import { motion } from "motion/react";
import { Icon } from "~/ui/icon";
import type { Features_7_Block, Media } from "~/payload-types";

export default function Features_7(props: Features_7_Block) {
  const list = Array.isArray(props.items) ? props.items : [];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{props.header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            {props.subheader}
          </p>
        </div>
        <div className="mt-10 space-y-10">
          {list.map((it, i) => {
            const dark = it.media?.dark as Media | undefined;
            const light = it.media?.light as Media | undefined;
            const reverse = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid items-center gap-6 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  {it.icon ? (
                    <div className="bg-muted/60 mb-3 inline-flex size-9 items-center justify-center rounded-lg">
                      <Icon icon={it.icon ?? "Activity"} />
                    </div>
                  ) : null}
                  <div className="text-xl font-medium">{it.title}</div>
                  {it.description ? (
                    <div className="text-muted-foreground mt-1 text-sm">
                      {it.description}
                    </div>
                  ) : null}
                </div>
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-sm ring-1"
                  >
                    {dark?.url || light?.url ? (
                      <ThemeMedia
                        darkSrc={dark?.url ?? undefined}
                        lightSrc={light?.url ?? undefined}
                        alt={dark?.alt ?? light?.alt ?? it.title ?? ""}
                        width={1200}
                        height={900}
                        className="w-full rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="bg-muted/30 text-muted-foreground flex aspect-[4/3] items-center justify-center text-sm">
                        Add media
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
