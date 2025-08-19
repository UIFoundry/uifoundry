"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "~/ui/button";
import ThemeMedia from "~/ui/theme-media";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";
import type { Hero_2_Block } from "~/payload-types";

export default function Hero_2(props: Hero_2_Block) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 -z-20">
        {props.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={props.videoUrl} type="video/mp4" />
          </video>
        ) : null}

        <ThemeMedia
          className="h-full w-full object-cover"
          lightSrc={
            typeof props.fallbackImage?.light === "object" &&
            props.fallbackImage?.light &&
            "url" in props.fallbackImage.light
              ? (props.fallbackImage.light.url ?? undefined)
              : undefined
          }
          darkSrc={
            typeof props.fallbackImage?.dark === "object" &&
            props.fallbackImage?.dark &&
            "url" in props.fallbackImage.dark
              ? (props.fallbackImage.dark.url ?? undefined)
              : undefined
          }
          alt="Hero background"
          width={1920}
          height={1080}
        />
      </div>

      {/* Overlay */}
      {props.enableOverlay && (
        <div className="absolute inset-0 -z-10 bg-black/50" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <AnimatedGroup
          className="space-y-8"
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            },
          }}
        >
          {/* Eyebrow */}
          {props.eyebrow && (
            <div className="bg-primary/20 text-primary-foreground inline-flex items-center rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {props.eyebrow}
            </div>
          )}

          {/* Header */}
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="text-5xl font-bold text-white md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {props.header}
          </TextEffect>

          {/* Subheader */}
          {props.subheader && (
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.3}
              as="p"
              className="mx-auto max-w-3xl text-xl text-white/90 md:text-2xl"
            >
              {props.subheader}
            </TextEffect>
          )}

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="px-8 py-4 text-lg">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel}
              </Link>
            </Button>

            {props.secondaryCtaLabel && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 px-8 py-4 text-lg text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link
                  href={props.secondaryCtaHref ?? "#"}
                  className="flex items-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  {props.secondaryCtaLabel}
                </Link>
              </Button>
            )}
          </div>
        </AnimatedGroup>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-12 w-6 items-end justify-center rounded-full border-2 border-white/30 p-2">
          <div className="h-3 w-1 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
