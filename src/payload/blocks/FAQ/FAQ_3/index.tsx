/**
 * FAQ 3 Component
 *
 * Source: @irsyad/faq-03 (IntentUI)
 * License: Pro Subscription
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 */

import { twJoin } from "tailwind-merge";

import type { FAQ_3_Block } from "~/payload-types";

import {
	Disclosure,
	DisclosureGroup,
	DisclosurePanel,
	DisclosureTrigger,
} from "~/ui/disclosure-group";
import { Link } from "~/ui/link";

export * from "./config";

export default function FAQ3(props: NonNullable<FAQ_3_Block>) {
	return (
		<div className="relative isolate mx-auto flex max-w-(--breakpoint-2xl) items-center justify-center p-6 sm:py-16">
			<div
				aria-hidden="true"
				className="-top-40 -z-10 sm:-top-40 fixed inset-x-0 transform-gpu overflow-hidden blur-3xl"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="-translate-x-1/2 relative left-[calc(50%-11rem)] hidden aspect-1155/678 w-144.5 rotate-30 bg-linear-to-tr from-emerald-700 to-cyan-@00 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75 dark:block"
				/>
			</div>
			<div className="w-full max-w-3xl">
				<div className="mb-12 text-center">
					{props.header && (
						<h1 className="font-semibold text-4xl">{props.header}</h1>
					)}
					{(props.subheader || props.supportLinkText) && (
						<p className="mt-4 text-pretty text-muted-fg">
							{props.subheader}{" "}
							{props.supportLinkText && props.supportLinkHref && (
								<Link
									href={props.supportLinkHref}
									className="[--text:var(--color-emerald-600)] hover:underline dark:[--text:var(--color-emerald-400)]"
								>
									{props.supportLinkText}
								</Link>
							)}
						</p>
					)}
				</div>

				<DisclosureGroup
					allowsMultipleExpanded
					className={twJoin(
						"[--disclosure-radius:var(--radius-xl)]",
						"[--disclosure-collapsed-bg:var(--color-emerald-50)] dark:[--disclosure-collapsed-bg:var(--color-emerald-950)]/50",
						"[--disclosure-collapsed-fg:var(--color-emerald-700)] dark:[--disclosure-collapsed-fg:var(--color-emerald-200)]",
						"[--disclosure-collapsed-border:var(--color-emerald-600)]/20",
						"[--disclosure-expanded-bg:var(--color-emerald-200)]/50 dark:[--disclosure-expanded-bg:var(--color-emerald-600)]/20",
						"[--disclosure-expanded-fg:var(--color-emerald-800)] dark:[--disclosure-expanded-fg:var(--color-emerald-300)]",
						"[--disclosure-expanded-border:var(--color-emerald-600)]/30",
					)}
				>
					{(props.faq ?? []).map((faq, index) => (
						<Disclosure key={index} id={index}>
							<DisclosureTrigger className="p-4 text-base/6">
								{faq.question}
							</DisclosureTrigger>
							<DisclosurePanel className="*:px-4 *:pb-3 *:text-base/7">
								{faq.answer}
							</DisclosurePanel>
						</Disclosure>
					))}
				</DisclosureGroup>
			</div>
		</div>
	);
}
