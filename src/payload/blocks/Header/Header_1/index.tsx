"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type ComponentPropsWithRef, useEffect, useState } from "react";

import type { Header_1_Block } from "~/payload-types";

import MediaField from "~/payload/fields/media";
import { cn } from "~/styles/utils";
import { Button } from "~/ui/button";

export * from "./config";

export default function Header_1({
	actionButtons,
	brandLogo,
	logoHref = "/",
	menuItems,
	preview = false,
	...navProps
}: ComponentPropsWithRef<"nav"> & Header_1_Block & { preview?: boolean }) {
	const [menuState, setMenuState] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	return (
		<header>
			<nav
				className={cn("fixed z-20 w-full px-2", preview && "relative")}
				data-state={menuState && "active"}
				id="header"
				{...navProps}
			>
				<div
					className={cn(
						"mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
						isScrolled &&
						"bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
					)}
				>
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full justify-between lg:w-auto">
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
								aria-label={menuState == true ? "Close Menu" : "Open Menu"}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
								onClick={() => setMenuState(!menuState)}
							>
								<Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
								<X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
							</button>

							<div className="absolute inset-0 m-auto hidden size-fit lg:block">
								<ul className="flex gap-8 text-sm">
									{menuItems.map((item, index) => (
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

						<div className="bg-background absolute top-[125%] z-10 mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:w-fit lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-6 text-base">
									{menuItems.map((item, index) => (
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
