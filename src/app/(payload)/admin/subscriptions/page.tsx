"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { Button } from "~/ui/button";
import { CheckCircle2 } from "lucide-react";
import React, { type MouseEvent } from "react";
import { cn } from "~/styles/utils";
import { LIFETIME_PLANS } from "~/utils/stripe";
import { api, type RouterOutputs } from "~/trpc/react";

type PricingCardProps = {
	name: string;
	price?: number;
	description: string;
	features: string[];
	actionLabel: string;
	popular?: boolean;
	exclusive?: boolean;
	priceId: string;
	activeSubscription?: Extract<
		RouterOutputs["stripe"]["getSubscriptionStatus"],
		{ success: true }
	>["data"];
};

const PricingHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<section className="text-center">
		<h2 className="text-3xl font-bold">{title}</h2>
		<p className="pt-1 text-xl">{subtitle}</p>
		<br />
	</section>
);

const PricingCard = ({
	name,
	price,
	description,
	features,
	actionLabel,
	popular,
	exclusive,
	priceId,
	activeSubscription,
}: PricingCardProps) => {
	const isActiveSub =
		activeSubscription?.name === name &&
		activeSubscription?.priceId === priceId;
	const apiUtils = api.useUtils();

	const createCheckout = api.stripe.createCheckoutSession.useMutation();

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
				planName: name as "Founder" | "Pioneer" | "Early Adopter",
				successUrl: window.location.href,
				cancelUrl: window.location.href,
			});

			if (result.url) {
				window.location.href = result.url;
			}
		} catch (error) {
			console.error("Error creating checkout session:", error);
			alert("Failed to create checkout session. Please try again.");
		}

		await apiUtils.stripe.invalidate();
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
					<div className="flex gap-0.5">
						<h3 className="text-3xl font-bold">
							{price ? `$${price}` : "Custom"}
						</h3>
						<span className="mb-1 flex flex-col justify-end text-sm">
							{price ? " lifetime" : null}
						</span>
					</div>
					<CardDescription className="h-12 pt-1.5">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					{features.map((feature: string) => (
						<CheckItem key={feature} text={feature} />
					))}
				</CardContent>
			</div>
			<CardFooter className="mt-2 mb-6">
				<Button
					onClick={(e) => handleSubscriptionChangeRequest(e)}
					className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none dark:bg-white dark:text-black"
				>
					<div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
					{isActiveSub ? "Cancel Membership" : actionLabel}
				</Button>
			</CardFooter>
		</Card>
	);
};

const CheckItem = ({ text }: { text: string }) => (
	<div className="flex gap-2">
		<CheckCircle2 size={18} className="my-auto text-green-400" />
		<p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
	</div>
);

export default function SubscriptionsPage() {
	const { data: subscriptionStatus } =
		api.stripe.getSubscriptionStatus.useQuery();

	return (
		<div className="grid h-full w-full place-items-center py-8">
			<div>
				<PricingHeader
					title="Subscription Plans"
					subtitle="Choose the lifetime plan that's right for you"
				/>
				<section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
					{Object.values(LIFETIME_PLANS).map((plan) => {
						return (
							<PricingCard
								key={plan.name}
								{...plan}
								activeSubscription={
									subscriptionStatus?.success
										? subscriptionStatus.data
										: undefined
								}
							/>
						);
					})}
				</section>
			</div>
		</div>
	);
}
