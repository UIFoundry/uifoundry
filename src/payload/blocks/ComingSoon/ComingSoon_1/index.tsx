"use client";

import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

import type { ComingSoon_1_Block } from "~/payload-types";

import SocialIcon from "~/payload/fields/socialLinks";
import { cn } from "~/styles/utils";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { AnimatedGroup } from "~/ui/motion-primitives/animated-group";
import { TextEffect } from "~/ui/motion-primitives/text-effect";

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

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

export default function ComingSoonSection(props: ComingSoon_1_Block) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		if (!props.launchDate) {return;}

		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft(props.launchDate));
		}, 1000);

		return () => clearInterval(timer);
	}, [props.launchDate]);

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle email submission here
		console.log("Email submitted:", email);
		setIsSubmitted(true);
		setEmail("");
	};

	return (
		<div
			className={cn(
				"relative flex min-h-screen items-center justify-center overflow-hidden",
			)}
		>
			<section className="relative z-10 w-full">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<AnimatedGroup
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
									transition: {
										type: "spring",
										bounce: 0.3,
										duration: 1.5,
									},
									y: 0,
								},
							},
						}}
					>
						<TextEffect
							as="h1"
							className="mb-6 text-5xl font-bold text-balance md:text-6xl lg:text-7xl"
							preset="fade-in-blur"
							speedSegment={0.3}
						>
							{props.header ?? "Something Amazing is Coming"}
						</TextEffect>

						<TextEffect
							as="p"
							className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl text-balance"
							delay={0.3}
							per="line"
							preset="fade-in-blur"
							speedSegment={0.3}
						>
							{props.subheader ??
								"We're working hard to bring you something special. Stay tuned!"}
						</TextEffect>

						{/* Countdown Timer */}
						{props.launchDate && (
							<AnimatedGroup
								className="mb-12"
								// @ts-expect-error mismatch anim group type
								variants={{
									container: {
										visible: {
											transition: {
												delayChildren: 0.6,
												staggerChildren: 0.05,
											},
										},
									},
									...transitionVariants,
								}}
							>
								<div className="mx-auto grid max-w-md grid-cols-2 gap-4 md:grid-cols-4">
									{[
										{ label: "Days", value: timeLeft.days },
										{ label: "Hours", value: timeLeft.hours },
										{ label: "Minutes", value: timeLeft.minutes },
										{ label: "Seconds", value: timeLeft.seconds },
									].map((item) => (
										<div
											className="bg-card rounded-lg border p-4 shadow-sm"
											key={item.label}
										>
											<div className="text-primary text-3xl font-bold">
												{item.value.toString().padStart(2, "0")}
											</div>
											<div className="text-muted-foreground text-sm">
												{item.label}
											</div>
										</div>
									))}
								</div>
							</AnimatedGroup>
						)}

						{/* Email Signup */}
						{props.showEmailSignup && (
							<AnimatedGroup
								className="mb-12"
								// @ts-expect-error mismatch anim group type
								variants={{
									container: {
										visible: {
											transition: {
												delayChildren: 0.9,
												staggerChildren: 0.05,
											},
										},
									},
									...transitionVariants,
								}}
							>
								{!isSubmitted ? (
									<form
										className="mx-auto max-w-md"
										onSubmit={handleEmailSubmit}
									>
										<div className="flex gap-2">
											<Input
												className="flex-1"
												onChange={(e) => setEmail(e.target.value)}
												placeholder={
													props.emailPlaceholder ?? "Enter your email"
												}
												required
												type="email"
												value={email}
											/>
											<Button className="px-6" type="submit">
												{props.emailButtonText ?? "Notify me"}
											</Button>
										</div>
									</form>
								) : (
									<div className="flex items-center justify-center gap-2 text-green-600">
										<Mail className="h-5 w-5" />
										<span>Thanks! We&apos;ll notify you when we launch.</span>
									</div>
								)}
							</AnimatedGroup>
						)}

						{/* Social Links */}
						{props.showSocialLinks &&
							props.socialLinks &&
							props.socialLinks.length > 0 && (
								<AnimatedGroup
									// @ts-expect-error mismatch anim group type
									variants={{
										container: {
											visible: {
												transition: {
													delayChildren: 1.2,
													staggerChildren: 0.05,
												},
											},
										},
										...transitionVariants,
									}}
								>
									<div className="flex justify-center gap-4">
										{props.socialLinks.map((link, index) => (
											<SocialIcon
												href={link.href}
												icon={link.icon}
												key={`${index}`}
											/>
										))}
									</div>
								</AnimatedGroup>
							)}
					</AnimatedGroup>
				</div>
			</section>
		</div>
	);
}

function calculateTimeLeft(targetDate: string): TimeLeft {
	const difference = +new Date(targetDate) - +new Date();

	if (difference > 0) {
		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	}

	return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}
