import type { ComponentPropsWithRef } from "react";
import type { Features_1_Block } from "~/payload-types";
import { Card, CardHeader, CardContent } from "~/ui/card";
import { Icon } from "~/ui/icon";

export * from "./config";

export default function Features_1({
  header,
  subheader,
  features,
}: Features_1_Block) {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            {header}
          </h2>
          <p className="mt-4">{subheader}</p>
        </div>
        <Card className="mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0">
          {features.map((feature, index) => (
            <div className="group shadow-zinc-950/5" key={`feature-${index}`}>
              <CardHeader className="pb-3">
                {feature.icon && (
                  <CardDecorator>
                    <Icon icon={feature.icon} />
                  </CardDecorator>
                )}

                <h3 className="mt-6 font-medium">{feature.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm">{feature.description}</p>
              </CardContent>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

function CardDecorator({
  children,
  ...divProps
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
      {...divProps}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      <div
        aria-hidden
        className="to-background absolute inset-0 bg-radial from-transparent to-75%"
      />
      <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
        {children}
      </div>
    </div>
  );
}
