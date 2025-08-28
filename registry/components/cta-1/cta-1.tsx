import React from "react";
import { Button } from "~/ui/button";
import Link from "next/link";

interface ComponentProps {
  header?: string;
  subheader?: string;
  actions?: Array<{
    label?: string;
    href?: string;
    variant?: "default" | "outline" | "ghost";
  }>;
}

export default function CallToAction(props: ComponentProps) {
  const actions = props.actions ?? [];
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            {props.header}
          </h2>
          <p className="mt-4">{props.subheader}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {actions.map((action, index) => (
              <Button
                asChild
                size="lg"
                variant={action.variant}
                key={`cta-action-${index}`}
              >
                <Link href={action.href ?? "/"}>
                  <span>{action.label ?? "Get Started"}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
