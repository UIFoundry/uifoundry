import Link from "next/link";

import type { HeaderMenuItemsBlock } from "~/payload-types";

import { cn } from "~/styles/utils";

export default function MenuItems({
	menuItems,
	mobileView = false,
}: HeaderMenuItemsBlock & { mobileView?: boolean }) {
	return (
		<div className={cn("hidden lg:block", mobileView === true && "block")}>
			<ul
				className={cn(
					"flex gap-8 text-sm",
					mobileView === true && "flex-col gap-4 text-center",
				)}
			>
				{menuItems.map((item, index) => (
					<li key={index}>
						<Link
							className="text-muted-foreground hover:text-primary block duration-300"
							href={item.href}
						>
							<span>{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
