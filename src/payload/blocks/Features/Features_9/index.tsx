"use client";
import React, { useState } from "react";
import { Icon } from "~/ui/icon";
import type { Features_9_Block } from "~/payload-types";

export default function Features_9(props: Features_9_Block) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{props.header}</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            {props.subheader}
          </p>
        </div>
        <div className="mt-8 divide-y rounded-2xl border">
          {props.items?.map((it, i) => (
            <div key={i} className="group">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  {it.icon ? (
                    <span className="bg-muted/60 inline-flex size-8 items-center justify-center rounded-md">
                      <Icon icon={it.icon ?? "Activity"} />
                    </span>
                  ) : null}
                  <span className="text-base font-medium">{it.title}</span>
                </div>
                <span className="text-foreground/60">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i ? (
                <div className="text-muted-foreground p-5 pt-0 text-sm whitespace-pre-line">
                  {it.content}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
