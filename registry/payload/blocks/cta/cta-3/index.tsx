/**
 * CTA 3 Component
 *
 * Source: Custom gradient design for UIFoundry
 * License: MIT
 * Created: 2025-10-31
 *
 * Design:
 * - Vibrant gradient background for high impact
 * - Centered layout for focus
 * - Modern button styling with good contrast
 */

import Link from "next/link";

import type { CTA_3_Block } from "~/payload-types";

import { Button } from "@/registry/ui/button";

export * from "./config";

export default function CallToAction3(props: NonNullable<CTA_3_Block>) {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 md:py-32">
			{/* Gradient overlay for depth */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

			<div className="relative mx-auto max-w-4xl px-6">
				<div className="text-center">
					<h2 className="text-4xl font-bold text-white text-balance lg:text-5xl xl:text-6xl">
						{props.header}
					</h2>

					{props.subheader && (
						<p className="mt-6 text-lg text-white/90 text-balance md:text-xl">
							{props.subheader}
						</p>
					)}

					<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4">
						{(props.actions ?? []).map((action, index) => {
							const isSecondary = index === 1;

							return (
								<Button
									asChild
									key={`CTA_3_Block-action-${index}`}
									size="lg"
									variant={isSecondary ? "outline" : "default"}
									className={
										isSecondary
											? "border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600"
											: "bg-white text-purple-600 hover:bg-white/90"
									}
								>
									<Link href={action.href ?? "/"}>
										<span>{action.label ?? "Get Started"}</span>
									</Link>
								</Button>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
