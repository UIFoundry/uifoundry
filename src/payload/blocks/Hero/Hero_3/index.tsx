"use client";

import Link from "next/link";
import { Button } from "~/ui/button";
import { ChevronRight } from "lucide-react";
import type { Hero_3_Block } from "~/payload-types";
import { useTheme } from "next-themes";

export default function Hero3Section(props: Hero_3_Block) {
	const { theme } = useTheme();
	const videoSrc = props.videoUrl ?? "";
	let lightVideo: string | undefined;
	let darkVideo: string | undefined;

	if (props.media) {
		if (typeof props.media === "object") {
			if (props.media.light) {
				if (typeof props.media.light === "object") {
					lightVideo = props.media.light.url!;
				} else {
					lightVideo = props.media.light;
				}
			} else if (props.media.dark) {
				if (typeof props.media.dark === "object") {
					darkVideo = props.media.dark.url!;
				} else {
					darkVideo = props.media.dark;
				}
			}
		}
	}

	return (
		<section className="relative">
			{/* Background Video Container */}
			<div className="absolute inset-1 -z-10 aspect-2/3 size-full overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5">
				{videoSrc && (
					<video
						autoPlay
						loop
						muted
						playsInline
						className="size-full object-cover opacity-50 invert dark:opacity-35 dark:invert-0 dark:lg:opacity-75"
					>
						<source
							src={
								theme === "dark"
									? (darkVideo ?? videoSrc)
									: (lightVideo ?? videoSrc)
							}
							type="video/mp4"
						/>
					</video>
				)}
			</div>

			{/* Content Container */}
			<div className="py-24 md:pb-32 lg:pt-72 lg:pb-36">
				<div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
					<div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
						{/* Main Heading */}
						<h1 className="mt-8 max-w-2xl text-5xl text-balance md:text-6xl lg:mt-16 xl:text-7xl">
							{props.header}
						</h1>

						{/* Subheader */}
						{props.subheader && (
							<p className="mt-8 max-w-2xl text-lg text-balance">
								{props.subheader}
							</p>
						)}

						{/* CTA Buttons */}
						<div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
							{/* Primary CTA */}
							<Button
								asChild
								size="lg"
								className="inline-flex items-center justify-center gap-2 rounded-full px-8 pr-3 pl-5 text-base whitespace-nowrap shadow-sm shadow-black/20"
							>
								<Link href={props.primaryCtaHref}>
									<span className="text-nowrap">{props.primaryCtaLabel}</span>
									<ChevronRight className="ml-1" />
								</Link>
							</Button>

							{/* Secondary CTA */}
							<Button
								asChild
								variant="ghost"
								size="lg"
								className="inline-flex items-center justify-center gap-2 rounded-full px-8 text-base whitespace-nowrap hover:bg-zinc-950/5 dark:hover:bg-white/5"
							>
								<Link href={props.secondaryCtaHref}>
									<span className="text-nowrap">{props.secondaryCtaLabel}</span>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
