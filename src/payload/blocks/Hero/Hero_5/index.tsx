"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { ProgressiveBlur } from "~/ui/motion-primitives/progressive-blur";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import type { Media } from "~/payload-types";

type CommonHeroProps = {
  header: string;
  subheader?: string;
  alertLabel?: string;
  alertLink?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  media?: { dark?: Media | null; light?: Media | null };
};

export default function Hero_5(props: CommonHeroProps) {
  const mediaDark = props?.media?.dark as Media | undefined;
  const mediaLight = props?.media?.light as Media | undefined;

  return (
    <section className="relative overflow-hidden">
      {/* floating shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-24 left-[5%] h-24 w-24 -rotate-12 rounded-xl bg-violet-500/30 blur-md"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="absolute top-10 right-[8%] h-40 w-40 rotate-6 rounded-full bg-cyan-500/30 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="absolute bottom-10 left-1/4 h-52 w-52 -rotate-3 rounded-[2rem] bg-pink-500/20 blur-xl"
        />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
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
            delay={0.2}
            className="text-muted-foreground mt-6 text-lg text-balance"
          >
            {props.subheader ?? ""}
          </TextEffect>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel ?? "Explore"}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={props.secondaryCtaHref ?? "#"}>
                {props.secondaryCtaLabel ?? "Contact sales"}
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-xl ring-1"
          >
            {mediaDark?.url ? (
              <Image
                src={mediaDark.url}
                alt={mediaDark.alt}
                className="hidden aspect-[4/3] w-full rounded-2xl object-cover dark:block"
                width={1600}
                height={1200}
              />
            ) : null}
            {mediaLight?.url ? (
              <Image
                src={mediaLight.url}
                alt={mediaLight.alt}
                className="aspect-[4/3] w-full rounded-2xl object-cover dark:hidden"
                width={1600}
                height={1200}
              />
            ) : null}
            <ProgressiveBlur
              className="absolute inset-0"
              direction="bottom"
              blurLayers={10}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
