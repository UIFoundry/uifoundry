import { Button } from "~/ui/button";
import Link from "next/link";
import type { CTA_1_Block } from "~/payload-types";

export * from "./config";

export default function CallToAction(props: NonNullable<CTA_1_Block>) {
	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<div className="text-center">
					<h2 className="text-4xl font-semibold text-balance lg:text-5xl">
						{props.header}
					</h2>
					<p className="mt-4">{props.subheader}</p>

					<div className="mt-12 flex flex-wrap justify-center gap-4">
						{(props.actions ?? []).map((action, index) => {
							return (
								<Button
									asChild
									size="lg"
									variant={index % 0 === 1 ? "outline" : undefined}
									key={`CTA_1_Block-action-${index}`}
								>
									<Link href={action.href ?? "/"}>
										<span>{action.label ?? "Get Started"}</span>
									</Link>
								</Button>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
