"use client";
import { useState } from "react";
import { cn } from "~/styles/utils";
import type { Pricing_2_Block } from "~/payload-types";

export default function Pricing_2(props: Pricing_2_Block) {
  const [cycle, setCycle] = useState<"monthly" | "yearly">(
    props.defaultCycle ?? "monthly",
  );

  const normalized = (props.plans ?? []).map((p) => {
    const feats = Array.isArray(p.features) ? p.features : [];
    const mapped =
      feats.length && typeof (feats as unknown as string[])[0] === "string"
        ? (feats as unknown as string[]).map((f) => ({ feature: f }))
        : (feats as { feature: string }[]);
    return { ...p, features: mapped };
  });

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-3 text-lg">
              {props.subheading}
            </p>
          ) : null}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3 text-sm">
          <span className="text-muted-foreground">
            {props.billingCycleLabel ?? "Billing cycle"}
          </span>
          <button
            onClick={() => setCycle("monthly")}
            className={cn(
              "rounded-md px-3 py-1",
              cycle === "monthly" ? "bg-muted" : "hover:bg-muted/60",
            )}
          >
            {props.monthlyLabel ?? "Monthly"}
          </button>
          <button
            onClick={() => setCycle("yearly")}
            className={cn(
              "rounded-md px-3 py-1",
              cycle === "yearly" ? "bg-muted" : "hover:bg-muted/60",
            )}
          >
            {props.yearlyLabel ?? "Yearly"}
          </button>
          {cycle === "yearly" ? (
            <span className="text-primary text-xs">
              {props.yearlyNote ?? "Save 20%"}
            </span>
          ) : null}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {normalized.map((p, i) => (
            <div
              key={i}
              className="bg-background ring-border/50 rounded-2xl border p-6 ring-1"
            >
              <div className="text-xl font-semibold">{p.name}</div>
              <div className="mt-1 text-2xl">
                {cycle === "monthly" ? p.monthly : p.yearly}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features?.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="bg-primary mt-1 inline-block size-1.5 rounded-full" />
                    {(f as { feature: string }).feature}
                  </li>
                ))}
              </ul>
              <a
                href={p.ctaHref ?? "#"}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm transition-colors"
              >
                {p.ctaLabel ?? "Choose plan"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
