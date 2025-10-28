"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentPropsWithRef } from "react";

import type { Footer_5_Block, Media } from "~/payload-types";

import SocialIcon from "~/payload/fields/socialLinks";
import { cn } from "~/styles/utils";

export * from "./config";

export default function Footer_5({
	brandLogo,
	className,
	copyright,
	links,
	socialLinks,
	...divProps
}: ComponentPropsWithRef<"div"> & Footer_5_Block) {
	return (
		<footer
			className={cn("border-b bg-white pt-20 dark:bg-transparent", className)}
			{...divProps}
		>
			<div className="mb-8 border-b md:mb-12">
				<div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
					{brandLogo && (
						<Link aria-label="go home" className="block size-fit" href="/">
							<Image
								alt={(brandLogo as Media).alt}
								height={150}
								src={(brandLogo as Media).url!}
								width={200}
							/>
						</Link>
					)}
					<div className="flex flex-wrap justify-center gap-6 text-sm">
						{socialLinks.map((icon, index) => (
							<SocialIcon href={icon.href} icon={icon.icon} key={`${index}`} />
						))}
					</div>
				</div>
			</div>
			<div className="mx-auto max-w-5xl px-6">
				<div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
					<div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3">
						{links?.map((link, index) => (
							<div className="space-y-4 text-sm" key={index}>
								<span className="block font-medium">{link.group}</span>
								{link.items?.map((item, index) => (
									<Link
										className="text-muted-foreground hover:text-primary block duration-150"
										href={item.href}
										key={index}
									>
										<span>{item.label}</span>
									</Link>
								))}
							</div>
						))}
					</div>
				</div>
				{copyright ? (
					<div className="bg-muted mt-16 flex items-center justify-between rounded-md p-4 px-6 py-3">
						<small className="text-muted-foreground order-last block text-center text-sm md:order-first">
							{`© ${new Date().getFullYear()} ${copyright?.copyright ?? ""}`}
						</small>
						<div className="flex">
							{copyright?.actions?.map((action, index) => {
								if (!action.label || !action.href) {return null;}

								return (
									<Link href={action.href} key={`${index}-${action.label}`}>
										{action.label}
									</Link>
								);
							})}
						</div>
					</div>
				) : null}
			</div>
		</footer>
	);
}
