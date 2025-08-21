import type { Features_2_Block } from "~/payload-types";
import { Icon } from "~/ui/icon";

export * from "./config";

export default function Features(props: NonNullable<Features_2_Block>) {
	return (
		<section className="py-12 md:py-20">
			<div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
				<div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
					<h2 className="text-4xl font-medium text-balance lg:text-5xl">
						{props.header ?? ""}
					</h2>
					<p>{props.subheader ?? ""}</p>
				</div>

				<div className="relative mx-auto grid max-w-4xl divide-x divide-y rounded-md border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
					{(props.features ?? []).map((feature, index) => (
						<div className="space-y-2" key={`feature-${index}`}>
							<div className="flex items-center gap-2">
								<Icon icon={feature.icon} />
								<h3 className="text-sm font-medium">{feature.header}</h3>
							</div>
							<p className="text-sm">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
