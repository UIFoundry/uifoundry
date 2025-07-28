"use client"

import Link from "next/link"
import { type ComponentPropsWithRef } from "react"
import type { Footer_1_Block, Media } from "~/payload-types"
import SocialIcon from "~/ui/icons/social-icon"

export * from "./config";

export default function Footer_1({ brandLogo, links, socialLinks, copyright, ...divProps }: Footer_1_Block & ComponentPropsWithRef<"div">) {
	return (
		<footer {...divProps}>
			<div className="mx-auto py-8 md:py-16 max-w-5xl px-6">
				<Link
					href="/"
					aria-label="go home"
					className="mx-auto block size-fit">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					{brandLogo && <img src={(brandLogo as Media).url!} alt={(brandLogo as Media).alt} width={200} height={150} />}
				</Link>

				<div className="flex flex-wrap justify-center gap-6 text-sm">
					{(links ?? []).map((link, index) => (
						<Link
							key={index}
							href={link.href}
							className="text-muted-foreground hover:text-primary block duration-150">
							<span>{link.label}</span>
						</Link>
					))}
				</div>
				<div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
					{socialLinks.map((icon, index) => (<SocialIcon icon={icon.icon} href={icon.href} key={`${index}`} />))}
				</div>
				<span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} {copyright}</span>
			</div>
		</footer>
	)
}
