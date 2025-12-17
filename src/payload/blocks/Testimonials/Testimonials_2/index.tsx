/**
 * Testimonials 2 Component
 *
 * Source: @irsyad/testimonials-02 (IntentUI)
 * License: Pro Subscription
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded content with dynamic props
 * - Updated import paths for UIFoundry project structure
 */

import type { Testimonials_2_Block } from "~/payload-types";

import { Avatar } from "~/ui/avatar-intentui";
import { Container } from "~/ui/container";

export default function Testimonials2(props: Testimonials_2_Block) {
  return (
    <Container className="py-6 sm:py-16">
      <h1 className="sr-only">Testimonials</h1>
      <div className="mb-8 text-center sm:mb-16">
        <h2 className="mb-4 font-semibold text-3xl md:text-4xl">{props.header}</h2>
        <p className="mx-auto max-w-2xl text-muted-fg text-xl">{props.subheader}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-2 md:grid-cols-2 lg:grid-cols-3">
        {props.testimonials?.map((t) => (
          <div className="relative rounded-3xl border bg-secondary/40 p-6 sm:p-10" key={t.id}>
            <span className="-z-10 absolute top-4 left-4 font-serif text-9xl text-muted-fg opacity-20">
              &quot;
            </span>
            <blockquote className="relative text-pretty text-base text-muted-fg italic">
              {t.quote}
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <Avatar alt={t.name} size="lg" src={t.avatar} />
              <div>
                <div className="font-semibold text-base/6">{t.name}</div>
                <div className="text-muted-fg text-sm">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
