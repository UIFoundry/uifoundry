/**
 * Testimonials 5 Component
 *
 * Source: @irsyad/testimonials-05 (IntentUI)
 * License: Pro Subscription
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 * - Converted from page component to reusable block component
 */

import { Avatar } from "@/registry/ui/avatar-intentui";
import { CardDescription, CardHeader, CardTitle } from "@/registry/ui/card";
import { Container } from "@/registry/ui/container";
import type { Testimonials_5_Block } from "~/payload-types";

export default function Testimonials5Section(props: Testimonials_5_Block) {
	return (
		<Container className="py-6 sm:py-16">
			<h1 className="sr-only">Testimonials</h1>
			<div className="mx-auto max-w-xl text-center">
				<blockquote className="font-light text-2xl text-muted-fg italic leading-relaxed">
					"{props.quote}"
				</blockquote>
				<div className="mt-8 flex flex-col items-center gap-4">
					<Avatar
						src={props.authorImage}
						alt={props.authorName}
						size="2xl"
						className="ring-2 ring-primary/50 ring-offset-2"
					/>
					<CardHeader>
						<CardTitle>{props.authorName}</CardTitle>
						<CardDescription>{props.authorRole}</CardDescription>
					</CardHeader>
				</div>
			</div>
		</Container>
	);
}
