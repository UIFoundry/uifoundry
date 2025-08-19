"use client";

import React from "react";
import Link from "next/link";
import { Button } from "~/ui/button";
import { Icon } from "~/ui/icon";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";

import type { HowItWorks_1_Block } from "~/payload-types";

export default function HowItWorks_1(props: HowItWorks_1_Block) {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <AnimatedGroup
          className="mb-16 text-center"
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
              className="text-muted-foreground mx-auto max-w-3xl text-xl"
            >
              {props.subheader}
            </TextEffect>
          )}
        </AnimatedGroup>

        {/* Steps */}
        <AnimatedGroup
          className="mb-16 grid gap-8 md:grid-cols-3 lg:gap-12"
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.4,
                },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                y: 30,
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
          {props.steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < props.steps.length - 1 && (
                <div className="from-primary/50 absolute top-16 left-1/2 hidden h-px w-full translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-r to-transparent md:block" />
              )}

              {/* Step Number Badge */}
              <div className="bg-primary text-primary-foreground relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-xl">
                  <Icon icon="Check" className="text-primary h-7 w-7" />
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-4 text-2xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </AnimatedGroup>

        {/* CTA */}
        {props.ctaLabel && (
          <AnimatedGroup
            className="text-center"
            variants={{
              container: {
                visible: {
                  transition: {
                    delayChildren: 0.8,
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
              <Link href={props.ctaHref ?? "#"}>{props.ctaLabel}</Link>
            </Button>
          </AnimatedGroup>
        )}
      </div>
    </section>
  );
}
