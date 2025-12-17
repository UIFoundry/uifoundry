import type { Testimonials_1_Block } from "~/payload-types";

import { Avatar } from "~/ui/avatar-intentui";
import { Container } from "~/ui/container";

export default function Testimonials1(props: Testimonials_1_Block) {
  return (
    <Container className="py-6 sm:py-16">
      <h1 className="sr-only">Testimonials</h1>
      <div className="mb-8 text-center sm:mb-16">
        <h2 className="mb-4 font-semibold text-3xl md:text-4xl">
          {props.header}
        </h2>
        <p className="mx-auto max-w-2xl text-muted-fg text-xl">
          {props.subheader}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-20 md:grid-cols-2 lg:grid-cols-3">
        {props.testimonials?.map((testimonial, index) => (
          <div
            className="relative mx-auto flex max-w-sm flex-col gap-y-4"
            key={testimonial.id ?? index}
          >
            {testimonial.avatar && (
              <Avatar
                alt={testimonial.name}
                className="mx-auto"
                size="2xl"
                src={testimonial.avatar}
              />
            )}

            <blockquote className="relative text-pretty text-center text-base/6 text-muted-fg italic">
              {testimonial.quote}
            </blockquote>

            <div className="text-center">
              <div className="font-semibold text-base/8">
                {testimonial.name}
              </div>
              <div className="text-muted-fg text-sm">{testimonial.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
