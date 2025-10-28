import type { ComponentPropsWithRef } from "react";

import { Check } from "lucide-react";
import Link from "next/link";

import type { Pricing_1_Block } from "~/payload-types";

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

export default function Pricing(props: NonNullable<Pricing_1_Block>) {
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
							focusedTier={{
								index: props?.focusIndex ?? -1,
								label: props?.focusLabel ?? "Popular",
							}}
							index={index}
							key={`Pricing_1_Block-${index}`}
							tier={tier}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function PricingTier({
	index,
	focusedTier = {
		index: -1,
		label: "Popular",
	},
	tier,
	...divProps
}: ComponentPropsWithRef<"div"> & {
	focusedTier?: {
		index: number;
		label: string;
	};
	index: number;
	tier: NonNullable<Pricing_1_Block["tiers"]>[number];
}) {
	if (!tier) {return null;}

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
					className="mt-4 w-full"
					variant={!isFocused ? "outline" : undefined}
				>
					<Link href="">{tier.callToAction ?? "Get Started"}</Link>
				</Button>
			</CardHeader>

			<CardContent className="space-y-4">
				<hr className="border-dashed" />

				<ul className="list-outside space-y-3 text-sm">
					{(tier.features ?? []).map((feature, index) => (
						<li
							className="flex items-center gap-2"
							key={`Pricing_1_Block-tier-${tier.label}-feature-${index}`}
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
