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
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  media?: { dark?: Media | null; light?: Media | null };
};

export default function Hero_8(props: CommonHeroProps) {
  const mediaDark = props?.media?.dark as Media | undefined;
  const mediaLight = props?.media?.light as Media | undefined;

  return (
    <section className="relative overflow-hidden">
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
                {props.primaryCtaLabel ?? "Get CLI"}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={props.secondaryCtaHref ?? "#"}>
                {props.secondaryCtaLabel ?? "Read docs"}
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="ring-border/50 bg-background relative overflow-hidden rounded-2xl border shadow-2xl ring-1"
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
            {/* subtle vignette */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)] ring-1 ring-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
