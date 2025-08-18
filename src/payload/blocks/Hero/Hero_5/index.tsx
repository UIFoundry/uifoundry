"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import type { Hero_5_Block } from "~/payload-types";

export default function Hero_5(props: Hero_5_Block) {
  return (
    <section className="relative overflow-hidden">
      {/* floating shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-chart-1/30 absolute top-24 left-[5%] h-24 w-24 -rotate-12 rounded-xl blur-md"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="bg-chart-2/30 absolute top-10 right-[8%] h-40 w-40 rotate-6 rounded-full blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="bg-chart-3/20 absolute bottom-10 left-1/4 h-52 w-52 -rotate-3 rounded-[2rem] blur-xl"
        />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="text-left">
          <TextEffect
            preset="fade-in-blur"
            as="h1"
            className="text-left text-5xl md:text-6xl"
          >
            {props.header}
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            delay={0.2}
            className="text-muted-foreground mt-6 text-left text-lg"
          >
            {props.subheader ?? ""}
          </TextEffect>
          <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {(props.stats ?? []).map((stat, i) => {
              const positive =
                typeof stat.delta === "string" &&
                stat.delta.trim().startsWith("+");
              const negative =
                typeof stat.delta === "string" &&
                stat.delta.trim().startsWith("-");
              return (
                <motion.div
                  key={`${stat.label}-${i}`}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="ring-border/50 bg-background/70 relative overflow-hidden rounded-2xl border p-4 ring-1 backdrop-blur"
                >
                  <div className="text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs tracking-wider uppercase">
                    {stat.label}
                  </div>
                  {stat.delta ? (
                    <div
                      className={
                        "mt-2 text-xs font-medium " +
                        (positive
                          ? "text-primary"
                          : negative
                            ? "text-destructive"
                            : "text-foreground/70")
                      }
                    >
                      {stat.delta}
                    </div>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
