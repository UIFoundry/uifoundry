import React from "react";

interface ComponentProps {
  header?: string;
  subheader?: string;
  alertLabel?: string;
  alertLink?: string;
  media?: {
    light?: { url: string; alt: string };
    dark?: { url: string; alt: string };
  };
  actions?: Array<{ label?: string; href?: string }>;
  features?: Array<{ title?: string; description?: string; icon?: string }>;
  faqs?: Array<{ question?: string; answer?: string }>;
  members?: Array<{ name?: string; role?: string; bio?: string }>;
  stats?: Array<{ label?: string; value?: string }>;
  testimonials?: Array<{ content?: string; author?: string; role?: string }>;
  [key: string]: any;
}

import Link from "next/link";
import { Button } from "~/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/ui/card";
import { Check } from "lucide-react";

import type { ComponentPropsWithRef } from "react";
import { cn } from "~/styles/utils";

function PricingTier({
  tier,
  index,
  focusedTier = {
    index: -1,
    label: "Popular",
  },
  ...divProps
}: {
  tier: NonNullable<Pricing_1_Block["tiers"]>[number];
  index: number;
  focusedTier?: {
    index: number;
    label: string;
  };
} & ComponentPropsWithRef<"div">) {
  if (!tier) return null;

  const annualPricing = tier.pricing.annual;
  const monthlyPricing = tier.pricing.monthly;
  const isFocused = focusedTier.index === index;

  return (
    <Card className="relative my-8 basis-1/2 md:my-0" {...divProps}>
      <span
        className={cn(
          "absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-linear-to-br/increasing from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-white/20 ring-offset-1 ring-offset-gray-950/5 ring-inset",
          !isFocused && "hidden",
        )}
      >
        {focusedTier.label}
      </span>
      <CardHeader>
        <CardTitle className="font-medium">{tier.label}</CardTitle>

        <span className="my-3 block text-2xl font-semibold">
          ${tier.pricing.value}
          {annualPricing ? " / yr" : monthlyPricing ? " / mo" : ""}
        </span>

        {tier.description && (
          <CardDescription className="text-sm">
            {tier.description}
          </CardDescription>
        )}
        <Button
          asChild
          variant={!isFocused ? "outline" : undefined}
          className="mt-4 w-full"
        >
          <Link href="">{tier.callToAction ?? "Get Started"}</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <hr className="border-dashed" />

        <ul className="list-outside space-y-3 text-sm">
          {(tier.features ?? []).map((feature, index) => (
            <li
              key={`Pricing_1_Block-tier-${tier.label}-feature-${index}`}
              className="flex items-center gap-2"
            >
              <Check className="size-3" />
              {feature.text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function Pricing(props: ComponentProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            {props?.header ?? ""}
          </h1>
          <p>{props?.subheader ?? ""}</p>
        </div>

        <div className="mt-8 justify-center gap-6 md:mt-20 md:flex">
          {(props?.tiers ?? []).map((tier, index) => (
            <PricingTier
              tier={tier}
              index={index}
              focusedTier={{
                index: props?.focusIndex ?? -1,
                label: props?.focusLabel ?? "Popular",
              }}
              key={`Pricing_1_Block-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
