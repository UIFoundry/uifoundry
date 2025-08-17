"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
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

export default function Hero_6(props: CommonHeroProps) {
  const mediaDark = props?.media?.dark as Media | undefined;
  const mediaLight = props?.media?.light as Media | undefined;

  return (
    <section className="relative overflow-hidden">
      {/* diagonal grid glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0,transparent_45%,theme(colors.violet.500/.12)_50%,transparent_55%,transparent_100%)] [background-size:20px_20px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,theme(colors.cyan.500/.12),transparent_60%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24">
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
            delay={0.2}
            className="text-muted-foreground mt-6 text-lg text-balance"
          >
            {props.subheader ?? ""}
          </TextEffect>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel ?? "Start free"}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={props.secondaryCtaHref ?? "#"}>
                {props.secondaryCtaLabel ?? "Learn more"}
              </Link>
            </Button>
          </div>
          <motion.hr
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="via-foreground/20 mx-auto mt-10 h-px w-56 border-0 bg-gradient-to-r from-transparent to-transparent"
          />
        </div>
        <div className="relative mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-lg ring-1"
          >
            {mediaDark?.url ? (
              <Image
                src={mediaDark.url}
                alt={mediaDark.alt}
                className="hidden aspect-[16/9] w-full rounded-2xl object-cover dark:block"
                width={1920}
                height={1080}
              />
            ) : null}
            {mediaLight?.url ? (
              <Image
                src={mediaLight.url}
                alt={mediaLight.alt}
                className="aspect-[16/9] w-full rounded-2xl object-cover dark:hidden"
                width={1920}
                height={1080}
              />
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
