import { Check } from "lucide-react";
import Link from "next/link";

import type { Pricing_2_Block } from "~/payload-types";

import { Button } from "~/ui/button";

export * from "./config";

export default function Pricing2(props: NonNullable<Pricing_2_Block>) {
	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto max-w-6xl px-6">
				<div className="mx-auto max-w-2xl space-y-6 text-center">
					<h1 className="text-center text-4xl font-semibold lg:text-5xl">
						{props?.header ?? ""}
					</h1>
					<p>{props?.subheader ?? ""}</p>
				</div>

				<div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
					{(props?.tiers ?? []).map((tier, index) => (
						<PricingCard key={`pricing-2-tier-${index}`} tier={tier} />
					))}
				</div>
			</div>
		</section>
	);
}

function PricingCard({
	tier,
}: {
	tier: NonNullable<Pricing_2_Block["tiers"]>[number];
}) {
	if (!tier) {
		return null;
	}

	return (
		<div className="relative flex flex-col rounded-xl border bg-muted shadow-sm">
			{tier.isPopular && (
				<span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-linear-to-br/increasing from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950">
					Popular
				</span>
			)}

			<div className="flex flex-col gap-1.5 p-6">
				<h3 className="font-medium leading-none tracking-tight">{tier.name}</h3>
				<span className="my-3 block text-2xl font-semibold">
					${tier.price} / {tier.period}
				</span>
				{tier.description && (
					<p className="text-sm text-muted-foreground">{tier.description}</p>
				)}
			</div>

			<div className="space-y-4 p-6 pt-0">
				<hr className="border-dashed" />
				<ul className="list-outside space-y-3 text-sm">
					{(tier.features ?? []).map((feature, idx) => (
						<li
							className="flex items-center gap-2"
							key={`pricing-2-tier-${tier.name}-feature-${idx}`}
						>
							<Check className="size-3" />
							{feature.text}
						</li>
					))}
				</ul>
			</div>

			<div className="mt-auto flex items-center p-6 pt-0">
				<Button
					asChild
					className="w-full"
					variant={tier.isPopular ? "default" : "outline"}
				>
					<Link href={tier.buttonHref ?? ""}>{tier.buttonText}</Link>
				</Button>
			</div>
		</div>
	);
}
