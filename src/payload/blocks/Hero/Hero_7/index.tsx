"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";

type CommonHeroProps = {
  header: string;
  subheader?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function Hero_7(props: CommonHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-tr from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-5xl text-balance text-transparent md:text-6xl"
        >
          {props.header}
        </motion.h1>
        <TextEffect
          per="line"
          preset="fade-in-blur"
          delay={0.15}
          className="text-muted-foreground mx-auto mt-6 max-w-prose text-lg text-balance"
        >
          {props.subheader ?? ""}
        </TextEffect>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-xl">
            <Link href={props.primaryCtaHref ?? "#"}>
              {props.primaryCtaLabel ?? "Download"}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="rounded-xl">
            <Link href={props.secondaryCtaHref ?? "#"}>
              {props.secondaryCtaLabel ?? "Star on GitHub"}
            </Link>
          </Button>
        </div>
        {/* subtle moving glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,theme(colors.cyan.400/.3),transparent)] blur-2xl"
        />
      </div>
    </section>
  );
}
