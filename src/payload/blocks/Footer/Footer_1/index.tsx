"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentPropsWithRef } from "react";

import type { Footer_1_Block, Media } from "~/payload-types";

import SocialIcon from "~/payload/fields/socialLinks";

export default function Footer_1({
	brandLogo,
	copyright,
	links,
	socialLinks,
	...divProps
}: ComponentPropsWithRef<"div"> & Footer_1_Block) {
	return (
		<footer {...divProps}>
			<div className="mx-auto max-w-5xl px-6 py-8 md:py-16">
				<Link aria-label="go home" className="mx-auto block size-fit" href="/">
					{brandLogo && (
						<Image
							alt={(brandLogo as Media).alt}
							height={150}
							src={(brandLogo as Media).url!}
							width={200}
						/>
					)}
				</Link>

				<div className="flex flex-wrap justify-center gap-6 text-sm">
					{(links ?? []).map((link, index) => (
						<Link
							className="text-muted-foreground hover:text-primary block duration-150"
							href={link.href}
							key={index}
						>
							<span>{link.label}</span>
						</Link>
					))}
				</div>
				<div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
					{socialLinks.map((icon, index) => (
						<SocialIcon href={icon.href} icon={icon.icon} key={`${index}`} />
					))}
				</div>
				<span className="text-muted-foreground block text-center text-sm">
					{" "}
					© {new Date().getFullYear()} {copyright}
				</span>
			</div>
		</footer>
	);
}
