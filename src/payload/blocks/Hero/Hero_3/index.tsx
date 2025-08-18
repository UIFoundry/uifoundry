"use client";
import React from "react";
import Link from "next/link";
import ThemeMedia from "~/ui/theme-media";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { InfiniteSlider } from "~/ui/motion-primitives/infinite-slider";
import type { Hero_3_Block, Media } from "~/payload-types";

export default function Hero_3(props: Hero_3_Block) {
  const mediaDark = props?.media?.dark as Media | undefined;
  const mediaLight = props?.media?.light as Media | undefined;

  return (
    <section className="relative overflow-hidden">
      {/* spotlight bg */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,var(--color-chart-1),transparent_60%)] opacity-20" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {props.alertLabel && props.alertLink ? (
            <Link
              href={props.alertLink}
              className="bg-background/60 ring-border inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ring-1 backdrop-blur"
            >
              <span className="bg-primary inline-block h-2 w-2 rounded-full" />
              <span className="text-foreground/80">{props.alertLabel}</span>
            </Link>
          ) : null}
          <TextEffect
            preset="fade-in-blur"
            as="h1"
            className="mt-6 text-5xl text-balance md:text-6xl"
          >
            {props.header}
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            delay={0.2}
            className="text-muted-foreground mt-6 text-lg text-balance"
          >
            {props.subheader ?? ""}
          </TextEffect>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel ?? "Try it free"}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={props.secondaryCtaHref ?? "#"}>
                {props.secondaryCtaLabel ?? "Docs"}
              </Link>
            </Button>
          </div>
        </div>

        {/* media framed */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-lg ring-1"
          >
            <ThemeMedia
              className="aspect-[16/9] w-full rounded-2xl object-cover"
              darkSrc={mediaDark?.url ?? undefined}
              lightSrc={mediaLight?.url ?? undefined}
              alt={mediaDark?.alt ?? mediaLight?.alt ?? ""}
              width={1920}
              height={1080}
            />
          </motion.div>
        </div>

        {/* logo slider */}
        <div className="mt-12">
          <InfiniteSlider
            gap={48}
            speed={80}
            pauseOnHover
            reverse={props.logosScrollDirection === "right"}
          >
            {(props.logos && props.logos.length > 0
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
                ]
            ).map((item, idx) => {
              const light = item.media?.light as Media | undefined;
              const dark = item.media?.dark as Media | undefined;
              const pill = (
                <div className="text-muted-foreground/70 bg-background/50 ring-border flex h-12 min-w-40 items-center justify-center rounded-full border px-5 text-sm whitespace-nowrap ring-1 backdrop-blur">
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
                <Link key={idx} href={item.href} className="contents">
                  {pill}
                </Link>
              ) : (
                <div key={idx} className="contents">
                  {pill}
                </div>
              );
            })}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
