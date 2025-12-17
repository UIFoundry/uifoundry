/**
 * FAQ 5 Component
 *
 * Source: @irsyad/faq-05 (IntentUI)
 * License: Pro Subscription
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 */

import { twJoin } from "tailwind-merge";

import type { FAQ_5_Block } from "~/payload-types";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "~/ui/disclosure-group";
import { Link } from "~/ui/link";

export * from "./config";

export default function FAQ5Section(props: FAQ_5_Block) {
  // Convert array of key objects to array of numbers
  const defaultExpandedKeys =
    props.defaultExpandedKeys?.map((item) => item.key).filter((key): key is number => key !== null && key !== undefined) ?? [1, 2];

  return (
    <div className="relative isolate mx-auto flex max-w-(--breakpoint-2xl) items-center justify-center p-6 sm:py-16">
      <div className="w-full max-w-3xl">
        <div className="mb-12 text-center">
          {props.header && (
            <h1 className="font-semibold text-4xl">{props.header}</h1>
          )}
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {(props.subheader || props.documentationLinkText) && (
            <p className="mt-4 text-pretty text-muted-fg">
              {props.subheader}{" "}
              {props.documentationLinkText && props.documentationLinkHref && (
                <Link
                  className="[--text:var(--color-fg)] hover:underline"
                  href={props.documentationLinkHref}
                >
                  {props.documentationLinkText}
                </Link>
              )}
            </p>
          )}
        </div>

        <DisclosureGroup
          allowsMultipleExpanded
          className={twJoin([
            "gap-y-4",
            "[--disclosure-expanded-fg:var(--color-fg)]",
            "[--disclosure-collapsed-fg:var(--color-muted-fg)]",
            "[--disclosure-collapsed-bg:transparent]",
            "[--disclosure-collapsed-border:transparent]",
            "[--disclosure-expanded-bg:transparent]",
          ])}
          defaultExpandedKeys={defaultExpandedKeys}
        >
          {props.faqs?.map((faq, index) => (
            <Disclosure className="inset-ring-0" id={index + 1} key={index}>
              <DisclosureTrigger className="h-11 rounded-none p-0 text-base/6 sm:p-0">
                {faq.question}
              </DisclosureTrigger>
              <DisclosurePanel className="**:px-0 *:pt-2 *:text-base/7 sm:**:px-0">
                {faq.answer}
              </DisclosurePanel>
            </Disclosure>
          ))}
        </DisclosureGroup>
      </div>
    </div>
  );
}
