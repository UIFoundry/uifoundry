"use client";

import React from "react";
import Link from "next/link";
import { Button } from "~/ui/button";
import { Card } from "~/ui/card";
import { Icon } from "~/ui/icon";
import ThemeMedia from "~/ui/theme-media";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";
import type { ValueProposition_1_Block } from "~/payload-types";

export default function ValueProposition_1(props: ValueProposition_1_Block) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background Image */}
      {props.backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <ThemeMedia
            className="h-full w-full object-cover opacity-5"
            lightSrc={
              typeof props.backgroundImage?.light === "object" &&
              props.backgroundImage?.light &&
              "url" in props.backgroundImage.light
                ? (props.backgroundImage.light.url ?? undefined)
                : undefined
            }
            darkSrc={
              typeof props.backgroundImage?.dark === "object" &&
              props.backgroundImage?.dark &&
              "url" in props.backgroundImage.dark
                ? (props.backgroundImage.dark.url ?? undefined)
                : undefined
            }
            alt="Background"
            width={1920}
            height={1080}
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6">
        <AnimatedGroup
          className="text-center"
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
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
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">
              {props.eyebrow}
            </div>
          )}

          {/* Header */}
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
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
              className="text-muted-foreground mx-auto mb-16 max-w-3xl text-xl"
            >
              {props.subheader}
            </TextEffect>
          )}
        </AnimatedGroup>

        {/* Features Grid */}
        <AnimatedGroup
          className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
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
          {props.features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-muted/30 hover:bg-muted/50 border-0 p-8 text-center transition-all duration-300 hover:scale-105"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                {feature.icon && (
                  <Icon icon={feature.icon} className="text-primary h-8 w-8" />
                )}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </AnimatedGroup>

        {/* CTA */}
        {props.primaryCtaLabel && (
          <AnimatedGroup
            className="text-center"
            variants={{
              container: {
                visible: {
                  transition: {
                    delayChildren: 0.6,
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
            <Button asChild size="lg" className="px-8 py-4 text-lg">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel}
              </Link>
            </Button>
          </AnimatedGroup>
        )}
      </div>
    </section>
  );
}
