/**
 * Header 5 Component
 *
 * Source: https://tailark.com/r/hero-section-4.json (header.tsx)
 * License: Free Tier
 * Adapted from: Tailark Hero Section 4 - Header Component
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded menuItems with dynamic props from Header_5_Block
 * - Replaced Logo component with Home icon from lucide-react
 * - Added preview prop support for admin panel rendering
 * - Preserved backdrop blur and border styling
 */

"use client";

import type { ComponentPropsWithRef } from "react";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import type { Header_5_Block } from "~/payload-types";

import MediaField from "~/payload/fields/media";
import { cn } from "~/styles/utils";
import { Button } from "~/ui/button";

export * from "./config";

export default function Header_5({
	actionButtons,
	brandLogo,
	logoHref,
	menuItems,
	preview = false,
	...navProps
}: ComponentPropsWithRef<"nav"> & Header_5_Block & { preview?: boolean }) {
	const [menuState, setMenuState] = React.useState(false);

	return (
		<header className="border-b">
			<nav
				className={cn(
					"bg-background/50 fixed z-20 w-full",
					preview && "relative",
				)}
				data-state={menuState && "active"}
				{...navProps}
			>
				<div className="mx-auto max-w-6xl px-6 transition-all duration-300">
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full items-center justify-between gap-12 lg:w-auto">
							{brandLogo && (
								<Link
									aria-label="home"
									className="relative h-8 w-24 lg:w-32"
									href={logoHref}
								>
									<MediaField
										className="object-contain object-left"
										fill
										media={brandLogo}
									/>
								</Link>
							)}

							<button
								aria-controls="mobile-menu"
								aria-expanded={menuState}
								aria-label={menuState == true ? "Close Menu" : "Open Menu"}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
								onClick={() => setMenuState(!menuState)}
							>
								<Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
								<X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
							</button>

							<div className="hidden lg:block">
								<ul className="flex gap-8 text-sm">
									{menuItems?.map((item, index) => (
										<li key={index}>
											<Link
												className="text-muted-foreground hover:text-accent-foreground block duration-150"
												href={item.href}
											>
												<span>{item.label}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="hidden lg:flex lg:gap-3">
							{actionButtons && actionButtons.length > 0 && (
								<>
									{actionButtons.map((button, index) => (
										<Button
											asChild
											key={index}
											size="sm"
											variant={button.variant}
										>
											<Link href={button.href}>
												<span>{button.label}</span>
											</Link>
										</Button>
									))}
								</>
							)}
						</div>

						<div className="bg-background absolute top-[125%] z-10 mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:w-fit lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent" id="mobile-menu">
							<div className="lg:hidden">
								<ul className="space-y-6 text-base">
									{menuItems?.map((item, index) => (
										<li key={index}>
											<Link
												className="text-muted-foreground hover:text-accent-foreground block duration-150"
												href={item.href}
											>
												<span>{item.label}</span>
											</Link>
										</li>
									))}
								</ul>

								{actionButtons && actionButtons.length > 0 && (
									<div className="mt-6 flex flex-col space-y-3">
										{actionButtons.map((button, index) => (
											<Button
												asChild
												key={index}
												size="sm"
												variant={button.variant}
											>
												<Link href={button.href}>
													<span>{button.label}</span>
												</Link>
											</Button>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
