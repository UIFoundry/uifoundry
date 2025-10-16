"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentPropsWithRef } from "react";
import type { Footer_3_Block, Media } from "~/payload-types";
import SocialIcon from "~/payload/fields/socialLinks";
import { cn } from "~/styles/utils";

export default function Footer_3({
	brandLogo,
	copyright,
	links,
	socialLinks,
	className,
	...divProps
}: Footer_3_Block & ComponentPropsWithRef<"div">) {
	return (
		<footer
			className={cn("border-b bg-white pt-20 dark:bg-transparent", className)}
			{...divProps}
		>
			<div className="mb-8 border-b md:mb-12">
				<div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
					{brandLogo && (
						<Link href="/" aria-label="go home" className="block size-fit">
							<Image
								src={(brandLogo as Media).url!}
								alt={(brandLogo as Media).alt}
								width={200}
								height={150}
							/>
						</Link>
					)}
					<div className="flex flex-wrap justify-center gap-6 text-sm">
						{socialLinks.map((icon, index) => (
							<SocialIcon icon={icon.icon} href={icon.href} key={`${index}`} />
						))}
					</div>
				</div>
			</div>
			<div className="mx-auto max-w-5xl px-6">
				<div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
					<div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3">
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
					<small className="text-muted-foreground order-last block text-center text-sm md:order-first">
						© {new Date().getFullYear()} {copyright}
					</small>
				</div>
			</div>
		</footer>
	);
}
