"use client";

import React from "react";
import Link from "next/link";
import { Button } from "~/ui/button";
import ThemeMedia from "~/ui/theme-media";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";
import type { Hero_3_Block } from "~/payload-types";

export default function Hero_3(props: Hero_3_Block) {
  return (
    <section className="overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
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
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            {/* Header */}
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="text-4xl font-bold tracking-tight lg:text-6xl"
            >
              {props.header}
            </TextEffect>

            {/* Subheader */}
            {props.subheader && (
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.2}
                as="p"
                className="text-muted-foreground text-xl lg:text-2xl"
              >
                {props.subheader}
              </TextEffect>
            )}

            {/* Features List */}
            {props.features && props.features.length > 0 && (
              <div className="space-y-3">
                {props.features.map(
                  (feature: { text: string }, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-primary text-lg font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
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
                  className="px-8 py-4 text-lg"
                >
                  <Link href={props.secondaryCtaHref ?? "#"}>
                    {props.secondaryCtaLabel}
                  </Link>
                </Button>
              )}
            </div>
          </AnimatedGroup>

          {/* Right Image */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    delayChildren: 0.4,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  x: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <div className="relative">
              <div className="from-primary/20 to-primary/10 absolute -inset-4 rounded-3xl bg-gradient-to-r blur-2xl" />
              <div className="bg-background relative overflow-hidden rounded-2xl border shadow-2xl">
                <ThemeMedia
                  className="aspect-[4/3] h-auto w-full object-cover"
                  lightSrc={
                    typeof props.media?.light === "object" && props.media.light
                      ? props.media.light.url
                      : undefined
                  }
                  darkSrc={
                    typeof props.media?.dark === "object" && props.media.dark
                      ? props.media.dark.url
                      : undefined
                  }
                  alt={
                    (typeof props.media?.dark === "object" &&
                    props.media.dark &&
                    "alt" in props.media.dark &&
                    typeof props.media.dark.alt === "string"
                      ? props.media.dark.alt
                      : undefined) ??
                    (typeof props.media?.light === "object" &&
                    props.media.light &&
                    "alt" in props.media.light &&
                    typeof props.media.light.alt === "string"
                      ? props.media.light.alt
                      : undefined) ??
                    "Hero Image"
                  }
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}
