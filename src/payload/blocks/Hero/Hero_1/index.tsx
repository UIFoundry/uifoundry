"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "~/ui/button";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";
import type { Hero_1_Block } from "~/payload-types";
import { cn } from "~/styles/utils";
import MediaField from "~/payload/fields/mediaField";

const transitionVariants = {
	item: {
		hidden: {
			opacity: 0,
			filter: "blur(12px)",
			y: 12,
		},
		visible: {
			opacity: 1,
			filter: "blur(0px)",
			y: 0,
			transition: {
				type: "spring",
				bounce: 0.3,
				duration: 1.5,
			},
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
									y: 0,
									transition: {
										type: "spring",
										bounce: 0.3,
										duration: 2,
									},
								},
							},
						}}
						className="absolute inset-0 -z-20"
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
									// @ts-expect-error mismatch anim group variants type
									variants={transitionVariants}
									className={cn(
										(!props.alertLabel || !props.alertLink) && "hidden",
									)}
								>
									<Link
										href={props.alertLink}
										className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
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
								preset="fade-in-blur"
								speedSegment={0.3}
								as="h1"
								className="mt-8 text-6xl text-balance md:text-7xl lg:mt-16 xl:text-[5.25rem]"
							>
								{props.header}
							</TextEffect>
							<TextEffect
								per="line"
								preset="fade-in-blur"
								speedSegment={0.3}
								delay={0.5}
								as="p"
								className="mx-auto mt-8 max-w-2xl text-lg text-balance"
							>
								{props.subheader ?? ""}
							</TextEffect>

							<AnimatedGroup
								// @ts-expect-error mismatch anim group type
								variants={{
									container: {
										visible: {
											transition: {
												staggerChildren: 0.05,
												delayChildren: 0.75,
											},
										},
									},
									...transitionVariants,
								}}
								className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
							>
								<div
									key={1}
									className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
								>
									<Button
										asChild
										size="lg"
										className="rounded-xl px-5 text-base"
									>
										<Link href={props.primaryCtaHref}>
											<span className="text-nowrap">
												{props.primaryCtaLabel}
											</span>
										</Link>
									</Button>
								</div>
								<Button
									key={2}
									asChild
									size="lg"
									variant="ghost"
									className="h-10.5 rounded-xl px-5"
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
											staggerChildren: 0.05,
											delayChildren: 0.75,
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
										media={props.media!}
										width="2700"
										height="1440"
										className="border-border/25 relative z-2 aspect-15/8 rounded-2xl border"
									/>
								</div>
							</div>
						</AnimatedGroup>
					) : (
						<ArrowDown
							onClick={() => {
								window.scrollTo({
									top: window.innerHeight,
									behavior: "smooth",
								});
							}}
							size={30}
							className="hover:stroke-primary absolute bottom-30 left-1/2 -translate-x-1/2 cursor-pointer transition-colors duration-300"
						/>
					)}
				</div>
			</section>
		</div>
	);
}
