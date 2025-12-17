import type { Stats_1_Block } from "~/payload-types";

import { Container } from "~/ui/container";
import { Heading } from "~/ui/heading";

export default function Stats1(props: Stats_1_Block) {
	return (
		<Container className="py-6 sm:py-16">
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<div className="text-center">
					<Heading className="font-normal sm:text-3xl" level={2}>
						{props.header}
					</Heading>
					<p className="mx-auto mt-1 max-w-lg text-lg/8 text-muted-fg">
						{props.subheader}
					</p>
				</div>

				<dl className="mt-8 grid grid-cols-1 divide-y overflow-hidden rounded-2xl border bg-muted/50 text-center sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
					{props.stats?.map((stat, index) => (
						<div className="flex flex-col p-8 text-sm/6" key={index}>
							<dt className="text-muted-fg">{stat.name}</dt>
							<dd className="order-first text-3xl tracking-tight">{stat.value}</dd>
						</div>
					))}
				</dl>
			</div>
		</Container>
	);
}
