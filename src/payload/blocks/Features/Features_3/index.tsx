"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Media } from "~/payload-types";

export default function Features_3({
  header,
  subheader,
  bullets,
  media,
}: {
  header: string;
  subheader?: string;
  bullets?: { title?: string; description?: string }[];
  media?: { dark?: Media | null; light?: Media | null };
}) {
  const dark = media?.dark as Media | undefined;
  const light = media?.light as Media | undefined;
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{subheader}</p>
          <ul className="mt-8 space-y-4">
            {bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 inline-block size-2 rounded-full bg-emerald-500" />
                <div>
                  <div className="text-base font-medium">{b.title}</div>
                  {b.description ? (
                    <div className="text-muted-foreground text-sm">
                      {b.description}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-lg ring-1"
          >
            {dark?.url ? (
              <Image
                src={dark.url}
                alt={dark.alt}
                width={1600}
                height={1200}
                className="hidden w-full rounded-2xl object-cover dark:block"
              />
            ) : null}
            {light?.url ? (
              <Image
                src={light.url}
                alt={light.alt}
                width={1600}
                height={1200}
                className="w-full rounded-2xl object-cover dark:hidden"
              />
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
