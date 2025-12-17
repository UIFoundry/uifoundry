import type { FAQ_2_Block } from "~/payload-types";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "~/ui/disclosure-group";
import { Link } from "~/ui/link";

export * from "./config";

export default function FAQ2(props: NonNullable<FAQ_2_Block>) {
  return (
    <div className="relative isolate mx-auto flex max-w-(--breakpoint-2xl) items-center justify-center p-6 sm:py-16">
      <div className="w-full max-w-3xl">
        <div className="mb-12 text-center">
          {props.header && (
            <h1 className="font-semibold text-4xl">{props.header}</h1>
          )}
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {(props.subheader || props.documentationText) && (
            <p className="mt-4 text-pretty text-muted-fg">
              {props.subheader}
              {props.documentationText && props.documentationHref && (
                <>
                  {" "}
                  <Link
                    className="[--text:var(--color-teal-600)] hover:underline dark:[--text:var(--color-teal-400)]"
                    href={props.documentationHref}
                  >
                    {props.documentationText}
                  </Link>
                </>
              )}
            </p>
          )}
        </div>

        <DisclosureGroup
          allowsMultipleExpanded
          className="[--disclosure-radius:var(--radius-xl)]"
        >
          {(props.faq ?? []).map((faq, index) => (
            <Disclosure id={index} key={index}>
              <DisclosureTrigger className="p-4 text-base/6">
                {faq.question}
              </DisclosureTrigger>
              <DisclosurePanel className="*:px-4 *:pb-4 *:text-base/7">
                {faq.answer}
              </DisclosurePanel>
            </Disclosure>
          ))}
        </DisclosureGroup>
      </div>
    </div>
  );
}
