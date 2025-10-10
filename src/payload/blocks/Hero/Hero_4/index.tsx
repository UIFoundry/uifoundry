"use client";

import Link from "next/link";
import { Button } from "~/ui/button";
import { ArrowRight, Mail, SendHorizontal } from "lucide-react";
import type { Hero_4_Block } from "~/payload-types";
import MediaField from "~/payload/fields/media";

export default function Hero4Section(props: Hero_4_Block) {

	return (
		<section className="overflow-hidden">
			<div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-20">
				<div className="lg:flex lg:items-center lg:gap-12">
					{/* Content - Left Side */}
					<div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
						{/* Badge/Alert */}
						{(props.badgeLabel ?? props.badgeText) && (
							<Link
								className="mx-auto flex w-fit items-center gap-2 rounded-[var(--radius)] border p-1 pr-3 lg:ml-0"
								href={props.badgeHref ?? "#"}
							>
								{props.badgeLabel && (
									<span className="rounded-[calc(var(--radius)-0.25rem)] bg-muted px-2 py-1 text-xs">
										{props.badgeLabel}
									</span>
								)}
								{props.badgeText && (
									<span className="text-sm">{props.badgeText}</span>
								)}
								<span className="block h-4 w-px bg-[var(--color-border)]"></span>
								<ArrowRight className="size-4" />
							</Link>
						)}

						{/* Main Heading */}
						<h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl">
							{props.header}
						</h1>

						{/* Subheader */}
						{props.subheader && (
							<p className="mt-8 text-balance">{props.subheader}</p>
						)}

						{/* Email Form */}
						<div>
							<form
								className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto"
								action=""
							>
								<div className="relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border bg-background pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2 has-[input:focus]:ring-muted">
									<Mail className="pointer-events-none absolute inset-y-0 left-5 my-auto size-5 text-caption" />
									<input
										placeholder={
											props.emailPlaceholder ?? "Your mail address"
										}
										className="h-14 w-full bg-transparent pl-12 focus:outline-none"
										type="email"
									/>
									<div className="md:pr-1.5 lg:pr-0">
										<Button
											className="h-9 rounded-[var(--radius)] px-4 py-2 shadow-sm shadow-black/20"
											aria-label="submit"
											type="submit"
										>
											<span className="hidden md:block">
												{props.emailButtonText ?? "Get Started"}
											</span>
											<SendHorizontal className="relative mx-auto size-5 md:hidden" />
										</Button>
									</div>
								</div>
							</form>

							{/* Features List */}
							{props.features && props.features.length > 0 && (
								<ul className="list-inside list-disc space-y-2">
									{props.features.map((item, index) => (
										<li key={item.id ?? index}>{item.feature}</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>

				{/* Background Image - Absolute positioned on right */}
				{props.media && (
					<div className="absolute inset-0 -mx-4 rounded-3xl p-3 lg:col-span-3">
						<div className="relative">
							{/* Gradient overlay */}
							<div className="absolute inset-0 -mx-[4.25rem] z-[1] bg-[radial-gradient(at_65%_25%,transparent,var(--background)_40%)]"></div>

							{/* Media Field - handles theme-aware rendering automatically */}
							<MediaField
								media={props.media}
								width={2796}
								height={2008}
								className="object-cover"
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
