// Source: IntentUI - https://design.intentui.com/blocks (stats-02)
// Installed via: npx shadcn@latest add @irsyad/stats-02

import { Container } from "@/registry/ui/container";
import type { Stats_2_Block } from "~/payload-types";

export default function Stats2(props: Stats_2_Block) {
	return (
		<div className="py-6 sm:py-12">
			<Container>
				<div className="xl:grid xl:grid-flow-col-dense xl:gap-x-8">
					<div className="relative">
						<div className="max-w-3xl">
							{props.eyebrow && (
								<h2 className="font-semibold text-base text-primary-subtle-fg">
									{props.eyebrow}
								</h2>
							)}
							<p className="mt-2 text-pretty font-bold text-3xl text-fg tracking-tight">
								{props.header}
							</p>
							<p className="mt-2 text-lg text-muted-fg">{props.subheader}</p>
						</div>
						<div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
							{props.stats?.map((item, index) => (
								<div
									className="rounded-lg border border-muted-fg/20 p-6 ring ring-muted-fg/30 ring-offset-4 ring-offset-muted"
									key={index}
								>
									<span className="block font-semibold text-3xl text-fg">{item.stat}</span>
									<span className="mt-2 block text-base/6 text-muted-fg">
										<strong className="font-medium text-fg">{item.emphasis}</strong>{" "}
										{item.description}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}
