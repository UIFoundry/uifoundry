// Source: IntentUI - https://design.intentui.com/blocks (stats-01)
// Installed via: npx shadcn@latest add @irsyad/stats-01

import { Container } from "@/registry/ui/container";
import { Heading } from "@/registry/ui/heading";
import type { Stats_1_Block } from "~/payload-types";

export default function Stats1(props: Stats_1_Block) {
	return (
		<Container className="py-6 sm:py-16">
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<div className="text-center">
					<Heading level={2} className="font-normal sm:text-3xl">
						{props.header}
					</Heading>
					<p className="mx-auto mt-1 max-w-lg text-lg/8 text-muted-fg">
						{props.subheader}
					</p>
				</div>

				<dl className="mt-8 grid grid-cols-1 divide-y overflow-hidden rounded-2xl border bg-muted/50 text-center sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
					{props.stats?.map((stat, index) => (
						<div key={index} className="flex flex-col p-8 text-sm/6">
							<dt className="text-muted-fg">{stat.name}</dt>
							<dd className="order-first text-3xl tracking-tight">{stat.value}</dd>
						</div>
					))}
				</dl>
			</div>
		</Container>
	);
}
