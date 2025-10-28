import Link from "next/link";
import { type ComponentPropsWithRef } from "react";

import type { Footer_4_Block } from "~/payload-types";

import { cn } from "~/styles/utils";

export * from "./config";

export default function Footer_4({
	className,
	copyright,
	links,
	...divProps
}: ComponentPropsWithRef<"div"> & Footer_4_Block) {
	return (
		<footer
			className={cn("border-b bg-white py-12 dark:bg-transparent", className)}
			{...divProps}
		>
			<div className="mx-auto max-w-5xl px-6">
				<div className="flex flex-wrap justify-between gap-6">
					<span className="text-muted-foreground order-last block text-center text-sm md:order-first">
						© {new Date().getFullYear()} {copyright}
					</span>
					<div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
						{links?.map((link, index) => (
							<Link
								className="text-muted-foreground hover:text-primary block duration-150"
								href={link.href}
								key={index}
							>
								<span>{link.label}</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
