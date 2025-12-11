/**
 * Testimonials 3 Component
 *
 * Source: @irsyad/testimonials-03 (IntentUI)
 * License: Pro Subscription
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 * - Changed from client component to server component
 */

import { Avatar } from "~/ui/avatar-intentui";
import { CardDescription, CardTitle } from "~/ui/card";
import { Container } from "~/ui/container";
import type { Testimonials_3_Block } from "~/payload-types";

export default function Testimonials3Section(props: Testimonials_3_Block) {
	return (
		<Container className="py-6 sm:py-16">
			<h1 className="sr-only">Testimonials</h1>
			<div className="mb-8 text-center sm:mb-16">
				<h2 className="mb-4 font-semibold text-3xl md:text-4xl">{props.header}</h2>
				<p className="mx-auto max-w-2xl text-muted-fg text-xl">
					{props.subheader}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
				{props.testimonials?.map((t) => (
					<div
						key={t.id}
						className="relative isolate flex flex-col overflow-hidden rounded-3xl border border-border bg-secondary/20 p-6 dark:bg-secondary/50"
					>
						<div className="flex items-center gap-4">
							<Avatar src={t.avatar || null} alt={t.name || ""} size="lg" />
							<div>
								<CardTitle className="text-base/8">{t.name}</CardTitle>
								<CardDescription className="text-xs">{t.role}</CardDescription>
							</div>
						</div>
						<blockquote className="mt-4 text-pretty text-base/6 text-muted-fg italic">
							"{t.quote}"
						</blockquote>
					</div>
				))}
			</div>
		</Container>
	);
}
