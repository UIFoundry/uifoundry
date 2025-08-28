import React from "react";

interface ComponentProps {
  header?: string;
  subheader?: string;
  alertLabel?: string;
  alertLink?: string;
  media?: {
    light?: { url: string; alt: string };
    dark?: { url: string; alt: string };
  };
  actions?: Array<{ label?: string; href?: string }>;
  features?: Array<{ title?: string; description?: string; icon?: string }>;
  faqs?: Array<{ question?: string; answer?: string }>;
  members?: Array<{ name?: string; role?: string; bio?: string }>;
  stats?: Array<{ label?: string; value?: string }>;
  testimonials?: Array<{ content?: string; author?: string; role?: string }>;
  [key: string]: any;
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/ui/accordion";
import Link from "next/link";

export default function FAQsFour(props: ComponentProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            our platform, services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
          >
            {(props.faqs ?? []).map((faq, index) => (
              <div className="group" key={`FAQ_!_Block-questions-${index}`}>
                <AccordionItem
                  value={`${index}`}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>

          {props.supportLink && (
            <p className="text-muted-foreground mt-6 px-8">
              {`Can't find what you're looking for? Contact our `}
              <Link
                href={props.supportLink}
                className="text-primary font-medium hover:underline"
              >
                customer support team
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
