/**
 * CTA 2 Component
 *
 * Source: Based on shadcnblocks.com CTA design pattern
 * License: MIT-licensed shadcn pattern
 * Adapted from: User-provided screenshots
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 * - Made fully responsive with mobile-first approach
 */

"use client"

import Link from "next/link";

import type { CTA_2_Block } from "~/payload-types";

import { Button } from "~/ui/button";

export default function CallToAction2(props: NonNullable<CTA_2_Block>) {
	const primaryAction = props.actions?.[0];
	const secondaryAction = props.actions?.[1];

	return (
		<section className="bg-neutral-950 py-16 md:py-20">
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:text-left md:items-center">
					<h2 className="text-3xl font-bold text-white text-balance lg:text-4xl md:max-w-2xl">
						{props.header}
					</h2>

					<div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6 shrink-0">
						{secondaryAction && (
							<Link
								className="text-white hover:text-white/80 transition-colors text-sm md:text-base"
								href={secondaryAction.href ?? "/"}
							>
								{secondaryAction.label ?? "Learn more"}
							</Link>
						)}

						{primaryAction && (
							<Button
								asChild
								className="bg-white text-black hover:bg-white/90"
								size="lg"
							>
								<Link href={primaryAction.href ?? "/"}>
									<span>{primaryAction.label ?? "Get started"}</span>
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
