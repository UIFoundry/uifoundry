/**
 * Hero 2 Component
 *
 * Source: https://tailark.com/preview/dusk/hero-section/four
 * License: Free Tier
 * Adapted from: Tailark Dusk UI Kit
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props from Hero_2_Block
 * - Removed logo carousel section for cleaner layout
 * - Two-column split layout: content left, image right
 * - Added MediaField for theme-aware image rendering
 * - Decorative gradient background on image
 */

"use client";

import Link from "next/link";
import { Button } from "~/ui/button";
import type { Hero_2_Block } from "~/payload-types";
import MediaField from "~/payload/fields/media";
import { cn } from "~/styles/utils";

export default function Hero2Section(props: Hero_2_Block) {
	return (
		<section className="relative overflow-hidden">
			{/* Content Container */}
			<div className="py-24 md:pb-32 lg:pb-56 lg:pt-44">
				<div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:flex-row lg:items-center lg:px-12">
					{/* Left Content Column */}
					<div className="mx-auto max-w-lg text-center lg:mx-0 lg:w-1/2 lg:max-w-full lg:text-left">
						{/* Main Heading */}
						<h1 className="text-5xl text-balance font-semibold md:text-6xl xl:text-7xl">
							{props.header}
						</h1>

						{/* Subheader */}
						{props.subheader && (
							<p className="mt-6 text-lg text-pretty text-muted-foreground">
								{props.subheader}
							</p>
						)}

						{/* CTA Buttons */}
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
							{/* Primary CTA */}
							<Button
								asChild
								size="lg"
								className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-base font-medium shadow-sm"
							>
								<Link href={props.primaryCtaHref}>
									{props.primaryCtaLabel}
								</Link>
							</Button>

							{/* Secondary CTA */}
							<Button
								asChild
								variant="outline"
								size="lg"
								className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-base font-medium"
							>
								<Link href={props.secondaryCtaHref}>
									{props.secondaryCtaLabel}
								</Link>
							</Button>
						</div>
					</div>

					{/* Right Image Column */}
					{props.media && (
						<div className="relative mt-12 lg:mt-0 lg:w-1/2 lg:pl-12">
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-square">
								<MediaField
									media={props.media}
									width="800"
									height="800"
									className={cn(
										"size-full object-cover object-center",
										"rounded-2xl shadow-2xl",
									)}
								/>
							</div>
							{/* Decorative background gradient */}
							<div
								aria-hidden="true"
								className="absolute inset-0 -z-10 translate-x-8 translate-y-8 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl"
							/>
						</div>
					)}
				</div>
			</div>

			{/* Background gradient */}
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 -z-20 h-[800px] overflow-hidden"
			>
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
			</div>
		</section>
	);
}
