"use client";

import React, { useState } from "react";
import { Button } from "~/ui/button";
import ThemeMedia from "~/ui/theme-media";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";

import type { CTA_2_Block } from "~/payload-types";

export default function CTA_2(props: CTA_2_Block) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background Image */}
      {props.backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <ThemeMedia
            className="h-full w-full object-cover opacity-10"
            lightSrc={
              typeof props.backgroundImage.light === "object" &&
              props.backgroundImage.light
                ? props.backgroundImage.light.url
                : undefined
            }
            darkSrc={
              typeof props.backgroundImage.dark === "object" &&
              props.backgroundImage.dark
                ? props.backgroundImage.dark.url
                : undefined
            }
            alt="Background"
            width={1920}
            height={1080}
          />
        </div>
      )}

      {/* Gradient Background */}
      <div className="from-primary/5 to-primary/5 absolute inset-0 -z-5 bg-gradient-to-br via-transparent" />

      <div className="mx-auto max-w-4xl px-6 text-center">
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
            <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">
              {props.eyebrow}
            </div>
          )}

          {/* Header */}
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
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
              className="text-muted-foreground mx-auto max-w-2xl text-xl"
            >
              {props.subheader}
            </TextEffect>
          )}

          {/* Newsletter Form */}
          <div className="mx-auto max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={props.placeholder ?? "Enter your email"}
                  className="border-input bg-background focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:outline-none"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="px-8 py-3">
                {props.ctaLabel}
              </Button>
            </form>
          </div>

          {/* Privacy Text */}
          {props.privacy && (
            <p className="text-muted-foreground text-sm">{props.privacy}</p>
          )}
        </AnimatedGroup>
      </div>
    </section>
  );
}
