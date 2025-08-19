"use client";

import React from "react";
import Link from "next/link";
import { Button } from "~/ui/button";
import { Icon } from "~/ui/icon";
import ThemeMedia from "~/ui/theme-media";
import { TextEffect } from "~/ui/motion-primitives/text-effect";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";

interface MediaObject {
	url?: string;
	alt?: string;
	width?: number;
	height?: number;
}

import type { icons } from "lucide-react";

interface ValueProposition_2_Props {
	eyebrow?: string | null;
	header: string;
	subheader?: string | null;
	benefits: Array<{
		icon: keyof typeof icons;
		title: string;
		description: string;
	}>;
	ctaLabel?: string | null;
	ctaHref?: string | null;
	secondaryCtaLabel?: string | null;
	secondaryCtaHref?: string | null;
	backgroundImage?: {
		light?: MediaObject | null;
		dark?: MediaObject | null;
	} | null;
}

export default function ValueProposition_2(props: ValueProposition_2_Props) {
	return (
		<section className="relative py-16 md:py-24 lg:py-32">
			{/* Background Image */}
			{props.backgroundImage && (
				<div className="absolute inset-0 -z-10">
					<ThemeMedia
						className="h-full w-full object-cover opacity-5"
						lightSrc={props.backgroundImage?.light?.url}
						darkSrc={props.backgroundImage?.dark?.url}
						alt="Background"
						width={1920}
						height={1080}
					/>
				</div>
			)}

			<div className="mx-auto max-w-7xl px-6">
				{/* Header Section */}
				<AnimatedGroup
					className="mb-16 text-center"
					variants={{
						container: {
							visible: {
								transition: {
									staggerChildren: 0.1,
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
									duration: 0.6,
									ease: "easeOut",
								},
							},
						},
					}}
				>
					{/* Eyebrow */}
					{props.eyebrow && (
						<div className="bg-primary/10 text-primary mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">
							{props.eyebrow}
						</div>
					)}

					{/* Header */}
					<TextEffect
						preset="fade-in-blur"
						speedSegment={0.3}
						as="h2"
						className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
					>
						{props.header}
					</TextEffect>

					{/* Subheader */}
					{props.subheader && (
						<TextEffect
							per="line"
							preset="fade-in-blur"
							speedSegment={0.3}
							delay={0.2}
							as="p"
							className="text-muted-foreground mx-auto max-w-3xl text-xl"
						>
							{props.subheader}
						</TextEffect>
					)}
				</AnimatedGroup>

				{/* Benefits Grid */}
				<div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{props.benefits.map((benefit, index) => (
						<AnimatedGroup
							key={index}
							className="group relative"
							variants={{
								container: {
									visible: {
										transition: {
											staggerChildren: 0.1,
										},
									},
								},
								item: {
									hidden: {
										opacity: 0,
										y: 30,
										scale: 0.9,
									},
									visible: {
										opacity: 1,
										y: 0,
										scale: 1,
										transition: {
											type: "spring",
											bounce: 0.3,
											duration: 0.8,
										},
									},
								},
							}}
						>
							<div className="bg-card relative h-full rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
								{/* Gradient overlay */}
								<div className="from-primary/5 to-primary/10 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								<div className="relative">
									{/* Icon */}
									<div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
										<Icon
											icon={benefit.icon}
											className="text-primary h-8 w-8"
										/>
									</div>

									{/* Title */}
									<h3 className="mb-4 text-2xl font-semibold">
										{benefit.title}
									</h3>

									{/* Description */}
									<p className="text-muted-foreground leading-relaxed">
										{benefit.description}
									</p>
								</div>
							</div>
						</AnimatedGroup>
					))}
				</div>

				{/* CTA Section */}
				{(props.ctaLabel ?? props.secondaryCtaLabel) && (
					<AnimatedGroup
						className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center"
						variants={{
							container: {
								visible: {
									transition: {
										staggerChildren: 0.1,
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
										duration: 0.6,
										ease: "easeOut",
									},
								},
							},
						}}
					>
						{props.ctaLabel && (
							<Button size="lg" className="px-8 py-4 text-lg">
								<Link href={props.ctaHref ?? "#"}>{props.ctaLabel}</Link>
							</Button>
						)}

						{props.secondaryCtaLabel && (
							<Button size="lg" variant="outline" className="px-8 py-4 text-lg">
								<Link href={props.secondaryCtaHref ?? "#"}>
									{props.secondaryCtaLabel}
								</Link>
							</Button>
						)}
					</AnimatedGroup>
				)}
			</div>
		</section>
	);
}
