"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentPropsWithRef } from "react";
import type { Footer_2_Block, Media } from "~/payload-types";
import SocialIcon from "~/payload/fields/socialLinks";
import { cn } from "~/styles/utils";

export default function Footer_2({
	brandLogo,
	links,
	socialLinks,
	copyright,
	className,
	...divProps
}: Footer_2_Block & ComponentPropsWithRef<"div">) {
	return (
		<footer
			className={cn("border-b bg-white pt-20 dark:bg-transparent", className)}
			{...divProps}
		>
			<div className="mx-auto max-w-5xl px-6">
				<div className="grid gap-12 md:grid-cols-5">
					<div className="md:col-span-2">
						<Link href="/" aria-label="go home" className="block size-fit">
							{brandLogo && (
								<Image
									src={(brandLogo as Media).url!}
									alt={(brandLogo as Media).alt}
									width={200}
									height={150}
								/>
							)}
						</Link>
					</div>

					<div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
						{links?.map((link, index) => (
							<div key={index} className="space-y-4 text-sm">
								<span className="block font-medium">{link.group}</span>
								{link.items?.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className="text-muted-foreground hover:text-primary block duration-150"
									>
										<span>{item.label}</span>
									</Link>
								))}
							</div>
						))}
					</div>
				</div>
				<div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
					<span className="text-muted-foreground order-last block text-center text-sm md:order-first">
						© {new Date().getFullYear()} {copyright}
					</span>
					<div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
						{socialLinks.map((icon, index) => (
							<SocialIcon icon={icon.icon} href={icon.href} key={`${index}`} />
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
