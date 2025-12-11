/**
 * Testimonials 4 Component
 *
 * Source: @irsyad/testimonials-04 (IntentUI)
 * License: Pro Subscription
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 * - Adapted avatar handling for PayloadCMS Media uploads
 */

import { Avatar } from "@/registry/ui/avatar-intentui";
import { Container } from "@/registry/ui/container";
import type { Testimonials_4_Block } from "~/payload-types";
import type { Media } from "~/payload-types";

export default function Testimonials4(props: Testimonials_4_Block) {
	return (
		<Container className="py-6 sm:py-16">
			<h1 className="sr-only">Testimonials</h1>
			<div className="mb-8 text-center sm:mb-12">
				<h2 className="mb-4 font-semibold text-3xl md:text-4xl">{props.header}</h2>
				<p className="mx-auto max-w-2xl text-muted-fg text-xl">{props.subheader}</p>
			</div>

			<div className="columns-1 gap-2 space-y-2 sm:columns-2 lg:columns-3">
				{props.testimonials?.map((t, index) => {
					const avatarSrc =
						typeof t.avatar === "object" && t.avatar !== null
							? (t.avatar as Media).url
							: undefined;

					return (
						<div
							key={t.id || index}
							className="relative break-inside-avoid rounded-2xl border border-border bg-muted/50 p-6 duration-200 hover:shadow-md sm:p-8"
						>
							<span className="-z-10 absolute top-16 left-4 font-serif text-9xl text-muted-fg opacity-20">
								"
							</span>
							<div className="flex items-center gap-4">
								<Avatar
									src={avatarSrc}
									alt={t.name ?? ""}
									size="lg"
									initials={
										t.name
											? t.name
													.split(" ")
													.map((n) => n[0])
													.join("")
													.toUpperCase()
													.slice(0, 2)
											: undefined
									}
								/>
								<div>
									<div className="font-semibold text-fg text-sm">{t.name}</div>
									<div className="text-muted-fg text-xs">{t.role}</div>
								</div>
							</div>
							<blockquote className="mt-4 text-pretty text-base/7 text-muted-fg italic">
								"{t.quote}"
							</blockquote>
						</div>
					);
				})}
			</div>
		</Container>
	);
}
