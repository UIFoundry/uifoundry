"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import type { Hero_9_Block } from "~/payload-types";

function CodeBlock({
  code,
  showLineNumbers,
}: {
  code: string;
  showLineNumbers?: boolean;
}) {
  const lines = useMemo(() => code.split(/\r?\n/), [code]);
  return (
    <motion.div
      layout
      transition={{ type: "spring", duration: 0.35 }}
      className="ring-border/50 bg-background/70 relative overflow-hidden rounded-xl border ring-1 backdrop-blur"
    >
      <div className="bg-muted/40 border-border/50 flex items-center justify-between border-b px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="bg-chart-3 h-2 w-2 rounded-full" />
          <span className="bg-chart-4 h-2 w-2 rounded-full" />
          <span className="bg-chart-2 h-2 w-2 rounded-full" />
        </div>
        <span className="text-muted-foreground">example.ts</span>
      </div>
      <motion.pre
        layout
        transition={{ type: "spring", duration: 0.35 }}
        className="scrollbar-thin max-h-[420px] overflow-auto p-4 text-sm leading-6"
      >
        <code
          className="grid items-center gap-x-4"
          style={{ gridTemplateColumns: showLineNumbers ? "auto 1fr" : "1fr" }}
        >
          {lines.map((ln, i) => (
            <React.Fragment key={i}>
              {showLineNumbers ? (
                <span className="text-foreground/40 pr-4 text-right text-xs select-none">
                  {i + 1}
                </span>
              ) : null}
              <span className="text-foreground/90 font-mono whitespace-pre">
                {ln || "\u00A0"}
              </span>
            </React.Fragment>
          ))}
        </code>
      </motion.pre>
    </motion.div>
  );
}

export default function Hero_9(props: Hero_9_Block) {
  const [tab, setTab] = useState(0);
  const samples =
    Array.isArray(props.codeSamples) && props.codeSamples.length > 0
      ? props.codeSamples
      : [];
  const active = samples[tab];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="text-left">
          {props.alertLabel && props.alertLink ? (
            <Link
              href={props.alertLink}
              className="bg-background/60 ring-border inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ring-1 backdrop-blur"
            >
              <span className="bg-primary inline-block h-2 w-2 rounded-full" />
              <span className="text-foreground/80">{props.alertLabel}</span>
            </Link>
          ) : null}
          <TextEffect
            preset="fade-in-blur"
            as="h1"
            className="mt-4 text-left text-5xl md:text-6xl"
          >
            {props.header}
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            delay={0.15}
            className="text-muted-foreground mt-6 max-w-prose text-left text-lg"
          >
            {props.subheader ?? ""}
          </TextEffect>
          <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href={props.primaryCtaHref ?? "#"}>
                {props.primaryCtaLabel ?? "Get Started"}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={props.secondaryCtaHref ?? "#"}>
                {props.secondaryCtaLabel ?? "API Docs"}
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          {samples.length > 0 ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {samples.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setTab(i)}
                    className={
                      "cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors " +
                      (i === tab
                        ? "bg-foreground text-background"
                        : "bg-background hover:bg-muted/50")
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <CodeBlock
                  code={active?.code ?? "// Add code samples"}
                  showLineNumbers={props.showLineNumbers ?? undefined}
                />
              </motion.div>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">
              Add code samples in admin to preview.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
