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
import { authClient } from "~/auth/client";

type PricingCardProps = {
	title: string;
	price?: string;
	description: string;
	features: string[];
	actionLabel: string;
	popular?: boolean;
	exclusive?: boolean;
	priceId: string;
	activeSubscription?: Extract<
		RouterOutputs["subscriptions"]["getActiveSubscription"],
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
	title,
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
		activeSubscription?.plan === title &&
		activeSubscription?.priceId === priceId;
	const apiUtils = api.useUtils();

	async function handleSubscriptionChangeRequest(_e: MouseEvent) {
		if (activeSubscription && isActiveSub) {
			const { data, error } = await authClient.subscription.cancel({
				subscriptionId: activeSubscription.id,
				returnUrl: window.location.href,
			});
			if (error) {
				// TODO: error handling here when a cancelled subscription does work
				return;
			}
			window.location.href = data.url;
		} else {
			const { data, error } = await authClient.subscription.upgrade({
				plan: title,
				successUrl: window.location.href,
				cancelUrl: window.location.href,
				subscriptionId: activeSubscription?.id,
			});
			if (error) {
				// TODO: error handling here when a cancelled subscription does work
				return;
			}
			if (data.url) {
				return (window.location.href = data.url);
			}
			console.log("data: ", data);
		}
		await apiUtils.subscriptions.invalidate();
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
						{title}
					</CardTitle>
					<div className="flex gap-0.5">
						<h3 className="text-3xl font-bold">{price ?? "Custom"}</h3>
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
	const { data: activeSubRes, isLoading: loadingActiveSub } =
		api.subscriptions.getActiveSubscription.useQuery();
	// Convert LIFETIME_PLANS to pricing card format
	const plans = [
		{
			title: LIFETIME_PLANS.founder.name,
			price: "$99",
			description: LIFETIME_PLANS.founder.description,
			features: [
				"Lifetime access to UIFoundry",
				"All current and future blocks",
				"All current and future fields",
				"Priority support",
				"Early access to new features",
			],
			actionLabel: "Get Started",
			priceId: LIFETIME_PLANS.founder.priceId as string,
			popular: false,
			totalSeats: 100,
		},
		{
			title: LIFETIME_PLANS.pioneer.name,
			price: "$149",
			description: LIFETIME_PLANS.pioneer.description,
			features: [
				"Lifetime access to UIFoundry",
				"All current and future blocks",
				"All current and future fields",
				"Priority support",
				"Early access to new features",
			],
			actionLabel: "Get Started",
			priceId: LIFETIME_PLANS.pioneer.priceId as string,
			popular: true,
			totalSeats: 150,
		},
		{
			title: LIFETIME_PLANS.earlyAdopter.name,
			price: "$199",
			description: LIFETIME_PLANS.earlyAdopter.description,
			features: [
				"Lifetime access to UIFoundry",
				"All current and future blocks",
				"All current and future fields",
				"Priority support",
				"Early access to new features",
			],
			actionLabel: "Get Started",
			priceId: LIFETIME_PLANS.earlyAdopter.priceId as string,
			exclusive: true,
			totalSeats: 250,
		},
	];

	return (
		<div className="grid h-full w-full place-items-center py-8">
			<div>
				<PricingHeader
					title="Subscription Plans"
					subtitle="Choose the lifetime plan that's right for you"
				/>
				<section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
					{plans.map((plan) => {
						return (
							<PricingCard
								key={plan.title}
								{...plan}
								activeSubscription={
									activeSubRes?.success ? activeSubRes.data : undefined
								}
							/>
						);
					})}
				</section>
			</div>
		</div>
	);
}
