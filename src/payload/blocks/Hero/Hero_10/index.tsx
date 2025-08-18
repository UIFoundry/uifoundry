"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import type { Hero_10_Block } from "~/payload-types";

export default function Hero_10(props: Hero_10_Block) {
  const scale = Math.max(10, Math.min(400, props.gifScale ?? 100));
  const backgroundImage = props.gifUrl
    ? `url(${props.gifUrl})`
    : `linear-gradient(135deg, ${props.fallbackFrom ?? "#7c3aed"}, ${props.fallbackTo ?? "#06b6d4"})`;

  return (
    <section className="relative overflow-hidden">
      {/* soft bg */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,var(--color-chart-1),transparent_60%)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_35%_at_50%_90%,var(--color-chart-2),transparent_60%)] opacity-10" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-semibold tracking-tight text-balance md:text-7xl"
            style={{
              backgroundImage,
              backgroundSize: `${scale}% auto`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {props.header}
          </motion.h1>

          <TextEffect
            per="line"
            preset="fade-in-blur"
            delay={0.12}
            className="text-muted-foreground mx-auto mt-6 max-w-prose text-lg"
          >
            {props.subheader ?? ""}
          </TextEffect>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel ?? "Get Started"}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={props.secondaryCtaHref ?? "#"}>
                {props.secondaryCtaLabel ?? "View Components"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
