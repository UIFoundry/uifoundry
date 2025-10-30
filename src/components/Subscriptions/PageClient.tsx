"use client";

import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import React, { type MouseEvent } from "react";

import { cn } from "~/styles/utils";
import { type RouterOutputs, useTRPC } from "~/trpc/client";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { LIFETIME_PLANS, type LifetimePlan } from "~/utils/stripe";

type PricingCardProps = LifetimePlan & {
	activeSubscription?: Extract<
		RouterOutputs["stripe"]["getSubscriptionStatus"],
		{ success: true }
	>["data"];
	lifetimeUserCount: number;
};

const PricingCard = ({
	name,
	actionLabel,
	activeSubscription,
	description,
	exclusive,
	features,
	lifetimeUserCount,
	maxSeats,
	minSeats,
	popular,
	price,
	priceId,
}: PricingCardProps) => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const openSeats =
		lifetimeUserCount > minSeats && lifetimeUserCount - minSeats < maxSeats;
	const isActiveSub =
		activeSubscription?.name === name &&
		activeSubscription?.priceId === priceId;

	const createCheckout = useMutation(
		trpc.stripe.createCheckoutSession.mutationOptions(),
	);

	async function handleSubscriptionChangeRequest(_e: MouseEvent) {
		// For one-time payments, we don't support cancellation
		// Users have lifetime access once purchased
		if (activeSubscription && isActiveSub) {
			alert("You have lifetime access to this plan. No cancellation needed!");
			return;
		}

		// Create one-time payment checkout session
		try {
			const result = await createCheckout.mutateAsync({
				cancelUrl: window.location.href,
				planName: name,
				successUrl: window.location.href,
			});

			if (result.url) {
				window.location.href = result.url;
			}
		} catch (error) {
			console.error("Error creating checkout session:", error);
			alert("Failed to create checkout session. Please try again.");
		}

		await queryClient.invalidateQueries(trpc.stripe.pathFilter());
		console.log("invalidated client subscription queries");
	}

	return (
		<Card
			className={cn(
				`mx-auto flex w-72 flex-col justify-between py-1 sm:mx-0 ${popular ? "border-rose-400" : "border-zinc-700"}`,
				{
					"animate-background-shine bg-white bg-[length:200%_100%] transition-colors dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]":
						exclusive,
				},
			)}
		>
			<div>
				<CardHeader className="pt-4 pb-8">
					<CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
						{name} {isActiveSub && "Current Plan"}
					</CardTitle>
					<div className="flex items-center justify-between text-sm">
						<div className="flex gap-0.5">
							<h3 className="text-3xl font-bold">
								{price ? `$${price}` : "Custom"}
							</h3>
							<span className="mb-1 flex flex-col justify-end">
								{price ? " lifetime" : null}
							</span>
						</div>
						<p>{`(${openSeats ? Math.min(lifetimeUserCount - minSeats, maxSeats) : lifetimeUserCount - minSeats < 0 ? 0 : Math.max(maxSeats - lifetimeUserCount - minSeats, maxSeats)} / ${maxSeats})`}</p>
					</div>
					<CardDescription className="h-12 pt-1.5">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					{features.map((feature: string) => (
						<div className="flex gap-2" key={feature}>
							<CheckCircle2 className="my-auto text-green-400" size={18} />
							<p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
								{feature}
							</p>
						</div>
					))}
				</CardContent>
			</div>
			<CardFooter className="mt-2 mb-6">
				<Button
					className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none dark:bg-white dark:text-black"
					disabled={!openSeats}
					onClick={(e) => handleSubscriptionChangeRequest(e)}
				>
					<div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
					{isActiveSub ? "Current Plan" : actionLabel}
				</Button>
			</CardFooter>
		</Card>
	);
};

const PricingHeader = ({
	subtitle,
	title,
}: {
	subtitle: string;
	title: string;
}) => (
	<section className="text-center">
		<h2 className="text-3xl font-bold">{title}</h2>
		<p className="pt-1 text-xl">{subtitle}</p>
		<br />
	</section>
);

export default function SubscriptionsPage() {
	const trpc = useTRPC();
	const subscriptionStatus = useSuspenseQuery(
		trpc.stripe.getSubscriptionStatus.queryOptions(),
	);
	const lifetimeUserCount = useSuspenseQuery(
		trpc.users.getLifetimeUserCount.queryOptions(),
	);

	return (
		<div className="grid h-full w-full place-items-center py-8">
			<div>
				<PricingHeader
					subtitle="Choose the lifetime plan that's right for you"
					title="Subscription Plans"
				/>
				<section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
					{Object.values(LIFETIME_PLANS).map((plan) => {
						return (
							<PricingCard
								key={plan.name}
								{...plan}
								activeSubscription={
									subscriptionStatus?.data.success
										? subscriptionStatus.data.data
										: undefined
								}
								lifetimeUserCount={
									lifetimeUserCount.data.success
										? lifetimeUserCount.data.data
										: 0
								}
							/>
						);
					})}
				</section>
			</div>
		</div>
	);
}
