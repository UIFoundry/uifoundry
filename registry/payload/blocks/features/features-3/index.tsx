import type { ComponentPropsWithRef } from "react";

import type { Features_3_Block } from "~/payload-types";

import { Card, CardContent, CardHeader } from "@/registry/ui/card";
import { Icon } from "@/registry/ui/icon";

export * from "./config";

export default function Features_3({
	features,
	header,
	subheader,
}: Features_3_Block) {
	return (
		<section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
			<div className="@container mx-auto max-w-5xl px-6">
				<div className="text-center">
					<h2 className="text-4xl font-semibold text-balance lg:text-5xl">
						{header}
					</h2>
					<p className="mt-4">{subheader}</p>
				</div>
				<Card className="mx-auto mt-8 grid max-w-sm overflow-hidden *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3">
					{features.map((feature, index) => (
						<div className="group" key={`feature-${index}`}>
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
			className="relative mx-auto size-36 duration-200 dark:group-hover:bg-white/5"
			{...divProps}
		>
			<div
				aria-hidden
				className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
			/>
			<div
				aria-hidden
				className="absolute inset-0 bg-[linear-gradient(to_left,var(--color-border)_1px,transparent_1px),linear-gradient(to_top,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
			/>
			<div
				aria-hidden
				className="to-white absolute inset-0 bg-radial from-transparent to-75%"
			/>
			<div className="bg-transparent absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
				{children}
			</div>
		</div>
	);
}
