import Link from "next/link";
import type { HeaderMenuItemsBlock } from "~/payload-types";
import { cn } from "@/registry/default/utils";

export default function MenuItems({
	isMobile = false,
	menuItems,
}: { isMobile: boolean } & HeaderMenuItemsBlock) {
	return (
		<div className={cn("hidden lg:block", isMobile === true && "block")}>
			<ul
				className={cn(
					"flex gap-8 text-sm",
					isMobile === true && "flex-col gap-4 text-center",
				)}
			>
				{menuItems.map((item, index) => (
					<li key={index}>
						<Link
							href={item.href}
							className="text-muted-foreground hover:text-primary block duration-300"
						>
							<span>{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
