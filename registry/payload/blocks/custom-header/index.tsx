"use client";

import type { CustomHeaderBlock } from "~/payload-types";
import RenderBlocks from "@/registry/default/components/RenderBlocks";
import { useEffect, useState } from "react";
import { cn } from "@/registry/default/utils";
import { blockComponents } from "./blocks";
import { Menu, X } from "lucide-react";
import { BLOCK_SLUG_HEADER_MENU_ITEMS } from "@/registry/default/lib/constants/blocks";

export default function Header({
	preview = false,
	items,
}: {
	preview?: boolean;
} & CustomHeaderBlock) {
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
				className={cn("fixed z-20 w-full px-2", preview && "relative")}
			>
				<div
					className={cn(
						"mx-auto mt-4 mb-8 max-w-6xl px-6 transition-all duration-300 lg:px-12",
						isScrolled &&
						"bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
					)}
				>
					<div className="relative flex flex-wrap items-center justify-between gap-6 px-4 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full items-center justify-between">
							<div className="flex justify-between lg:hidden lg:w-auto">
								<button
									onClick={() => setMenuState(!menuState)}
									aria-label={menuState == true ? "Close Menu" : "Open Menu"}
									className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
								>
									<Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
									<X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
								</button>
							</div>
							<div className="relative flex items-center">
								<RenderBlocks
									blocks={(items ?? []).filter((i) => i.alignment === "left")}
									blockComponents={blockComponents}
									className={cn("w-full")}
								/>
							</div>
							<div className="relative flex items-center">
								<RenderBlocks
									blocks={(items ?? []).filter((i) => i.alignment === "center")}
									blockComponents={blockComponents}
									className={cn("w-full bg-green-200/50")}
								/>
							</div>
							<div className="relative flex items-center">
								<RenderBlocks
									blocks={(items ?? []).filter((i) => i.alignment === "right")}
									blockComponents={blockComponents}
									className={cn("w-full")}
								/>
							</div>
						</div>

						<div className="bg-background absolute top-[125%] z-10 mb-6 hidden size-fit w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<RenderBlocks
									mobileView={true}
									blocks={
										(items ?? []).filter(
											(i) => i.blockType === BLOCK_SLUG_HEADER_MENU_ITEMS,
										) ?? []
									}
									blockComponents={blockComponents}
									className={cn("w-full")}
								/>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
