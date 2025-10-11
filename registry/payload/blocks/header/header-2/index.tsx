"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ComponentPropsWithRef } from "react";
import type { Header_2_Block, MediaField as MediaFieldProps } from "~/payload-types";
import { cn } from "@/registry/default/utils";
import { Button } from "@/registry/ui/button";
import MediaField from "@/registry/default/lib/fields/media";

export * from "./config";

export default function Header_2({
	preview = false,
	brandLogo,
	logoHref,
	menuItems,
	actionButtons,
	...navProps
}: { preview?: boolean } & Header_2_Block & ComponentPropsWithRef<"nav">) {
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
				data-state={menuState && "active"}
				id="header"
				className={cn(
					"fixed z-20 w-full border-b transition-colors duration-150",
					isScrolled && "bg-background/50 backdrop-blur-3xl",
					preview && "relative",
				)}
				{...navProps}
			>
				<div className="mx-auto max-w-5xl px-6 transition-all duration-300">
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full items-center justify-between gap-12 lg:w-auto">
							{brandLogo && (
								<Link
									href={logoHref}
									aria-label="home"
									className="relative h-8 w-24 lg:w-32"
								>
									<MediaField
										media={brandLogo as MediaFieldProps}
										fill
										className="object-contain object-left"
									/>
								</Link>
							)}

							<button
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState == true ? "Close Menu" : "Open Menu"}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
							>
								<Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
								<X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
							</button>

							<div className="hidden lg:block">
								<ul className="flex gap-8 text-sm">
									{menuItems.map((item, index) => (
										<li key={index}>
											<Link
												href={item.href}
												className="text-muted-foreground hover:text-accent-foreground block duration-150"
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
											key={index}
											asChild
											variant={button.variant}
											size="sm"
										>
											<Link href={button.href}>
												<span>{button.label}</span>
											</Link>
										</Button>
									))}
								</>
							)}
						</div>

						<div className="bg-background absolute top-[125%] mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:w-fit lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-6 text-base">
									{menuItems.map((item, index) => (
										<li key={index}>
											<Link
												href={item.href}
												className="text-muted-foreground hover:text-accent-foreground block duration-150"
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
												key={index}
												asChild
												variant={button.variant}
												size="sm"
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
