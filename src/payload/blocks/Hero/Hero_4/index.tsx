"use client";
import React from "react";
import Link from "next/link";
import ThemeMedia from "~/ui/theme-media";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import type { Hero_4_Block, Media } from "~/payload-types";

export default function Hero_4(props: Hero_4_Block) {
  const mediaDark = props?.media?.dark as Media | undefined;
  const mediaLight = props?.media?.light as Media | undefined;

  // simple hover-resize dynamic island
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <TextEffect
            preset="fade-in-blur"
            as="h1"
            className="text-5xl text-balance md:text-6xl"
          >
            {props.header}
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            delay={0.15}
            className="text-muted-foreground mt-6 text-lg text-balance"
          >
            {props.subheader ?? ""}
          </TextEffect>

          {/* Dynamic Island inspired CTA */}
          <div className="relative mx-auto mt-8 flex max-w-md justify-center">
            <motion.div
              initial={{ width: 160, borderRadius: 9999, opacity: 0, y: 20 }}
              whileInView={{ width: 560, opacity: 1, y: 0 }}
              whileHover={{ width: 640 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", duration: 1, bounce: 0.35 }}
              className="ring-border/50 bg-background/70 group relative flex items-center gap-3 overflow-hidden rounded-full border px-4 py-2 text-sm shadow-lg ring-1 backdrop-blur"
            >
              <span
                className="text-primary-foreground inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${props.gradientStart ?? "#7c3aed"}, ${props.gradientEnd ?? "#06b6d4"})`,
                }}
              >
                AI
              </span>
              <span className="text-foreground/90 truncate">
                {props.alertLabel ?? "Now with Dynamic CTA"}
              </span>
              <Link
                href={props.primaryCtaHref ?? "#"}
                className="bg-foreground text-background hover:bg-foreground/90 ml-auto rounded-full px-3 py-1 transition-colors"
              >
                {props.primaryCtaLabel ?? "Join the beta"}
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel ?? "Join the beta"}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={props.secondaryCtaHref ?? "#"}>
                {props.secondaryCtaLabel ?? "See docs"}
              </Link>
            </Button>
          </div>
        </div>

        {/* framed screenshot below */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-lg ring-1"
          >
            <ThemeMedia
              darkSrc={mediaDark?.url ?? undefined}
              lightSrc={mediaLight?.url ?? undefined}
              alt={mediaDark?.alt ?? mediaLight?.alt ?? ""}
              className="aspect-[16/9] w-full rounded-2xl object-cover"
              width={1920}
              height={1080}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
