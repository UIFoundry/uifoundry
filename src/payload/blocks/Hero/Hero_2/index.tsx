"use client";
import React from "react";
import Link from "next/link";
import ThemeMedia from "~/ui/theme-media";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";
import type { Hero_2_Block, Media } from "~/payload-types";
import { cn } from "~/styles/utils";

export default function Hero_2(props: Hero_2_Block) {
  const mediaDark = props?.media?.dark as Media | undefined;
  const mediaLight = props?.media?.light as Media | undefined;

  return (
    <section className="relative overflow-hidden">
      {/* background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100, y: -80 }}
          animate={{ opacity: 0.6, scale: 1, x: 0, y: 0 }}
          transition={{ type: "spring", duration: 1.8, bounce: 0.25 }}
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--color-chart-1),transparent)] opacity-25 blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 120, y: 120 }}
          animate={{ opacity: 0.5, scale: 1, x: 0, y: 0 }}
          transition={{
            type: "spring",
            duration: 1.6,
            bounce: 0.3,
            delay: 0.1,
          }}
          className="absolute -right-24 -bottom-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,var(--color-chart-2),transparent)] opacity-20 blur-2xl"
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="text-left">
          <AnimatedGroup preset="blur-slide" className="space-y-6">
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
              speedSegment={0.35}
              as="h1"
              className="text-left text-5xl md:text-6xl"
            >
              {props.header}
            </TextEffect>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              delay={0.2}
              className="text-muted-foreground max-w-prose text-left text-lg"
            >
              {props.subheader ?? ""}
            </TextEffect>
            <div className="flex flex-col items-start justify-start gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl">
                <Link href={props.primaryCtaHref ?? "#"}>
                  {props.primaryCtaLabel ?? "Get Started"}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-xl">
                <Link href={props.secondaryCtaHref ?? "#"}>
                  {props.secondaryCtaLabel ?? "Book a demo"}
                </Link>
              </Button>
            </div>
          </AnimatedGroup>
        </div>
        <div className="relative">
          <div className="from-chart-1/10 to-chart-2/10 absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr blur-xl" />
          <motion.div
            initial={{ rotate: -2, y: 24, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.2,
              bounce: 0.35,
              delay: 0.1,
            }}
            className={cn(
              "ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-lg ring-1",
            )}
          >
            <ThemeMedia
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              darkSrc={mediaDark?.url ?? undefined}
              lightSrc={mediaLight?.url ?? undefined}
              alt={mediaDark?.alt ?? mediaLight?.alt ?? ""}
              width={1600}
              height={1200}
            />
            {/* gradient border shine */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)] ring-1 ring-white/10 ring-inset" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
