"use client";
import React from "react";
import { motion } from "motion/react";
import { Icon } from "~/ui/icon";

type IconName = Parameters<typeof Icon>[0]["icon"];

export default function Features_4({
  header,
  subheader,
  items,
}: {
  header: string;
  subheader?: string;
  items?: {
    title?: string;
    description?: string;
    icon?: string;
    href?: string;
    colSpan?: number;
    rowSpan?: number;
  }[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{subheader}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">
          {items?.map((item, i) => {
            const c = Math.min(2, Math.max(1, item.colSpan ?? 1));
            const r = Math.min(2, Math.max(1, item.rowSpan ?? 1));
            return (
              <motion.a
                key={i}
                href={item.href ?? "#"}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`ring-border/50 bg-background/60 relative rounded-2xl border p-5 ring-1 backdrop-blur ${c === 2 ? "md:col-span-2" : "md:col-span-1"} ${r === 2 ? "md:row-span-2" : "md:row-span-1"}`}
              >
                {item.icon ? (
                  <div className="bg-muted/60 mb-3 inline-flex size-9 items-center justify-center rounded-lg">
                    <Icon icon={(item.icon ?? "Activity") as IconName} />
                  </div>
                ) : null}
                <div className="text-lg font-medium">{item.title}</div>
                {item.description ? (
                  <div className="text-muted-foreground mt-1 text-sm">
                    {item.description}
                  </div>
                ) : null}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
