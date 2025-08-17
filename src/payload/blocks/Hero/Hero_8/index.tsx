"use client";
import React from "react";
import Link from "next/link";
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
  videoUrl?: string;
  variant?: "center" | "left";
  overlayOpacity?: number;
  media?: { dark?: Media | null; light?: Media | null };
};

export default function Hero_8(props: CommonHeroProps) {
  const alignCenter = (props.variant ?? "center") === "center";
  const overlay = Math.min(1, Math.max(0, props.overlayOpacity ?? 0.4));

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden md:min-h-[85vh]">
      {/* Background video */}
      {props.videoUrl ? (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src={props.videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/30 to-cyan-600/30" />
      )}
      {/* Overlay */}
      <div
        className="bg-background absolute inset-0 -z-10"
        style={{ opacity: overlay }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <div
          className={
            alignCenter
              ? "mx-auto max-w-3xl text-center"
              : "max-w-2xl text-left"
          }
        >
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
            className={
              alignCenter
                ? "text-muted-foreground mx-auto mt-6 max-w-prose text-lg text-balance"
                : "text-muted-foreground mt-6 max-w-prose text-lg text-balance"
            }
          >
            {props.subheader ?? ""}
          </TextEffect>
          <div
            className={
              alignCenter
                ? "mt-8 flex items-center justify-center gap-3"
                : "mt-8 flex items-center gap-3"
            }
          >
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
      </div>

      {/* subtle vignette edges */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)]"
      />
    </section>
  );
}
