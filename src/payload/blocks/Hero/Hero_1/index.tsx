/**
 * Hero 1 Component
 *
 * Source: Custom design (original to this project)
 * License: N/A
 * Adapted from: N/A
 *
 * Modifications:
 * - Original hero component with animated gradient background
 * - Integrated with PayloadCMS block system
 * - Features TextEffect animations, AlertLink badge, dual CTA buttons
 * - Optional MediaField with theme-aware rendering
 * - Animated group transitions with stagger effects
 */

"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Hero_1_Block } from "~/payload-types";

import MediaField from "~/payload/fields/media";
import { cn } from "~/styles/utils";
import { Button } from "~/ui/button";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";
import { TextEffect } from "~/ui/motion-primitives/text-effect";

const transitionVariants = {
	item: {
		hidden: {
			filter: "blur(12px)",
			opacity: 0,
			y: 12,
		},
		visible: {
			filter: "blur(0px)",
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.3,
				duration: 1.5,
			},
			y: 0,
		},
	},
};

export default function HeroSection(props: Hero_1_Block) {
	return (
		<div className="overflow-hidden">
			<div
				aria-hidden
				className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
			>
				<div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
				<div className="absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
				<div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
			</div>
			<section>
				<div className="relative min-h-[90vh]">
					<AnimatedGroup
						className="absolute inset-0 -z-20"
						variants={{
							container: {
								visible: {
									transition: {
										delayChildren: 1,
									},
								},
							},
							item: {
								hidden: {
									opacity: 0,
									y: 20,
								},
								visible: {
									opacity: 1,
									transition: {
										type: "spring",
										bounce: 0.3,
										duration: 2,
									},
									y: 0,
								},
							},
						}}
					>
						{/* {props?.media?.url ? <Image */}
						{/*                   src={props.media.url} */}
						{/*                   alt={props.media.alt} */}
						{/*                   className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block" */}
						{/*                   width="3276" */}
						{/*                   height="4095" */}
						{/*               /> : <></>} */}
					</AnimatedGroup>
					<div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
					<div className="mx-auto max-w-7xl px-6">
						<div className="text-center sm:mx-auto lg:mt-0 lg:mr-auto">
							{props.alertLink && (
								<AnimatedGroup
									className={cn(
										(!props.alertLabel || !props.alertLink) && "hidden",
									)}
									// @ts-expect-error mismatch anim group variants type
									variants={transitionVariants}
								>
									<Link
										className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
										href={props.alertLink}
									>
										<span className="text-foreground text-sm">
											{props.alertLabel}
										</span>
										<span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

										<div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
											<div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
												<span className="flex size-6">
													<ArrowRight className="m-auto size-3" />
												</span>
												<span className="flex size-6">
													<ArrowRight className="m-auto size-3" />
												</span>
											</div>
										</div>
									</Link>
								</AnimatedGroup>
							)}

							<TextEffect
								as="h1"
								className="mt-8 text-6xl text-balance md:text-7xl lg:mt-16 xl:text-[5.25rem]"
								preset="fade-in-blur"
								speedSegment={0.3}
							>
								{props.header}
							</TextEffect>
							<TextEffect
								as="p"
								className="mx-auto mt-8 max-w-2xl text-lg text-balance"
								delay={0.5}
								per="line"
								preset="fade-in-blur"
								speedSegment={0.3}
							>
								{props.subheader ?? ""}
							</TextEffect>

							<AnimatedGroup
								className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
								// @ts-expect-error mismatch anim group type
								variants={{
									container: {
										visible: {
											transition: {
												delayChildren: 0.75,
												staggerChildren: 0.05,
											},
										},
									},
									...transitionVariants,
								}}
							>
								<div
									className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
									key={1}
								>
									<Button
										asChild
										className="rounded-xl px-5 text-base"
										size="lg"
									>
										<Link href={props.primaryCtaHref}>
											<span className="text-nowrap">
												{props.primaryCtaLabel}
											</span>
										</Link>
									</Button>
								</div>
								<Button
									asChild
									className="h-10.5 rounded-xl px-5"
									key={2}
									size="lg"
									variant="ghost"
								>
									<Link href={props.secondaryCtaHref}>
										<span className="text-nowrap">
											{props.secondaryCtaLabel}
										</span>
									</Link>
								</Button>
							</AnimatedGroup>
						</div>
					</div>

					{Boolean(props.media?.light) || Boolean(props.media?.dark) ? (
						<AnimatedGroup
							// @ts-expect-error mismatch anim group type
							variants={{
								container: {
									visible: {
										transition: {
											delayChildren: 0.75,
											staggerChildren: 0.05,
										},
									},
								},
								...transitionVariants,
							}}
						>
							<div className="relative mt-8 -mr-56 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20">
								<div
									aria-hidden
									className="to-background absolute inset-0 z-10 bg-linear-to-b from-transparent from-35%"
								/>
								<div className="ring-background bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg ring-1 inset-shadow-2xs shadow-zinc-950/15 dark:inset-shadow-white/20">
									<MediaField
										className="border-border/25 relative z-2 aspect-15/8 rounded-2xl border"
										height="1440"
										media={props.media!}
										width="2700"
									/>
								</div>
							</div>
						</AnimatedGroup>
					) : (
						<ArrowDown
							className="hover:stroke-primary absolute bottom-30 left-1/2 -translate-x-1/2 cursor-pointer transition-colors duration-300"
							onClick={() => {
								window.scrollTo({
									behavior: "smooth",
									top: window.innerHeight,
								});
							}}
							size={30}
						/>
					)}
				</div>
			</section>
		</div>
	);
}
