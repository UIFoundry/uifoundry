"use client";
import React from "react";
import { Icon } from "~/ui/icon";
import { motion } from "motion/react";

type IconName = Parameters<typeof Icon>[0]["icon"];

type FeatureItem = {
  title?: string;
  description?: string;
  icon?: string;
  linkLabel?: string;
  linkHref?: string;
};

export default function Features_2({
  header,
  subheader,
  features,
}: {
  header: string;
  subheader?: string;
  features?: FeatureItem[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{subheader}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features?.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="ring-border/50 bg-background/60 group relative rounded-2xl border p-5 ring-1 backdrop-blur"
            >
              {f.icon ? (
                <div className="bg-muted/60 mb-4 inline-flex size-10 items-center justify-center rounded-lg">
                  <Icon icon={(f.icon ?? "Activity") as IconName} />
                </div>
              ) : null}
              <h3 className="text-xl font-medium">{f.title}</h3>
              {f.description ? (
                <p className="text-muted-foreground mt-2 text-sm">
                  {f.description}
                </p>
              ) : null}
              {f.linkHref && f.linkLabel ? (
                <a
                  href={f.linkHref}
                  className="text-foreground/80 hover:text-foreground mt-4 inline-block text-sm"
                >
                  {f.linkLabel}
                </a>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
