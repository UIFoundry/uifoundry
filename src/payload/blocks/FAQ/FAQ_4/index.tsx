/**
 * FAQ 4 Component
 *
 * Source: @irsyad/faq-04 (IntentUI)
 * License: Pro Subscription
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 * - Changed from client component to server component
 */

import { twJoin } from "tailwind-merge";
import type { FAQ_4_Block } from "~/payload-types";
import {
	Disclosure,
	DisclosureGroup,
	DisclosurePanel,
	DisclosureTrigger,
} from "~/ui/disclosure-group";
import { Link } from "~/ui/link";

export * from "./config";

export default function FAQ4(props: FAQ_4_Block) {
	const faqs = props.faq ?? [];

	return (
		<div className="relative isolate mx-auto flex max-w-(--breakpoint-2xl) items-center justify-center p-6 sm:py-16">
			<div className="w-full max-w-3xl">
				<div className="mb-12 text-center">
					{props.header && (
						<h1 className="font-semibold text-4xl">{props.header}</h1>
					)}
					{(props.supportText || props.supportLinkLabel) && (
						<p className="mt-4 text-pretty text-muted-fg">
							{props.supportText}{" "}
							{props.supportLinkLabel && (
								<Link
									href={props.supportLinkHref || "#"}
									className="[--text:var(--color-zinc-600)] hover:underline dark:[--text:var(--color-zinc-400)]"
								>
									{props.supportLinkLabel}
								</Link>
							)}
						</p>
					)}
				</div>

				<DisclosureGroup
					defaultExpandedKeys={[1]}
					allowsMultipleExpanded
					className={twJoin(
						"[--disclosure-collapsed-bg:transparent]",
						"[--disclosure-collapsed-fg:var(--color-muted-fg)]",
						"[--disclosure-collapsed-border:transparent]",
						"[--disclosure-expanded-bg:var(--color-muted)]",
						"[--disclosure-expanded-fg:var(--color-fg)]",
						"[--disclosure-expanded-border:transparent",
					)}
				>
					{faqs.map((faq, index) => (
						<Disclosure key={index + 1} id={index + 1}>
							<DisclosureTrigger>{faq.question}</DisclosureTrigger>
							<DisclosurePanel>{faq.answer}</DisclosurePanel>
						</Disclosure>
					))}
				</DisclosureGroup>
			</div>
		</div>
	);
}
