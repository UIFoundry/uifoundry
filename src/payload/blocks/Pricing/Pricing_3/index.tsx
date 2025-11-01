/**
 * Pricing 3 Component
 *
 * Source: https://tailark.com/preview/dusk/pricing/three
 * License: Free Tier
 * Adapted from: Tailark
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 */

import { Check } from "lucide-react";
import Link from "next/link";

import type { Pricing_3_Block } from "~/payload-types";

import { cn } from "~/styles/utils";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";

export * from "./config";

export default function Pricing3(props: NonNullable<Pricing_3_Block>) {
	const popularIndex = props?.config?.popularIndex ?? -1;
	const popularLabel = props?.config?.popularLabel ?? "Popular";

	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto max-w-7xl px-6">
				{/* Header Section */}
				<div className="mx-auto max-w-3xl space-y-4 text-center">
					{props?.header && (
						<h2 className="text-4xl font-semibold lg:text-5xl">
							{props.header}
						</h2>
					)}
					{props?.subheader && (
						<p className="text-muted-foreground text-lg">
							{props.subheader}
						</p>
					)}
				</div>

				{/* Pricing Cards Grid */}
				<div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
					{(props?.tiers ?? []).map((tier, index) => {
						const isPopular = popularIndex === index;

						return (
							<PricingCard
								key={`pricing-3-tier-${index}`}
								tier={tier}
								isPopular={isPopular}
								popularLabel={popularLabel}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

interface PricingCardProps {
	tier: NonNullable<Pricing_3_Block["tiers"]>[number];
	isPopular: boolean;
	popularLabel: string;
}

function PricingCard({ tier, isPopular, popularLabel }: PricingCardProps) {
	if (!tier) return null;

	const periodLabel =
		tier.period === "month" ? "/mo" : tier.period === "year" ? "/yr" : "";

	return (
		<Card className="relative flex flex-col">
			{/* Popular Badge */}
			{isPopular && (
				<span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-linear-to-br/increasing from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-white/20 ring-offset-1 ring-offset-gray-950/5 ring-inset">
					{popularLabel}
				</span>
			)}

			<CardHeader>
				{/* Plan Name */}
				<CardTitle className="text-lg font-medium">{tier.name}</CardTitle>

				{/* Price */}
				<div className="my-3 flex items-baseline gap-1">
					<span className="text-4xl font-semibold">${tier.price}</span>
					<span className="text-muted-foreground text-sm">{periodLabel}</span>
				</div>

				{/* Per Editor Label */}
				{tier.perEditor && (
					<p className="text-muted-foreground text-xs">Per editor</p>
				)}

				{/* Description */}
				{tier.description && (
					<CardDescription className="mt-2 text-sm">
						{tier.description}
					</CardDescription>
				)}

				{/* CTA Button */}
				<Button
					asChild
					className="mt-4 w-full"
					variant={isPopular ? "default" : "outline"}
				>
					<Link href={tier.ctaHref || "#"}>
						{tier.ctaLabel || "Get Started"}
					</Link>
				</Button>
			</CardHeader>

			<CardContent className="flex-1 space-y-4">
				{/* Divider */}
				<hr className="border-dashed" />

				{/* Features List */}
				<ul className="space-y-3 text-sm">
					{(tier.features ?? []).map((feature, featureIndex) => (
						<li
							key={`pricing-3-tier-${tier.name}-feature-${featureIndex}`}
							className="flex items-start gap-2"
						>
							<Check className="size-4 shrink-0 text-green-600 dark:text-green-400" />
							<span>{feature.text}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
