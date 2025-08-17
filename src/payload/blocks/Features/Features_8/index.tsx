"use client";
import React from "react";
import Image from "next/image";
import type { Media } from "~/payload-types";

function isMedia(x: unknown): x is Media {
  return (
    typeof x === "object" &&
    x !== null &&
    "url" in (x as Record<string, unknown>)
  );
}

export default function Features_8({
  header,
  subheader,
  logos,
}: {
  header: string;
  subheader?: string;
  logos?: { name?: string; href?: string; logo?: Media | string | number }[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{subheader}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {logos?.map((l, i) => {
            const raw = l.logo;
            const url = isMedia(raw) ? raw.url : undefined;
            const img = url ? (
              <Image
                src={url}
                alt={l.name ?? ""}
                width={160}
                height={48}
                className="h-8 w-auto opacity-80 dark:opacity-90"
              />
            ) : (
              <span className="text-foreground/60 text-sm">{l.name}</span>
            );
            return l.href ? (
              <a
                key={i}
                href={l.href}
                className="flex items-center justify-center"
              >
                {img}
              </a>
            ) : (
              <div key={i} className="flex items-center justify-center">
                {img}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
